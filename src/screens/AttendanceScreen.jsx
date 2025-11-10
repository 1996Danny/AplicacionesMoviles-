import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { DUMMY_STUDENTS } from "../core/data";

export default function AttendanceScreen({ route, navigation }) {
  const { career, subject } = route.params;

  const STORAGE_KEY = `attendance_${career.id}_${subject.id}`;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setStudents(JSON.parse(saved));
      } else {
        setStudents(
          DUMMY_STUDENTS
            .filter(s => s.careerId === career.id)
            .map(s => ({ ...s, attendance: false }))
        );
      }
    };
    load();
  }, []);

  const save = async (updated) => {
    setStudents(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const toggleAttendance = (id) => {
    save(students.map(s => s.id === id ? { ...s, attendance: !s.attendance } : s));
  };

  const attended = students.filter(s => s.attendance).length;
  const percentage = students.length ? ((attended / students.length) * 100).toFixed(1) : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{subject.name}</Text>
      <Text style={styles.subtitle}>Carrera: {career.name}</Text>
      <Text style={styles.percent}>Asistencia: {percentage}%</Text>

      {students.map(s => (
        <View key={s.id} style={[styles.card, { borderLeftColor: s.attendance ? "#22c55e" : "#eab308" }]}>
          <Text style={styles.name}>{s.name}</Text>
          <CustomButton
            title={s.attendance ? "Asistencia" : "Falta"}
            onPress={() => toggleAttendance(s.id)}
            style={{ backgroundColor: s.attendance ? "#22c55e" : "#eab308" }}
          />
        </View>
      ))}

      <CustomButton
        title="← Volver a Materias"
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: "#475569", marginTop: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "800" },
  subtitle: { fontSize: 16, marginBottom: 10 },
  percent: { fontSize: 20, fontWeight: "600", marginBottom: 16 },
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
    borderLeftWidth: 6,
    marginBottom: 12
  },
  name: { fontSize: 18, fontWeight: "600", marginBottom: 8 }
});
