import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { DUMMY_STUDENTS } from "../core/data";

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
          : DUMMY_STUDENTS
            .filter(s => s.careerId === career.id)
            .map(s => ({ ...s, attendanceDates: [] }));

        results.push({ subject, studentsAttendance });
      }

      setReport(results);
    };

    loadReport();
  }, []);

  const calculateCareerAverage = () => {
    if (!report || report.length === 0) return 0;

    let totalPercentage = 0;
    let count = 0;

    report.forEach(r => {
      (r.studentsAttendance || []).forEach(student => {
        const attended = student.attendanceDates?.length || 0;
        const totalClasses = 1; // Puedes modificar si hay varias clases por materia
        const percent = totalClasses ? (attended / totalClasses) * 100 : 0;
        totalPercentage += percent;
        count++;
      });
    });

    return count ? (totalPercentage / count).toFixed(1) : 0;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informe de {career.name}</Text>

      {report.map(r => (
        <View key={r.subject.id} style={styles.subjectContainer}>
          <Text style={styles.subject}>{r.subject.name}</Text>

          {(r.studentsAttendance || []).map(student => {
            const attended = (student.attendanceDates || []).length;
            const totalClasses = 1; // o el número de clases que consideres
            const percentage = totalClasses ? ((attended / totalClasses) * 100).toFixed(1) : 0;

            return (
              <Text key={student.id} style={styles.student}>
                {student.name}: {percentage}% - Fechas: {(student.attendanceDates || []).length
                  ? student.attendanceDates.join(", ")
                  : "Sin asistencia"}
              </Text>
            );
          })}
        </View>
      ))}

      <Text style={styles.average}>Promedio General: {calculateCareerAverage()}%</Text>

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
  average: { marginTop: 20, fontSize: 22, fontWeight: "800" }
});
