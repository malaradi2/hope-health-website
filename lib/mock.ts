import {
  UserProfile,
  LiveMetrics,
  HeartRateData,
  HRVData,
  RestingHRForecast,
  SleepData,
  ActivityData,
  BaselineComparison,
  RiskScore,
  Insight,
  Doctor,
  Medication,
  AdviceItem,
  UploadItem,
  PatientAlert,
  PatientSummary,
  MetricPoint,
  RiskLevel,
  UserRole,
} from './types';
import { SeededRandom, getRiskLabel, generateId } from './utils';

// Global seeded random instance for consistent data
const globalRandom = new SeededRandom(12345);

// Store intervals for cleanup
const activeIntervals: NodeJS.Timeout[] = [];

export function clearAllIntervals() {
  activeIntervals.forEach((interval) => clearInterval(interval));
  activeIntervals.length = 0;
}

// Generate time series data
function generateTimeSeries(
  startTime: Date,
  endTime: Date,
  intervalMs: number,
  baseValue: number,
  variance: number,
  trend: number = 0,
  random: SeededRandom = globalRandom
): MetricPoint[] {
  const points: MetricPoint[] = [];
  let currentTime = startTime.getTime();
  let currentValue = baseValue;

  while (currentTime <= endTime.getTime()) {
    // Add random walk with trend
    currentValue += random.range(-variance, variance) + trend;
    currentValue = Math.max(0, currentValue); // Ensure positive values

    points.push({
      timestamp: new Date(currentTime),
      value: Math.round(currentValue * 100) / 100,
      confidence: random.range(0.8, 0.98),
    });

    currentTime += intervalMs;
  }

  return points;
}

// User Profile Mock
export function createMockUser(role: UserRole = 'user'): UserProfile {
  const names = role === 'user' ? ['Alex Chen', 'Jordan Smith', 'Sam Johnson'] : ['Dr. Sarah Wilson', 'Dr. Michael Brown', 'Dr. Lisa Garcia'];
  const name = globalRandom.choice(names);

  return {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    role,
    age: globalRandom.int(25, 65),
    gender: globalRandom.choice(['male', 'female', 'other']),
    onboardingCompleted: role === 'user' ? false : true,
    deviceConnections: [
      { type: 'apple', connected: true, lastSync: new Date(Date.now() - globalRandom.int(5, 60) * 60000) },
      { type: 'google', connected: false, lastSync: undefined },
      { type: 'fitbit', connected: globalRandom.boolean(0.3), lastSync: globalRandom.boolean() ? new Date(Date.now() - globalRandom.int(30, 240) * 60000) : undefined },
    ],
    createdAt: new Date(Date.now() - globalRandom.int(30, 365) * 24 * 60 * 60 * 1000),
    lastSync: new Date(Date.now() - globalRandom.int(1, 15) * 60000),
  };
}

// Live Metrics with real-time updates
export function createLiveMetrics(): LiveMetrics {
  return {
    heartRate: globalRandom.int(65, 85),
    hrv: globalRandom.int(25, 65),
    restingHR: globalRandom.int(55, 75),
    spo2: globalRandom.range(96, 99.5),
    steps: globalRandom.int(3000, 15000),
    lastUpdated: new Date(),
  };
}

let currentLiveMetrics = createLiveMetrics();

export function getLiveMetrics(): LiveMetrics {
  return { ...currentLiveMetrics };
}

export function startLiveUpdates(updateCallback: (metrics: LiveMetrics) => void) {
  const interval = setInterval(() => {
    // Simulate realistic heart rate changes
    const hrChange = globalRandom.range(-2, 2);
    currentLiveMetrics.heartRate = Math.max(50, Math.min(120, currentLiveMetrics.heartRate + hrChange));

    // HRV changes more slowly
    if (globalRandom.boolean(0.1)) {
      const hrvChange = globalRandom.range(-1, 1);
      currentLiveMetrics.hrv = Math.max(20, Math.min(80, currentLiveMetrics.hrv + hrvChange));
    }

    // SpO2 very stable
    if (globalRandom.boolean(0.05)) {
      currentLiveMetrics.spo2 = Math.max(94, Math.min(100, currentLiveMetrics.spo2 + globalRandom.range(-0.2, 0.2)));
    }

    // Steps increment throughout the day
    if (globalRandom.boolean(0.3)) {
      currentLiveMetrics.steps += globalRandom.int(5, 25);
    }

    currentLiveMetrics.lastUpdated = new Date();
    updateCallback({ ...currentLiveMetrics });
  }, 1000);

  activeIntervals.push(interval);
  return interval;
}

