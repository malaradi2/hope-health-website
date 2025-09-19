export const copy = {
  hero: {
    title: "HOPE",
    tagline: "AI-Powered Health Insights",
    subtitle: "Transform your health data into actionable insights. HOPE connects your wearables, analyzes your patterns, and provides personalized guidance to help you live healthier.",
    primaryCTA: "Get Updates",
    secondaryCTA: "Contact Sales",
    appStoreText: "Coming soon to App Store and Google Play"
  },
  
  whatIsHope: {
    title: "What is HOPE?",
    subtitle: "Your personal health intelligence platform",
    bullets: [
      "Connects all your health devices and data in one place",
      "Uses AI to identify patterns and potential health risks",
      "Provides clear, actionable recommendations in plain English", 
      "Helps you understand your health trends over time"
    ],
    expertNote: "Advanced multimodal AI for comprehensive health data fusion and risk stratification"
  },

  howItWorks: {
    title: "How HOPE Works",
    steps: [
      {
        title: "Intake",
        description: "Complete our smart onboarding questionnaire powered by interactive AI",
        detail: "LLM-driven adaptive questioning for comprehensive health profiling"
      },
      {
        title: "Data",
        description: "Connect your devices - Apple Watch, Fitbit, blood pressure monitors, and more",
        detail: "Universal device integration via SpikeAPI-compatible connectors"
      },
      {
        title: "AI Insights", 
        description: "Our AI analyzes your data to identify risks and compare you to similar populations",
        detail: "Risk scoring, provisional diagnostics (physician confirmation required), cohort analysis"
      },
      {
        title: "Action",
        description: "Get personalized recommendations and next steps from qualified healthcare providers",
        detail: "Evidence-based recommendations with educational context"
      }
    ]
  },

  patientFeatures: {
    title: "For You",
    subtitle: "Everything you need to understand and improve your health",
    features: [
      {
        title: "Smart Onboarding",
        description: "AI-guided questionnaire that adapts to your responses"
      },
      {
        title: "Interactive Health Chat",
        description: "Ask questions about your health in natural language"
      },
      {
        title: "Device Integration",
        description: "Works with Apple Watch, Fitbit, and other popular devices"
      },
      {
        title: "Risk Assessment",
        description: "Clear Low/Medium/High risk scores with explanations"
      },
      {
        title: "Health Insights",
        description: "Provisional suggestions clearly labeled as requiring physician confirmation"
      },
      {
        title: "Baseline Comparison",
        description: "See how your health metrics compare to similar individuals"
      },
      {
        title: "Doctor Recommendations",
        description: "Get guidance on when and why to see healthcare providers"
      },
      {
        title: "Educational Content",
        description: "Learn about your conditions and treatments in simple terms"
      }
    ]
  },

  clinicianFeatures: {
    title: "For Healthcare Providers",
    subtitle: "Powerful tools to enhance patient care and outcomes",
    features: [
      {
        title: "Structured Patient Summaries",
        description: "AI-generated summaries ready for EHR integration",
        detail: "LLM-powered clinical documentation with structured data output"
      },
      {
        title: "Outcome Tracking",
        description: "Monitor patient progress and treatment effectiveness over time",
        detail: "Post-treatment monitoring with compliance-adjusted analytics"
      },
      {
        title: "Performance Scoring",
        description: "Treatment success metrics adjusted for patient compliance",
        detail: "Advanced scoring algorithms accounting for adherence patterns"
      },
      {
        title: "API Access",
        description: "Integrate HOPE intelligence into your existing telehealth platform",
        detail: "Model API endpoints for insurers, pharma, telehealth (knowledge only, no PHI)"
      }
    ]
  },

  technology: {
    title: "Technology & Security",
    subtitle: "Built with healthcare-grade security and cutting-edge AI",
    features: [
      "HIPAA-compliant cloud infrastructure with end-to-end encryption",
      "Multimodal data fusion from ECG, labs, vitals, symptoms, and wearables", 
      "Continuous learning with feedback loops for improved accuracy",
      "Scalable deployment for both consumer and enterprise use cases"
    ],
    expertNote: "S3 storage, SageMaker ML pipeline, API Gateway delivery with audit logging and de-identification"
  },

  pricing: {
    title: "Choose Your Plan",
    plans: [
      {
        name: "Basic",
        price: "$9.99",
        period: "/month",
        description: "Perfect for personal health tracking",
        features: [
          "Personal health insights",
          "Basic risk assessment",
          "Device integration",
          "Standard support"
        ],
        cta: "Get Started",
        popular: false
      },
      {
        name: "Pro", 
        price: "$29.99",
        period: "/month",
        description: "Advanced insights and priority support",
        features: [
          "Everything in Basic",
          "Advanced AI insights",
          "Longitudinal health trends",
          "Priority support",
          "Detailed comparisons"
        ],
        cta: "Get Pro",
        popular: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "API access and enterprise features",
        features: [
          "Model API access",
          "SSO integration", 
          "SLA guarantees",
          "Compliance documentation",
          "Dedicated support"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ]
  },

  faqs: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Does HOPE replace my doctor?",
        answer: "No, HOPE is designed to supplement, not replace, professional medical care. All health insights are clearly labeled as provisional and require physician confirmation. HOPE helps you prepare for doctor visits and understand your health better."
      },
      {
        question: "What devices work with HOPE?",
        answer: "HOPE integrates with popular wearables including Apple Watch, Fitbit, Samsung Galaxy Watch, and various blood pressure monitors. We're constantly adding support for new devices."
      },
      {
        question: "Is my health data secure?",
        answer: "Yes, HOPE uses HIPAA-compliant infrastructure with end-to-end encryption. Your data is encrypted in transit and at rest, with comprehensive audit logging and de-identification protocols."
      },
      {
        question: "How accurate are HOPE's insights?",
        answer: "HOPE's AI models are trained on large healthcare datasets and continuously improve through feedback loops. However, all insights are provisional and should be discussed with a healthcare provider for proper medical interpretation."
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel your subscription at any time. Your data remains secure and you can reactivate whenever you choose."
      }
    ]
  },

  cta: {
    title: "Be first to try HOPE",
    subtitle: "Join our waitlist and get early access to the future of health insights",
    placeholder: "Enter your email address",
    button: "Get Early Access",
    disclaimer: "We'll never spam you. Unsubscribe at any time."
  },

  footer: {
    company: "HOPE",
    copyright: "© 2024 HOPE. All rights reserved.",
    links: {
      product: ["Features", "Pricing", "API"],
      company: ["About", "Careers", "Contact"],
      legal: ["Privacy", "Terms", "Security"]
    }
  }
}