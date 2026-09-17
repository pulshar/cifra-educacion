import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Student,
  StudentId,
  MainSection,
  ComunicacionesSubSection,
  ConfiguracionSubSection,
  AgendaEvent,
  NotificationItem,
  Conversation,
  Circular,
  Invoice,
  SubjectGrade,
  AttendanceIncident,
  DiaryEntry,
  SchoolDocument,
  SchoolService,
  DashboardModuleConfig,
  DashboardModuleId,
  UserProfile,
  SchoolInfo,
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_USER,
  INITIAL_SCHOOL,
  DEFAULT_DASHBOARD_MODULES,
  INITIAL_NOTIFICATIONS,
  INITIAL_CONVERSATIONS,
  INITIAL_CIRCULARES,
  INITIAL_INVOICES,
  INITIAL_GRADES,
  INITIAL_ATTENDANCE,
  INITIAL_AGENDA_EVENTS,
  INITIAL_DIARIES,
  INITIAL_DOCUMENTS,
  INITIAL_SERVICES,
} from '../data/mockData';
import { TRANSLATIONS, Language } from '../translations';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title?: string;
  message: string;
}

export interface ModalConfig {
  type:
  | 'notification_detail'
  | 'invoice_detail'
  | 'event_detail'
  | 'subject_detail'
  | 'circular_detail'
  | 'document_preview'
  | 'incident_detail'
  | 'new_message'
  | 'service_detail'
  | 'school_detail'
  | 'terms_conditions'
  | 'forgot_password'
  | null;
  data?: any;
}

interface AppContextType {
  // Authentication
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  loginDemo: (provider?: string) => void;
  logout: () => void;

  // Navigation & Student Selection
  activeSection: MainSection;
  setActiveSection: (section: MainSection) => void;
  comunicacionesSubSection: ComunicacionesSubSection;
  setComunicacionesSubSection: (sub: ComunicacionesSubSection) => void;
  configuracionSubSection: ConfiguracionSubSection;
  setConfiguracionSubSection: (sub: ConfiguracionSubSection) => void;
  navigateTo: (
    section: MainSection,
    subSection?: ComunicacionesSubSection | ConfiguracionSubSection
  ) => void;
  students: Student[];
  currentStudentId: StudentId;
  setCurrentStudentId: (id: StudentId) => void;
  currentStudent: Student;

  // Data
  notifications: NotificationItem[];
  studentNotifications: NotificationItem[];
  unreadNotificationsCount: number;
  conversations: Conversation[];
  studentConversations: Conversation[];
  unreadMessagesCount: number;
  circulares: Circular[];
  unreadCircularesCount: number;
  invoices: Invoice[];
  studentInvoices: Invoice[];
  grades: SubjectGrade[];
  studentGrades: SubjectGrade[];
  attendance: AttendanceIncident[];
  studentAttendance: AttendanceIncident[];
  agendaEvents: AgendaEvent[];
  studentAgendaEvents: AgendaEvent[];
  diaries: DiaryEntry[];
  studentDiaries: DiaryEntry[];
  documents: SchoolDocument[];
  studentDocuments: SchoolDocument[];
  services: SchoolService[];
  userProfile: UserProfile;
  schoolInfo: SchoolInfo;

  // Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  toggleConversationImportant: (id: string) => void;
  archiveConversation: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  createNewMessage: (participantRole: string, subject: string, text: string) => void;
  markCircularAsRead: (id: string) => void;
  toggleServiceEnrollment: (serviceId: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Dashboard configuration
  dashboardModules: DashboardModuleConfig[];
  setDashboardModules: React.Dispatch<React.SetStateAction<DashboardModuleConfig[]>>;
  toggleDashboardModule: (id: DashboardModuleId) => void;
  moveDashboardModule: (index: number, direction: 'up' | 'down') => void;
  reorderDashboardModules: (newModules: DashboardModuleConfig[]) => void;
  saveDashboardModules: () => void;
  resetDashboardModules: () => void;

  // UI State: Language, Theme, Toast, Modal
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.es;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning', title?: string) => void;
  dismissToast: (id: string) => void;
  modal: ModalConfig;
  openModal: (type: ModalConfig['type'], data?: any) => void;
  closeModal: () => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeSection, setActiveSection] = useState<MainSection>('inicio');
  const [comunicacionesSubSection, setComunicacionesSubSection] =
    useState<ComunicacionesSubSection>('notificaciones');
  const [configuracionSubSection, setConfiguracionSubSection] =
    useState<ConfiguracionSubSection>('configurar_inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Student State
  const [students] = useState<Student[]>(INITIAL_STUDENTS);
  const [currentStudentId, setCurrentStudentIdState] = useState<StudentId>('lucia');

  // Core Data
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [circulares, setCirculares] = useState<Circular[]>(INITIAL_CIRCULARES);
  const [invoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [grades] = useState<SubjectGrade[]>(INITIAL_GRADES);
  const [attendance] = useState<AttendanceIncident[]>(INITIAL_ATTENDANCE);
  const [agendaEvents] = useState<AgendaEvent[]>(INITIAL_AGENDA_EVENTS);
  const [diaries] = useState<DiaryEntry[]>(INITIAL_DIARIES);
  const [documents] = useState<SchoolDocument[]>(INITIAL_DOCUMENTS);
  const [services, setServices] = useState<SchoolService[]>(INITIAL_SERVICES);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);

  // Dashboard configuration
  const [dashboardModules, setDashboardModules] = useState<DashboardModuleConfig[]>(() => {
    const saved = localStorage.getItem('cifra_dashboard_modules');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Re-map with DEFAULT_DASHBOARD_MODULES to ensure all metadata is intact
          const mapped: DashboardModuleConfig[] = parsed.map((m: any) => {
            const def = DEFAULT_DASHBOARD_MODULES.find((d) => d.id === m.id);
            return {
              id: m.id,
              title: def?.title || m.title,
              name: def?.name || m.name || def?.title,
              description: def?.description || m.description,
              enabled: typeof m.enabled === 'boolean' ? m.enabled : true,
            };
          });
          // Ensure all 7 modules exist (in case new ones were introduced)
          const existingIds = new Set(mapped.map((m: any) => m.id));
          for (const def of DEFAULT_DASHBOARD_MODULES) {
            if (!existingIds.has(def.id)) {
              mapped.push(def);
            }
          }
          return mapped;
        }
      } catch {
        return DEFAULT_DASHBOARD_MODULES;
      }
    }
    return DEFAULT_DASHBOARD_MODULES;
  });

  useEffect(() => {
    localStorage.setItem('cifra_dashboard_modules', JSON.stringify(dashboardModules));
  }, [dashboardModules]);

  // Language
  const [language, setLanguage] = useState<Language>('es');
  const t = useMemo(() => TRANSLATIONS[language], [language]);

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success', title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modal
  const [modal, setModal] = useState<ModalConfig>({ type: null });
  const openModal = (type: ModalConfig['type'], data?: any) => {
    setModal({ type, data });
  };
  const closeModal = () => {
    setModal({ type: null });
  };

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('cifra_auth') === 'true';
  });

  const login = (usernameInput: string, passwordInput: string): boolean => {
    const trimmedUser = usernameInput.trim().toLowerCase();
    if (trimmedUser === 'demo' && passwordInput === 'password') {
      setIsAuthenticated(true);
      localStorage.setItem('cifra_auth', 'true');
      showToast('¡Bienvenido a Cifra Educación!', 'success');
      return true;
    }
    return false;
  };

  const loginDemo = (provider?: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('cifra_auth', 'true');
    if (provider) {
      showToast(`Sesión iniciada con ${provider}`, 'success');
    } else {
      showToast('Acceso con usuario demo completado', 'success');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cifra_auth');
    showToast('Sesión cerrada correctamente', 'info');
  };

  // Student Switcher
  const setCurrentStudentId = (id: StudentId) => {
    setCurrentStudentIdState(id);
    const student = students.find((s) => s.id === id);
    showToast(
      language === 'es'
        ? `Ficha activa actualizada: ${student?.name} (${student?.course})`
        : `Active student: ${student?.name} (${student?.course})`,
      'info'
    );
  };

  const currentStudent = useMemo(
    () => students.find((s) => s.id === currentStudentId) || students[0],
    [students, currentStudentId]
  );

  const schoolInfo = currentStudent.school || INITIAL_SCHOOL;

  // Filtered views by student
  const studentNotifications = useMemo(() => {
    return notifications.filter(
      (n) => !n.studentId || n.studentId === 'all' || n.studentId === currentStudentId
    );
  }, [notifications, currentStudentId]);

  const unreadNotificationsCount = useMemo(() => {
    return studentNotifications.filter((n) => !n.read).length;
  }, [studentNotifications]);

  const studentConversations = useMemo(() => {
    return conversations.filter(
      (c) => !c.studentId || c.studentId === 'all' || c.studentId === currentStudentId
    );
  }, [conversations, currentStudentId]);

  const unreadMessagesCount = useMemo(() => {
    return studentConversations.filter((c) => c.unread).length;
  }, [studentConversations]);

  const unreadCircularesCount = useMemo(() => {
    return circulares.filter((c) => !c.read).length;
  }, [circulares]);

  const studentInvoices = useMemo(() => {
    return invoices.filter((inv) => inv.studentId === currentStudentId);
  }, [invoices, currentStudentId]);

  const studentGrades = useMemo(() => {
    return grades.filter((g) => g.studentId === currentStudentId);
  }, [grades, currentStudentId]);

  const studentAttendance = useMemo(() => {
    return attendance.filter((a) => a.studentId === currentStudentId);
  }, [attendance, currentStudentId]);

  const studentAgendaEvents = useMemo(() => {
    return agendaEvents.filter((ev) => ev.studentId === currentStudentId);
  }, [agendaEvents, currentStudentId]);

  const studentDiaries = useMemo(() => {
    return diaries.filter((d) => d.studentId === currentStudentId);
  }, [diaries, currentStudentId]);

  const studentDocuments = useMemo(() => {
    return documents.filter(
      (doc) => !doc.studentId || doc.studentId === 'all' || doc.studentId === currentStudentId
    );
  }, [documents, currentStudentId]);

  // Actions
  const navigateTo = (
    section: MainSection,
    subSection?: ComunicacionesSubSection | ConfiguracionSubSection
  ) => {
    setActiveSection(section);
    if (section === 'comunicaciones' && subSection) {
      setComunicacionesSubSection(subSection as ComunicacionesSubSection);
    }
    if (section === 'configuracion' && subSection) {
      setConfiguracionSubSection(subSection as ConfiguracionSubSection);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast(language === 'es' ? 'Todas las notificaciones marcadas como leídas' : 'All notifications marked as read');
  };

  const toggleConversationImportant = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, important: !c.important } : c))
    );
  };

  const archiveConversation = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, archived: !c.archived } : c))
    );
    showToast(language === 'es' ? 'Conversación actualizada' : 'Conversation updated');
  };

  const sendMessage = (conversationId: string, text: string) => {
    const newMsg = {
      id: Math.random().toString(36).substring(2, 9),
      sender: `${userProfile.name} ${userProfile.lastName}`,
      senderRole: 'Familia',
      recipient: 'Profesor / Centro',
      date: 'Hoy',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastUpdated: 'Ahora',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
    showToast(language === 'es' ? 'Mensaje enviado correctamente' : 'Message sent successfully');
  };

  const createNewMessage = (participantRole: string, subject: string, text: string) => {
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      studentId: currentStudentId,
      subject,
      participant: participantRole,
      participantRole: 'Centro Educativo',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      unread: false,
      important: false,
      archived: false,
      lastUpdated: 'Ahora',
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: `${userProfile.name} ${userProfile.lastName}`,
          senderRole: 'Familia',
          recipient: participantRole,
          date: 'Hoy',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text,
        },
      ],
    };
    setConversations((prev) => [newConv, ...prev]);
    showToast(language === 'es' ? 'Nueva conversación iniciada' : 'New conversation initiated');
  };

  const markCircularAsRead = (id: string) => {
    setCirculares((prev) =>
      prev.map((c) => (c.id === id ? { ...c, read: true } : c))
    );
  };

  const toggleServiceEnrollment = (serviceId: string) => {
    setServices((prev) =>
      prev.map((srv) => {
        if (srv.id === serviceId) {
          const isEnrolled = srv.enrolledStudents.includes(currentStudentId);
          const newEnrolled = isEnrolled
            ? srv.enrolledStudents.filter((s) => s !== currentStudentId)
            : [...srv.enrolledStudents, currentStudentId];
          return { ...srv, enrolledStudents: newEnrolled };
        }
        return srv;
      })
    );
    showToast(
      language === 'es'
        ? 'Inscripción en servicio actualizada para ' + currentStudent.name
        : 'Service enrollment updated for ' + currentStudent.name
    );
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    showToast(language === 'es' ? 'Datos de usuario guardados' : 'User data saved');
  };

  // Dashboard customization
  const toggleDashboardModule = (id: DashboardModuleId) => {
    setDashboardModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const moveDashboardModule = (index: number, direction: 'up' | 'down') => {
    setDashboardModules((prev) => {
      const newModules = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newModules.length) return prev;
      const [moved] = newModules.splice(index, 1);
      newModules.splice(targetIndex, 0, moved);
      return newModules;
    });
  };

  const reorderDashboardModules = (newModules: DashboardModuleConfig[]) => {
    setDashboardModules(newModules);
  };

  const saveDashboardModules = () => {
    localStorage.setItem('cifra_dashboard_modules', JSON.stringify(dashboardModules));
    showToast(
      language === 'es'
        ? 'Configuración de la pantalla de inicio guardada correctamente'
        : 'Home screen configuration saved successfully',
      'success'
    );
  };

  const resetDashboardModules = () => {
    setDashboardModules(DEFAULT_DASHBOARD_MODULES);
    localStorage.setItem('cifra_dashboard_modules', JSON.stringify(DEFAULT_DASHBOARD_MODULES));
    showToast(
      language === 'es'
        ? 'Configuración de inicio restablecida a los valores predeterminados'
        : 'Home configuration reset to defaults'
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeSection,
        setActiveSection,
        comunicacionesSubSection,
        setComunicacionesSubSection,
        configuracionSubSection,
        setConfiguracionSubSection,
        navigateTo,
        students,
        currentStudentId,
        setCurrentStudentId,
        currentStudent,
        notifications,
        studentNotifications,
        unreadNotificationsCount,
        conversations,
        studentConversations,
        unreadMessagesCount,
        circulares,
        unreadCircularesCount,
        invoices,
        studentInvoices,
        grades,
        studentGrades,
        attendance,
        studentAttendance,
        agendaEvents,
        studentAgendaEvents,
        diaries,
        studentDiaries,
        documents,
        studentDocuments,
        services,
        userProfile,
        schoolInfo,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toggleConversationImportant,
        archiveConversation,
        sendMessage,
        createNewMessage,
        markCircularAsRead,
        toggleServiceEnrollment,
        updateUserProfile,
        dashboardModules,
        setDashboardModules,
        toggleDashboardModule,
        moveDashboardModule,
        reorderDashboardModules,
        saveDashboardModules,
        resetDashboardModules,
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        toasts,
        showToast,
        dismissToast,
        modal,
        openModal,
        closeModal,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isAuthenticated,
        login,
        loginDemo,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
