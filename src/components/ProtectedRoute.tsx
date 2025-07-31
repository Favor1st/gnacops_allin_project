import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "vendor" | "user";
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    if (requiredRole === "admin") return <Navigate to="/login" replace />;
    if (requiredRole === "vendor") return <Navigate to="/vendor-login" replace />;
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Optionally, redirect to a "not authorized" page
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
} 