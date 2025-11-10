import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
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
            .map(s => ({ ...s, attendanceDates: [] }))
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
    const today = new Date().toISOString().slice(0, 10);
    const updated = students.map(s => {
      if (s.id === id) {
        const hasAttendedToday = s.attendanceDates.includes(today);
        return {
          ...s,
          attendanceDates: hasAttendedToday
            ? s.attendanceDates.filter(d => d !== today)
            : [...s.attendanceDates, today] 
        };
      }
      return s;
    });
    save(updated);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{subject.name}</Text>
      <Text style={styles.subtitle}>Carrera: {career.name}</Text>

      {students.map(s => {
        const percentage = s.attendanceDates.length
          ? ((s.attendanceDates.length / 1) * 100).toFixed(1)
          : 0;
        return (
          <View key={s.id} style={[styles.card, { borderLeftColor: s.attendanceDates.length ? "#22c55e" : "#eab308" }]}>
            <Text style={styles.name}>{s.name} - {percentage}%</Text>
            <Text style={styles.dates}>
              {s.attendanceDates.length
                ? s.attendanceDates.join(", ")
                : "Sin asistencia"}
            </Text>
            <CustomButton
              title={s.attendanceDates.includes(new Date().toISOString().slice(0, 10)) ? "Asistencia Hoy" : "Falta Hoy"}
              onPress={() => toggleAttendance(s.id)}
              style={{ backgroundColor: s.attendanceDates.length ? "#22c55e" : "#eab308" }}
            />
          </View>
        );
      })}

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
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
    borderLeftWidth: 6,
    marginBottom: 12
  },
  name: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  dates: { fontSize: 14, color: "#555", marginBottom: 8 }
});
