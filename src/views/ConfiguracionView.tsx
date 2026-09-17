import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Building,
  Languages,
  LayoutDashboard,
  Save,
  RotateCcw,
  Check,
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Smartphone,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Eye,
  EyeOff,
  Bell,
  FileCheck,
  Calendar,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { ConfiguracionSubSection, DashboardModuleConfig, DashboardModuleId } from '../types';

export const ConfiguracionView: React.FC = () => {
  const {
    configuracionSubSection,
    setConfiguracionSubSection,
    userProfile,
    updateUserProfile,
    schoolInfo,
    currentStudent,
    openModal,
    language,
    setLanguage,
    dashboardModules,
    setDashboardModules,
    toggleDashboardModule,
    moveDashboardModule,
    saveDashboardModules,
    resetDashboardModules,
    navigateTo,
    showToast,
    t,
  } = useApp();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const newModules = [...dashboardModules];
    const [moved] = newModules.splice(draggedIndex, 1);
    newModules.splice(targetIndex, 0, moved);
    setDashboardModules(newModules);
    setDraggedIndex(null);
  };

  const getModuleVisuals = (id: DashboardModuleId) => {
    switch (id) {
      case 'notificaciones':
        return {
          icon: Bell,
          color: 'text-brand-600 dark:text-brand-400',
          bg: 'bg-brand-50 dark:bg-brand-950/50',
          border: 'border-brand-200 dark:border-brand-800',
        };
      case 'mensajes':
        return {
          icon: Mail,
          color: 'text-sky-600 dark:text-sky-400',
          bg: 'bg-sky-50 dark:bg-sky-950/50',
          border: 'border-sky-200 dark:border-sky-800',
        };
      case 'circulares':
        return {
          icon: FileCheck,
          color: 'text-emerald-600 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-950/50',
          border: 'border-emerald-200 dark:border-emerald-800',
        };
      case 'eventos_proximos':
        return {
          icon: Calendar,
          color: 'text-amber-600 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-950/50',
          border: 'border-amber-200 dark:border-amber-800',
        };
      case 'proximas_clases':
        return {
          icon: Clock,
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-50 dark:bg-blue-950/50',
          border: 'border-blue-200 dark:border-blue-800',
        };
      case 'ultima_factura':
        return {
          icon: CreditCard,
          color: 'text-purple-600 dark:text-purple-400',
          bg: 'bg-purple-50 dark:bg-purple-950/50',
          border: 'border-purple-200 dark:border-purple-800',
        };
      case 'graficas_asistencia':
        return {
          icon: TrendingUp,
          color: 'text-teal-600 dark:text-teal-400',
          bg: 'bg-teal-50 dark:bg-teal-950/50',
          border: 'border-teal-200 dark:border-teal-800',
        };
    }
  };

  // Local state for user profile form
  const [profileForm, setProfileForm] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address || '',
    notifyEmail: userProfile?.notificationsEnabled?.email ?? true,
    notifyApp: userProfile?.notificationsEnabled?.appPush ?? true,
    notifySms: userProfile?.notificationsEnabled?.sms ?? false,
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      address: profileForm.address,
      notificationsEnabled: {
        ...(userProfile?.notificationsEnabled || {
          academicUpdates: true,
          invoices: true,
        }),
        email: profileForm.notifyEmail,
        appPush: profileForm.notifyApp,
        sms: profileForm.notifySms,
      },
    });
  };

  const tabs: { id: ConfiguracionSubSection; label: string; icon: any }[] = [
    { id: 'configurar_inicio', label: t.configuracionTabs.configurar_inicio, icon: LayoutDashboard },
    { id: 'usuario', label: t.configuracionTabs.usuario, icon: User },
    { id: 'idioma', label: t.configuracionTabs.idioma, icon: Languages },
  ];

  return (
    <div id="configuracion-section-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Configuración y Preferencias
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ajustes de cuenta familiar, orden de la pantalla de inicio e idioma
          </p>
        </div>

        {/* 3 Tabs Selector: Configurar inicio, Usuario, Idioma */}
        <div
          id="configuracion-subtabs-container"
          className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-wrap gap-1"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = configuracionSubSection === tab.id;

            return (
              <button
                key={tab.id}
                id={`config-tab-${tab.id}`}
                onClick={() => setConfiguracionSubSection(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${isSelected
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Aviso informativo de solo consulta sobre el centro educativo asignado */}
      <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Centro escolar asignado: {currentStudent.school?.name || schoolInfo.name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Asignación oficial
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
              El centro educativo no es configurable por el usuario. Es el asignado oficialmente al alumno ({currentStudent.name}) al que acude a clases.
            </p>
          </div>
        </div>
        <button
          type="button"
          id="config-view-assigned-school-btn"
          onClick={() => openModal('school_detail', currentStudent.school || schoolInfo)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Consultar ficha del centro</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 11.1 USUARIO */}
      {/* ========================================================================= */}
      {configuracionSubSection === 'usuario' && (
        <form
          id="form-configuracion-usuario"
          onSubmit={handleProfileSubmit}
          className="max-w-2xl bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6"
        >
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-500/20"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {userProfile.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Perfil de Familia · Cuentas vinculadas: Lucía García (2º ESO B) y Pablo García (5º Primaria A)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Datos Personales
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  required
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Dirección Postal
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Preferencias de notificación */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Preferencias de Notificación
            </h4>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileForm.notifyEmail}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, notifyEmail: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-600 rounded-sm border-slate-300 focus:ring-brand-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Notificaciones por Correo Electrónico
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Recibir avisos importantes, circulares y facturación por email
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileForm.notifyApp}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, notifyApp: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-600 rounded-sm border-slate-300 focus:ring-brand-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Notificaciones en la Aplicación
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Avisos en tiempo real sobre asistencia, calificaciones y mensajes
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileForm.notifySms}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, notifySms: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-600 rounded-sm border-slate-300 focus:ring-brand-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Notificaciones por SMS de Emergencia
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Alertas urgentes sobre incidencias climatológicas o de salud
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              id="btn-save-user-profile"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* CENTRO EDUCATIVO ASIGNADO (DE SOLO LECTURA, NO CONFIGURABLE) */}
      {/* ========================================================================= */}
      {configuracionSubSection === 'centro' && (
        <div className="max-w-2xl bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-amber-800 dark:text-amber-200 text-xs">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Aviso sobre el centro educativo:</p>
              <p className="mt-0.5">
                El centro educativo no es configurable. Es el que tiene asignado oficialmente el alumno (<strong>{currentStudent.name}</strong>), es decir, el centro educativo al que acude para sus estudios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xl">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {currentStudent.school?.name || schoolInfo.name}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  Asignado a {currentStudent.name}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Código oficial: {currentStudent.school?.code || schoolInfo.code} · {currentStudent.school?.type || 'Centro escolar'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">Dirección</div>
                <div className="text-slate-500 mt-0.5">{currentStudent.school?.address || schoolInfo.address}</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
              <Phone className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">Teléfono</div>
                <div className="text-slate-500 mt-0.5">{currentStudent.school?.phone || schoolInfo.phone}</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">Correo Electrónico</div>
                <div className="text-slate-500 mt-0.5">{currentStudent.school?.email || schoolInfo.email}</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
              <Clock className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">Horarios de Atención</div>
                <div className="text-slate-500 mt-0.5">{currentStudent.school?.officeHours || schoolInfo.officeHours}</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-brand-50/50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/50 text-xs">
            <h4 className="font-bold text-brand-900 dark:text-brand-200 mb-2">
              Datos Escolares de {currentStudent.name}
            </h4>
            <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
              <div><strong>Curso y Grupo:</strong> {currentStudent.course}</div>
              <div><strong>Aula Asignada:</strong> {currentStudent.classroom}</div>
              <div><strong>Tutor/a del Alumno:</strong> {currentStudent.tutor}</div>
              <div><strong>Dirección del Centro:</strong> {currentStudent.school?.principal || schoolInfo.principal}</div>
              <div><strong>Jefatura de Estudios:</strong> {currentStudent.school?.headOfStudies || schoolInfo.headOfStudies}</div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setConfiguracionSubSection('configurar_inicio')}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors cursor-pointer"
            >
              Ir a Configurar Pantalla de Inicio
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11.3 IDIOMA */}
      {/* ========================================================================= */}
      {configuracionSubSection === 'idioma' && (
        <div className="max-w-2xl bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Idioma de la Plataforma
          </h3>
          <p className="text-xs text-slate-500">
            Selecciona el idioma preferido para todos los menús, notificaciones e informes de la plataforma.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              id="btn-lang-es"
              onClick={() => {
                setLanguage('es');
                showToast('Idioma cambiado a Español', 'success');
              }}
              className={`p-4 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${language === 'es'
                ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-600 text-brand-900 dark:text-brand-200 ring-2 ring-brand-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇪🇸</span>
                <div>
                  <div className="text-xs font-bold">Español (España)</div>
                  <div className="text-[11px] text-slate-400">Predeterminado</div>
                </div>
              </div>
              {language === 'es' && <Check className="w-4 h-4 text-brand-600" />}
            </button>

            <button
              id="btn-lang-en"
              onClick={() => {
                setLanguage('en');
                showToast('Language set to English', 'success');
              }}
              className={`p-4 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${language === 'en'
                ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-600 text-brand-900 dark:text-brand-200 ring-2 ring-brand-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇬🇧</span>
                <div>
                  <div className="text-xs font-bold">English (UK)</div>
                  <div className="text-[11px] text-slate-400">International</div>
                </div>
              </div>
              {language === 'en' && <Check className="w-4 h-4 text-brand-600" />}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11.4 CONFIGURAR PANTALLA DE INICIO (USER REQUIREMENT) */}
      {/* ========================================================================= */}
      {configuracionSubSection === 'configurar_inicio' && (
        <div id="configurar-pantalla-inicio-container" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Reordering list & controls */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Configuración de la Pantalla de Inicio
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Selecciona qué opciones deseas ver y organiza su orden de aparición en el panel de inicio.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full border border-brand-100 dark:border-brand-900/40">
                    {dashboardModules.filter((m) => m.enabled).length} de {dashboardModules.length} activos
                  </span>
                </div>
              </div>

              {/* Instructions banner */}
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
                <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Utiliza las flechas <strong className="text-slate-900 dark:text-white">Subir (↑)</strong> y <strong className="text-slate-900 dark:text-white">Bajar (↓)</strong> o arrastra las tarjetas para cambiar su orden. Haz clic en el botón de visibilidad para mostrar u ocultar cualquier módulo.
                </p>
              </div>

              {/* List of 7 modules */}
              <div className="space-y-3" id="config-modules-list">
                {dashboardModules.map((mod, index) => {
                  const visuals = getModuleVisuals(mod.id);
                  const Icon = visuals.icon;
                  const isFirst = index === 0;
                  const isLast = index === dashboardModules.length - 1;

                  return (
                    <div
                      key={mod.id}
                      id={`module-item-${mod.id}`}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={() => handleDrop(index)}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-lg border transition-all gap-3 ${mod.enabled
                        ? 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 shadow-xs hover:border-brand-300 dark:hover:border-brand-700'
                        : 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                        } ${draggedIndex === index ? 'opacity-50 ring-2 ring-brand-500' : ''}`}
                    >
                      {/* Left: Drag Handle, Order Badge, Icon, Title & Description */}
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Drag Handle */}
                        <div
                          className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-300 hidden sm:block p-1"
                          title="Arrastra para reordenar"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* Order badge */}
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${mod.enabled
                            ? 'bg-brand-600 text-white shadow-xs'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                            }`}
                        >
                          {index + 1}º
                        </div>

                        {/* Icon */}
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${visuals.bg} ${visuals.color} border ${visuals.border}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Details */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {mod.title || mod.name}
                            </span>
                            {!mod.enabled && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                Oculto
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {mod.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Visibility Toggle & Order Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                        {/* Visibility Button */}
                        <button
                          type="button"
                          id={`btn-toggle-mod-${mod.id}`}
                          onClick={() => toggleDashboardModule(mod.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${mod.enabled
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                            }`}
                          title={mod.enabled ? 'Ocultar del inicio' : 'Mostrar en el inicio'}
                        >
                          {mod.enabled ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Visible</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Oculto</span>
                            </>
                          )}
                        </button>

                        {/* Move Up Button */}
                        <button
                          type="button"
                          id={`btn-move-up-${mod.id}`}
                          onClick={() => moveDashboardModule(index, 'up')}
                          disabled={isFirst}
                          className={`p-1.5 rounded-lg border text-slate-600 dark:text-slate-300 transition-colors ${isFirst
                            ? 'opacity-30 cursor-not-allowed border-transparent'
                            : 'hover:bg-brand-50 dark:hover:bg-brand-950/60 hover:text-brand-600 dark:hover:text-brand-400 border-slate-200 dark:border-slate-700 cursor-pointer'
                            }`}
                          title="Subir de posición"
                          aria-label={`Subir ${mod.title}`}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>

                        {/* Move Down Button */}
                        <button
                          type="button"
                          id={`btn-move-down-${mod.id}`}
                          onClick={() => moveDashboardModule(index, 'down')}
                          disabled={isLast}
                          className={`p-1.5 rounded-lg border text-slate-600 dark:text-slate-300 transition-colors ${isLast
                            ? 'opacity-30 cursor-not-allowed border-transparent'
                            : 'hover:bg-brand-50 dark:hover:bg-brand-950/60 hover:text-brand-600 dark:hover:text-brand-400 border-slate-200 dark:border-slate-700 cursor-pointer'
                            }`}
                          title="Bajar de posición"
                          aria-label={`Bajar ${mod.title}`}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    id="btn-save-dashboard-config"
                    onClick={saveDashboardModules}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-xs transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Configuración</span>
                  </button>

                  <button
                    id="btn-reset-dashboard-config"
                    onClick={resetDashboardModules}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restablecer por defecto</span>
                  </button>
                </div>

                <button
                  id="btn-goto-dashboard"
                  onClick={() => navigateTo('inicio')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 transition-colors cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Ver en Pantalla de Inicio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Live Scheme Preview */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <LayoutDashboard className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Esquema en Vivo de Inicio
                  </h4>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Previsualización del orden resultante en el panel principal:
                </p>

                {/* Ordered preview list */}
                <div className="space-y-2">
                  {dashboardModules.map((mod, i) => {
                    const visuals = getModuleVisuals(mod.id);
                    const Icon = visuals.icon;

                    return (
                      <div
                        key={mod.id}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${mod.enabled
                          ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200'
                          : 'bg-slate-50/40 dark:bg-slate-900 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 line-through'
                          }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${mod.enabled
                              ? 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300'
                              : 'bg-slate-200 text-slate-400 dark:bg-slate-800'
                              }`}
                          >
                            {i + 1}
                          </span>
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${mod.enabled ? visuals.color : 'text-slate-400'}`} />
                          <span className="truncate">{mod.title || mod.name}</span>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${mod.enabled
                            ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                            : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                            }`}
                        >
                          {mod.enabled ? 'Activo' : 'Oculto'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('inicio')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Ir a la Pantalla de Inicio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Informative advice card */}
              <div className="p-4 rounded-lg bg-brand-50/60 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/40 text-xs text-brand-900 dark:text-brand-200 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Personalización Flexible</span>
                </div>
                <p className="text-[11px] leading-relaxed text-brand-800/80 dark:text-brand-300/80">
                  Cualquier ajuste que guardes aquí se recordará en este dispositivo y se reflejará al instante en tu vista de inicio para ambos alumnos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