// Heart Rate Data
export function createHeartRateData(): HeartRateData {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const points = generateTimeSeries(
    twentyFourHoursAgo,
    now,
    60 * 1000, // Every minute
    75, // Base HR
    8 // Variance
  );

  return {
    current: currentLiveMetrics.heartRate,
    points,
    bands: {
      low: 60,
      normal: [65, 85],
      high: 90,
    },
  };
}

// HRV Data
export function createHRVData(): HRVData {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const weeklyTrend = generateTimeSeries(
    sevenDaysAgo,
    now,
    24 * 60 * 60 * 1000, // Daily
    45, // Base HRV
    8 // Variance
  );

  return {
    current: currentLiveMetrics.hrv,
    dailyAverage: weeklyTrend[weeklyTrend.length - 1]?.value || 45,
    weeklyTrend,
    percentile: globalRandom.int(30, 85),
  };
}

// Resting HR Forecast
export function createRestingHRForecast(): RestingHRForecast {
  const now = new Date();
  const baseRestingHR = currentLiveMetrics.restingHR;

  const forecast24h = {
    band50: [baseRestingHR - 2, baseRestingHR + 2] as [number, number],
    band85: [baseRestingHR - 4, baseRestingHR + 4] as [number, number],
    band90: [baseRestingHR - 6, baseRestingHR + 6] as [number, number],
  };

  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const points = generateTimeSeries(
    fourteenDaysAgo,
    now,
    24 * 60 * 60 * 1000, // Daily
    baseRestingHR,
    3 // Lower variance for resting HR
  );

  return {
    current: baseRestingHR,
    forecast24h,
    points,
  };
}

// Sleep Data
export function createSleepData(): SleepData {
  const totalSleep = globalRandom.range(6.5, 9); // Hours
  const efficiency = globalRandom.range(0.78, 0.92);

  const stages = {
    awake: totalSleep * globalRandom.range(0.05, 0.12),
    light: totalSleep * globalRandom.range(0.45, 0.55),
    deep: totalSleep * globalRandom.range(0.15, 0.25),
    rem: totalSleep * globalRandom.range(0.20, 0.28),
  };

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const weeklyPattern = generateTimeSeries(
    sevenDaysAgo,
    now,
    24 * 60 * 60 * 1000,
    totalSleep,
    1.2
  );

  return {
    lastNight: {
      totalSleep: Math.round(totalSleep * 10) / 10,
      stages: {
        awake: Math.round(stages.awake * 10) / 10,
        light: Math.round(stages.light * 10) / 10,
        deep: Math.round(stages.deep * 10) / 10,
        rem: Math.round(stages.rem * 10) / 10,
      },
      efficiency: Math.round(efficiency * 100) / 100,
    },
    sleepDebt: Math.max(0, globalRandom.range(-1, 3)),
    weeklyPattern,
  };
}

// Activity Data
export function createActivityData(): ActivityData {
  const steps = currentLiveMetrics.steps;
  const goal = globalRandom.choice([8000, 10000, 12000]);

  const now = new Date();
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const last14Days = generateTimeSeries(
    fourteenDaysAgo,
    now,
    24 * 60 * 60 * 1000,
    9000, // Base steps
    3000 // Variance
  );

  return {
    steps,
    goal,
    last14Days,
    vo2Proxy: globalRandom.range(35, 55),
  };
}

// Baseline Comparison
export function createBaselineComparison(): BaselineComparison {
  return {
    userPercentiles: {
      restingHR: globalRandom.int(25, 85),
      hrv: globalRandom.int(30, 80),
      vo2Proxy: globalRandom.int(40, 90),
      sleepEfficiency: globalRandom.int(35, 88),
    },
    cohortInfo: {
      ageRange: '25-35',
      sampleSize: globalRandom.int(15000, 50000),
    },
  };
}

