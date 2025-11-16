'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { pb } from './pocketbase';

interface AuthUser {
  id: string;
  email: string;
  username: string;
  balance: number;
  created: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pb.authStore.isValid) {
          const userData = pb.authStore.record as AuthUser;
          setUser(userData);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      setUser(authData.record as AuthUser);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur de connexion');
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const newUser = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        username,
        balance: 1000,
      });

      const authData = await pb.collection('users').authWithPassword(email, password);
      setUser(authData.record as AuthUser);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    }
  };

  const logout = async () => {
    try {
      pb.authStore.clear();
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
