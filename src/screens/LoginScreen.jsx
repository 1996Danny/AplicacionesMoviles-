import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleLogin = () => {
    setFeedback("");
    if (username === "admin" && password === "123") {
      setFeedback("✅ Inicio de sesión exitoso");
      setTimeout(onLoginSuccess, 1000);
    } else {
      setFeedback("❌ Credenciales incorrectas (usa admin / 123)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

        <TextInput
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <CustomButton
          title="Acceder"
          onPress={handleLogin}
          style={{ backgroundColor: "#2563eb" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#eee" },
  box: { backgroundColor: "#fff", padding: 24, borderRadius: 12, elevation: 6 },
  title: { fontSize: 28, fontWeight: "800", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  feedback: { textAlign: "center", marginBottom: 14, fontWeight: "600" },
});