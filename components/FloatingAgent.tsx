'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, AlertTriangle, Clock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ChatMessage, AdviceItem } from '../lib/types';
import { generateId } from '../lib/utils';

interface FloatingAgentProps {
  className?: string;
}

export const FloatingAgent: React.FC<FloatingAgentProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { currentUser, addAdviceItem } = useAppStore();

  const quickActions = [
    { text: "How are my vitals looking today?", category: "Health Status" },
    { text: "Any medication side effects to watch for?", category: "Medication" },
    { text: "What does my heart rate trend mean?", category: "Analysis" },
    { text: "Should I be concerned about my sleep?", category: "Sleep Health" }
  ];

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Quick health status responses
    if (lowerMessage.includes('vitals') || lowerMessage.includes('status')) {
      return "Based on your current data, your heart rate is within normal range at 72 bpm, and your HRV shows good recovery. Your SpO2 is excellent at 98%. I notice your sleep efficiency could improve - would you like specific recommendations?";
    }

    // Medication-related responses
    if (lowerMessage.includes('medication') || lowerMessage.includes('side effect')) {
      return "I'm monitoring your physiological response to your current medications. Your heart rate has remained stable since starting Lisinopril. If you're experiencing any unusual symptoms, please describe them so I can provide personalized guidance and alert your care team if needed.";
    }

    // Heart rate analysis
    if (lowerMessage.includes('heart rate') || lowerMessage.includes('hr')) {
      return "Your heart rate variability indicates good cardiovascular health. The slight elevation during afternoon hours is normal and likely related to activity or stress. Your resting HR trend shows steady improvement over the past week.";
    }

    // Sleep analysis
    if (lowerMessage.includes('sleep')) {
      return "Your sleep data shows you're getting adequate duration but efficiency could improve. I see frequent awakenings between 2-4 AM. This could be related to stress, room temperature, or your evening routine. Would you like me to create a personalized sleep optimization plan?";
    }

    // Default professional response
    return "I'm here to help you understand your health data and provide evidence-based guidance. For specific medical concerns, I'll ensure your care team is notified. What aspect of your health would you like to discuss?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
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

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (text: string) => {
    setInputValue(text);
    handleSendMessage();
  };

  const handleSaveAsAdvice = (messageContent: string) => {
    if (!currentUser) return;

    const advice: AdviceItem = {
      id: generateId(),
      text: messageContent,
      summary: messageContent.split('.')[0] + (messageContent.split('.').length > 1 ? '.' : ''),
      tags: ['agent', 'quick-consult'],
      category: 'AI Health Assistant',
      createdAt: new Date(),
      userId: currentUser.id,
      approvalStatus: 'pending_review',
      reviewHistory: [],
      urgencyLevel: 'medium',
      confidence: 85,
      evidenceLevel: 'moderate',
    };

    addAdviceItem(advice);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 10px 20px rgba(16, 185, 129, 0.3)',
            '0 15px 30px rgba(16, 185, 129, 0.4)',
            '0 10px 20px rgba(16, 185, 129, 0.3)',
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <MessageSquare className="w-8 h-8" />

        {/* Pulse indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-end p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 100 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-teal-500/10 to-blue-600/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">HOPE Assistant</h3>
                      <div className="flex items-center space-x-2 text-sm text-teal-400">
                        <div className="w-2 h-2 bg-teal-400 rounded-full hope-live-pulse"></div>
                        <span>Available 24/7</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              {messages.length === 0 && (
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Quick Health Check</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.text)}
                        className="text-left p-3 bg-gray-800/50 hover:bg-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-colors border border-gray-700/50"
                      >
                        <div className="font-medium">{action.text}</div>
                        <div className="text-xs text-gray-500 mt-1">{action.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-white mb-2">Ready to Help</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      I can analyze your health data, explain trends, provide guidance, and connect you with your care team when needed.
                    </p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        message.role === 'user'
                          ? 'bg-teal-500 text-white rounded-l-2xl rounded-tr-2xl rounded-br-md'
                          : 'bg-gray-800 text-gray-200 rounded-r-2xl rounded-tl-2xl rounded-bl-md border border-gray-700'
                      } p-3`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${
                          message.role === 'user' ? 'text-teal-100' : 'text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => handleSaveAsAdvice(message.content)}
                            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-teal-400 transition-colors ml-3"
                          >
                            <Clock className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-200 rounded-r-2xl rounded-tl-2xl rounded-bl-md p-3 border border-gray-700">
                      <div className="flex items-center space-x-3">
                        <Bot className="w-4 h-4 text-teal-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-700 bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about your health..."
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none text-sm"
                      disabled={isTyping}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="flex items-center space-x-2 mt-3 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <p className="text-xs text-amber-300/80">
                    AI health guidance • Not medical diagnosis • Doctor review recommended
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};