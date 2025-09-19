'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Save,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Lightbulb
} from 'lucide-react';

import { HopeLogo } from '../../../components/HopeLogo';
import { AdviceItem } from '../../../components/AdviceItem';
import { useAppStore } from '../../../store/useAppStore';
import { ChatMessage, AdviceItem as AdviceItemType } from '../../../lib/types';
import { formatTime, generateId } from '../../../lib/utils';

const mockResponses = [
  {
    trigger: ['sleep', 'tired', 'insomnia'],
    responses: [
      'Based on your recent sleep data, I notice your sleep efficiency could be improved. Consider establishing a consistent bedtime routine and avoiding screens 1 hour before sleep.',
      'Your HRV patterns suggest you might benefit from better sleep hygiene. Try keeping your bedroom cool (65-68°F) and dark for optimal sleep quality.',
      'Sleep debt can impact your recovery and heart rate variability. Consider a gradual adjustment to your sleep schedule, moving bedtime earlier by 15 minutes each night.'
    ]
  },
  {
    trigger: ['heart rate', 'hr', 'pulse'],
    responses: [
      'Your current heart rate trends look good. The slight elevation during afternoon hours is normal and could be related to caffeine or activity levels.',
      'I notice your resting heart rate has been slightly elevated. This could be due to stress, dehydration, or recent changes in activity. Consider tracking your hydration and stress levels.',
      'Your heart rate variability suggests good autonomic function. To maintain this, focus on consistent sleep patterns and stress management techniques.'
    ]
  },
  {
    trigger: ['exercise', 'workout', 'activity'],
    responses: [
      'Your activity levels show room for improvement. Based on your heart rate data, you could safely increase your exercise intensity by 10-15% to see cardiovascular benefits.',
      'Great job on staying active! Your step count is consistent. Consider adding some resistance training 2-3 times per week to complement your cardio routine.',
      'Your recovery metrics suggest you\'re handling your current exercise load well. You might benefit from incorporating some high-intensity intervals once or twice per week.'
    ]
  },
  {
    trigger: ['stress', 'anxiety', 'worried'],
    responses: [
      'Your HRV patterns indicate elevated stress levels. Consider trying deep breathing exercises - 4 seconds in, 6 seconds out - for 5-10 minutes daily.',
      'Stress can significantly impact your health metrics. Based on your data, meditation or mindfulness practices could be beneficial. Even 10 minutes daily can make a difference.',
      'I notice some stress indicators in your heart rate patterns. Regular physical activity, adequate sleep, and stress management techniques can help improve your overall resilience.'
    ]
  }
];

