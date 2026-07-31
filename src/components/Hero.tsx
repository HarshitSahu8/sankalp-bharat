import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { Visionary } from '../types';
import { LanguageCode, UI_TRANSLATIONS } from '../i18n/translations';

interface HeroProps {
  visionaries: Visionary[];
  onExplore: () => void;
  onTakePledge: () => void;
  lang: LanguageCode;
}

export const Hero: React.FC<HeroProps> = ({ visionaries, onExplore, onTakePledge, lang }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  useEffect(() => {
    if (visionaries.length === 0) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % visionaries.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [visionaries]);

  const activeVisionary = visionaries[currentQuoteIndex] || visionaries[0];

  return (
    <section style={{
      paddingTop: '8.5rem',
      paddingBottom: '4rem',
      position: 'relative',
      width: '100%',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '3.5rem',
          alignItems: 'center',
          width: '100%',
        }} className="hero-grid">
          {/* Left Column */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <span className="badge-gold">
                <Sparkles size={13} style={{ display: 'inline', marginRight: '4px' }} />
                {t.heroBadge}
              </span>
              <span className="badge-azure">{t.heroBadgeStatic}</span>
            </div>

            <h1 style={{
              fontSize: '3.25rem',
              lineHeight: 1.12,
              marginBottom: '1.5rem',
              color: '#F8FAFC',
              letterSpacing: '-0.03em',
            }}>
              {t.heroTitlePrefix}
              <span style={{
                background: 'linear-gradient(135deg, #F3C65E 0%, #E67E22 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {t.heroTitleAccent}
              </span>
              {t.heroTitleSuffix}
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: '#94A3B8',
              marginBottom: '2.25rem',
              maxWidth: '620px',
              lineHeight: 1.6,
            }}>
              {t.heroDesc}
            </p>

            {/* CTA Group */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button className="btn-primary" onClick={onExplore}>
                <Compass size={18} />
                {t.btnExplore}
                <ArrowRight size={16} />
              </button>
              <button className="btn-secondary" onClick={onTakePledge}>
                <HeartHandshake size={18} />
                {t.btnPledge}
              </button>
            </div>

            {/* Metrics Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              maxWidth: '540px',
            }}>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F3C65E', fontFamily: "'Outfit', sans-serif" }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{t.stat1Label}</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38BDF8', fontFamily: "'Outfit', sans-serif" }}>4 Tier</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{t.stat2Label}</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34D399', fontFamily: "'Outfit', sans-serif" }}>GitHub</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{t.stat3Label}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visionary Spotlight */}
          {activeVisionary && (
            <div className="glass-card" style={{
              padding: '2.25rem',
              borderColor: 'rgba(243, 198, 94, 0.25)',
              background: 'linear-gradient(145deg, rgba(13, 19, 34, 0.95) 0%, rgba(20, 29, 50, 0.8) 100%)',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span className="badge-gold">{t.quoteBadge}</span>
                <span style={{ fontSize: '1.8rem' }}>{activeVisionary.avatar}</span>
              </div>

              <blockquote style={{
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: '#F1F5F9',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}>
                "{activeVisionary.quote}"
              </blockquote>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#F3C65E', fontFamily: "'Outfit', sans-serif" }}>
                  {activeVisionary.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  {activeVisionary.title} ({activeVisionary.period})
                </div>
              </div>

              <div style={{
                background: 'rgba(52, 211, 153, 0.08)',
                border: '1px solid rgba(52, 211, 153, 0.25)',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                fontSize: '0.85rem',
                color: '#E2E8F0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
              }}>
                <CheckCircle2 size={16} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#34D399' }}>{t.policyAlignment} </strong>
                  {activeVisionary.modernAlignment}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '1.5rem' }}>
                {visionaries.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentQuoteIndex(idx)}
                    style={{
                      width: idx === currentQuoteIndex ? '20px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: idx === currentQuoteIndex ? '#F3C65E' : 'rgba(255, 255, 255, 0.15)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
