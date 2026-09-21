import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Mail,
  FileCheck,
  Calendar,
  Clock,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Sliders,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  User,
  MapPin,
  FileText,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

export const DashboardView: React.FC = () => {
  const {
    userProfile,
    currentStudent,
    dashboardModules,
    studentNotifications,
    unreadNotificationsCount,
    studentConversations,
    unreadMessagesCount,
    circulares,
    unreadCircularesCount,
    studentAgendaEvents,
    studentInvoices,
    studentAttendance,
    navigateTo,
    openModal,
    t,
  } = useApp();

  // Filter next 7 days events
  const next7DaysEvents = React.useMemo(() => {
    // Return all events scheduled for upcoming days
    return studentAgendaEvents
      .filter((e) => e.type !== 'clase')
      .slice(0, 4);
  }, [studentAgendaEvents]);

  // Today classes
  const todayClasses = React.useMemo(() => {
    return studentAgendaEvents
      .filter((e) => e.type === 'clase')
      .slice(0, 4);
  }, [studentAgendaEvents]);

  // Latest invoice
  const latestInvoice = React.useMemo(() => {
    return studentInvoices.length > 0 ? studentInvoices[0] : null;
  }, [studentInvoices]);

  // Attendance summary metrics
  const attendanceMetrics = React.useMemo(() => {
    const totalAbsences = studentAttendance.filter((a) => a.type.startsWith('ausencia')).length;
    const unjustified = studentAttendance.filter((a) => a.type === 'ausencia_sin_justificar').length;
    const late = studentAttendance.filter((a) => a.type === 'retraso').length;
    return { totalAbsences, unjustified, late };
  }, [studentAttendance]);

  // Helper to render module based on configuration
  const renderModule = (moduleId: string) => {
    switch (moduleId) {
      case 'notificaciones':
        return (
          <div
            key="mod-notif"
            id="dashboard-module-notificaciones"
            className="flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base md:text-xl dark:text-slate-100 font-display">
                    {t.comunicacionesTabs.notificaciones}
                  </h3>
                  <span className="text-[11px] text-slate-400 line-clamp-2 sm:line-clamp-none">
                    {unreadNotificationsCount} {t.dashboard.unreadNotifications}
                  </span>
                </div>
              </div>
              <button
                id="dash-btn-ver-notificaciones"
                onClick={() => navigateTo('comunicaciones', 'notificaciones')}
                className="text-xs font-semibold text-brand dark:text-brand-400 hover:text-brand-hover flex items-center gap-1 cursor-pointer mt-1.5"
              >
                <span>{t.dashboard.viewAll}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 space-y-2.5">
              {studentNotifications.length === 0 ? (
                <EmptyState title={t.empty.notifications} />
              ) : (
                studentNotifications.slice(0, 3).map((notif) => (
                  <div
                    key={notif.id}
                    id={`dash-notif-${notif.id}`}
                    onClick={() => openModal('notification_detail', notif)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${notif.read
                      ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-100/60'
                      : 'bg-brand-50/40 dark:bg-brand-950/20 border-brand-200/80 dark:border-brand-900/40 hover:bg-brand-50/70'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-brand shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {notif.message}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
                      <span className="capitalize">{notif.category}</span>
                      <span>{notif.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'mensajes':
        return (
          <div
            key="mod-mensajes"
            id="dashboard-module-mensajes"
            className="flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base md:text-xl dark:text-slate-100 font-display">
                    {t.comunicacionesTabs.mensajes}
                  </h3>
                  <span className="text-[11px] text-slate-400 line-clamp-2 sm:line-clamp-none">
                    {unreadMessagesCount} {t.dashboard.unreadMessages}
                  </span>
                </div>
              </div>
              <button
                id="dash-btn-ver-mensajes"
                onClick={() => navigateTo('comunicaciones', 'mensajes')}
                className="text-xs font-semibold text-brand dark:text-brand-400 hover:text-brand-hover flex items-center gap-1 cursor-pointer mt-1.5"
              >
                <span>{t.dashboard.viewMessages}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 space-y-2.5">
              {studentConversations.length === 0 ? (
                <EmptyState title={t.empty.messages} />
              ) : (
                studentConversations.slice(0, 3).map((conv) => {
                  const lastMsg = conv.messages[conv.messages.length - 1];
                  return (
                    <div
                      key={conv.id}
                      id={`dash-conv-${conv.id}`}
                      onClick={() => navigateTo('comunicaciones', 'mensajes')}
                      className="p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={conv.avatar}
                          alt={conv.participant}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                              {conv.participant}
                            </h4>
                            <span className="text-[10px] text-slate-400">{conv.lastUpdated}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {lastMsg?.text || conv.subject}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );

      case 'circulares':
        return (
          <div
            key="mod-circulares"
            id="dashboard-module-circulares"
            className="flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base md:text-xl dark:text-slate-100 font-display">
                    {t.comunicacionesTabs.circulares}
                  </h3>
                  <span className="text-[11px] text-slate-400 line-clamp-2 sm:line-clamp-none">
                    {unreadCircularesCount} nuevas publicadas
                  </span>
                </div>
              </div>
              <button
                id="dash-btn-ver-circulares"
                onClick={() => navigateTo('comunicaciones', 'circulares')}
                className="text-xs font-semibold text-brand dark:text-brand-400 hover:text-brand-hover flex items-center gap-1 cursor-pointer mt-1.5"
              >
                <span>{t.dashboard.viewCirculares}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 space-y-2.5">
              {circulares.length === 0 ? (
                <EmptyState title={t.empty.circulares} />
              ) : (
                circulares.slice(0, 3).map((circ) => (
                  <div
                    key={circ.id}
                    id={`dash-circ-${circ.id}`}
                    onClick={() => openModal('circular_detail', circ)}
                    className="p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {circ.title}
                      </h4>
                      {!circ.read && (
                        <span className="w-2 h-2 rounded-full bg-brand shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {circ.summary}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
                      <span>{circ.category}</span>
                      <span>{circ.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'eventos_proximos':
        return (
          <div
            key="mod-eventos"
            id="dashboard-module-eventos-proximos"
            className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base md:text-xl dark:text-slate-100 font-display">
                    {t.dashboard.next7Days}
                  </h3>
                  <span className="text-[11px] text-slate-400 line-clamp-2 sm:line-clamp-none">
                    Acontecimientos programados para {currentStudent.name}
                  </span>
                </div>
              </div>
              <button
                id="dash-btn-ver-agenda"
                onClick={() => navigateTo('agenda')}
                className="text-xs font-semibold text-brand dark:text-brand-400 hover:text-brand-hover flex items-center gap-1 cursor-pointer mt-1.5"
              >
                <span>{t.dashboard.viewAgenda}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {next7DaysEvents.length === 0 ? (
              <EmptyState title={t.empty.events} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {next7DaysEvents.map((ev) => (
                  <div
                    key={ev.id}
                    id={`dash-event-${ev.id}`}
                    onClick={() => openModal('event_detail', ev)}
                    className="p-3.5 rounded-lg border border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-brand/40 dark:hover:border-brand/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${ev.type === 'examen'
                          ? 'bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                          : ev.type === 'reunion'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            : ev.type === 'evento'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                              : ev.type === 'actividad'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                                : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                      >
                        {ev.type}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {ev.date.split('-').reverse().slice(0, 2).join('/')}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand transition-colors">
                      {ev.title}
                    </h4>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{ev.startTime} - {ev.endTime}</span>
                    </div>
                    {ev.location && (
                      <div className="text-[11px] text-slate-400 truncate mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{ev.location}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'proximas_clases':
        return (
          <div
            key="mod-clases"
            id="dashboard-module-proximas-clases"
            className="flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base md:text-xl dark:text-slate-100 font-display">
                    {t.dashboard.todayClasses}
                  </h3>
                  <span className="text-[11px] text-slate-400 line-clamp-2 sm:line-clamp-none">
                    Horario de {currentStudent.classroom}
                  </span>
                </div>
              </div>
              <button
                id="dash-btn-ver-horario"
                onClick={() => navigateTo('agenda')}
                className="text-xs font-semibold text-brand dark:text-brand-400 hover:text-brand-hover flex items-center gap-1 cursor-pointer mt-1.5"
              >
                <span>{t.dashboard.viewAgenda}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 space-y-2">
              {todayClasses.length === 0 ? (
                <EmptyState title="No hay clases programadas para hoy" />
              ) : (
                todayClasses.map((cls) => (
                  <div
                    key={cls.id}
                    id={`dash-class-${cls.id}`}
                    onClick={() => openModal('event_detail', cls)}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 text-center py-1 px-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px] font-bold">
                        {cls.startTime}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {cls.subject || cls.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <span>
                            {cls.teacher}
                            {cls.location && ` · ${cls.location}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'ultima_factura':
        return (
          <div
            key="mod-factura"
            id="dashboard-module-ultima-factura"
            className="flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base md:text-xl dark:text-slate-100 font-display">
                    Última Factura
                  </h3>
                  <span className="text-[11px] text-slate-400 line-clamp-2 sm:line-clamp-none">
                    Facturación de {currentStudent.name}
                  </span>
                </div>
              </div>
              <button
                id="dash-btn-ver-facturas"
                onClick={() => navigateTo('facturacion')}
                className="text-xs font-semibold text-brand dark:text-brand-400 hover:text-brand-hover flex items-center gap-1 cursor-pointer mt-1.5"
              >
                <span>{t.dashboard.viewInvoices}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {!latestInvoice ? (
                <EmptyState title={t.dashboard.noInvoices} />
              ) : (
                <div
                  id={`dash-inv-${latestInvoice.id}`}
                  onClick={() => openModal('invoice_detail', latestInvoice)}
                  className="p-4 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 hover:border-brand/40 dark:hover:border-brand/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                      {latestInvoice.number}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${latestInvoice.status === 'pagada'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : latestInvoice.status === 'pendiente'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                        }`}
                    >
                      {latestInvoice.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {latestInvoice.concept}
                  </h4>
                  <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Vencimiento: {latestInvoice.dueDate}
                    </div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">
                      {latestInvoice.amount.toFixed(2)} €
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'graficas_asistencia':
        return (
          <div
            key="mod-asistencia"
            id="dashboard-module-graficas-asistencia"
            className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base md:text-xl dark:text-slate-100 font-display">
                    {t.dashboard.attendanceSummary}
                  </h3>
                  <span className="text-[11px] text-slate-400 line-clamp-2 sm:line-clamp-none">
                    Registro de faltas y puntualidad de {currentStudent.name}
                  </span>
                </div>
              </div>
              <button
                id="dash-btn-ver-asistencia"
                onClick={() => navigateTo('asistencia')}
                className="text-xs font-semibold text-brand dark:text-brand-400 hover:text-brand-hover flex items-center gap-1 cursor-pointer mt-1.5"
              >
                <span>{t.dashboard.viewAttendance}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Metric 1: Total Ausencias */}
              <div
                onClick={() => navigateTo('asistencia')}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex items-center gap-4 cursor-pointer hover:bg-slate-100/60 transition-colors"
              >
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                  {attendanceMetrics.totalAbsences}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.dashboard.absences}
                  </div>
                  <div className="text-[11px] text-slate-400">Total registradas</div>
                </div>
              </div>

              {/* Metric 2: Sin justificar */}
              <div
                onClick={() => navigateTo('asistencia')}
                className="p-4 rounded-lg bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200/70 dark:border-brand-900/40 flex items-center gap-4 cursor-pointer hover:bg-brand-50/80 transition-colors"
              >
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-brand-100 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                  {attendanceMetrics.unjustified}
                </div>
                <div>
                  <div className="text-xs font-semibold text-brand-800 dark:text-brand-300">
                    {t.dashboard.unjustified}
                  </div>
                  <div className="text-[11px] text-brand-600/80 dark:text-brand-400">
                    Requieren justificación
                  </div>
                </div>
              </div>

              {/* Metric 3: Retrasos */}
              <div
                onClick={() => navigateTo('asistencia')}
                className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 flex items-center gap-4 cursor-pointer hover:bg-amber-50/80 transition-colors"
              >
                <div className="w-10 h-10 shrink-0 hidden sm:flex rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  {attendanceMetrics.late}
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                    {t.dashboard.tardiness}
                  </div>
                  <div className="text-[11px] text-amber-600/80 dark:text-amber-400">
                    Puntualidad en primera hora
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Active modules in user-configured order
  const activeModules = dashboardModules.filter((m) => m.enabled);

  // Helper for responsive grid column spanning based on module type
  const getModuleSpanClass = (id: string) => {
    switch (id) {
      case 'eventos_proximos':
      case 'graficas_asistencia':
        return 'col-span-12';
      case 'proximas_clases':
      case 'ultima_factura':
        return 'col-span-12 lg:col-span-6';
      case 'notificaciones':
      case 'mensajes':
      case 'circulares':
      default:
        return 'col-span-12 md:col-span-6 xl:col-span-4';
    }
  };

  return (
    <div id="dashboard-view-container" className="space-y-6 pb-12">
      {/* Cabecera: Hola, María | Alumno: Lucía García ▾ */}
      <div
        id="dashboard-header-card"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-lg bg-gradient-to-r from-brand-900 via-brand-600 to-brand-900 text-white shadow-md relative overflow-hidden border border-brand-900/40"
      >
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-brand-200 text-xs font-medium mb-1">
            <span className="uppercase tracking-wider">{t.dashboard.familyPortal}</span>
            <span>·</span>
            <button
              type="button"
              id="dash-school-info-link"
              onClick={() => openModal('school_detail', currentStudent.school)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
              title="Consultar datos del centro educativo asignado al alumno"
            >
              <Building className="w-3 h-3" />
              <span>{currentStudent.school?.name || 'Centro Educativo'}</span>
              <span className="text-[10px] text-brand-200 font-normal">({currentStudent.school?.code || 'Oficial'})</span>
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">
            {t.dashboard.greeting} {userProfile.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200/90 mt-1 max-w-xl">
            Portal de gestión y comunicación escolar. Alumno/a:{' '}
            <strong className="text-white font-bold">{currentStudent.name}</strong> ({currentStudent.course}) · Centro asignado:{' '}
            <strong className="text-white font-bold">{currentStudent.school?.name}</strong>.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          {/* Quick shortcut to configure home screen */}
          <button
            id="dash-btn-configure-home"
            onClick={() => navigateTo('configuracion', 'configurar_inicio')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs border border-white/20 transition-colors cursor-pointer"
            title="Personalizar módulos de la pantalla de inicio"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Personalizar Inicio</span>
          </button>
        </div>

        {/* Subtle decorative background circles */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-brand-500/10 pointer-events-none" />
        <div className="absolute right-32 -top-10 w-32 h-32 rounded-full bg-brand-600/10 pointer-events-none" />
      </div>

      {/* Dynamic Ordered Modules Grid */}
      {activeModules.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-10 text-center max-w-md mx-auto my-8 shadow-xs">
          <div className="w-14 h-14 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center mx-auto mb-3">
            <Sliders className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            No hay módulos visibles en el Inicio
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 mb-5 leading-relaxed">
            Has ocultado todos los módulos del panel principal. Puedes reactivarlos o reorganizar su orden desde la configuración.
          </p>
          <button
            id="dash-btn-config-empty"
            onClick={() => navigateTo('configuracion', 'configurar_inicio')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-brand hover:bg-brand-hover shadow-xs transition-colors cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>Configurar Pantalla de Inicio</span>
          </button>
        </div>
      ) : (
        <div
          id="dashboard-modules-ordered-grid"
          className="grid grid-cols-12 gap-6"
        >
          {activeModules.map((mod) => (
            <div
              key={mod.id}
              id={`dash-grid-item-${mod.id}`}
              className={`${getModuleSpanClass(mod.id)} transition-all duration-200`}
            >
              {renderModule(mod.id)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