export default function ChatPage() {
  const router = useRouter();
  const {
    currentUser,
    chatMessages,
    adviceItems,
    addChatMessage,
    addAdviceItem,
    approveAdviceItem
  } = useAppStore();

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAdvice, setSelectedAdvice] = useState<AdviceItemType | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!currentUser) {
    router.push('/auth');
    return null;
  }

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const responseSet of mockResponses) {
      if (responseSet.trigger.some(trigger => lowerMessage.includes(trigger))) {
        return responseSet.responses[Math.floor(Math.random() * responseSet.responses.length)];
      }
    }

    // Default responses
    const defaultResponses = [
      'That\'s an interesting question about your health. Based on your recent data patterns, I\'d recommend discussing this with your healthcare provider for personalized guidance.',
      'I understand your concern. While I can provide general wellness information, it\'s important to consult with a medical professional for specific health advice.',
      'Thank you for sharing that with me. For the most accurate guidance regarding your health, I\'d suggest speaking with your doctor who can review your complete medical history.',
      'Your health data shows some interesting patterns. For specific medical advice, please consult with a healthcare professional who can provide personalized recommendations.'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    addChatMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseContent = generateResponse(userMessage.content);
      const botMessage: ChatMessage = {
        id: generateId(),
        content: responseContent,
        role: 'assistant',
        timestamp: new Date(),
      };

      addChatMessage(botMessage);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSaveAsAdvice = (messageContent: string) => {
    const advice: AdviceItemType = {
      id: generateId(),
      text: messageContent,
      summary: messageContent.split('.')[0] + (messageContent.split('.').length > 1 ? '.' : ''),
      tags: ['chat', 'lifestyle'],
      category: 'AI Recommendation',
      createdAt: new Date(),
      userId: currentUser.id,
      approvalStatus: 'pending_review',
      reviewHistory: [],
      urgencyLevel: 'low',
      confidence: 75,
      evidenceLevel: 'limited',
    };

    addAdviceItem(advice);
  };

  const handleApproveAdvice = (id: string) => {
    approveAdviceItem(id, {
      by: 'doctor-demo',
      reviewerName: 'Dr. Demo (Prototype)'
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/user')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <HopeLogo size="sm" />
              <div>
                <h1 className="text-xl font-semibold text-white">Chat & Advice</h1>
                <p className="text-sm text-gray-400">Get lifestyle guidance and save recommendations</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-white">{currentUser.name}</p>
              <p className="text-xs text-gray-400">User Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-400 font-medium mb-1">Not Medical Advice</p>
              <p className="text-amber-300/80">
                This chat provides general wellness information only. For medical decisions, diagnosis, or treatment,
                always consult with qualified healthcare professionals. Emergency situations require immediate medical attention.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <div className="hope-card p-0 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">HOPE Assistant</h3>
                    <div className="flex items-center space-x-2 text-sm text-teal-400">
                      <div className="w-2 h-2 bg-teal-400 rounded-full hope-live-pulse"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center py-12">
                    <Bot className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Welcome to HOPE Chat</h3>
                    <p className="text-gray-400 mb-4">
                      Ask me about your health trends, lifestyle tips, or wellness guidance.
                    </p>
                    <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
                      {[
                        'How can I improve my sleep quality?',
                        'What do my heart rate trends mean?',
                        'Any exercise recommendations for me?'
                      ].map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(suggestion)}
                          className="text-left p-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                          <Lightbulb className="w-4 h-4 inline mr-2 text-teal-400" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-teal-500 text-white rounded-l-2xl rounded-tr-2xl rounded-br-md'
                          : 'bg-gray-800 text-gray-200 rounded-r-2xl rounded-tl-2xl rounded-bl-md'
                      } p-4`}
                    >
                      <div className="flex items-start space-x-3">
                        {message.role === 'assistant' && (
                          <Bot className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-400" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${
                              message.role === 'user' ? 'text-teal-100' : 'text-gray-400'
                            }`}>
                              {formatTime(message.timestamp)}
                            </span>
                            {message.role === 'assistant' && (
                              <button
                                onClick={() => handleSaveAsAdvice(message.content)}
                                className="flex items-center space-x-1 text-xs text-gray-400 hover:text-teal-400 transition-colors ml-4"
                              >
                                <Save className="w-3 h-3" />
                                <span>Save as Advice</span>
                              </button>
                            )}
                          </div>
                        </div>
                        {message.role === 'user' && (
                          <User className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-100" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-800 text-gray-200 rounded-r-2xl rounded-tl-2xl rounded-bl-md p-4 max-w-[80%]">
                      <div className="flex items-center space-x-3">
                        <Bot className="w-5 h-5 text-teal-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask HOPE about your health trends..."
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none resize-none"
                      rows={2}
                      disabled={isTyping}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advice Log Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Saved Advice</h3>
                <span className="text-sm text-gray-400">
                  {adviceItems.length} items
                </span>
              </div>

              {adviceItems.length === 0 ? (
                <div className="hope-card p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">
                    No saved advice yet. Chat with HOPE and save useful recommendations.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {adviceItems.slice(0, 5).map((advice) => (
                    <AdviceItem
                      key={advice.id}
                      advice={advice}
                      showApproval={true}
                      onApprove={handleApproveAdvice}
                    />
                  ))}

                  {adviceItems.length > 5 && (
                    <div className="text-center">
                      <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                        View all {adviceItems.length} advice items →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hope-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Chat Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2" />
                  <p className="text-sm text-gray-300">
                    Ask about your specific health trends and patterns
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <p className="text-sm text-gray-300">
                    Save useful recommendations for later review
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                  <p className="text-sm text-gray-300">
                    Doctor approval adds clinical validation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}