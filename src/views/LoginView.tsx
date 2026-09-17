import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  AlertCircle,
  Globe,
  Sun,
  Moon,
  Sparkles,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import classroomHeroImage from '../assets/images/modern_classroom_login_1789636813881.jpg';

export const LoginView: React.FC = () => {
  const { login, loginDemo, language, setLanguage, theme, toggleTheme, openModal } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim()) {
      setErrorMessage('Por favor, introduzca su usuario.');
      return;
    }
    if (!password) {
      setErrorMessage('Por favor, introduzca su contraseña.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = login(username, password);
      setIsLoading(false);
      if (!success) {
        setErrorMessage('Credenciales no válidas. Para la demo use usuario: demo y contraseña: password');
      }
    }, 450);
  };

  const handleFillDemo = () => {
    setUsername('demo');
    setPassword('password');
    setErrorMessage(null);
  };

  return (
    <div
      id="login-page-container"
      className="min-h-screen w-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 transition-colors selection:bg-brand selection:text-white"
    >
      {/* Main Card Container */}
      <div
        id="login-main-card"
        className="w-full max-w-7xl rounded-none sm:rounded-[16px] overflow-hidden flex flex-col lg:flex-row min-h-screen sm:min-h-[740px] border border-slate-200/40 dark:border-slate-800"
      >
        {/* ========================================================= */}
        {/* DESKTOP LEFT COLUMN: Modern Classroom Photography         */}
        {/* Clean, calm, and uncluttered; hidden on mobile            */}
        {/* ========================================================= */}
        <div
          id="login-desktop-hero"
          className="hidden lg:block lg:w-[48%] xl:w-[48%] relative overflow-hidden shrink-0 select-none"
        >
          <img
            src={classroomHeroImage}
            alt="Aula escolar Cifra · Gestión educativa"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle soft gradient overlay with clean headline */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex flex-col justify-end p-10 xl:p-12 text-white">
            <h2 className="text-2xl xl:text-3xl font-bold font-display text-white leading-tight">
              Cifra · Gestión educativa
            </h2>
            <p className="text-stone-200/90 text-sm mt-2 max-w-sm font-normal leading-relaxed">
              El entorno digital que conecta a las familias con la vida escolar diaria.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Justified Clean Form Container             */}
        {/* Shown on both Mobile & Desktop (justified layout)        */}
        {/* ========================================================= */}
        <div
          id="login-form-pane"
          className="w-full lg:w-[52%] xl:w-[52%] bg-white dark:bg-slate-900 rounded-none sm:rounded-[16px] lg:rounded-r-[16px] p-6 sm:p-10 xl:p-12 flex flex-col justify-between transition-colors shadow-none"
        >
          {/* 1. TOP HEADER / MARCA BAR (Justified top) */}
          <div className="flex items-center justify-between gap-4 pb-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white font-black text-base shadow-xs">
                C
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Cifra
                </span>
              </div>
            </div>

            {/* Top Right Controls: Theme Toggle & Demo Pill */}
            {/* <div className="flex items-center gap-2">
               Language Selector dropdown 
              <div className="relative">
                <button
                  type="button"
                  id="login-language-selector-btn"
                  onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand-300 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="uppercase">{language === 'es' ? 'ES' : 'EN'}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute right-0 top-7 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('es');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold cursor-pointer ${language === 'es'
                        ? 'text-brand dark:text-brand-300 bg-brand/10 dark:bg-brand/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                    >
                      Español (ES)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('en');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold cursor-pointer ${language === 'en'
                        ? 'text-brand dark:text-brand-300 bg-brand/10 dark:bg-brand/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                    >
                      English (EN)
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                id="login-theme-toggle-btn"
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
                aria-label="Alternar tema de color"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div> */}
          </div>

          {/* 2. MIDDLE FORM AREA (Justified center) */}
          <div className="max-w-md w-full mx-auto my-auto py-6 sm:py-8">
            <div className="mb-6 text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                Acceder
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Introduzca sus datos para iniciar sesión en la plataforma
              </p>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div
                id="login-error-alert"
                className="mb-4 p-3.5 bg-brand-50 dark:bg-brand-950/50 border border-brand/30 rounded-lg text-xs text-brand dark:text-brand-300 flex items-start gap-2.5 animate-in fade-in duration-200"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-brand" />
                <div className="flex-1">
                  <p className="font-bold">{errorMessage}</p>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="mt-1.5 text-[11px] font-semibold text-brand dark:text-brand-300 underline hover:opacity-80 cursor-pointer block"
                  >
                    Click aquí para autocompletar credenciales demo
                  </button>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Introduzca usuario */}
              <div>
                <label
                  htmlFor="login-username-input"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-left"
                >
                  Introduzca usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="login-username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Introduzca usuario (ej. demo)"
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Field 2: Contraseña */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="login-password-input"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 text-left"
                  >
                    Contraseña
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña (ej. password)"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    id="toggle-password-visibility-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Link: ¿No recuerdas la contraseña? */}
              <div className="flex justify-end pt-0.5">
                <button
                  type="button"
                  id="login-forgot-password-link"
                  onClick={() => openModal('forgot_password')}
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-brand-300 hover:underline transition-colors cursor-pointer"
                >
                  ¿No recuerdas la contraseña?
                </button>
              </div>

              {/* Botón Acceder */}
              <button
                type="submit"
                id="login-submit-btn"
                disabled={isLoading}
                className="w-full mt-5 py-3.5 px-6 rounded-lg bg-brand hover:bg-brand-hover active:bg-brand-active text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand/40"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-lg animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Acceder</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Info Pill for mobile */}
            <div className="sm:hidden mt-3 text-center">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs font-semibold text-brand dark:text-brand-300 underline cursor-pointer"
              >
                Rellenar credenciales demo (demo / password)
              </button>
            </div>

            {/* Divider: -------------- O -------------- */}
            <div className="relative flex items-center justify-center my-6">
              <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="shrink-0 mx-3 text-xs font-bold text-slate-400 dark:text-slate-500r">
                O
              </span>
              <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            {/* Social Logins */}
            <div className="space-y-2.5">
              {/* Iniciar sesión con Google */}
              <button
                type="button"
                id="login-google-btn"
                onClick={() => loginDemo('Google')}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Iniciar sesión con Google</span>
              </button>

              {/* Iniciar sesión con Microsoft */}
              <button
                type="button"
                id="login-microsoft-btn"
                onClick={() => loginDemo('Microsoft')}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
              >
                <svg className="w-4 h-4" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                </svg>
                <span>Iniciar sesión con Microsoft</span>
              </button>
            </div>
          </div>

          {/* 3. BOTTOM FOOTER SECTION (Justified bottom) */}
          <div
            id="login-footer-section"
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400"
          >
            {/* Copyright © 2026 Cifra · Gestión educativa */}
            <span className="text-xs text-center sm:text-left">
              © 2026 Cifra · Gestión educativa
            </span>

            {/* Right side: Términos y condiciones de uso + Idioma */}
            <div className="flex items-center gap-3.5 sm:gap-5">
              <button
                type="button"
                id="login-terms-conditions-link"
                onClick={() => openModal('terms_conditions')}
                className="hover:text-brand dark:hover:text-brand-300 hover:underline transition-colors cursor-pointer"
              >
                Términos y condiciones de uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
