import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Filter,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Info,
} from 'lucide-react';
import { AgendaViewMode, EventType, AgendaEvent } from '../types';
import { EmptyState } from '../components/EmptyState';

export const AgendaView: React.FC = () => {
  const { studentAgendaEvents, currentStudent, openModal } = useApp();

  const [viewMode, setViewMode] = useState<AgendaViewMode>('dia');
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-09-16');

  // Filter types list according to prompt
  const filterOptions = [
    { id: 'todos', label: 'Todos' },
    { id: 'clase', label: 'Clases' },
    { id: 'examen', label: 'Exámenes' },
    { id: 'evento', label: 'Eventos' },
    { id: 'reunion', label: 'Reuniones' },
    { id: 'actividad', label: 'Actividades' },
    { id: 'otros', label: 'Otros' },
  ];

  // Filtered events
  const filteredEvents = useMemo(() => {
    return studentAgendaEvents.filter((ev) => {
      if (selectedFilter === 'todos') return true;
      return ev.type === selectedFilter;
    });
  }, [studentAgendaEvents, selectedFilter]);

  // Events for day view
  const dayEvents = useMemo(() => {
    return filteredEvents
      .filter((ev) => ev.date === selectedDateStr || ev.dayOfWeek === 3)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [filteredEvents, selectedDateStr]);

  // Days of week for week view
  const weekDays = [
    { name: 'Lunes', short: 'Lun', date: '2026-09-14', dayNum: 1 },
    { name: 'Martes', short: 'Mar', date: '2026-09-15', dayNum: 2 },
    { name: 'Miércoles', short: 'Mié', date: '2026-09-16', dayNum: 3 },
    { name: 'Jueves', short: 'Jue', date: '2026-09-17', dayNum: 4 },
    { name: 'Viernes', short: 'Vie', date: '2026-09-18', dayNum: 5 },
    { name: 'Sábado', short: 'Sáb', date: '2026-09-19', dayNum: 6 },
    { name: 'Domingo', short: 'Dom', date: '2026-09-20', dayNum: 7 },
  ];

  // Helper badge for event type
  const renderTypeBadge = (type: EventType) => {
    const map: Record<EventType, string> = {
      clase: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
      examen: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 font-bold',
      evento: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
      reunion: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      actividad: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      otros: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wide font-semibold ${
          map[type] || map.otros
        }`}
      >
        {type}
      </span>
    );
  };

  return (
    <div id="agenda-section-view" className="space-y-6 pb-12">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Agenda Escolar
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Horario lectivo, exámenes, eventos y tutorías de <strong>{currentStudent.name}</strong>
          </p>
        </div>

        {/* View Mode Switcher (Día / Semana / Mes) */}
        <div
          id="agenda-view-mode-selector"
          className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto"
        >
          <button
            id="agenda-mode-dia-btn"
            onClick={() => setViewMode('dia')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'dia'
                ? 'bg-white dark:bg-slate-700 text-brand dark:text-brand-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Día
          </button>
          <button
            id="agenda-mode-semana-btn"
            onClick={() => setViewMode('semana')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'semana'
                ? 'bg-white dark:bg-slate-700 text-brand dark:text-brand-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Semana
          </button>
          <button
            id="agenda-mode-mes-btn"
            onClick={() => setViewMode('mes')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'mes'
                ? 'bg-white dark:bg-slate-700 text-brand dark:text-brand-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Mes
          </button>
        </div>
      </div>

      {/* Filter Badges: Todos, Clases, Exámenes, Eventos, Reuniones, Actividades, Otros */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1" id="agenda-filters-container">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            id={`agenda-filter-${opt.id}`}
            onClick={() => setSelectedFilter(opt.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === opt.id
                ? 'bg-brand text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 3.1 VISTA DÍA */}
      {viewMode === 'dia' && (
        <div id="agenda-day-view-container" className="space-y-4">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-brand" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Miércoles, 16 de Septiembre de 2026
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {dayEvents.length} eventos programados
            </span>
          </div>

          {dayEvents.length === 0 ? (
            <EmptyState title="No hay acontecimientos para este día con el filtro seleccionado" />
          ) : (
            <div className="space-y-3">
              {dayEvents.map((ev) => (
                <div
                  key={ev.id}
                  id={`agenda-event-${ev.id}`}
                  onClick={() => openModal('event_detail', ev)}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand/40 dark:hover:border-brand/50 hover:shadow-xs transition-all cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold">
                        <Clock className="w-3.5 h-3.5 text-brand" />
                        <span>{ev.startTime} - {ev.endTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {ev.title}
                      </h3>
                    </div>
                    <div>{renderTypeBadge(ev.type)}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {ev.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.location}
                      </span>
                    )}
                    {ev.teacher && (
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" /> {ev.teacher}
                      </span>
                    )}
                    {ev.description && (
                      <span className="flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-400" /> {ev.description}
                      </span>
                    )}
                  </div>

                  {ev.homework && (
                    <div className="mt-3 p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <strong>Deberes:</strong> {ev.homework}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3.2 VISTA SEMANA */}
      {viewMode === 'semana' && (
        <div id="agenda-week-view-container" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-7 gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 text-center font-bold text-xs">
              {weekDays.map((d) => (
                <div
                  key={d.dayNum}
                  className={`p-2 rounded-lg ${
                    d.dayNum === 3
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-bold'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="uppercase tracking-wider text-[10px] text-slate-400">{d.short}</div>
                  <div className="text-sm font-bold">{d.name}</div>
                  <div className="text-[11px] font-normal text-slate-400">{d.date.slice(8)} Sept</div>
                </div>
              ))}
            </div>

            {/* Weekly Grid Columns */}
            <div className="grid grid-cols-7 gap-2 pt-3 min-h-[380px]">
              {weekDays.map((d) => {
                const colEvents = filteredEvents.filter(
                  (ev) => ev.date === d.date || ev.dayOfWeek === d.dayNum
                );

                return (
                  <div
                    key={d.dayNum}
                    className="flex flex-col gap-2 p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50"
                  >
                    {colEvents.length === 0 ? (
                      <div className="text-center py-8 text-[11px] text-slate-400">Sin eventos</div>
                    ) : (
                      colEvents.map((ev) => (
                        <div
                          key={ev.id}
                          onClick={() => openModal('event_detail', ev)}
                          className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all hover:scale-[1.02] shadow-2xs ${
                            ev.type === 'examen'
                              ? 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-200'
                              : ev.type === 'reunion'
                              ? 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-200'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                            {ev.startTime}
                          </div>
                          <div className="text-xs font-bold truncate mt-0.5">{ev.title}</div>
                          {ev.location && (
                            <div className="text-[10px] text-slate-400 truncate mt-0.5">
                              {ev.location}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3.3 VISTA MES */}
      {viewMode === 'mes' && (
        <div id="agenda-month-view-container" className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Septiembre 2026
              </h3>
              <div className="text-xs text-slate-500">
                Pulsar sobre un día para ver los acontecimientos
              </div>
            </div>

            {/* Calendar grid: Mon to Sun */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mié</span>
              <span>Jue</span>
              <span>Vie</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-3">
              {/* Sept 2026 starts on Tuesday (day 2), so 1 blank for Monday */}
              <div className="p-2 text-center text-slate-300 dark:text-slate-700">31</div>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((dayNum) => {
                const dayStr = `2026-09-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                const hasEvents = filteredEvents.some((ev) => ev.date === dayStr);
                const isSelected = selectedDateStr === dayStr;

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDateStr(dayStr)}
                    className={`min-h-[64px] p-2 rounded-xl text-left flex flex-col justify-between border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand bg-brand-50/70 dark:bg-brand-950/50 ring-2 ring-brand/20'
                        : 'border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        isSelected
                          ? 'text-brand dark:text-brand-400'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {hasEvents && (
                      <div className="flex gap-1 flex-wrap mt-1">
                        <span className="w-2 h-2 rounded-full bg-brand"></span>
                        {dayNum === 19 && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                        {dayNum === 17 && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected day events preview */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-brand" />
              Acontecimientos para el día seleccionado: {selectedDateStr}
            </h4>

            {filteredEvents.filter((e) => e.date === selectedDateStr).length === 0 ? (
              <div className="text-xs text-slate-500 py-3">
                No hay acontecimientos programados para esta fecha concreta.
              </div>
            ) : (
              <div className="space-y-2">
                {filteredEvents
                  .filter((e) => e.date === selectedDateStr)
                  .map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => openModal('event_detail', ev)}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-brand/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-brand dark:text-brand-400">
                          {ev.startTime}
                        </span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {ev.title}
                        </span>
                      </div>
                      {renderTypeBadge(ev.type)}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
