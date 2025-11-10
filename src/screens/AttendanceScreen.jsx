import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import { DUMMY_STUDENTS } from "../core/data";

export default function AttendanceScreen({ selectedCareer, onGoBack }) {
  const [students, setStudents] = useState(
    DUMMY_STUDENTS.filter(s => s.careerId === selectedCareer.id)
  );

  const toggleAttendance = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, attendance: !s.attendance } : s));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Asistencia: {selectedCareer.name}</Text>

      {students.map(student => (
        <View key={student.id} style={[styles.card, { borderLeftColor: student.attendance ? "#22c55e" : "#eab308" }]}>
          <Text style={styles.name}>{student.name}</Text>

          <CustomButton
            title={student.attendance ? "Asistencia" : "Falta"}
            onPress={() => toggleAttendance(student.id)}
            style={{ backgroundColor: student.attendance ? "#22c55e" : "#eab308" }}
          />
        </View>
      ))}

      <CustomButton
        title="← Volver a Carreras"
        onPress={onGoBack}
        style={{ backgroundColor: "#475569", marginTop: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 20 },
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
    borderLeftWidth: 6,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
});