// Risk Score
export function createRiskScore(): RiskScore {
  const factors = {
    heartRate: globalRandom.int(20, 85),
    hrv: globalRandom.int(15, 75),
    sleep: globalRandom.int(25, 90),
    activity: globalRandom.int(30, 80),
  };

  const overall = Math.round((factors.heartRate + factors.hrv + factors.sleep + factors.activity) / 4);
  const level = getRiskLabel(overall);

  return {
    overall,
    level,
    factors,
    lastCalculated: new Date(),
  };
}

// Insights
export function createInsights(): Insight[] {
  const insights = [
    {
      type: 'education' as const,
      title: 'Heart Rate Variability Explained',
      content: 'Your HRV of 45ms is within the normal range. Higher HRV generally indicates better recovery and stress resilience.',
      category: 'Heart Health',
    },
    {
      type: 'recommendation' as const,
      title: 'Improve Your Sleep Quality',
      content: 'Your sleep efficiency could be improved. Try maintaining a consistent bedtime and avoiding screens 1 hour before sleep.',
      category: 'Sleep',
    },
    {
      type: 'alert' as const,
      title: 'SpO2 Reading Below Normal',
      content: 'Your oxygen saturation dropped to 94% last night. Consider consulting with a healthcare provider if this persists.',
      severity: 'medium' as const,
      category: 'Respiratory',
    },
  ];

  return insights.map((insight, index) => ({
    id: `insight-${index}`,
    ...insight,
    createdAt: new Date(Date.now() - globalRandom.int(1, 48) * 60 * 60 * 1000),
    dismissed: false,
  }));
}

// Doctors
export function createDoctors(): Doctor[] {
  const doctors = [
    { name: 'Dr. Sarah Kim', specialty: 'Cardiology', outcomeScore: 'A' as const, location: 'Downtown Medical Center' },
    { name: 'Dr. Michael Rodriguez', specialty: 'Internal Medicine', outcomeScore: 'A' as const, location: 'City Health Clinic' },
    { name: 'Dr. Jennifer Liu', specialty: 'Sleep Medicine', outcomeScore: 'B' as const, location: 'Sleep Wellness Center' },
    { name: 'Dr. David Thompson', specialty: 'Sports Medicine', outcomeScore: 'A' as const, location: 'Athletic Health Institute' },
    { name: 'Dr. Maria Santos', specialty: 'Endocrinology', outcomeScore: 'B' as const, location: 'Metro Diabetes Center' },
  ];

  return doctors.map((doctor, index) => ({
    id: `doctor-${index}`,
    ...doctor,
    tags: globalRandom.choice([
      ['Preventive Care', 'Telehealth'],
      ['Heart Disease', 'Hypertension'],
      ['Sleep Disorders', 'Insomnia'],
      ['Fitness', 'Recovery'],
      ['Diabetes', 'Metabolism'],
    ]),
    availability: globalRandom.boolean(0.8),
  }));
}

// Medications
export function createMedications(): Medication[] {
  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily', color: '#3B82F6' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', color: '#10B981' },
    { name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Daily', color: '#F59E0B' },
  ];

  return medications.map((med, index) => {
    const startDate = new Date(Date.now() - globalRandom.int(30, 365) * 24 * 60 * 60 * 1000);

    return {
      id: `med-${index}`,
      ...med,
      startDate,
      endDate: globalRandom.boolean(0.3) ? new Date(Date.now() + globalRandom.int(30, 180) * 24 * 60 * 60 * 1000) : undefined,
      notes: globalRandom.boolean(0.4) ? 'Take with food' : undefined,
      adherence: [], // Will be populated by dose logs
      impactTracking: index === 0 ? { // Only for Lisinopril as example
        medicationId: `med-${index}`,
        startDate,
        physiologicalChanges: {
          heartRate: {
            before: 85,
            after: 72,
            change: -13,
            significance: 'positive' as const
          },
          bloodPressure: {
            before: [145, 92] as [number, number],
            after: [128, 78] as [number, number],
            change: 'improved' as const
          },
          sleepQuality: {
            before: 6.2,
            after: 7.1,
            change: 0.9
          }
        },
        sideEffectsReported: ['Mild dizziness initially'],
        effectivenessScore: 8,
        recommendationGenerated: 'Current dosage appears optimal based on physiological response',
        lastAssessment: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      } : undefined,
      consultationHistory: []
    };
  });
}

