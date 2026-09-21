import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  FileText,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Paperclip,
  Send,
  Building,
  Euro,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Invoice, AgendaEvent, SubjectGrade, Circular, SchoolDocument, AttendanceIncident, SchoolService, NotificationItem, SchoolInfo } from '../types';

export const ModalRenderer: React.FC = () => {
  const { modal, closeModal, markNotificationAsRead, navigateTo, currentStudent, sendMessage, createNewMessage, showToast, toggleServiceEnrollment, t } = useApp();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modal.type) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modal.type, closeModal]);

  if (!modal.type) return null;

  return (
    <AnimatePresence>
      <div
        id="app-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          id="app-modal-content"
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        >
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-500"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Cifra educación · Detalle
              </span>
            </div>
            <button
              id="modal-close-btn"
              onClick={closeModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {/* 1. Notification Detail */}
            {modal.type === 'notification_detail' && (() => {
              const notif = modal.data as NotificationItem;
              return (
                <div id="modal-notification-detail" className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 uppercase tracking-wide">
                        {notif.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                        {notif.title}
                      </h3>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {notif.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
                    <p className="font-medium text-slate-900 dark:text-slate-100 mb-2">{notif.message}</p>
                    {notif.details && <p className="text-slate-600 dark:text-slate-400">{notif.details}</p>}
                  </div>

                  <div className="flex items-center flex-wrap justify-end gap-3 pt-3">
                    {!notif.read && (
                      <button
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          showToast('Notificación marcada como leída');
                        }}
                        className="btn-w-100 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        Marcar como leída
                      </button>
                    )}
                    {notif.actionUrl && (
                      <button
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          closeModal();
                          navigateTo(notif.actionUrl!);
                        }}
                        className="btn-w-100 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        Ir al apartado correspondiente
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 2. Invoice Detail */}
            {modal.type === 'invoice_detail' && (() => {
              const inv = modal.data as Invoice;
              return (
                <div id="modal-invoice-detail" className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                        Recibo / Factura Oficial
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                        {inv.number}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Alumno: <strong className="text-slate-700 dark:text-slate-300">{inv.studentName}</strong>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${inv.status === 'pagada'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : inv.status === 'pendiente'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                            : 'bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300'
                          }`}
                      >
                        {inv.status}
                      </span>
                      <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                        {inv.amount.toFixed(2)} €
                      </div>
                    </div>
                  </div>

                  {/* Header breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200/60 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Fecha de emisión</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{inv.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Fecha de vencimiento</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{inv.dueDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Método de abono</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{inv.paymentMethod || 'Domiciliación'}</span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Líneas de facturación
                    </h4>
                    <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-sm">
                      <table className="w-full text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <tr>
                            <th className="p-3">Concepto</th>
                            <th className="p-3 text-center">Cant.</th>
                            <th className="p-3 text-right">Precio unitario</th>
                            <th className="p-3 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {inv.items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{item.description}</td>
                              <td className="p-3 text-center text-slate-500">{item.quantity}</td>
                              <td className="p-3 text-right text-slate-500">{item.unitPrice.toFixed(2)} €</td>
                              <td className="p-3 text-right font-semibold text-slate-900 dark:text-white">
                                {item.total.toFixed(2)} €
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-700">
                          <tr>
                            <td colSpan={3} className="p-3 text-right font-bold text-slate-700 dark:text-slate-200">
                              Base imponible total:
                            </td>
                            <td className="p-3 text-right font-bold text-brand-600 dark:text-brand-400 text-base">
                              {inv.amount.toFixed(2)} €
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 leading-relaxed">
                    * Conceptos educativos exentos de IVA conforme al artículo 20.Uno.9º de la Ley 37/1992 del Impuesto sobre el Valor Añadido.
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="btn-w-100 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      Imprimir recibo
                    </button>
                    <button
                      onClick={() => {
                        showToast(`Descargando factura ${inv.number}.pdf...`, 'success');
                      }}
                      className="btn-w-100 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Descargar PDF
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 3. Event Detail */}
            {modal.type === 'event_detail' && (() => {
              const ev = modal.data as AgendaEvent;
              return (
                <div id="modal-event-detail" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${ev.type === 'examen'
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
                    <span className="text-xs text-slate-400">· Agenda de {currentStudent.name}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{ev.title}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-sm">
                    <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-brand-500" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-brand-500" />
                      <span>{ev.startTime} - {ev.endTime}</span>
                    </div>
                    {ev.location && (
                      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-4 h-4 text-brand-500" />
                        <span>{ev.location}</span>
                      </div>
                    )}
                    {ev.teacher && (
                      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                        <User className="w-4 h-4 text-brand-500" />
                        <span>{ev.teacher}</span>
                      </div>
                    )}
                  </div>

                  {ev.description && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Descripción de la actividad
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>
                  )}

                  {ev.homework && (
                    <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-sm">
                      <span className="font-semibold text-amber-800 dark:text-amber-300 block mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" /> Tareas o Deberes asociados:
                      </span>
                      <p className="text-amber-900 dark:text-amber-200/90">{ev.homework}</p>
                    </div>
                  )}

                  <div className="flex justify-end pt-3">
                    <button
                      onClick={closeModal}
                      className="btn-w-100 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 4. Subject Grade Detail */}
            {modal.type === 'subject_detail' && (() => {
              const subj = modal.data as SubjectGrade;
              const maxScore = 10;
              return (
                <div id="modal-subject-detail" className="space-y-6">
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                        Detalle de Asignatura
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                        {subj.subject}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                        <User className="w-3.5 h-3.5" /> Profesor/a: <strong className="text-slate-700 dark:text-slate-300">{subj.teacher}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Summary of evaluations */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-xs text-slate-500 block mb-1">1ª Evaluación</span>
                      <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                        {subj.firstEvaluation !== null ? subj.firstEvaluation : '—'}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-xs text-slate-500 block mb-1">2ª Evaluación</span>
                      <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                        {subj.secondEvaluation !== null ? subj.secondEvaluation : '—'}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-xs text-slate-500 block mb-1">3ª Evaluación</span>
                      <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                        {subj.thirdEvaluation !== null ? subj.thirdEvaluation : '—'}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-center">
                      <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block mb-1">
                        Extraordinaria — Septiembre
                      </span>
                      <span className="text-2xl font-black text-amber-700 dark:text-amber-400">
                        {subj.extraordinaryEvaluation !== null ? subj.extraordinaryEvaluation : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Evolution Chart */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
                      <TrendingUp className="w-4 h-4 text-brand-500" />
                      Evolución académica de la asignatura
                    </h4>
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                      <div className="h-32 flex items-end justify-around gap-4 pt-4 px-2">
                        {subj.historyScores.map((item, idx) => {
                          const heightPct = Math.round((item.score / maxScore) * 100);
                          return (
                            <div key={idx} className="flex flex-col items-center flex-1 max-w-[60px] h-full justify-end">
                              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 mb-1.5">
                                {item.score}
                              </span>
                              <div
                                style={{ height: `${heightPct}%` }}
                                className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-md transition-all duration-500 shadow-xs"
                              ></div>
                              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-2 text-center truncate w-full">
                                {item.evalName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 text-right text-[11px] text-slate-400">
                        Escala oficial de 0 a 10 puntos · Progreso individual
                      </div>
                    </div>
                  </div>

                  {/* Teacher Observations */}
                  {subj.observations && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Observaciones del profesorado
                      </h4>
                      <div className="p-4 rounded-lg bg-slate-100/70 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-brand-500">
                        "{subj.observations}"
                      </div>
                    </div>
                  )}

                  {/* Competencies Breakdown */}
                  {subj.competencies && subj.competencies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Evaluación competencial
                      </h4>
                      <div className="space-y-2">
                        {subj.competencies.map((comp, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{comp.name}</span>
                            <span className="font-bold text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60">
                              {comp.score} / 10
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={closeModal}
                      className="btn-w-100 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 5. Circular Detail */}
            {modal.type === 'circular_detail' && (() => {
              const circ = modal.data as Circular;
              return (
                <div id="modal-circular-detail" className="space-y-5">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 mb-2">
                      {circ.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{circ.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {circ.date}</span>
                      <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> {circ.author}</span>
                    </div>
                  </div>

                  <div className="prose prose-sm dark:prose-invert max-w-none p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {circ.content}
                  </div>

                  {circ.attachments && circ.attachments.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Paperclip className="w-3.5 h-3.5" /> Archivos adjuntos para descargar
                      </h4>
                      <div className="space-y-2">
                        {circ.attachments.map((att) => (
                          <div
                            key={att.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-brand-500" />
                              <div>
                                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{att.name}</div>
                                <div className="text-xs text-slate-400">{att.size}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => showToast(`Descargando ${att.name}...`, 'success')}
                              className="p-2 text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 rounded-lg cursor-pointer transition-colors"
                              title="Descargar archivo"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={closeModal}
                      className="btn-w-100 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Aceptar y Cerrar
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 6. Document Preview */}
            {modal.type === 'document_preview' && (() => {
              const doc = modal.data as SchoolDocument;
              return (
                <div id="modal-document-preview" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
                        Visor Documental
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{doc.name}</h3>
                      <div className="text-xs text-slate-400 mt-1">
                        Categoría: {doc.category} · Tamaño: {doc.size} · Fecha: {doc.date}
                      </div>
                    </div>
                  </div>

                  {/* Mock document viewer frame */}
                  <div className="h-64 sm:h-80 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center p-6 text-center">
                    <FileText className="w-16 h-16 text-brand-500/80 mb-3" />
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{doc.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                      {doc.description || 'Vista previa oficial certificada emitida por la plataforma Cifra educación para el expediente escolar.'}
                    </p>
                    <div className="mt-4 px-3 py-1 bg-white dark:bg-slate-900 rounded-md text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Sello Electrónico de Validación: CIFRA-EDU-2026-VERIFIED
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => showToast(`Descargando ${doc.name}...`, 'success')}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Descargar documento
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 7. Attendance Incident Detail */}
            {modal.type === 'incident_detail' && (() => {
              const inc = modal.data as AttendanceIncident;
              return (
                <div id="modal-incident-detail" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${inc.type.includes('sin_justificar')
                          ? 'bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                          : inc.type === 'retraso'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}
                      >
                        {inc.type.replace(/_/g, ' ')}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                        {inc.subject}
                      </h3>
                      <div className="text-xs text-slate-400 mt-1">
                        Incidencia registrada en {currentStudent.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-slate-500 block">Estado actual</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {inc.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block">Fecha:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{inc.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Hora / Sesión:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{inc.time}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Docente responsable:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{inc.teacher}</span>
                    </div>
                  </div>

                  {inc.comments && (
                    <div className="p-3.5 rounded-lg bg-slate-100/80 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Observaciones de la incidencia:
                      </div>
                      "{inc.comments}"
                    </div>
                  )}

                  {inc.type.includes('sin_justificar') && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-lg text-xs text-amber-800 dark:text-amber-200">
                      Puede remitir la justificación adjuntando parte médico o volante de ausencia a través del apartado de Mensajes a la tutoría.
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={closeModal}
                      className="btn-w-100 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg cursor-pointer"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 8. New Message Composer */}
            {modal.type === 'new_message' && (() => {
              return <NewMessageForm onClose={closeModal} />;
            })()}

            {/* 9. Service Detail */}
            {modal.type === 'service_detail' && (() => {
              const srv = modal.data as SchoolService;
              const isEnrolled = srv.enrolledStudents.includes(currentStudent.id);
              return (
                <div id="modal-service-detail" className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
                        Servicio Escolar
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                        {srv.name}
                      </h3>
                      <div className="text-xs text-slate-500 mt-1">Horario: {srv.schedule}</div>
                    </div>
                    <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                      {srv.price}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200 block mb-1">Información adicional:</strong>
                    {srv.additionalInfo}
                  </div>

                  <div className="p-3.5 rounded-lg bg-brand-50/70 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/40 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium text-brand-900 dark:text-brand-200">
                        Estado de inscripción para {currentStudent.name}:
                      </div>
                      <div className="text-sm font-bold text-brand-700 dark:text-brand-300">
                        {isEnrolled ? '✓ Inscrito en este servicio' : 'No inscrito actualmente'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        toggleServiceEnrollment(srv.id);
                        closeModal();
                      }}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer ${isEnrolled
                        ? 'bg-brand-600 hover:bg-brand-700 text-white'
                        : 'bg-brand-600 hover:bg-brand-700 text-white'
                        }`}
                    >
                      {isEnrolled ? 'Solicitar baja' : 'Inscribir alumno'}
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 10. School Details Modal */}
            {modal.type === 'school_detail' && (() => {
              const school = (modal.data as SchoolInfo) || currentStudent.school;
              return (
                <div id="modal-school-detail" className="space-y-5">
                  <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Centro educativo asignado oficialmente:</span>
                      <p className="mt-0.5">
                        Este centro escolar corresponde al asignado administrativamente al alumno (<strong>{currentStudent.name}</strong>) según la matrícula del curso vigente. Esta información es de solo consulta y no es configurable por el usuario.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {school.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                          {currentStudent.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Código oficial: <strong className="text-slate-700 dark:text-slate-300">{school.code}</strong> · {school.type || 'Centro escolar'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">Dirección Oficial</div>
                        <div className="text-slate-500 mt-0.5">{school.address}</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">Horario de Atención</div>
                        <div className="text-slate-500 mt-0.5">{school.officeHours}</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                      <Building className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">Teléfono y Email</div>
                        <div className="text-slate-500 mt-0.5">{school.phone} · {school.email}</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                      <User className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">Secretaría Administrativa</div>
                        <div className="text-slate-500 mt-0.5">{school.secretarySchedule}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-brand-50/50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/50 text-xs space-y-1.5">
                    <h4 className="font-bold text-brand-950 dark:text-brand-200 mb-1">
                      Ficha y Matrícula de {currentStudent.name}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                      <div><span className="font-semibold">Curso y Grupo:</span> {currentStudent.course}</div>
                      <div><span className="font-semibold">Aula:</span> {currentStudent.classroom}</div>
                      <div><span className="font-semibold">Tutor/a asignado:</span> {currentStudent.tutor}</div>
                      <div><span className="font-semibold">Dirección:</span> {school.principal}</div>
                      <div><span className="font-semibold">Jefatura de estudios:</span> {school.headOfStudies}</div>
                      <div><span className="font-semibold">Curso escolar:</span> {currentStudent.academicYear}</div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      id="modal-school-close-btn"
                      onClick={closeModal}
                      className="btn-w-100 px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 11. Terms and Conditions Modal */}
            {modal.type === 'terms_conditions' && (
              <div id="modal-terms-conditions" className="space-y-4 text-left">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Términos y condiciones de uso
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Cifra · Gestión educativa — Actualizado a curso escolar 2025/2026
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pr-1 max-h-[55vh] overflow-y-auto">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                      1. Objeto y Ámbito de Aplicación
                    </h4>
                    <p>
                      La plataforma <strong>Cifra · Gestión educativa</strong> es un entorno digital homologado diseñado para la gestión académica, administrativa y de comunicación fluida entre el centro escolar, el claustro docente y las familias tutoras.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                      2. Protección de Datos y Privacidad de Menores (RGPD)
                    </h4>
                    <p>
                      En riguroso cumplimiento del Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD), todos los expedientes escolares, registros de asistencia, incidencias médicas y datos de facturación se procesan con cifrado de grado militar (SSL/TLS 256 bits). El centro educativo ostenta la condición de Responsable del Tratamiento y Cifra actúa como Encargado del Tratamiento.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                      3. Confidencialidad y Custodia de Credenciales
                    </h4>
                    <p>
                      El usuario es el único responsable de la debida custodia de su usuario y contraseña. Queda terminantemente prohibida la cesión de accesos a terceros. Cualquier notificación de acceso indebido debe ponerse en conocimiento inmediato de la secretaría del centro.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                      4. Propiedad Intelectual
                    </h4>
                    <p>
                      Copyright © 2026 Cifra · Gestión educativa. Todos los derechos reservados. Las marcas, interfaces, diseños y algoritmos son propiedad exclusiva de la entidad titular.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400">
                    Versión legal 4.2.1 · Vigente 2026
                  </span>
                  <button
                    type="button"
                    id="modal-terms-accept-btn"
                    onClick={closeModal}
                    className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    He leído y acepto los términos
                  </button>
                </div>
              </div>
            )}

            {/* 12. Forgot Password Modal */}
            {modal.type === 'forgot_password' && (
              <div id="modal-forgot-password" className="space-y-4 text-left">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      ¿No recuerdas la contraseña?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Recuperación de credenciales de acceso
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-2">
                  <div className="font-bold text-sm text-amber-800 dark:text-amber-300">
                    🔑 Acceso para el modo Demostración:
                  </div>
                  <p>
                    Para explorar la aplicación en esta demo, utilice las siguientes credenciales autorizadas:
                  </p>
                  <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800 font-mono text-xs flex flex-col gap-1">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Usuario:</span>{' '}
                      <strong className="text-brand-600 dark:text-brand-400">demo</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Contraseña:</span>{' '}
                      <strong className="text-brand-600 dark:text-brand-400">password</strong>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">
                    ¿Eres usuario de un centro educativo real?
                  </h4>
                  <p>
                    En el entorno escolar oficial de producción, se enviará un enlace de restablecimiento seguro a la dirección de correo electrónico que facilitó durante la matrícula en la secretaría del centro educativo.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    id="modal-forgot-close-btn"
                    onClick={closeModal}
                    className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Internal sub-form for composing new messages
const NewMessageForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { createNewMessage, currentStudent } = useApp();
  const [recipient, setRecipient] = React.useState('Tutor/a');
  const [subject, setSubject] = React.useState('');
  const [text, setText] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !text.trim()) return;
    createNewMessage(
      `${recipient} (${currentStudent.name})`,
      subject,
      text
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Redactar nuevo mensaje</h3>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Destinatario</label>
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
        >
          <option value="Tutor/a">Tutor/a ({currentStudent.tutor})</option>
          <option value="Jefatura de Estudios">Jefatura de Estudios</option>
          <option value="Secretaría Académica">Secretaría Académica / Administración</option>
          <option value="Departamento de Orientación">Departamento de Orientación</option>
          <option value="Coordinación Comedor y Servicios">Coordinación Comedor y Servicios</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Asunto</label>
        <input
          type="text"
          placeholder="Ej: Justificante de consulta médica / Duda sobre temario"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Mensaje</label>
        <textarea
          rows={4}
          placeholder="Escriba aquí el texto del mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="w-full text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
        ></textarea>
      </div>

      <div className="flex items-center flex-wrap justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="btn-w-100 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-w-100 inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
          Enviar mensaje
        </button>
      </div>
    </form>
  );
};
