import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DUMMY_CAREERS } from "../core/data";
import CustomButton from "../components/CustomButton";

export default function CareerSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione una Carrera</Text>

      {DUMMY_CAREERS.map(career => (
        <TouchableOpacity
          key={career.id}
          style={styles.card}
          onPress={() => navigation.navigate("Subjects", { career })}
        >
          <Text style={styles.text}>{career.name}</Text>
        </TouchableOpacity>
      ))}
        <CustomButton
          title="Cerrar Sesión"
          onPress={() => navigation.replace("Login")}
          style={{ backgroundColor: "#dc2626", marginTop: 20 }}
        />
    </View>
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
    marginBottom: 12,
    elevation: 4
  },
  text: { fontSize: 18, fontWeight: "600" }
});
