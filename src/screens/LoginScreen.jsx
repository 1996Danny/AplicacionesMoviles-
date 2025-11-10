import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      navigation.replace("Careers"); // Navega y no vuelve atrás
    } else {
      Alert.alert("Error", "Credenciales incorrectas. Usa admin / 123.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Usuario (admin)"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        secureTextEntry
        placeholder="Contraseña (123)"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <CustomButton title="Acceder" onPress={handleLogin} style={{ backgroundColor: "#2563eb" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
