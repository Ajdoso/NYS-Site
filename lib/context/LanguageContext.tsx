'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en/common.json';
import ru from '@/locales/ru/common.json';
import kk from '@/locales/kk/common.json';

export type Locale = 'kk' | 'ru' | 'en';

const translations: Record<Locale, any> = { kk, ru, en };

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (keyPath: string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('kk');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app_locale') as Locale;
      if (saved && (saved === 'kk' || saved === 'ru' || saved === 'en')) {
        setLocaleState(saved);
      }
    } catch {
      // ignore
    } finally {
      setMounted(true);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('app_locale', newLocale);
    } catch {
      // ignore
    }
  };

  const t = (keyPath: string, variables?: Record<string, string | number>): string => {
    const keys = keyPath.split('.');
    let val: any = translations[locale];

    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k];
      } else {
        // Fallback to English
        let fallbackVal: any = translations['en'];
        for (const fk of keys) {
          if (fallbackVal && typeof fallbackVal === 'object' && fk in fallbackVal) {
            fallbackVal = fallbackVal[fk];
          } else {
            fallbackVal = keyPath;
            break;
          }
        }
        val = fallbackVal;
        break;
      }
    }

    if (typeof val === 'string') {
      if (variables) {
        let str = val;
        for (const [vKey, vVal] of Object.entries(variables)) {
          str = str.replace(new RegExp(`\\{${vKey}\\}`, 'g'), String(vVal));
        }
        return str;
      }
      return val;
    }

    return keyPath;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageSwitcher: React.FC<{
  className?: string;
  theme?: 'light' | 'dark';
}> = ({ className = '', theme = 'light' }) => {
  const { locale, setLocale } = useLanguage();

  const options: { id: Locale; label: string }[] = [
    { id: 'kk', label: 'ҚАЗ' },
    { id: 'ru', label: 'РУС' },
    { id: 'en', label: 'ENG' },
  ];

  return (
    <div
      className={`inline-flex items-center rounded-sm text-[10px] font-bold tracking-widest uppercase border ${
        theme === 'dark'
          ? 'border-zinc-800 bg-zinc-950 text-zinc-400'
          : 'border-[#0D4352]/20 bg-white/70 text-zinc-600'
      } ${className}`}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setLocale(opt.id)}
          className={`px-2 py-0.5 transition-colors ${
            locale === opt.id
              ? theme === 'dark'
                ? 'bg-[#CCFF00] text-black font-black'
                : 'bg-[#0D4352] text-white font-black'
              : 'hover:text-zinc-900'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
