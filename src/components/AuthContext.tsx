import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Possible roles: "admin", "vendor", "user"
const defaultAuth = {
  user: null,
  role: null,
  isAuthenticated: false,
  login: (role: string) => {},
  logout: () => {},
  register: (role: string) => {},
};

const AuthContext = createContext(defaultAuth);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (role: string) => {
    setUser("demo");
    setRole(role);
    setIsAuthenticated(true);
    localStorage.setItem("user", "demo");
    localStorage.setItem("role", role);
  };

  const register = (role: string) => {
    login(role);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
} 