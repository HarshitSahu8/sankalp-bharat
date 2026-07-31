import React from 'react';
import { Flag, Code, Heart } from 'lucide-react';
import { LanguageCode, UI_TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  lang: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  return (
    <footer style={{
      background: '#040711',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4rem 0 2rem 0',
      color: '#94A3B8',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
          width: '100%',
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(243, 198, 94, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)',
                border: '1px solid rgba(243, 198, 94, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Flag size={18} color="#F3C65E" />
              </div>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#FFFFFF',
              }}>
                {t.brandTitle} <span style={{ color: '#F3C65E' }}>{t.brandAccent}</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {t.footerDesc}
            </p>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
              🇮🇳 {t.footerDedicated}
            </div>
          </div>

          {/* Deploy to GitHub Pages Guide */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#F8FAFC', marginBottom: '1rem', fontFamily: "'Outfit', sans-serif" }}>
              🚀 {t.deployTitle}
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge-gold" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>Step 1</span>
                <span>Run <code>npm run build</code></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge-gold" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>Step 2</span>
                <span>Push code to GitHub repository</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge-gold" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>Step 3</span>
                <span>Enable GitHub Pages in repo Settings</span>
              </li>
            </ul>
          </div>

          {/* Open Contribution Call */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#F8FAFC', marginBottom: '1rem', fontFamily: "'Outfit', sans-serif" }}>
              🤝 {t.contribTitle}
            </h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Add more quotes, regional initiatives, or daily citizen duties by submitting a Pull Request on GitHub.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#38BDF8',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              <Code size={16} />
              GitHub Repository
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#64748B',
        }}>
          Built with <Heart size={14} color="#F3C65E" style={{ display: 'inline', margin: '0 3px' }} /> for the future of India. Free static deployment ready.
        </div>
      </div>
    </footer>
  );
};
