import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
    Menu,
    ChevronDown,
    Sun,
    Moon,
    Bell,
    Check,
    GraduationCap,
    Home,
    User,
    Building,
    LogOut,
} from 'lucide-react';
import { StudentId } from '../types';

export const Header: React.FC = () => {
    const {
        students,
        currentStudentId,
        setCurrentStudentId,
        currentStudent,
        openModal,
        theme,
        toggleTheme,
        language,
        setLanguage,
        unreadNotificationsCount,
        navigateTo,
        activeSection,
        setIsMobileMenuOpen,
        userProfile,
        t,
        logout,
    } = useApp();

    const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsStudentDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header
            id="app-main-header"
            className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors"
        >
            <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
                {/* Left side: Hamburger + Breadcrumb/Title */}
                <div className="flex items-center gap-3">
                    <button
                        id="mobile-menu-toggle-btn"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden focus:ring-2 focus:ring-brand-500 cursor-pointer"
                        aria-label="Abrir menú de navegación"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Quick Breadcrumb / Section Label */}
                    <div className="flex items-center gap-2">
                        <button
                            id="header-home-btn"
                            onClick={() => navigateTo('inicio')}
                            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Ir al inicio"
                        >
                            <Home className="w-3.5 h-3.5" />
                            <span>Inicio</span>
                        </button>
                        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">/</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 capitalize font-display">
                            {activeSection === 'inicio' ? 'Pantalla de Inicio' : t.navigation[activeSection as keyof typeof t.navigation] || activeSection}
                        </span>
                    </div>
                </div>

                {/* Center/Right: Student Selector & Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* STUDENT SELECTOR DROPDOWN (Requirement #1 & #14) */}
                    <div className="relative flex items-center gap-2" ref={dropdownRef} id="student-selector-container">
                        <div className="hidden md:block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {t.studentSelected}
                        </div>
                        <button
                            id="student-selector-dropdown-btn"
                            onClick={() => setIsStudentDropdownOpen((prev) => !prev)}
                            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-brand-200 dark:border-brand-900/60 bg-brand-50/70 dark:bg-brand-950/40 hover:bg-brand-100/70 dark:hover:bg-brand-950/70 text-slate-800 dark:text-slate-100 transition-colors cursor-pointer shadow-2xs"
                            aria-label="Seleccionar alumno activo"
                        >
                            <img
                                src={currentStudent.avatar}
                                alt={currentStudent.name}
                                className="w-6 h-6 rounded-full object-cover ring-1 ring-brand-400"
                                referrerPolicy="no-referrer"
                            />
                            <div className="text-left">
                                <span className="text-xs font-medium text-brand-950 dark:text-brand-200 block leading-tight">
                                    {currentStudent.name}
                                </span>
                            </div>
                            <ChevronDown
                                className={`w-4 h-4 text-brand-600 dark:text-brand-400 transition-transform ${isStudentDropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu for Students */}
                        {isStudentDropdownOpen && (
                            <div
                                id="student-selector-menu"
                                className="absolute right-0 top-[34px] mt-2 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                            >
                                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                                    {t.changeStudent}
                                </div>
                                {students.map((student) => {
                                    const isSelected = student.id === currentStudentId;
                                    return (
                                        <button
                                            key={student.id}
                                            id={`select-student-${student.id}`}
                                            onClick={() => {
                                                setCurrentStudentId(student.id as StudentId);
                                                setIsStudentDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${isSelected ? 'bg-brand-50/60 dark:bg-brand-950/30' : ''
                                                }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <img
                                                    src={student.avatar}
                                                    alt={student.name}
                                                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                                                    referrerPolicy="no-referrer"
                                                />
                                                <div>
                                                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                                        {student.name}
                                                    </div>
                                                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                                        {student.course} · {student.academicYear}
                                                    </div>
                                                    <div className="text-[10px] text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1 mt-0.5">
                                                        <Building className="w-3 h-3 shrink-0" />
                                                        <span className="truncate">{student.school.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {isSelected && <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />}
                                        </button>
                                    );
                                })}

                                <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 mt-1">
                                    <button
                                        type="button"
                                        id="header-view-school-btn"
                                        onClick={() => {
                                            setIsStudentDropdownOpen(false);
                                            openModal('school_detail', currentStudent.school);
                                        }}
                                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                    >
                                        <Building className="w-3.5 h-3.5" />
                                        <span>Ver centro asignado ({currentStudent.name})</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Notifications Button */}
                    <button
                        id="header-notifications-btn"
                        onClick={() => navigateTo('comunicaciones', 'notificaciones')}
                        className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Ver notificaciones"
                        aria-label="Notificaciones"
                    >
                        <Bell className="w-5 h-5" />
                        {unreadNotificationsCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                                {unreadNotificationsCount}
                            </span>
                        )}
                    </button>

                    {/* Language Selector (ES / EN) */}
                    <button
                        id="header-language-toggle-btn"
                        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                        className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 uppercase transition-colors cursor-pointer"
                        title={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
                    >
                        {language}
                    </button>

                    {/* Dark / Light Mode Toggle */}
                    <button
                        id="header-theme-toggle-btn"
                        onClick={toggleTheme}
                        className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
                        aria-label="Alternar tema"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>

                    {/* User Profile Avatar / Button */}
                    <button
                        id="header-user-profile-btn"
                        onClick={() => navigateTo('configuracion', 'usuario')}
                        className="hidden sm:flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Configuración de usuario"
                    >
                        <img
                            src={userProfile.avatar}
                            alt={userProfile.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                            referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 hidden md:inline">
                            {userProfile.name}
                        </span>
                    </button>

                    {/* Logout / Cerrar sesión Button */}
                    <button
                        type="button"
                        id="header-logout-btn"
                        onClick={logout}
                        className="p-2 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Cerrar sesión (volver a pantalla de login)"
                        aria-label="Cerrar sesión"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
};
