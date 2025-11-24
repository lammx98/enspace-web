/**
 * Example: Using Auth Store with Zustand
 * 
 * This file demonstrates different ways to use the auth store
 */

'use client';

import { useUser, useIsAuthenticated, useAuthActions } from '@/hooks/use-auth';
import { useAuth } from '@/contexts/auth-context';

// ============================================================
// Example 1: Using Zustand hooks (Recommended)
// ============================================================

export function UserProfile() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const { logout } = useAuthActions();

  if (!isAuthenticated || !user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex items-center gap-4">
      {user.pictureUrl && (
        <img
          src={user.pictureUrl}
          alt={user.fullName}
          className="w-10 h-10 rounded-full"
        />
      )}
      <div>
        <p className="font-semibold">{user.fullName}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}

// ============================================================
// Example 2: Using Context (Backward compatible)
// ============================================================

export function UserProfileLegacy() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex items-center gap-4">
      <p>Welcome, {user.fullName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// ============================================================
// Example 3: Login form
// ============================================================

export function LoginForm() {
  const { login } = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      // Will auto navigate to home page after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
    </form>
  );
}

// ============================================================
// Example 4: Protected component
// ============================================================

export function ProtectedContent() {
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  if (!isAuthenticated) {
    return <div>Please login to view this content</div>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Only {user?.fullName} can see this!</p>
    </div>
  );
}

// ============================================================
// Example 5: Accessing store outside React components
// ============================================================

import { useAuthStore } from '@/stores/auth-store';

export async function apiCall() {
  // Get token from store
  const token = useAuthStore.getState().accessToken;
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch('/api/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

// ============================================================
// Example 6: Subscribe to auth changes
// ============================================================

export function setupAuthListener() {
  const unsubscribe = useAuthStore.subscribe(
    (state, prevState) => {
      // This runs whenever auth state changes
      if (state.isAuthenticated !== prevState.isAuthenticated) {
        console.log('Auth status changed:', state.isAuthenticated);
      }
      
      if (state.user !== prevState.user) {
        console.log('User changed:', state.user);
      }
    }
  );

  // Call unsubscribe() when you want to stop listening
  return unsubscribe;
}

// ============================================================
// Example 7: Selective re-renders for performance
// ============================================================

export function OptimizedUserEmail() {
  // Only re-renders when email changes, not when other user fields change
  const email = useAuthStore((state) => state.user?.email);
  
  return <div>Email: {email}</div>;
}

export function OptimizedUserName() {
  // Only re-renders when fullName changes
  const fullName = useAuthStore((state) => state.user?.fullName);
  
  return <div>Name: {fullName}</div>;
}

// These two components won't re-render each other!
// If only email changes, only OptimizedUserEmail re-renders
// If only fullName changes, only OptimizedUserName re-renders

import { useState } from 'react';
