import React, { createContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const TOKEN = 'token';
const REFRESH_TOKEN = 'refreshToken';
const AUTH_INFO = 'auth';

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const token = localStorage.getItem(TOKEN);
    const auth = localStorage.getItem(AUTH_INFO);

    setAuthState({
      token: token ? JSON.parse(token) : {},
      refreshToken: refreshToken ? JSON.parse(refreshToken) : {},
      auth: auth ? JSON.parse(auth) : {},
    });
  }, []);

  const logout = () => {
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(AUTH_INFO);
    setAuthState({});
    history.push('/auth/login');
  };

  const setAuthInfo = ({ auth, token, refreshToken }) => {
    localStorage.setItem(AUTH_INFO, JSON.stringify(auth));
    localStorage.setItem(TOKEN, JSON.stringify(token));
    localStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken));

    setAuthState({
      token,
      refreshToken,
      auth,
    });
  };

  const isAuthenticated = () => {
    if (
      !authState.token ||
      !authState.token.token ||
      !authState.token.expiredAt
    ) {
      return false;
    }
    return true;
  };

  const isExpired = () => {
    if (
      authState.token &&
      authState.token.token &&
      authState.token.expiredAt &&
      new Date().getTime() > new Date(authState.token.expiredAt).getTime()
    ) {
      logout();
      return true;
    }
    return false;
  };

  return (
    <Provider
      value={{
        logout,
        authState,
        isAuthenticated,
        isExpired,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, AuthContext };
