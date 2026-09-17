export type StudentId = 'lucia' | 'pablo';

export interface Student {
  id: StudentId;
  name: string;
  course: string;
  avatar: string;
  tutor: string;
  classroom: string;
  academicYear: string;
  school: SchoolInfo;
}

export type MainSection =
  | 'inicio'
  | 'agenda'
  | 'comunicaciones'
  | 'facturacion'
  | 'calificaciones'
  | 'asistencia'
  | 'diarios'
  | 'documentos'
  | 'servicios'
  | 'configuracion';

export type ComunicacionesSubSection = 'notificaciones' | 'mensajes' | 'circulares';

export type ConfiguracionSubSection =
  | 'usuario'
  | 'centro'
  | 'idioma'
  | 'configurar_inicio';

export type AgendaViewMode = 'dia' | 'semana' | 'mes';

export type EventType =
  | 'clase'
  | 'examen'
  | 'evento'
  | 'reunion'
  | 'actividad'
  | 'otros';

export interface AgendaEvent {
  id: string;
  studentId: StudentId;
  title: string;
  type: EventType;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location?: string;
  teacher?: string;
  subject?: string;
  description?: string;
  homework?: string;
  dayOfWeek?: number; // 1 (Mon) to 7 (Sun) for recurring weekly schedule
}

export type NotificationCategory =
  | 'todas'
  | 'academicas'
  | 'asistencia'
  | 'administrativas'
  | 'comunicaciones'
  | 'facturacion'
  | 'servicios'
  | 'otras';

export interface NotificationItem {
  id: string;
  studentId?: StudentId | 'all';
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: MainSection;
  details?: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'doc' | 'image' | 'sheet';
  url?: string;
}

export interface MessageItem {
  id: string;
  sender: string;
  senderRole: string;
  recipient: string;
  date: string;
  time: string;
  text: string;
  attachments?: Attachment[];
}

export interface Conversation {
  id: string;
  studentId?: StudentId | 'all';
  subject: string;
  participant: string;
  participantRole: string;
  avatar: string;
  unread: boolean;
  important: boolean;
  archived: boolean;
  lastUpdated: string;
  messages: MessageItem[];
}

export interface Circular {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  summary: string;
  content: string;
  read: boolean;
  attachments?: Attachment[];
}

export type InvoiceStatus = 'pagada' | 'pendiente' | 'vencida' | 'anulada';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  concept: string;
  studentId: StudentId;
  studentName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  items: InvoiceItem[];
  paymentMethod?: string;
  paidAt?: string;
}

export type AttendanceType =
  | 'ausencia'
  | 'ausencia_justificada'
  | 'ausencia_sin_justificar'
  | 'retraso';

export interface AttendanceIncident {
  id: string;
  studentId: StudentId;
  date: string;
  time?: string;
  session?: string;
  subject: string;
  type: AttendanceType;
  status?: 'Justificada' | 'Pendiente de justificar' | 'Registrada';
  justified?: boolean;
  reason?: string;
  teacher?: string;
  comments?: string;
}

export type AttendanceRecord = AttendanceIncident;

export type EvaluationPeriod =
  | '1a_evaluacion'
  | '2a_evaluacion'
  | '3a_evaluacion'
  | 'extraordinaria';

export interface GradeBreakdownItem {
  concept: string;
  weight: number;
  score: number;
}

export interface SubjectGrade {
  id: string;
  subject: string;
  studentId: StudentId;
  teacher: string;
  score?: number;
  academicYear?: string;
  evaluation?: EvaluationPeriod;
  firstEvaluation: number | null; // 1ª Evaluación
  secondEvaluation: number | null; // 2ª Evaluación
  thirdEvaluation: number | null; // 3ª Evaluación
  extraordinaryEvaluation: number | null; // Extraordinaria — Septiembre
  observations?: string;
  breakdown?: GradeBreakdownItem[];
  competencies?: { name: string; score: number }[];
  historyScores?: { evalName: string; score: number }[];
}

export type GradeRecord = SubjectGrade;

export interface DiaryEntry {
  id: string;
  studentId: StudentId;
  date: string;
  subject: string;
  teacher: string;
  title?: string;
  content: string;
  homework?: string;
  behavior?: string;
  attachments?: Attachment[];
  badge?: string;
}

export type DailyDiary = DiaryEntry;

export type DocumentCategory =
  | 'todas'
  | 'autorizaciones'
  | 'justificantes'
  | 'informes'
  | 'documentos_centro'
  | 'formularios'
  | 'academicos'
  | 'administrativos'
  | 'boletines'
  | 'facturas'
  | 'circulares'
  | 'otros';

export interface SchoolDocument {
  id: string;
  name?: string;
  title?: string;
  category: DocumentCategory;
  date: string;
  studentId?: StudentId | 'all';
  studentName?: string;
  size: string;
  fileType: string;
  description?: string;
}

export type EducationalDocument = SchoolDocument;

export type ServiceType = 'comedor' | 'transporte' | 'extraescolar' | 'acogida' | 'otros';

export interface SchoolService {
  id: string;
  name: string;
  description: string;
  schedule?: string;
  price?: string;
  status?: 'Activo' | 'Disponible' | 'No disponible';
  active?: boolean;
  additionalInfo?: string;
  enrolledStudents?: StudentId[];
  category?: 'comedor' | 'transporte' | 'extraescolar' | 'acogida';
  type?: ServiceType;
  details?: {
    route?: string;
    stop?: string;
    days?: string;
    menu?: string;
    allergens?: string;
  };
}

export type EducationalService = SchoolService;

export type DashboardModuleId =
  | 'notificaciones'
  | 'mensajes'
  | 'circulares'
  | 'eventos_proximos'
  | 'proximas_clases'
  | 'ultima_factura'
  | 'graficas_asistencia';

export interface DashboardModuleConfig {
  id: DashboardModuleId;
  title: string;
  name?: string;
  description?: string;
  enabled: boolean;
}

export interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  documentId: string;
  notificationsEnabled: {
    email: boolean;
    sms: boolean;
    appPush: boolean;
    academicUpdates: boolean;
    invoices: boolean;
  };
}

export interface SchoolInfo {
  name: string;
  code: string;
  type?: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  officeHours: string;
  secretarySchedule: string;
  principal: string;
  headOfStudies: string;
  adminContact: string;
}
