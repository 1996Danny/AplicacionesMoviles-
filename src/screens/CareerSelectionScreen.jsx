import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import { DUMMY_CAREERS } from "../core/data";

export default function CareerSelectionScreen({ onSelectCareer, onLogout }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecciona una Carrera</Text>

      {DUMMY_CAREERS.map(career => (
        <TouchableOpacity
          key={career.id}
          style={styles.card}
          onPress={() => onSelectCareer(career)}
        >
          <Text style={styles.careerText}>{career.name}</Text>
        </TouchableOpacity>
      ))}

      <CustomButton
        title="Cerrar Sesión"
        onPress={onLogout}
        style={{ backgroundColor: "#dc2626", marginTop: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 20 },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 12,
  },
  careerText: { fontSize: 18, fontWeight: "600" },
});