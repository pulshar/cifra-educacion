import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Mail,
  FileCheck,
  Search,
  CheckCheck,
  Check,
  Star,
  Archive,
  Paperclip,
  Send,
  Plus,
  Clock,
  User,
  Calendar,
  Download,
  Building,
  Filter,
} from 'lucide-react';
import { NotificationCategory, ComunicacionesSubSection, Conversation, Circular, NotificationItem } from '../types';
import { EmptyState } from '../components/EmptyState';

export const ComunicacionesView: React.FC = () => {
  const {
    comunicacionesSubSection,
    setComunicacionesSubSection,
    studentNotifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    studentConversations,
    unreadMessagesCount,
    toggleConversationImportant,
    archiveConversation,
    sendMessage,
    circulares,
    unreadCircularesCount,
    markCircularAsRead,
    openModal,
    showToast,
    userProfile,
  } = useApp();

  // 4.1 Notificaciones state
  const [notifCategory, setNotifCategory] = useState<NotificationCategory>('todas');
  const [notifSearch, setNotifSearch] = useState('');

  // 4.2 Mensajes state
  const [selectedConversationId, setSelectedConversationId] = useState<string>(
    studentConversations.length > 0 ? studentConversations[0].id : ''
  );
  const [messageSearch, setMessageSearch] = useState('');
  const [replyText, setReplyText] = useState('');
  const [onlyImportant, setOnlyImportant] = useState(false);

  // 4.3 Circulares state
  const [circularSearch, setCircularSearch] = useState('');

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return studentNotifications.filter((n) => {
      const matchCat = notifCategory === 'todas' || n.category === notifCategory;
      const matchSearch =
        n.title.toLowerCase().includes(notifSearch.toLowerCase()) ||
        n.message.toLowerCase().includes(notifSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [studentNotifications, notifCategory, notifSearch]);

  // Selected conversation
  const selectedConversation = useMemo(() => {
    return (
      studentConversations.find((c) => c.id === selectedConversationId) ||
      studentConversations[0] ||
      null
    );
  }, [studentConversations, selectedConversationId]);

  // Filtered conversations
  const filteredConversations = useMemo(() => {
    return studentConversations.filter((c) => {
      if (onlyImportant && !c.important) return false;
      if (!messageSearch.trim()) return true;
      const s = messageSearch.toLowerCase();
      return (
        c.participant.toLowerCase().includes(s) ||
        c.subject.toLowerCase().includes(s) ||
        c.messages.some((m) => m.text.toLowerCase().includes(s))
      );
    });
  }, [studentConversations, messageSearch, onlyImportant]);

  // Filtered circulares
  const filteredCirculares = useMemo(() => {
    return circulares.filter((c) => {
      if (!circularSearch.trim()) return true;
      const s = circularSearch.toLowerCase();
      return (
        c.title.toLowerCase().includes(s) ||
        c.summary.toLowerCase().includes(s) ||
        c.category.toLowerCase().includes(s)
      );
    });
  }, [circulares, circularSearch]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConversation) return;
    sendMessage(selectedConversation.id, replyText);
    setReplyText('');
  };

  const notificationCategories: { id: NotificationCategory; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'academicas', label: 'Académicas' },
    { id: 'asistencia', label: 'Asistencia' },
    { id: 'administrativas', label: 'Administrativas' },
    { id: 'comunicaciones', label: 'Comunicaciones' },
    { id: 'facturacion', label: 'Facturación' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'otras', label: 'Otras' },
  ];

  return (
    <div id="comunicaciones-section-view" className="space-y-6 pb-12">
      {/* Tab Switcher: EXACTLY 3 sub-sections: Notificaciones, Mensajes, Circulares */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Centro de Comunicaciones
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Canal bidireccional entre las familias y el equipo docente del Instituto Demo
          </p>
        </div>

        <div
          id="comunicaciones-tabs-container"
          className="flex flex-col gap-2 sm:inline-flex sm:flex-row p-1 rounded-xl bg-transparent sm:border-0 sm:bg-slate-100 sm:dark:bg-slate-800 sm:border sm:border-slate-200 sm:dark:border-slate-700 sm:self-auto"
        >
          <button
            id="tab-btn-notificaciones"
            onClick={() => setComunicacionesSubSection('notificaciones')}
            className={`flex items-center w-full justify-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 sm:border-0 text-xs font-bold transition-all cursor-pointer ${comunicacionesSubSection === 'notificaciones'
              ? 'bg-slate-100 dark:bg-slate-800 sm:bg-white sm:dark:bg-slate-700 text-brand dark:text-brand-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Notificaciones</span>
            {unreadNotificationsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand text-white">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <button
            id="tab-btn-mensajes"
            onClick={() => setComunicacionesSubSection('mensajes')}
            className={`flex items-center w-full justify-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 sm:border-0 text-xs font-bold transition-all cursor-pointer ${comunicacionesSubSection === 'mensajes'
              ? 'bg-slate-100 dark:bg-slate-800 sm:bg-white sm:dark:bg-slate-700 text-brand dark:text-brand-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Mensajes</span>
            {unreadMessagesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand text-white">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            id="tab-btn-circulares"
            onClick={() => setComunicacionesSubSection('circulares')}
            className={`flex items-center w-full justify-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 sm:border-0 text-xs font-bold transition-all cursor-pointer ${comunicacionesSubSection === 'circulares'
              ? 'bg-slate-100 dark:bg-slate-800 sm:bg-white sm:dark:bg-slate-700 text-brand dark:text-brand-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Circulares</span>
            {unreadCircularesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand text-white">
                {unreadCircularesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4.1 NOTIFICACIONES */}
      {/* ========================================================================= */}
      {comunicacionesSubSection === 'notificaciones' && (
        <div id="subseccion-notificaciones" className="space-y-4">
          {/* Controls: Search, Mark all as read, Category Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar en notificaciones..."
                value={notifSearch}
                onChange={(e) => setNotifSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand/40"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs text-slate-500">
                <strong className="text-slate-800 dark:text-slate-200">{unreadNotificationsCount}</strong> pendientes
              </span>
              <button
                id="btn-mark-all-read"
                onClick={markAllNotificationsAsRead}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 rounded-lg transition-colors cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Marcar todas como leídas</span>
              </button>
            </div>
          </div>

          {/* Categories filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            {notificationCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setNotifCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${notifCategory === cat.id
                  ? 'bg-brand text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* List of Notifications */}
          {filteredNotifications.length === 0 ? (
            <EmptyState title="No hay notificaciones nuevas con estos criterios." />
          ) : (
            <div className="space-y-2.5">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  id={`notif-card-${notif.id}`}
                  onClick={() => openModal('notification_detail', notif)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${notif.read
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    : 'bg-brand-50/50 dark:bg-brand-950/30 border-brand-200/80 dark:border-brand-900/60 shadow-xs'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${notif.read
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        : 'bg-brand text-white'
                        }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {notif.title}
                        </h4>
                        {!notif.read && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-brand text-white">
                            Nueva
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2">
                        <span className="capitalize font-medium">{notif.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {notif.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {!notif.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationAsRead(notif.id);
                          showToast('Notificación marcada como leída');
                        }}
                        className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg"
                        title="Marcar como leída"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('notification_detail', notif);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-brand dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/60 rounded-lg"
                    >
                      Abrir detalle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4.2 MENSAJES (ESTILO CORREO ELECTRÓNICO MODERNO) */}
      {/* ========================================================================= */}
      {comunicacionesSubSection === 'mensajes' && (
        <div
          id="subseccion-mensajes-email-layout"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden min-h-[580px]"
        >
          {/* Left Panel: Conversations list (col-span-5) */}
          <div className="lg:col-span-5 border-r border-slate-200 dark:border-slate-800 flex flex-col">
            {/* Top action bar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                id="btn-new-message-composer"
                onClick={() => openModal('new_message')}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-brand hover:bg-brand-hover rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo mensaje</span>
              </button>

              <button
                onClick={() => setOnlyImportant((p) => !p)}
                className={`p-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${onlyImportant
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 border-amber-300 dark:border-amber-700'
                  : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                title="Filtrar importantes"
              >
                <Star className={`w-4 h-4 ${onlyImportant ? 'fill-amber-400 text-amber-500' : ''}`} />
              </button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-800/60">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar en mensajes o remitentes..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No tienes mensajes pendientes con estos filtros.
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isSelected = selectedConversation?.id === conv.id;
                  const lastMsg = conv.messages[conv.messages.length - 1];

                  return (
                    <div
                      key={conv.id}
                      id={`conversation-item-${conv.id}`}
                      onClick={() => setSelectedConversationId(conv.id)}
                      className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${isSelected
                        ? 'bg-brand-50/80 dark:bg-brand-950/50 border-l-4 border-brand'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                    >
                      <img
                        src={conv.avatar}
                        alt={conv.participant}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0 mt-0.5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {conv.participant}
                          </h4>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {conv.lastUpdated}
                          </span>
                        </div>
                        <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate mt-0.5">
                          {conv.subject}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {lastMsg?.text}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleConversationImportant(conv.id);
                        }}
                        className="shrink-0 p-1 text-slate-300 hover:text-amber-400 transition-colors"
                        title="Marcar como importante"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${conv.important ? 'fill-amber-400 text-amber-500' : ''
                            }`}
                        />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Selected Conversation (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full bg-slate-50/40 dark:bg-slate-950/20">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedConversation.avatar}
                      alt={selectedConversation.participant}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {selectedConversation.participant}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {selectedConversation.participantRole} · {selectedConversation.subject}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => archiveConversation(selectedConversation.id)}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Archivar conversación"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Message Thread History */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[420px]">
                  {selectedConversation.messages.map((msg) => {
                    const isMe = msg.senderRole === 'Familia';

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{msg.sender}</span>
                          <span>·</span>
                          <span>{msg.date} {msg.time}</span>
                        </div>

                        <div
                          className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${isMe
                            ? 'bg-brand text-white rounded-br-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs border border-slate-200/80 dark:border-slate-700'
                            }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>

                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mt-3 pt-2 border-t border-brand-400/40 dark:border-slate-700 space-y-1.5">
                              {msg.attachments.map((att) => (
                                <div
                                  key={att.id}
                                  onClick={() => showToast(`Descargando ${att.name}...`, 'success')}
                                  className="flex items-center justify-between p-2 rounded-lg bg-black/10 dark:bg-black/30 hover:bg-black/20 transition-colors cursor-pointer text-[11px]"
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <Paperclip className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate font-medium">{att.name}</span>
                                  </div>
                                  <Download className="w-3.5 h-3.5 shrink-0 ml-2 opacity-80" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Input Form */}
                <form
                  onSubmit={handleSendReply}
                  className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => showToast('Seleccione un archivo del explorador...', 'info')}
                    className="p-2 text-slate-400 hover:text-brand dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Adjuntar archivo"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Escriba su respuesta a la tutoría..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand/40"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand hover:bg-brand-hover rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Responder</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-slate-400">
                Selecciona una conversación para leer sus mensajes.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4.3 CIRCULARES */}
      {/* ========================================================================= */}
      {comunicacionesSubSection === 'circulares' && (
        <div id="subseccion-circulares" className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar circulares publicadas por el centro..."
                value={circularSearch}
                onChange={(e) => setCircularSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand/40"
              />
            </div>
            <span className="text-xs text-slate-500">
              {filteredCirculares.length} circulares disponibles
            </span>
          </div>

          {filteredCirculares.length === 0 ? (
            <EmptyState title="No hay circulares nuevas disponibles." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCirculares.map((circ) => (
                <div
                  key={circ.id}
                  id={`circular-card-${circ.id}`}
                  onClick={() => {
                    markCircularAsRead(circ.id);
                    openModal('circular_detail', circ);
                  }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-600 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300">
                        {circ.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {!circ.read && (
                          <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                        )}
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {circ.date}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                      {circ.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {circ.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" /> {circ.author}
                    </span>
                    <span className="text-brand-600 dark:text-brand-400 font-semibold group-hover:underline">
                      Abrir circular completa →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
