import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  FolderTree,
  Folder,
  FileText,
  Download,
  UploadCloud,
  Search,
  CheckCircle,
  FileCheck,
  ShieldAlert,
  ClipboardList,
  Building,
} from 'lucide-react';
import { DocumentCategory, EducationalDocument } from '../types';
import { EmptyState } from '../components/EmptyState';

export const DocumentosView: React.FC = () => {
  const { studentDocuments, currentStudent, openModal, showToast } = useApp();

  // Exactly the 5 requested categories:
  // Autorizaciones, Justificantes, Informes, Documentos del centro, Formularios
  const categories: { id: DocumentCategory | 'todas'; label: string; icon: any }[] = [
    { id: 'todas', label: 'Todas las carpetas', icon: FolderTree },
    { id: 'autorizaciones', label: 'Autorizaciones', icon: ShieldAlert },
    { id: 'justificantes', label: 'Justificantes', icon: FileCheck },
    { id: 'informes', label: 'Informes', icon: FileText },
    { id: 'documentos_centro', label: 'Documentos del centro', icon: Building },
    { id: 'formularios', label: 'Formularios', icon: ClipboardList },
  ];

  const [activeCategory, setActiveCategory] = useState<DocumentCategory | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return studentDocuments.filter((doc) => {
      const matchCat = activeCategory === 'todas' || doc.category === activeCategory;
      const matchSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [studentDocuments, activeCategory, searchQuery]);

  return (
    <div id="documentos-section-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Repositorio de Documentos Escolares
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Descarga de autorizaciones, justificantes, normativas e informes de <strong>{currentStudent.name}</strong>
          </p>
        </div>

        {/* Action: Subir documento / justificante */}
        <button
          id="btn-upload-document"
          onClick={() => openModal('upload_document')}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Subir Documento / Justificante</span>
        </button>
      </div>

      {/* 9.1 ORGANIZADO POR CARPETAS / CATEGORÍAS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          const count =
            cat.id === 'todas'
              ? studentDocuments.length
              : studentDocuments.filter((d) => d.category === cat.id).length;

          return (
            <button
              key={cat.id}
              id={`doc-folder-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-xs shadow-brand-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-brand-600 dark:text-brand-400'}`} />
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                >
                  {count}
                </span>
              </div>
              <div className="text-xs font-bold mt-2 truncate">{cat.label}</div>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar documentos por nombre o formato..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <span className="text-xs text-slate-500">
          Mostrando {filteredDocuments.length} archivos
        </span>
      </div>

      {/* 9.2 LISTADO DE DOCUMENTOS */}
      {filteredDocuments.length === 0 ? (
        <EmptyState title="No se encontraron documentos en esta categoría" />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Nombre del Documento</th>
                  <th className="px-4 py-3.5">Carpeta</th>
                  <th className="px-4 py-3.5">Formato</th>
                  <th className="px-4 py-3.5">Fecha</th>
                  <th className="px-4 py-3.5">Tamaño</th>
                  <th className="px-4 py-3.5">Alumno</th>
                  <th className="px-5 py-3.5 text-right">Descargar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    id={`doc-row-${doc.id}`}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-brand-500 shrink-0" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {doc.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 capitalize text-slate-500">
                      {doc.category.replace('_', ' ')}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 uppercase">
                        {doc.fileType}
                      </span>
                    </td>
                    <td className="px-4 py-4">{doc.date}</td>
                    <td className="px-4 py-4 font-mono">{doc.size}</td>
                    <td className="px-4 py-4">{doc.studentName || 'Centro general'}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        id={`btn-dl-doc-${doc.id}`}
                        onClick={() => showToast(`Descargando documento "${doc.title}.${doc.fileType.toLowerCase()}"...`, 'success')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar</span>
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
