import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DUMMY_STUDENTS } from "../core/data";
import CustomButton from "../components/CustomButton";

export default function ReportScreen({ route, navigation }) {
  const { career } = route.params;
  const [report, setReport] = useState([]);

  useEffect(() => {
    const loadReport = async () => {
      const results = [];

      for (const subject of career.subjects) {
        const key = `attendance_${career.id}_${subject.id}`;
        const saved = await AsyncStorage.getItem(key);
        const studentsAttendance = saved
          ? JSON.parse(saved)
          : DUMMY_STUDENTS.filter(s => s.careerId === career.id)
            .map(s => ({ ...s, attendanceDates: [] }));

        results.push({ subject, studentsAttendance });
      }

      setReport(results);
    };

    loadReport();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informe de {career.name}</Text>

      {report.map(r => (
        <View key={r.subject.id} style={styles.subjectContainer}>
          <Text style={styles.subject}>{r.subject.name}</Text>
          {r.studentsAttendance.map(student => {
            const totalClasses = r.studentsAttendance.length;
            const attendedClasses = student.attendanceDates.length;
            const percentage = totalClasses ? ((attendedClasses / 1) * 100).toFixed(1) : 0;
            return (
              <Text key={student.id} style={styles.student}>
                {student.name}: {percentage}% - Fechas: {student.attendanceDates.length ? student.attendanceDates.join(", ") : "Sin asistencia"}
              </Text>
            );
          })}
        </View>
      ))}

      <CustomButton
        title="← Volver"
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: "#475569", marginTop: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "flex-start" },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 20 },
  subjectContainer: { marginBottom: 20 },
  subject: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  student: { fontSize: 16, marginLeft: 10, marginBottom: 4 },
});