// Advice Items
export function createAdviceItems(): AdviceItem[] {
  const advice = [
    {
      text: 'Consider reducing caffeine intake after 2 PM to improve sleep quality based on your sleep pattern analysis.',
      summary: 'Limit afternoon caffeine for better sleep',
      tags: ['sleep', 'lifestyle'],
      category: 'Sleep Health',
      urgencyLevel: 'medium' as const,
      confidence: 78,
      evidenceLevel: 'moderate' as const,
    },
    {
      text: 'Your heart rate during exercise suggests you could safely increase intensity by 10-15% while maintaining target zones.',
      summary: 'Safe to increase exercise intensity',
      tags: ['exercise', 'heart rate'],
      category: 'Fitness',
      urgencyLevel: 'low' as const,
      confidence: 92,
      evidenceLevel: 'strong' as const,
    },
    {
      text: 'Based on your HRV trends showing stress patterns, consider adding 10 minutes of meditation to your morning routine.',
      summary: 'Morning meditation for stress management',
      tags: ['stress', 'hrv', 'meditation'],
      category: 'Wellness',
      urgencyLevel: 'medium' as const,
      confidence: 84,
      evidenceLevel: 'moderate' as const,
    },
    {
      text: 'Your Lisinopril is showing excellent physiological response. Continue current dosage and monitor blood pressure.',
      summary: 'Continue current Lisinopril dosage',
      tags: ['medication', 'blood pressure'],
      category: 'Medication Management',
      urgencyLevel: 'low' as const,
      confidence: 95,
      evidenceLevel: 'strong' as const,
      medicationRelated: 'med-0',
    },
  ];

  const statusOptions: any[] = ['approved', 'pending_review', 'under_review', 'needs_clarification'];

  return advice.map((item, index) => {
    const status = globalRandom.choice(statusOptions);
    const reviewHistory = [];

    if (status !== 'pending_review') {
      reviewHistory.push({
        id: generateId(),
        reviewerId: 'doctor-1',
        reviewerName: 'Dr. Sarah Kim',
        reviewerCredentials: 'MD, Internal Medicine',
        status,
        timestamp: new Date(Date.now() - globalRandom.int(1, 24) * 60 * 60 * 1000),
        notes: status === 'approved' ? 'Clinically sound recommendation based on patient data' :
               status === 'needs_clarification' ? 'Please provide more details about patient symptoms' :
               'Under clinical review for safety assessment',
        clinicalReasoning: status === 'approved' ? 'Evidence-based recommendation with low risk profile' : undefined,
        requestedActions: status === 'needs_clarification' ? [
          'Patient to provide symptom details',
          'Schedule follow-up in 2 weeks'
        ] : undefined,
        followUpRequired: status === 'needs_clarification',
        patientNotificationSent: true,
      });
    }

    return {
      id: `advice-${index}`,
      ...item,
      createdAt: new Date(Date.now() - globalRandom.int(1, 72) * 60 * 60 * 1000),
      userId: 'current-user',
      approvalStatus: status,
      reviewHistory,
    };
  });
}

// Upload Items
export function createUploadItems(): UploadItem[] {
  const uploads = [
    { fileName: 'ecg_reading_morning.jpg', fileType: 'ecg' as const },
    { fileName: 'blood_work_results.pdf', fileType: 'lab' as const },
    { fileName: 'rash_photo.jpg', fileType: 'photo' as const },
  ];

  return uploads.map((upload, index) => ({
    id: `upload-${index}`,
    ...upload,
    status: globalRandom.choice(['uploaded', 'processing', 'ready'] as const),
    uploadedAt: new Date(Date.now() - globalRandom.int(1, 48) * 60 * 60 * 1000),
    processedAt: globalRandom.boolean(0.7) ? new Date(Date.now() - globalRandom.int(0, 24) * 60 * 60 * 1000) : undefined,
    extractedData: globalRandom.boolean(0.6) ? { heartRate: 78, rhythm: 'Normal sinus rhythm' } : undefined,
    notes: globalRandom.boolean(0.3) ? 'Requires physician review' : undefined,
    userId: 'current-user',
  }));
}

