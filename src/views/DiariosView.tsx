import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Calendar,
  User,
  CheckSquare,
  Sparkles,
  Filter,
  Search,
} from 'lucide-react';
import { DailyDiary } from '../types';
import { EmptyState } from '../components/EmptyState';

export const DiariosView: React.FC = () => {
  const { studentDiaries, currentStudent } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<string>('todas');
  const [selectedDate, setSelectedDate] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique subjects
  const subjectsList = useMemo(() => {
    const subs = Array.from(new Set(studentDiaries.map((d) => d.subject)));
    return ['todas', ...subs];
  }, [studentDiaries]);

  // Filtered diaries
  const filteredDiaries = useMemo(() => {
    return studentDiaries.filter((d) => {
      const matchSub = selectedSubject === 'todas' || d.subject === selectedSubject;
      const matchDate = selectedDate === 'todas' || d.date === selectedDate;
      const matchSearch =
        d.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.homework.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.subject.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSub && matchDate && matchSearch;
    });
  }, [studentDiaries, selectedSubject, selectedDate, searchTerm]);

  return (
    <div id="diarios-section-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Diario de Clase y Seguimiento Pedagógico
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Registro diario de contenidos trabajados, deberes y observaciones para <strong>{currentStudent.name}</strong>
          </p>
        </div>
      </div>

      {/* Filters bar: Asignatura, Fecha, Búsqueda */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="btn-w-100 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            {subjectsList.map((s) => (
              <option key={s} value={s}>
                {s === 'todas' ? 'Todas las asignaturas' : s}
              </option>
            ))}
          </select>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="btn-w-100 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            <option value="todas">Todas las fechas</option>
            <option value="2026-09-16">Hoy (16 Sept 2026)</option>
            <option value="2026-09-15">Ayer (15 Sept 2026)</option>
          </select>
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar en tareas o contenidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Diaries List */}
      {filteredDiaries.length === 0 ? (
        <EmptyState title="No hay entradas en el diario con los filtros indicados" />
      ) : (
        <div className="space-y-4">
          {filteredDiaries.map((diary) => (
            <div
              key={diary.id}
              id={`diary-entry-${diary.id}`}
              className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow space-y-3"
            >
              {/* Header row: Subject, Teacher, Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {diary.subject}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" /> Prof. {diary.teacher}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 self-start sm:self-auto bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-brand-500" />
                  <span>{diary.date}</span>
                </div>
              </div>

              {/* Contenido trabajado */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Contenido Trabajado en Clase
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/70 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  {diary.content}
                </p>
              </div>

              {/* Grid: Tareas asignadas & Comportamiento/Seguimiento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Tareas */}
                <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                    <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tareas y Deberes para Casa</span>
                  </div>
                  <p className="text-xs text-amber-900/90 dark:text-amber-200/90">
                    {diary.homework || 'Sin tareas obligatorias.'}
                  </p>
                </div>

                {/* Comportamiento */}
                <div className="p-3 rounded-lg bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 dark:text-sky-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Comportamiento y Actitud</span>
                  </div>
                  <p className="text-xs text-sky-900/90 dark:text-sky-200/90">
                    {diary.behavior || 'Comportamiento y trabajo adecuado en el aula.'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
