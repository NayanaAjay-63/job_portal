import { createContext, useContext, useState, useEffect } from "react";
import { users } from "../data/users";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("jp_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password, role) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user && user.role === role) {
      setCurrentUser(user);
      localStorage.setItem("jp_user", JSON.stringify(user));
      return { success: true, user };
    }
    // Demo: allow any login if credentials loosely match role
    const demoUser = users.find((u) => u.role === role);
    if (demoUser) {
      setCurrentUser(demoUser);
      localStorage.setItem("jp_user", JSON.stringify(demoUser));
      return { success: true, user: demoUser };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const register = (data) => {
    const newUser = {
      id: Date.now(),
      ...data,
      savedJobs: [],
      appliedJobs: [],
      profileCompletion: 30,
    };
    setCurrentUser(newUser);
    localStorage.setItem("jp_user", JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("jp_user");
  };

  const updateUser = (updates) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    localStorage.setItem("jp_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
