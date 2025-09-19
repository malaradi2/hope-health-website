export type UserRole = 'user' | 'doctor';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  age?: number;
  gender?: string;
  onboardingCompleted: boolean;
  deviceConnections: DeviceConnection[];
  createdAt: Date;
  lastSync?: Date;
}

export interface DeviceConnection {
  type: 'apple' | 'google' | 'fitbit';
  connected: boolean;
  lastSync?: Date;
  deviceId?: string;
}

export interface MetricPoint {
  timestamp: Date;
  value: number;
  confidence?: number;
}

export interface LiveMetrics {
  heartRate: number;
  hrv: number;
  restingHR: number;
  spo2: number;
  steps: number;
  lastUpdated: Date;
}

export interface HeartRateData {
  current: number;
  points: MetricPoint[];
  bands: {
    low: number;
    normal: [number, number];
    high: number;
  };
}

export interface HRVData {
  current: number;
  dailyAverage: number;
  weeklyTrend: MetricPoint[];
  percentile: number;
}

export interface RestingHRForecast {
  current: number;
  forecast24h: {
    band50: [number, number];
    band85: [number, number];
    band90: [number, number];
  };
  points: MetricPoint[];
}

export interface SleepData {
  lastNight: {
    totalSleep: number;
    stages: {
      awake: number;
      light: number;
      deep: number;
      rem: number;
    };
    efficiency: number;
  };
  sleepDebt: number;
  weeklyPattern: MetricPoint[];
}

export interface ActivityData {
  steps: number;
  goal: number;
  last14Days: MetricPoint[];
  vo2Proxy?: number;
}

export interface BaselineComparison {
  userPercentiles: {
    restingHR: number;
    hrv: number;
    vo2Proxy: number;
    sleepEfficiency: number;
  };
  cohortInfo: {
    ageRange: string;
    sampleSize: number;
  };
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskScore {
  overall: number;
  level: RiskLevel;
  factors: {
    heartRate: number;
    hrv: number;
    sleep: number;
    activity: number;
  };
  lastCalculated: Date;
}

export interface Insight {
  id: string;
  type: 'education' | 'recommendation' | 'alert';
  title: string;
  content: string;
  severity?: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
  dismissed?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  outcomeScore: 'A' | 'B' | 'C';
  tags: string[];
  location: string;
  availability: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
  color: string;
  adherence: DoseLog[];
  impactTracking?: MedicationImpact;
  consultationHistory?: MedicationConsultation[];
}

export interface MedicationImpact {
  medicationId: string;
  startDate: Date;
  physiologicalChanges: {
    heartRate?: {
      before: number;
      after: number;
      change: number;
      significance: 'positive' | 'negative' | 'neutral';
    };
    bloodPressure?: {
      before: [number, number];
      after: [number, number];
      change: 'improved' | 'worsened' | 'stable';
    };
    sleepQuality?: {
      before: number;
      after: number;
      change: number;
    };
    activityTolerance?: {
      before: number;
      after: number;
      change: number;
    };
  };
  sideEffectsReported: string[];
  effectivenessScore: number; // 1-10
  recommendationGenerated?: string;
  lastAssessment: Date;
}

export interface MedicationConsultation {
  id: string;
  medicationId: string;
  patientReport: string;
  symptoms: string[];
  sideEffects: string[];
  effectiveness: number; // 1-10 scale
  agentResponse: string;
  recommendation: 'continue' | 'adjust_dose' | 'change_medication' | 'consult_doctor';
  recommendationReason: string;
  timestamp: Date;
  followUpRequired: boolean;
  doctorNotified: boolean;
}

export interface DoseLog {
  medicationId: string;
  scheduledTime: Date;
  takenTime?: Date;
  taken: boolean;
  notes?: string;
}

export type AdviceApprovalStatus =
  | 'pending_review'           // Just submitted, waiting for doctor
  | 'under_review'             // Doctor is currently reviewing
  | 'approved'                 // Doctor approved
  | 'needs_clarification'      // Doctor needs more information
  | 'not_approved'             // Doctor declined
  | 'requires_consultation';   // Needs in-person consultation

export interface AdviceItem {
  id: string;
  text: string;
  summary: string;
  tags: string[];
  category: string;
  createdAt: Date;
  userId: string;
  approvalStatus: AdviceApprovalStatus;
  reviewHistory: AdviceReview[];
  urgencyLevel: 'low' | 'medium' | 'high';
  confidence: number; // AI confidence score 0-100
  evidenceLevel: 'strong' | 'moderate' | 'limited';
  medicationRelated?: string; // medication ID if related
}

export interface AdviceReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerCredentials: string;
  status: AdviceApprovalStatus;
  timestamp: Date;
  notes?: string;
  clinicalReasoning?: string;
  requestedActions?: string[];
  followUpRequired?: boolean;
  patientNotificationSent?: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  relatedAdvice?: string; // AdviceItem ID if generated from this message
}

