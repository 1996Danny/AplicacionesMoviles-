export const DUMMY_CAREERS = [
  {
    id: 1,
    name: "Ingeniería en Sistemas",
    subjects: [
      { id: 101, name: "Algoritmos" },
      { id: 102, name: "Arquitectura de Computadoras" },
      { id: 103, name: "Base de Datos" }
    ]
  },
  {
    id: 2,
    name: "Profesorado en Matemática",
    subjects: [
      { id: 201, name: "Análisis Matemático" },
      { id: 202, name: "Álgebra Lineal" },
      { id: 203, name: "Fundamentos de la Educación" }
    ]
  }
];

export const DUMMY_STUDENTS = [
  { id: 1, name: "Juan Pérez", careerId: 1 },
  { id: 2, name: "Ana Torres", careerId: 1 },
  { id: 3, name: "Carlos Gómez", careerId: 2 },
];