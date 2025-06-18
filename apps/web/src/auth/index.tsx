import type { JSX } from 'react';
import { createContext, useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import { useLocalStorage } from '../common/hooks';

type AuthContextType<T> = {
  user?: T;
  isAuthenticated: boolean;
  signIn: (data: { user: T }) => void;
  signOut: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<AuthContextType<any> | undefined>(undefined);

export type AuthProviderProps<T> = {
  children: React.ReactNode;
  initialState?: T;
};

export function AuthProvider<T>({
  children,
  initialState = undefined,
}: AuthProviderProps<T>) {
  const [user, setUser] = useLocalStorage<T | undefined>('user', initialState);

  const signIn: AuthContextType<T>['signIn'] = (data) => {
    setUser(data.user);
  };

  const signOut = () => {
    setUser(undefined);
  };

  useEffect(() => {
    // auto sign out when session expired
    window.addEventListener('auth:signout', signOut);
    return () => {
      window.removeEventListener('auth:signout', signOut);
    };
  }, []);

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

function useAuthContext<T>(): AuthContextType<T> {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider is missing in the React componenttree');
  }
  return context;
}

export function useSignIn<T>(): AuthContextType<T>['signIn'] {
  return useAuthContext<T>().signIn;
}

export function useSignOut() {
  return useAuthContext().signOut;
}

export function useAuthUser<T>(): AuthContextType<T>['user'] {
  return useAuthContext<T>().user;
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
