import { create } from 'zustand';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  phone: string | null;
  role: string;
  plan: string;
  language: string;
}

interface AuthState {
  profile: UserProfile | null;
  isLoaded: boolean;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  isLoaded: false,
  setProfile: (profile) => set({ profile, isLoaded: true }),
  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    })),
  reset: () => set({ profile: null, isLoaded: false }),
}));
