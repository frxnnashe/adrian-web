import { buildWhatsAppUrl } from "@/lib/contact";

export const whatsappMessage =
  "Hola Adrián, quisiera solicitar un turno y conocer la modalidad de atención más adecuada para mí.";

export const whatsappUrl = buildWhatsAppUrl(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  whatsappMessage,
);

export const contactDetails = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS ?? "",
  hours: process.env.NEXT_PUBLIC_OFFICE_HOURS ?? "",
};

export const navItems = [
  { label: "Enfoque", href: "#enfoque" },
  { label: "Servicios", href: "#servicios" },
  { label: "Formación", href: "#formacion" },
  { label: "Preguntas", href: "#preguntas" },
];

export const careSettings = [
  {
    title: "UTI",
    description: "Comprender el punto de partida y el proceso de recuperación.",
  },
  {
    title: "Consultorio",
    description: "Evaluar, entrenar y acompañar con un plan personalizado.",
  },
  {
    title: "Domicilio",
    description: "Sostener los cuidados y la autonomía en el entorno cotidiano.",
  },
];

export type ServiceIcon =
  | "rehabilitation"
  | "airway"
  | "neuromuscular"
  | "ventilation"
  | "surgery"
  | "telehealth";

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  points: string[];
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    id: "rehabilitacion-respiratoria",
    title: "Rehabilitación respiratoria",
    shortTitle: "Rehabilitación",
    description:
      "Un programa personalizado para personas con enfermedades respiratorias crónicas, disnea o cansancio durante las actividades cotidianas.",
    points: [
      "Entrenamiento muscular aeróbico y de fuerza",
      "Educación sobre la enfermedad",
      "Pautas de autocuidado para la vida diaria",
    ],
    icon: "rehabilitation",
  },
  {
    id: "fisioterapia-respiratoria",
    title: "Kinesiología y fisioterapia respiratoria",
    shortTitle: "Higiene bronquial",
    description:
      "Abordaje para procesos respiratorios con aumento de secreciones o dificultad para eliminarlas, orientado a optimizar la higiene bronquial.",
    points: [
      "Técnicas respiratorias personalizadas",
      "Uso de dispositivos para movilizar secreciones",
      "Educación práctica para sostener el tratamiento",
    ],
    icon: "airway",
  },
  {
    id: "enfermedades-neuromusculares",
    title: "Enfermedades neuromusculares",
    shortTitle: "Neuromuscular",
    description:
      "Atención adaptada a la trayectoria de cada patología para preservar la función pulmonar y prevenir complicaciones respiratorias.",
    points: [
      "Evaluación del equipamiento respiratorio",
      "Asistencia kinésica personalizada",
      "Acompañamiento al paciente y su entorno familiar",
    ],
    icon: "neuromuscular",
  },
  {
    id: "vni-oxigenoterapia",
    title: "Ventilación no invasiva y oxigenoterapia",
    shortTitle: "VNI y oxígeno",
    description:
      "Asesoramiento integral para implementar y sostener el tratamiento con ventilación no invasiva u oxigenoterapia crónica domiciliaria.",
    points: [
      "Puesta en marcha y adaptación a los equipos",
      "Monitoreo del uso de VNI y dispositivos de oxígeno",
      "Entrenamiento práctico para el paciente y la familia",
    ],
    icon: "ventilation",
  },
  {
    id: "rehabilitacion-quirurgica",
    title: "Rehabilitación pre y postquirúrgica",
    shortTitle: "Cirugía",
    description:
      "Preparación y recuperación para personas que afrontarán o atravesaron cirugías cardíacas, torácicas o abdominales.",
    points: [
      "Optimización pulmonar previa a la cirugía",
      "Prevención de complicaciones respiratorias",
      "Atención de pacientes con riesgo quirúrgico",
    ],
    icon: "surgery",
  },
  {
    id: "telerehabilitacion",
    title: "Telerehabilitación y teleconsulta",
    shortTitle: "A distancia",
    description:
      "Atención y seguimiento kinésico por videollamada para quienes necesitan continuidad desde su hogar.",
    points: [
      "Consulta y supervisión a distancia",
      "Seguimiento periódico del tratamiento",
      "Alternativa para personas con movilidad reducida",
    ],
    icon: "telehealth",
  },
];

export const education = [
  {
    year: "2024",
    title: "Ventilación mecánica prolongada y rehabilitación",
    institution: "Instituto Universitario Hospital Italiano de Buenos Aires",
  },
  {
    year: "2018",
    title: "Desvinculación de la presión positiva y decanulación",
    institution: "Sociedad Argentina de Kinesiología Cardiorrespiratoria",
  },
  {
    year: "2017",
    title: "Pruebas funcionales respiratorias",
    institution: "Asociación Argentina de Medicina Respiratoria",
  },
  {
    year: "2013",
    title: "Rehabilitación neurológica, vía aérea y deglución",
    institution: "Fundación Rosarina de Neurorehabilitación",
  },
  {
    year: "2005",
    title: "Curso teórico-práctico de espirometría",
    institution: "Asociación Argentina de Medicina Respiratoria",
  },
];

export const faqs = [
  {
    question: "¿En qué modalidades se realiza la atención?",
    answer:
      "La atención puede organizarse en consultorio, en el domicilio o a distancia mediante teleconsulta y telerehabilitación, según cada necesidad.",
  },
  {
    question: "¿La rehabilitación se adapta a cada persona?",
    answer:
      "Sí. La evaluación considera la situación clínica, la capacidad funcional, los síntomas y los objetivos cotidianos para definir un plan individual.",
  },
  {
    question: "¿Se acompaña a familiares y cuidadores?",
    answer:
      "Cuando el tratamiento lo requiere, se brinda educación práctica para que el paciente y su entorno puedan sostener los cuidados con mayor seguridad.",
  },
  {
    question: "¿Cómo puedo consultar por un turno?",
    answer:
      "Podés iniciar la conversación por WhatsApp. Allí se coordina la modalidad y se solicitan los datos necesarios para orientar la consulta.",
  },
];
