import type { JSX } from 'react';
import { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router';

type AuthContextType<T = unknown> = {
  user: T | null;
  isAuthenticated: boolean;
  signIn: (data: { user: T }) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<unknown>(null);

  const signIn: AuthContextType['signIn'] = (data) => {
    setUser(data.user);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider is missing in the React componenttree');
  }
  return context;
}

export function useSignIn<T>(): AuthContextType<T>['signIn'] {
  return useAuthContext().signIn;
}

export function useSignOut() {
  return useAuthContext().signOut;
}

export function useAuthUser() {
  return useAuthContext().user;
}

export function useIsAuthenticated() {
  return useAuthContext().isAuthenticated;
}

export function requireAuth<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>,
  options: {
    fallbackPath?: string;
  } = {},
) {
  if (options.fallbackPath === undefined) {
    throw new Error('fallbackPath is required in requireAuth');
  }
  const signInRoute = options.fallbackPath;

  function ProtectedComponent(props: T) {
    const isAuthenticated = useIsAuthenticated();
    if (!isAuthenticated) {
      return <Navigate to={signInRoute} />;
    }
    return <Component {...props} />;
  }

  // set friendly component name in devtools
  ProtectedComponent.displayName = `requireAuth(${
    (Component.displayName ?? Component.name) || 'Component'
  })`;
  return ProtectedComponent;
}
