import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Download,
  TrendingUp,
  Award,
  ChevronDown,
  Info,
  BookOpen,
} from 'lucide-react';
import { EvaluationPeriod, GradeRecord } from '../types';
import { EmptyState } from '../components/EmptyState';

export const CalificacionesView: React.FC = () => {
  const { studentGrades, currentStudent, openModal, showToast } = useApp();

  // Exactly the 4 specified evaluation options in prompt:
  // "1ª Evaluación", "2ª Evaluación", "3ª Evaluación", "Extraordinaria — Septiembre"
  // "No pongas 4ª evaluación."
  const evaluationOptions: { id: EvaluationPeriod; label: string }[] = [
    { id: '1a_evaluacion', label: '1ª Evaluación' },
    { id: '2a_evaluacion', label: '2ª Evaluación' },
    { id: '3a_evaluacion', label: '3ª Evaluación' },
    { id: 'extraordinaria', label: 'Extraordinaria — Septiembre' },
  ];

  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationPeriod>('1a_evaluacion');
  const [selectedYear, setSelectedYear] = useState<string>('2025/2026');

  // Filter grades for selected evaluation and year
  const currentGrades = useMemo(() => {
    return studentGrades.filter(
      (g) => g.evaluation === selectedEvaluation && g.academicYear === selectedYear
    );
  }, [studentGrades, selectedEvaluation, selectedYear]);

  // Calculate average grade
  const averageGrade = useMemo(() => {
    if (currentGrades.length === 0) return 0;
    const sum = currentGrades.reduce((acc, curr) => acc + curr.score, 0);
    return Number((sum / currentGrades.length).toFixed(2));
  }, [currentGrades]);

  // Color helper for grade scores
  const getGradeBadge = (score: number) => {
    if (score >= 9) {
      return {
        bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
        label: 'Sobresaliente',
      };
    }
    if (score >= 7) {
      return {
        bg: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
        label: 'Notable',
      };
    }
    if (score >= 6) {
      return {
        bg: 'bg-brand-100 text-brand-800 dark:bg-brand-950/60 dark:text-brand-300',
        label: 'Bien',
      };
    }
    if (score >= 5) {
      return {
        bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
        label: 'Suficiente',
      };
    }
    return {
      bg: 'bg-brand-100 text-brand-800 dark:bg-brand-950/60 dark:text-brand-300',
      label: 'Insuficiente',
    };
  };

  return (
    <div id="calificaciones-section-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Calificaciones y Rendimiento Académico
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Expediente de <strong>{currentStudent.name}</strong> ({currentStudent.course})
          </p>
        </div>

        {/* Academic Year Selector & Download PDF */}
        <div className="flex items-center flex-wrap gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="btn-w-100 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-brand/40"
          >
            <option value="2025/2026">Curso 2025 / 2026</option>
            <option value="2024/2025">Curso 2024 / 2025</option>
          </select>

          <button
            id="btn-download-grades-pdf"
            onClick={() =>
              showToast(
                `Generando y descargando Boletín de Notas oficial (${evaluationOptions.find(o => o.id === selectedEvaluation)?.label}).pdf...`,
                'success'
              )
            }
            className="btn-w-100 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-brand hover:bg-brand-hover rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Boletín Oficial (PDF)</span>
          </button>
        </div>
      </div>

      {/* 6.1 SELECTOR DE EVALUACIÓN (EXACTAMENTE LAS 4 ESPECIFICADAS) */}
      <div
        id="evaluation-period-selector"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700"
      >
        {evaluationOptions.map((opt) => (
          <button
            key={opt.id}
            id={`eval-tab-${opt.id}`}
            onClick={() => setSelectedEvaluation(opt.id)}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${selectedEvaluation === opt.id
              ? 'bg-white dark:bg-slate-900 text-brand dark:text-brand-400 shadow-xs ring-1 ring-slate-200/50 dark:ring-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 6.2 INDICADOR VISUAL DE RENDIMIENTO Y MEDIA */}
      {currentGrades.length > 0 && (
        <div className="p-5 rounded-lg bg-gradient-to-r from-brand-50 via-slate-50 to-white dark:from-brand-950/40 dark:via-slate-900 dark:to-slate-900 border border-brand-100 dark:border-brand-900/50 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-brand text-white flex items-center justify-center font-black text-2xl font-mono shadow-md shadow-brand/20">
              {averageGrade}
            </div>
            <div>
              <div className="text-xs font-bold text-brand dark:text-brand-400 uppercase tracking-wider">
                Nota Media Global
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {averageGrade >= 7 ? 'Rendimiento Excelente' : 'Rendimiento Favorable'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Calculado sobre {currentGrades.length} asignaturas evaluadas
              </div>
            </div>
          </div>

          {/* Mini Performance distribution bar */}
          <div className="w-full md:w-80 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Progreso del curso</span>
              <span>{Math.round((averageGrade / 10) * 100)}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${(averageGrade / 10) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.0</span>
              <span>Media 5.0</span>
              <span>10.0</span>
            </div>
          </div>
        </div>
      )}

      {/* 6.3 VISTA POR ASIGNATURAS CON DESGLOSE */}
      {currentGrades.length === 0 ? (
        <EmptyState title="No constan calificaciones publicadas para este periodo de evaluación" />
      ) : (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Detalle por Asignatura ({currentGrades.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentGrades.map((grade) => {
              const badge = getGradeBadge(grade.score);

              return (
                <div
                  key={grade.id}
                  id={`grade-card-${grade.id}`}
                  onClick={() => openModal('grade_detail', grade)}
                  className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand/40 dark:hover:border-brand/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Subject + Score */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {grade.subject}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Prof. {grade.teacher}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-black text-slate-900 dark:text-white font-mono leading-none">
                          {grade.score.toFixed(1)}
                        </div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                    </div>

                    {/* Observaciones del profesor */}
                    <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-0.5 text-[11px]">
                        Observaciones del profesor:
                      </strong>
                      "{grade.observations}"
                    </div>

                    {/* Desglose de notas (exámenes, trabajos, actitud, etc.) */}
                    {grade.breakdown && grade.breakdown.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Desglose de la calificación:
                        </div>
                        <div className="space-y-1.5">
                          {grade.breakdown.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                                <span>{item.concept}</span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  ({item.weight}%)
                                </span>
                              </div>
                              <span className="font-mono font-bold text-slate-900 dark:text-white">
                                {item.score.toFixed(1)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{grade.academicYear}</span>
                    <span className="text-brand dark:text-brand-400 font-semibold group-hover:underline">
                      Ver informe completo →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
