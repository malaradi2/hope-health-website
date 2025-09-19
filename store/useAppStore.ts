'use client';

import React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, AppActions, UserRole, UserProfile } from '../lib/types';
import { initializeMockData, startLiveUpdates, clearAllIntervals } from '../lib/mock';
import { generateId } from '../lib/utils';

const initialState: Omit<AppState, keyof AppActions> = {
  // Auth & Profile
  currentUser: null,
  currentRole: null,

  // Onboarding
  onboardingData: {},
  onboardingStep: 0,

  // Live Data
  liveMetrics: null,
  heartRateData: null,
  hrvData: null,
  restingHRForecast: null,
  sleepData: null,
  activityData: null,
  baselineComparison: null,
  riskScore: null,

  // Content
  insights: [],
  doctors: [],
  medications: [],
  doseLogs: [],
  adviceItems: [],
  chatMessages: [],
  uploads: [],

  // Doctor Dashboard
  patients: [],
  alerts: [],
  reviewQueue: [],

  // UI State
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Auth Actions
      setUser: (user) => {
        set({ currentUser: user });
        if (user) {
          // Initialize data when user is set
          const mockData = initializeMockData();
          set({
            insights: mockData.insights,
            doctors: mockData.doctors,
            medications: mockData.medications,
            adviceItems: mockData.adviceItems,
            uploads: mockData.uploads,
            alerts: mockData.alerts,
            patients: mockData.patients,
            liveMetrics: mockData.liveMetrics,
            heartRateData: mockData.heartRateData,
            hrvData: mockData.hrvData,
            restingHRForecast: mockData.restingHRForecast,
            sleepData: mockData.sleepData,
            activityData: mockData.activityData,
            baselineComparison: mockData.baselineComparison,
            riskScore: mockData.riskScore,
          });

          // Start live metric updates for user role
          if (user.role === 'user') {
            startLiveUpdates((metrics) => {
              set({ liveMetrics: metrics });
            });
          }
        } else {
          // Clear intervals when user logs out
          clearAllIntervals();
        }
      },

      setRole: (role) => set({ currentRole: role }),

      // Onboarding Actions
      updateOnboardingData: (data) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data },
        })),

      setOnboardingStep: (step) => set({ onboardingStep: step }),

      completeOnboarding: () =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, onboardingCompleted: true }
            : null,
          onboardingStep: 0,
        })),

      // Live Data Updates
      updateLiveMetrics: (metrics) =>
        set((state) => ({
          liveMetrics: state.liveMetrics
            ? { ...state.liveMetrics, ...metrics }
            : null,
        })),

      updateHeartRateData: (data) => set({ heartRateData: data }),
      updateHRVData: (data) => set({ hrvData: data }),
      updateRestingHRForecast: (data) => set({ restingHRForecast: data }),
      updateSleepData: (data) => set({ sleepData: data }),
      updateActivityData: (data) => set({ activityData: data }),
      updateBaselineComparison: (data) => set({ baselineComparison: data }),
      updateRiskScore: (score) => set({ riskScore: score }),

      // Content Management
      addInsight: (insight) =>
        set((state) => ({
          insights: [insight, ...state.insights],
        })),

      dismissInsight: (id) =>
        set((state) => ({
          insights: state.insights.map((insight) =>
            insight.id === id ? { ...insight, dismissed: true } : insight
          ),
        })),

      addMedication: (medication) =>
        set((state) => ({
          medications: [...state.medications, medication],
        })),

      updateMedication: (id, updates) =>
        set((state) => ({
          medications: state.medications.map((med) =>
            med.id === id ? { ...med, ...updates } : med
          ),
        })),

      logDose: (doseLog) =>
        set((state) => ({
          doseLogs: [...state.doseLogs, doseLog],
          medications: state.medications.map((med) =>
            med.id === doseLog.medicationId
              ? { ...med, adherence: [...med.adherence, doseLog] }
              : med
          ),
        })),

      addAdviceItem: (advice) =>
        set((state) => ({
          adviceItems: [advice, ...state.adviceItems],
          reviewQueue: [advice, ...state.reviewQueue],
        })),

      approveAdviceItem: (id, approver) =>
        set((state) => ({
          adviceItems: state.adviceItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  approved: {
                    by: approver.by,
                    at: new Date(),
                    reviewerName: approver.reviewerName,
                  },
                }
              : item
          ),
          reviewQueue: state.reviewQueue.filter((item) => {
            if ('approved' in item) {
              return item.id !== id;
            }
            return true;
          }),
        })),

      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, message],
        })),

      addUpload: (upload) =>
        set((state) => ({
          uploads: [upload, ...state.uploads],
          reviewQueue: [upload, ...state.reviewQueue],
        })),

      updateUploadStatus: (id, status, extractedData) =>
        set((state) => ({
          uploads: state.uploads.map((upload) =>
            upload.id === id
              ? {
                  ...upload,
                  status,
                  processedAt: status === 'ready' ? new Date() : upload.processedAt,
                  extractedData: extractedData || upload.extractedData,
                }
              : upload
          ),
        })),

      // Doctor Actions
      acknowledgeAlert: (id, by) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id
              ? { ...alert, acknowledged: { by, at: new Date() } }
              : alert
          ),
        })),

      resolveAlert: (id, by) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id
              ? { ...alert, resolved: { by, at: new Date() } }
              : alert
          ),
        })),

      updatePatientSummary: (patientId, updates) =>
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.patientId === patientId
              ? { ...patient, ...updates }
              : patient
          ),
        })),

      // Utility
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      resetStore: () => {
        clearAllIntervals();
        set(initialState);
      },
    }),
    {
      name: 'hope-app-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Return a no-op storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        // Only persist essential user data, not live metrics
        currentUser: state.currentUser,
        currentRole: state.currentRole,
        onboardingData: state.onboardingData,
        onboardingStep: state.onboardingStep,
        medications: state.medications,
        adviceItems: state.adviceItems,
        chatMessages: state.chatMessages,
        uploads: state.uploads,
      }),
    }
  )
);

// Hook to check if store is hydrated (useful for SSR)
export const useStoreHydrated = () => {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};

// Utility hooks for common selectors
export const useCurrentUser = () => useAppStore((state) => state.currentUser);
export const useCurrentRole = () => useAppStore((state) => state.currentRole);
export const useLiveMetrics = () => useAppStore((state) => state.liveMetrics);
export const useRiskScore = () => useAppStore((state) => state.riskScore);
export const useAdviceItems = () => useAppStore((state) => state.adviceItems);
export const useMedications = () => useAppStore((state) => state.medications);
export const usePatients = () => useAppStore((state) => state.patients);
export const useAlerts = () => useAppStore((state) => state.alerts);
export const useReviewQueue = () => useAppStore((state) => state.reviewQueue);