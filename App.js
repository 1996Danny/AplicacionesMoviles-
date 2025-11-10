import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import CareerSelectionScreen from "./src/screens/CareerSelectionScreen";
import SubjectSelectionScreen from "./src/screens/SubjectSelectionScreen";
import AttendanceScreen from "./src/screens/AttendanceScreen";
import ReportScreen from "./src/screens/ReportScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Iniciar Sesión" }} />
        <Stack.Screen name="Careers" component={CareerSelectionScreen} options={{ title: "Carreras" }} />
        <Stack.Screen name="Subjects" component={SubjectSelectionScreen} options={{ title: "Materias" }} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} options={{ title: "Asistencia" }} />
        <Stack.Screen name="Report" component={ReportScreen} options={{ title: "Informe" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
