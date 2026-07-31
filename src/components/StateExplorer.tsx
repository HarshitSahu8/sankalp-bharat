import React, { useState } from 'react';
import { StateInfo } from '../types';
import { MapPin, Building, CheckCircle2 } from 'lucide-react';
import { LanguageCode, UI_TRANSLATIONS } from '../i18n/translations';

interface StateExplorerProps {
  states: StateInfo[];
  lang: LanguageCode;
}

export const StateExplorer: React.FC<StateExplorerProps> = ({ states, lang }) => {
  const [selectedStateId, setSelectedStateId] = useState(states[0]?.id || 'gujarat');
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const selectedState = states.find((s) => s.id === selectedStateId) || states[0];

  return (
    <section id="states" style={{ padding: '5rem 0', background: 'rgba(11, 16, 29, 0.4)', width: '100%' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-azure" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            {t.statesBadge}
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#F8FAFC' }}>
            {t.statesHeading}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {t.statesSub}
          </p>
        </div>

        {/* State Selection Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.65rem',
          marginBottom: '3.5rem',
        }}>
          {states.map((s) => {
            const isSelected = s.id === selectedStateId;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStateId(s.id)}
                style={{
                  background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(20, 29, 50, 0.6)',
                  color: isSelected ? '#38BDF8' : '#94A3B8',
                  border: isSelected ? '1px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 20px rgba(56, 189, 248, 0.15)' : 'none',
                }}
              >
                <MapPin size={15} />
                {s.stateName}
              </button>
            );
          })}
        </div>

        {/* State Detail Spotlight */}
        {selectedState && (
          <div className="glass-card" style={{
            padding: '2.5rem',
            borderTop: '3px solid #38BDF8',
            background: 'linear-gradient(145deg, rgba(13, 19, 34, 0.95) 0%, rgba(20, 29, 50, 0.8) 100%)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              gap: '2.5rem',
              alignItems: 'center',
            }}>
              {/* Left Overview */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="badge-azure">State Spotlight</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Capital: {selectedState.capital}</span>
                </div>

                <h3 style={{ fontSize: '2.25rem', color: '#F8FAFC', marginBottom: '0.75rem' }}>
                  {selectedState.stateName}
                </h3>

                <div style={{ fontSize: '1.1rem', color: '#38BDF8', fontWeight: 600, marginBottom: '1.5rem' }}>
                  🎯 Focus Area: {selectedState.primaryFocus}
                </div>

                {/* Freedom Connection */}
                <div style={{
                  background: 'rgba(243, 198, 94, 0.06)',
                  border: '1px solid rgba(243, 198, 94, 0.2)',
                  borderRadius: '10px',
                  padding: '1.1rem',
                  fontSize: '0.875rem',
                  color: '#E2E8F0',
                  lineHeight: 1.6,
                }}>
                  📜 <strong>{t.legacyTitle}</strong> {selectedState.localFreedomConnection}
                </div>
              </div>

              {/* Right Flagship Projects List */}
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#F8FAFC', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building size={18} color="#38BDF8" />
                  {t.flagshipTitle}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedState.flagshipProjects.map((project, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '10px',
                        padding: '0.85rem 1.1rem',
                        fontSize: '0.9rem',
                        color: '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <CheckCircle2 size={18} color="#34D399" style={{ flexShrink: 0 }} />
                      <span>{project}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
