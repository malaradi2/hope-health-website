# HOPE - Health Intelligence Platform

## Overview

HOPE is a production-quality prototype web application that demonstrates an AI-powered health intelligence platform. It provides personalized health insights, real-time vital monitoring, and clinical decision support for both patients and healthcare providers.

### Key Features

**For Users:**
- 🎯 **Live Health Dashboard** - Real-time heart rate, HRV, SpO2, and activity tracking
- 📊 **Advanced Analytics** - 24-hour trends, sleep analysis, and risk assessment
- 💊 **Medication Management** - Digital pill tracking with adherence monitoring
- 💬 **AI Health Chat** - Get personalized wellness guidance and save advice
- 📤 **Data Upload** - Process ECG images, lab results, and health photos
- 🎨 **Beautiful UI** - WHOOP-inspired dark theme with smooth animations

**For Doctors:**
- 👥 **Patient Monitoring** - Comprehensive dashboard with real-time alerts
- 🚨 **Clinical Alerts** - Automated notifications for concerning health patterns
- ✅ **Review Queue** - Approve AI recommendations and validate uploaded data
- 📋 **Patient Summaries** - AI-generated clinical narratives and metric exports

### Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations:** Framer Motion for smooth, delightful interactions
- **Charts:** Recharts for interactive health data visualizations
- **State Management:** Zustand with persistence layer
- **UI Components:** Radix UI primitives with custom HOPE design system
- **Icons:** Lucide React for consistent iconography
- **Mock Data:** Seeded generators for realistic, consistent demonstrations

## Installation & Setup

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser with JavaScript enabled

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd hope-app
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Animated splash screen
│   ├── auth/page.tsx      # Role selection
│   ├── user/              # User dashboard and features
│   └── doctor/            # Doctor clinical dashboard
├── components/            # Reusable UI components
├── lib/                   # Utilities and core logic
│   ├── types.ts          # TypeScript type definitions
│   ├── mock.ts           # Seeded data generators
│   ├── utils.ts          # Helper functions
│   └── theme.ts          # Design system tokens
├── store/                 # Zustand state management
└── public/               # Static assets
```

## Usage Guide

### Getting Started

1. **Landing Experience:** Watch the animated HOPE logo (5-second intro)
2. **Role Selection:** Choose between "User" or "Doctor" to access different dashboards
3. **Mock Data:** The app automatically generates realistic health data for demonstration

### User Dashboard Features

- **Live Metrics:** Heart rate updates every second with realistic variations
- **Interactive Charts:** 24-hour heart rate trends, sleep stages, activity progress
- **Risk Assessment:** Color-coded health risk gauge with contributing factors
- **Peer Comparison:** See how your metrics compare to similar demographics
- **Health Insights:** AI-generated educational content about your health patterns

### Upload & Processing

1. Drag and drop ECG images, lab PDFs, or medical photos
2. Watch AI processing simulation (uploaded → processing → ready)
3. View extracted data and clinical insights
4. Files appear in doctor review queue for validation

### Medication Tracking

- Add medications with dosage, frequency, and custom colors
- Track daily adherence with simple tap interface
- View 7-day adherence rates and progress visualization
- Set up medication reminders (UI demo only)

### AI Chat & Advice

- Chat with HOPE assistant about health trends and lifestyle
- Save useful recommendations to your advice log
- Doctor can review and approve saved advice
- Safety disclaimers remind users this is not medical advice

### Doctor Dashboard

- **Patient Overview:** Risk levels, recent activity, alert status
- **Alert Management:** Acknowledge and resolve clinical alerts
- **Review Queue:** Approve AI advice and validate uploaded data
- **Patient Details:** Export clinical summaries and key metrics

## Architecture

### Key Components

- **MetricCard:** Real-time health metric display with trends
- **RiskGauge:** Animated circular progress for risk assessment
- **PercentileBar:** Peer comparison visualization
- **AdviceItem:** Chat recommendations with approval workflow
- **Dropzone:** Drag-and-drop file upload with preview

### Mock Data System

The app uses sophisticated mock data generators that create:
- Realistic vital sign patterns and variations
- Time-series data with appropriate medical ranges
- Cohort comparisons and percentile calculations
- Clinical events and alert triggers
- Live updates every second for heart rate metrics

## Design System

### Brand Colors
- **Primary:** Dark navy (#0A2540) and royal blue (#1E40AF)
- **Success:** Teal (#10B981) for healthy metrics
- **Warning:** Amber (#F59E0B) for attention needed
- **Danger:** Red (#EF4444) for critical alerts
- **Background:** Rich dark grays for premium medical feel

### Typography
- **Font:** Inter for professional, readable interface
- **Scale:** Carefully sized for medical data clarity
- **Weight:** Strategic use of font weights for information hierarchy

### Animations
- **Page Transitions:** Smooth fade and slide effects
- **Live Data:** Pulsing indicators and real-time updates
- **Loading States:** Skeleton screens and progress indicators
- **Micro-interactions:** Hover states and button feedback

## Compliance & Safety

### Medical Disclaimers
- Prominent disclaimers throughout the application
- Clear messaging that this is for demonstration only
- No real patient health information (PHI) is collected
- Safety warnings in medication and advice features

### Data Privacy
- All data is mock/simulated for demonstration
- No external API calls or data transmission
- Local storage only for user preferences
- No real health data processing or storage

## Browser Support

- **Modern browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** Responsive design optimized for tablets and phones
- **Performance:** Optimized for smooth 60fps animations
- **Accessibility:** WCAG AA compliance with screen reader support

## Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

### Code Style

- **TypeScript:** Strict type checking enabled
- **ESLint:** Standard configuration with Next.js rules
- **Components:** Functional components with hooks
- **Styling:** Tailwind utility classes with custom CSS variables

## Limitations & Scope

This is a **prototype demonstration** designed to showcase:
- Modern healthcare UI/UX patterns
- Real-time health data visualization
- Clinical workflow integration
- AI-assisted health guidance interfaces

**Not included:**
- Real medical device integration
- Actual AI/ML health analysis
- HIPAA-compliant data handling
- Production authentication/security
- Real-time data synchronization
- Clinical decision support validation

## Contributing

This is a demonstration prototype. For production medical software:
1. Implement proper medical device integrations
2. Add clinical validation and FDA compliance
3. Integrate real AI/ML health analysis models
4. Add comprehensive security and HIPAA compliance
5. Implement proper authentication and authorization

## License

This project is for demonstration purposes. Not for medical use.

## Support

For questions about this prototype implementation, please refer to the codebase documentation and comments.