import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

export default function SubjectSelectionScreen({ route, navigation }) {
  const { career } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materias de {career.name}</Text>

      {career.subjects.map(subject => (
        <TouchableOpacity
          key={subject.id}
          style={styles.card}
          onPress={() => navigation.navigate("Attendance", { career, subject })}
        >
          <Text style={styles.text}>{subject.name}</Text>
        </TouchableOpacity>
      ))}

      <CustomButton
        title="Ver Informe de la Carrera"
        onPress={() => navigation.navigate("Report", { career })}
        style={{ backgroundColor: "#3b82f6", marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 20 },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 12
  },
  text: { fontSize: 18, fontWeight: "600" }
});
