import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { DUMMY_STUDENTS } from "../core/data";

export default function ReportScreen({ route, navigation }) {
  const { career } = route.params;
  const [report, setReport] = useState([]);

  useEffect(() => {
    const load = async () => {
      const results = [];

      for (const subject of career.subjects) {
        const key = `attendance_${career.id}_${subject.id}`;
        const saved = await AsyncStorage.getItem(key);

        let students = saved
          ? JSON.parse(saved)
          : DUMMY_STUDENTS.filter(s => s.careerId === career.id).map(s => ({ ...s, attendance: false }));

        const attended = students.filter(s => s.attendance).length;
        const percent = students.length ? (attended / students.length) * 100 : 0;

        results.push({ subject, percent: percent.toFixed(1) });
      }

      setReport(results);
    };

    load();
  }, []);

  const average = report.length
    ? (report.reduce((sum, r) => sum + parseFloat(r.percent), 0) / report.length).toFixed(1)
    : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informe de {career.name}</Text>

      {report.map(r => (
        <View key={r.subject.id} style={styles.card}>
          <Text style={styles.subject}>{r.subject.name}</Text>
          <Text style={styles.percent}>{r.percent}%</Text>
        </View>
      ))}

      <Text style={styles.average}>Promedio General: {average}%</Text>

      <CustomButton
        title="← Volver"
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: "#475569", marginTop: 20 }}
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
    backgroundColor: "#fff",
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  subject: { fontSize: 18, fontWeight: "600" },
  percent: { fontSize: 18, fontWeight: "700" },
  average: { marginTop: 20, fontSize: 22, fontWeight: "800" }
});
