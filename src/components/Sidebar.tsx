import React from 'react';
import { useApp } from '../context/AppContext';
import {
    Calendar,
    MessageSquareText,
    CreditCard,
    GraduationCap,
    Clock,
    BookOpen,
    FolderTree,
    Sparkles,
    Settings,
    ChevronRight,
    Bell,
    Mail,
    FileCheck,
    User,
    Building,
    Languages,
    LayoutDashboard,
    Home,
    LogOut,
} from 'lucide-react';
import { MainSection } from '../types';
import { BrandIcon } from './BrandIcon';

export const Sidebar: React.FC = () => {
    const {
        activeSection,
        navigateTo,
        comunicacionesSubSection,
        configuracionSubSection,
        unreadNotificationsCount,
        unreadMessagesCount,
        unreadCircularesCount,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        currentStudent,
        openModal,
        t,
        logout,
    } = useApp();

    const totalComunicacionesUnread = unreadNotificationsCount + unreadMessagesCount + unreadCircularesCount;

    // The 9 MANDATORY navigation items strictly in order:
    const menuItems = [
        {
            id: 'agenda' as MainSection,
            name: t.navigation.agenda,
            icon: Calendar,
            badge: null,
        },
        {
            id: 'comunicaciones' as MainSection,
            name: t.navigation.comunicaciones,
            icon: MessageSquareText,
            badge: totalComunicacionesUnread > 0 ? totalComunicacionesUnread : null,
            subItems: [
                {
                    id: 'notificaciones',
                    name: t.comunicacionesTabs.notificaciones,
                    icon: Bell,
                    badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
                },
                {
                    id: 'mensajes',
                    name: t.comunicacionesTabs.mensajes,
                    icon: Mail,
                    badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
                },
                {
                    id: 'circulares',
                    name: t.comunicacionesTabs.circulares,
                    icon: FileCheck,
                    badge: unreadCircularesCount > 0 ? unreadCircularesCount : null,
                },
            ],
        },
        {
            id: 'facturacion' as MainSection,
            name: t.navigation.facturacion,
            icon: CreditCard,
            badge: null,
        },
        {
            id: 'calificaciones' as MainSection,
            name: t.navigation.calificaciones,
            icon: GraduationCap,
            badge: null,
        },
        {
            id: 'asistencia' as MainSection,
            name: t.navigation.asistencia,
            icon: Clock,
            badge: null,
        },
        {
            id: 'diarios' as MainSection,
            name: t.navigation.diarios,
            icon: BookOpen,
            badge: null,
        },
        {
            id: 'documentos' as MainSection,
            name: t.navigation.documentos,
            icon: FolderTree,
            badge: null,
        },
        {
            id: 'servicios' as MainSection,
            name: t.navigation.servicios,
            icon: Sparkles,
            badge: null,
        },
        {
            id: 'configuracion' as MainSection,
            name: t.navigation.configuracion,
            icon: Settings,
            badge: null,
            subItems: [
                {
                    id: 'configurar_inicio',
                    name: t.configuracionTabs.configurar_inicio,
                    icon: LayoutDashboard,
                },
                {
                    id: 'usuario',
                    name: t.configuracionTabs.usuario,
                    icon: User,
                },
            ],
        },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div
                    id="mobile-sidebar-backdrop"
                    className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Sidebar */}
            <aside
                id="app-main-sidebar"
                className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                    }`}
            >
                {/* Brand / Logo Header - Clicking returns to Inicio */}
                <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs">
                    <button
                        id="brand-home-link"
                        onClick={() => navigateTo('inicio')}
                        className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
                        title="Ir a Pantalla de Inicio"
                    >
                        {/* <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 via-brand-700 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
                            C
                        </div> */}
                        <BrandIcon className="w-8" />
                        <div>
                            <div className="font-bold text-xl text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                                <span>Cifra</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block font-medium">Portal Familias</span>
                        </div>
                    </button>
                </div>

                {/* Quick Link to Inicio if user is in an inner view */}
                <div className="px-3 pt-3 pb-1">
                    <button
                        id="nav-item-inicio-quick"
                        onClick={() => navigateTo('inicio')}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeSection === 'inicio'
                            ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60 shadow-2xs'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        <Home className="w-4 h-4 text-brand-500" />
                        <span>Panel principal</span>
                    </button>
                </div>

                {/* Navigation list containing EXCLUSIVELY the 9 items */}
                <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3">
                    Menú Principal
                </div>
                <nav
                    id="sidebar-navigation-menu"
                    className="flex-1 px-3 py-1 space-y-1 overflow-y-auto"
                    aria-label="Navegación principal"
                >
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <div key={item.id} className="space-y-0.5">
                                <button
                                    id={`nav-item-${item.id}`}
                                    onClick={() => navigateTo(item.id)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer ${isActive
                                        ? 'bg-brand-600 text-white font-semibold shadow-xs shadow-brand-600/30'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400'
                                                }`}
                                        />
                                        <span>{item.name}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        {item.badge !== null && item.badge > 0 && (
                                            <span
                                                className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full ${isActive
                                                    ? 'bg-white text-brand-700'
                                                    : 'bg-brand-500 text-white'
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.subItems && (
                                            <ChevronRight
                                                className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-90 text-white' : 'text-slate-400 group-hover:text-slate-600'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                </button>

                                {/* Sub-items rendering for Comunicaciones and Configuración */}
                                {item.subItems && isActive && (
                                    <div className="pl-9 pr-2 py-1 space-y-1">
                                        {item.subItems.map((sub) => {
                                            const SubIcon = sub.icon;
                                            const isSubActive =
                                                item.id === 'comunicaciones'
                                                    ? comunicacionesSubSection === sub.id
                                                    : configuracionSubSection === sub.id;

                                            return (
                                                <button
                                                    key={sub.id}
                                                    id={`nav-subitem-${sub.id}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigateTo(item.id, sub.id as any);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${isSubActive
                                                        ? 'bg-brand-100 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 font-semibold'
                                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 truncate">
                                                        <SubIcon className="w-3.5 h-3.5 shrink-0" />
                                                        <span className="truncate">{sub.name}</span>
                                                    </div>
                                                    {'badge' in sub && sub.badge ? (
                                                        <span className="shrink-0 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand-500 text-white">
                                                            {sub.badge}
                                                        </span>
                                                    ) : null}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Footer info in sidebar: Centro educativo asignado al alumno */}
                <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-[11px] text-slate-400 dark:text-slate-500">
                    <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-slate-700 dark:text-slate-300 truncate" title={currentStudent.school.name}>
                            {currentStudent.school.name}
                        </span>
                        <span className="text-[9px] font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 px-1.5 py-0.5 rounded shrink-0">
                            Asignado
                        </span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mb-1.5">
                        {currentStudent.name} · {currentStudent.school.type || 'Centro escolar'}
                    </div>
                    {/* <button
                        type="button"
                        id="sidebar-school-info-btn"
                        onClick={() => openModal('school_detail', currentStudent.school)}
                        className="w-full text-[10px] font-medium text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                    >
                        <Building className="w-3 h-3" />
                        <span>Ver datos del centro escolar</span>
                    </button> */}

                    <button
                        type="button"
                        id="sidebar-logout-btn"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            logout();
                        }}
                        className="w-full mt-3 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-[10px] font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/40 transition-colors cursor-pointer"
                        title="Cerrar sesión"
                    >
                        <LogOut className="w-3 h-3" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
