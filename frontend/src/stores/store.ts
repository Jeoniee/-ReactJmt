import { create } from 'zustand';

/**
 * zustand를 이용해서 전역 상태를 관리한다.
 * */

interface AuthState {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    errorMessage: string;
    setErrorMessage: (errorMessage: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    username: '',
    setUsername: (username) => set({ username }),
    password: '',
    setPassword: (password) => set({ password }),
    errorMessage: '',
    setErrorMessage: (errorMessage) => set({ errorMessage }),
}));
