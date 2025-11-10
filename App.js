import React, { useState } from "react";
import LoginScreen from "./src/screens/LoginScreen";
import CareerSelectionScreen from "./src/screens/CareerSelectionScreen";
import AttendanceScreen from "./src/screens/AttendanceScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [current, setCurrent] = useState("Login");
  const [selectedCareer, setSelectedCareer] = useState(null);

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setCurrent("Careers");
        }}
      />
    );
  }

  if (current === "Careers") {
    return (
      <CareerSelectionScreen
        onSelectCareer={(career) => {
          setSelectedCareer(career);
          setCurrent("Attendance");
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          setSelectedCareer(null);
          setCurrent("Login");
        }}
      />
    );
  }

  if (current === "Attendance") {
    // Evitar el crash si algo quedó en null
    if (!selectedCareer) {
      setCurrent("Careers");
      return null;
    }

    return (
      <AttendanceScreen
        selectedCareer={selectedCareer}
        onGoBack={() => {
          setSelectedCareer(null);
          setCurrent("Careers");
        }}
      />
    );
  }

  return null;
}