// Patient Alerts
export function createPatientAlerts(): PatientAlert[] {
  const alerts = [
    {
      patientId: 'patient-1',
      patientName: 'Alex Chen',
      type: 'spo2_low' as const,
      message: 'SpO2 dropped to 93% during sleep',
      value: 93,
      threshold: 95,
    },
    {
      patientId: 'patient-2',
      patientName: 'Jordan Smith',
      type: 'hrv_drop' as const,
      message: 'HRV decreased by 25% from baseline',
      value: 32,
      threshold: 40,
    },
    {
      patientId: 'patient-3',
      patientName: 'Sam Johnson',
      type: 'rhr_spike' as const,
      message: 'Resting HR elevated to 85 bpm',
      value: 85,
      threshold: 75,
    },
  ];

  return alerts.map((alert, index) => ({
    id: `alert-${index}`,
    ...alert,
    severity: globalRandom.choice(['low', 'medium', 'high'] as const),
    createdAt: new Date(Date.now() - globalRandom.int(1, 12) * 60 * 60 * 1000),
    acknowledged: globalRandom.boolean(0.4) ? {
      by: 'doctor-1',
      at: new Date(Date.now() - globalRandom.int(0, 6) * 60 * 60 * 1000),
    } : undefined,
    resolved: globalRandom.boolean(0.2) ? {
      by: 'doctor-1',
      at: new Date(Date.now() - globalRandom.int(0, 3) * 60 * 60 * 1000),
    } : undefined,
  }));
}

// Patient Summaries
export function createPatientSummaries(): PatientSummary[] {
  const patients = [
    { patientName: 'Alex Chen', age: 32 },
    { patientName: 'Jordan Smith', age: 28 },
    { patientName: 'Sam Johnson', age: 45 },
    { patientName: 'Casey Brown', age: 38 },
    { patientName: 'Taylor Wilson', age: 29 },
  ];

  return patients.map((patient, index) => {
    const riskScore = createRiskScore();
    return {
      patientId: `patient-${index}`,
      patientName: patient.patientName,
      age: patient.age,
      riskScore,
      lastSync: new Date(Date.now() - globalRandom.int(1, 60) * 60 * 1000),
      flags: globalRandom.choice([
        ['High BP', 'Irregular Sleep'],
        ['Low HRV', 'Sedentary'],
        ['Sleep Apnea Risk'],
        ['Stress Indicators'],
        [],
      ]),
      summary: `${patient.patientName} is a ${patient.age}-year-old patient showing ${
        riskScore.level === 'low' ? 'stable vitals with good overall health metrics' :
        riskScore.level === 'medium' ? 'some concerning trends that warrant monitoring' :
        'several risk factors requiring immediate attention'
      }. Recent data shows HRV at ${globalRandom.int(30, 60)}ms and resting HR at ${globalRandom.int(55, 80)}bpm.`,
      keyMetrics: {
        restingHR: globalRandom.int(55, 80),
        hrv: globalRandom.int(30, 60),
        spo2: globalRandom.range(94, 99),
        sleepScore: globalRandom.int(65, 95),
      },
    };
  });
}

// Initialize all mock data
export function initializeMockData() {
  return {
    user: createMockUser('user'),
    liveMetrics: getLiveMetrics(),
    heartRateData: createHeartRateData(),
    hrvData: createHRVData(),
    restingHRForecast: createRestingHRForecast(),
    sleepData: createSleepData(),
    activityData: createActivityData(),
    baselineComparison: createBaselineComparison(),
    riskScore: createRiskScore(),
    insights: createInsights(),
    doctors: createDoctors(),
    medications: createMedications(),
    adviceItems: createAdviceItems(),
    uploads: createUploadItems(),
    alerts: createPatientAlerts(),
    patients: createPatientSummaries(),
  };
}