export type UploadStatus = 'uploaded' | 'processing' | 'ready' | 'error';

export interface UploadItem {
  id: string;
  fileName: string;
  fileType: 'ecg' | 'lab' | 'photo';
  status: UploadStatus;
  uploadedAt: Date;
  processedAt?: Date;
  extractedData?: any;
  notes?: string;
  userId: string;
}

export interface PatientAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'spo2_low' | 'hrv_drop' | 'rhr_spike' | 'sleep_debt';
  severity: 'low' | 'medium' | 'high';
  message: string;
  value: number;
  threshold: number;
  createdAt: Date;
  acknowledged?: {
    by: string;
    at: Date;
  };
  resolved?: {
    by: string;
    at: Date;
  };
}

export interface PatientSummary {
  patientId: string;
  patientName: string;
  age: number;
  riskScore: RiskScore;
  lastSync: Date;
  flags: string[];
  summary: string; // LLM-generated narrative
  keyMetrics: {
    restingHR: number;
    hrv: number;
    spo2: number;
    sleepScore: number;
  };
}

export interface OnboardingData {
  demographics: {
    age: number;
    gender: string;
    height: number;
    weight: number;
  };
  medicalHistory: {
    conditions: string[];
    medications: string[];
    allergies: string[];
  };
  lifestyle: {
    activityLevel: string;
    smoker: boolean;
    alcohol: string;
    sleepHours: number;
  };
  symptoms: {
    current: string[];
    frequency: Record<string, string>;
  };
}

// Store types
export interface AppState {
  // Auth & Profile
  currentUser: UserProfile | null;
  currentRole: UserRole | null;

  // Onboarding
  onboardingData: Partial<OnboardingData>;
  onboardingStep: number;

  // Live Data
  liveMetrics: LiveMetrics | null;
  heartRateData: HeartRateData | null;
  hrvData: HRVData | null;
  restingHRForecast: RestingHRForecast | null;
  sleepData: SleepData | null;
  activityData: ActivityData | null;
  baselineComparison: BaselineComparison | null;
  riskScore: RiskScore | null;

  // Content
  insights: Insight[];
  doctors: Doctor[];
  medications: Medication[];
  doseLogs: DoseLog[];
  adviceItems: AdviceItem[];
  chatMessages: ChatMessage[];
  uploads: UploadItem[];

  // Doctor Dashboard
  patients: PatientSummary[];
  alerts: PatientAlert[];
  reviewQueue: (UploadItem | AdviceItem)[];

  // UI State
  isLoading: boolean;
  error: string | null;
}

export type AppActions = {
  // Auth
  setUser: (user: UserProfile | null) => void;
  setRole: (role: UserRole) => void;

  // Onboarding
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;

  // Live Data Updates
  updateLiveMetrics: (metrics: Partial<LiveMetrics>) => void;
  updateHeartRateData: (data: HeartRateData) => void;
  updateHRVData: (data: HRVData) => void;
  updateRestingHRForecast: (data: RestingHRForecast) => void;
  updateSleepData: (data: SleepData) => void;
  updateActivityData: (data: ActivityData) => void;
  updateBaselineComparison: (data: BaselineComparison) => void;
  updateRiskScore: (score: RiskScore) => void;

  // Content Management
  addInsight: (insight: Insight) => void;
  dismissInsight: (id: string) => void;
  addMedication: (medication: Medication) => void;
  updateMedication: (id: string, updates: Partial<Medication>) => void;
  logDose: (doseLog: DoseLog) => void;
  addAdviceItem: (advice: AdviceItem) => void;
  approveAdviceItem: (id: string, approver: { by: string; reviewerName: string }) => void;
  addChatMessage: (message: ChatMessage) => void;
  addUpload: (upload: UploadItem) => void;
  updateUploadStatus: (id: string, status: UploadStatus, extractedData?: any) => void;

  // Doctor Actions
  acknowledgeAlert: (id: string, by: string) => void;
  resolveAlert: (id: string, by: string) => void;
  updatePatientSummary: (patientId: string, updates: Partial<PatientSummary>) => void;

  // Utility
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetStore: () => void;
};