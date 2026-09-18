import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Filter,
  Search,
  Receipt,
  ArrowUpRight,
} from 'lucide-react';
import { InvoiceStatus, Invoice } from '../types';
import { EmptyState } from '../components/EmptyState';

export const FacturacionView: React.FC = () => {
  const { studentInvoices, currentStudent, openModal, showToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('todas');
  const [academicYearFilter, setAcademicYearFilter] = useState<string>('2025/2026');
  const [searchQuery, setSearchQuery] = useState('');

  // Financial summary calculations
  const financialSummary = useMemo(() => {
    const paidTotal = studentInvoices
      .filter((i) => i.status === 'pagada')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const pendingInvoices = studentInvoices.filter((i) => i.status === 'pendiente');
    const pendingTotal = pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0);

    const nextDue = pendingInvoices.length > 0 ? pendingInvoices[0].dueDate : 'Al corriente de pago';

    return { paidTotal, pendingTotal, nextDue, countPending: pendingInvoices.length };
  }, [studentInvoices]);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return studentInvoices.filter((inv) => {
      const matchStatus = statusFilter === 'todas' || inv.status === statusFilter;
      const matchYear = inv.academicYear === academicYearFilter;
      const matchSearch =
        inv.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.number.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchYear && matchSearch;
    });
  }, [studentInvoices, statusFilter, academicYearFilter, searchQuery]);

  return (
    <div id="facturacion-section-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Facturación y Recibos
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Estado de cuentas, cuotas escolares, comedor y servicios de <strong>{currentStudent.name}</strong>
          </p>
        </div>

        {/* Academic year selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Curso:</span>
          <select
            value={academicYearFilter}
            onChange={(e) => setAcademicYearFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-brand/40"
          >
            <option value="2025/2026">2025 / 2026</option>
            <option value="2024/2025">2024 / 2025</option>
          </select>
        </div>
      </div>

      {/* 5.1 RESUMEN FINANCIERO */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Pagado */}
        <div className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pagado</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {financialSummary.paidTotal.toFixed(2)} €
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              Recibos satisfechos
            </div>
          </div>
        </div>

        {/* Total Pendiente */}
        <div className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pendiente</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {financialSummary.pendingTotal.toFixed(2)} €
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
              {financialSummary.countPending} recibo(s) en tramitación
            </div>
          </div>
        </div>

        {/* Próximo Vencimiento */}
        <div className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand dark:text-brand-400 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Próximo Vencimiento</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {financialSummary.nextDue}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Domiciliación bancaria</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
        {/* Status Filters: Todas, Pagadas, Pendientes, Devueltas */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
          {['todas', 'pagada', 'pendiente', 'devuelta'].map((st) => (
            <button
              key={st}
              id={`filter-invoice-${st}`}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${statusFilter === st
                ? 'bg-brand text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
            >
              {st === 'todas' ? 'Todas' : st + 's'}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por concepto o Nº..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>

      {/* 5.2 LISTADO DE RECIBOS/FACTURAS */}
      {filteredInvoices.length === 0 ? (
        <EmptyState title="No se encontraron recibos con los filtros seleccionados" />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Nº Factura</th>
                  <th className="px-4 py-3.5">Emisión</th>
                  <th className="px-4 py-3.5">Vencimiento</th>
                  <th className="px-4 py-3.5">Concepto</th>
                  <th className="px-4 py-3.5">Alumno</th>
                  <th className="px-4 py-3.5 text-right">Importe</th>
                  <th className="px-4 py-3.5 text-center">Estado</th>
                  <th className="px-5 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    id={`invoice-row-${inv.id}`}
                    onClick={() => openModal('invoice_detail', inv)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-4 font-mono font-bold text-slate-900 dark:text-white">
                      {inv.number}
                    </td>
                    <td className="px-4 py-4">{inv.issueDate}</td>
                    <td className="px-4 py-4">{inv.dueDate}</td>
                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      {inv.concept}
                    </td>
                    <td className="px-4 py-4">{inv.studentName}</td>
                    <td className="px-4 py-4 text-right font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {inv.amount.toFixed(2)} €
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${inv.status === 'pagada'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : inv.status === 'pendiente'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-brand-100 text-brand-800 dark:bg-brand-950/60 dark:text-brand-300'
                          }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openModal('invoice_detail', inv)}
                        className="px-2.5 py-1 text-xs font-semibold text-brand dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/60 rounded-lg transition-colors cursor-pointer"
                      >
                        Ver Detalle
                      </button>
                      <button
                        onClick={() => showToast(`Descargando factura ${inv.number}.pdf...`, 'success')}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Descargar factura en PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
