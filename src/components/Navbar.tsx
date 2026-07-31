import React, { useState, useEffect } from 'react';
import { Compass, Award, Building2, MapPin, Menu, X, Sparkles, Shield, Globe } from 'lucide-react';
import { LanguageCode, LANGUAGES, UI_TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'flow', label: t.navTraceability, icon: Compass },
    { id: 'kartavya', label: t.navKartavya, icon: Award },
    { id: 'parliament', label: t.navParliament, icon: Building2 },
    { id: 'states', label: t.navStates, icon: MapPin },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(5, 8, 17, 0.94)' : 'rgba(5, 8, 17, 0.6)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      transition: 'all 0.3s ease',
      padding: '0.85rem 0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('flow')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(243, 198, 94, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)',
            border: '1px solid rgba(243, 198, 94, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(243, 198, 94, 0.15)'
          }}>
            <Shield size={18} color="#F3C65E" />
          </div>
          <div>
            <div style={{ 
              fontFamily: "'Outfit', sans-serif", 
              fontWeight: 800, 
              fontSize: '1.2rem', 
              letterSpacing: '-0.02em',
              color: '#F8FAFC'
            }}>
              {t.brandTitle}<span style={{ color: '#F3C65E', marginLeft: '3px' }}>{t.brandAccent}</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {t.brandTagline}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? 'rgba(243, 198, 94, 0.15)' : 'transparent',
                  color: isActive ? '#F3C65E' : '#94A3B8',
                  border: isActive ? '1px solid rgba(243, 198, 94, 0.3)' : '1px solid transparent',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Language Selector & Pledge Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language Dropdown */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Globe size={15} color="#F3C65E" style={{ position: 'absolute', left: '0.7rem', pointerEvents: 'none' }} />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LanguageCode)}
              style={{
                background: 'rgba(20, 29, 50, 0.9)',
                border: '1px solid rgba(243, 198, 94, 0.3)',
                color: '#F8FAFC',
                padding: '0.45rem 0.75rem 0.45rem 2.1rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} style={{ background: '#0B101D', color: '#FFFFFF' }}>
                  {l.flag} {l.nativeName} ({l.label})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Action */}
          <button 
            className="btn-primary" 
            onClick={() => setActiveTab('pledge')}
            style={{ fontSize: '0.82rem', padding: '0.5rem 1.1rem' }}
          >
            <Sparkles size={15} />
            {t.takePledge}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#F8FAFC',
              cursor: 'pointer',
              display: 'none',
            }}
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: '#0B101D',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '100%',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: isActive ? 'rgba(243, 198, 94, 0.15)' : 'transparent',
                  color: isActive ? '#F3C65E' : '#94A3B8',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
