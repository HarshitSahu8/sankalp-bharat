import React, { useState } from 'react';
import { Duty } from '../types';
import { CheckCircle2, Plus, Sparkles, UserCheck, GraduationCap, Building2, Users } from 'lucide-react';
import { LanguageCode, UI_TRANSLATIONS } from '../i18n/translations';

interface KartavyaMatrixProps {
  duties: Duty[];
  selectedPledges: string[];
  onTogglePledge: (dutyId: string) => void;
  onGenerateCertificate: () => void;
  lang: LanguageCode;
}

export const KartavyaMatrix: React.FC<KartavyaMatrixProps> = ({
  duties,
  selectedPledges,
  onTogglePledge,
  onGenerateCertificate,
  lang,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const filteredDuties = duties.filter((d) => {
    const personaMatch = selectedPersona === 'all' || d.persona === selectedPersona;
    const categoryMatch = selectedCategory === 'all' || d.category === selectedCategory;
    return personaMatch && categoryMatch;
  });

  const personas = [
    { id: 'all', label: t.allPersonas, icon: Users },
    { id: 'citizen', label: t.citizenPersona, icon: UserCheck },
    { id: 'youth', label: t.youthPersona, icon: GraduationCap },
    { id: 'corporate', label: t.corporatePersona, icon: Building2 },
    { id: 'community', label: t.communityPersona, icon: Users },
  ];

  const categories = [
    { id: 'all', label: 'All Sectors' },
    { id: 'environment', label: 'Environment & Water' },
    { id: 'economy', label: 'Swadeshi & Digital Economy' },
    { id: 'society', label: 'Education & Equality' },
    { id: 'health', label: 'Health & Sanitation' },
  ];

  return (
    <section id="kartavya" style={{ padding: '5rem 0', background: 'rgba(11, 16, 29, 0.4)', width: '100%' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="badge-emerald" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            {t.kartavyaBadge}
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#F8FAFC' }}>
            {t.kartavyaHeading}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {t.kartavyaSub}
          </p>
        </div>

        {/* Selected Count Floating Bar */}
        {selectedPledges.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(243, 198, 94, 0.95) 0%, rgba(217, 155, 38, 0.95) 100%)',
            color: '#050811',
            padding: '0.85rem 1.6rem',
            borderRadius: '9999px',
            maxWidth: '620px',
            margin: '0 auto 2.5rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 10px 30px rgba(243, 198, 94, 0.3)',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '0.95rem' }}>
              <CheckCircle2 size={22} color="#050811" />
              <span>{selectedPledges.length} {t.selectedDuties}</span>
            </div>
            <button
              onClick={onGenerateCertificate}
              style={{
                background: '#050811',
                color: '#F3C65E',
                border: 'none',
                padding: '0.45rem 1.2rem',
                borderRadius: '9999px',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={15} />
              {t.btnGenerateCert}
            </button>
          </div>
        )}

        {/* Persona Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
          {personas.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                style={{
                  background: isSelected ? 'rgba(243, 198, 94, 0.15)' : 'rgba(20, 29, 50, 0.6)',
                  color: isSelected ? '#F3C65E' : '#94A3B8',
                  border: isSelected ? '1px solid #F3C65E' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '9999px',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={16} />
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '3.5rem' }}>
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                style={{
                  background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: isSelected ? '#38BDF8' : '#64748B',
                  border: isSelected ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Duty Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          width: '100%',
        }}>
          {filteredDuties.map((duty) => {
            const isPledged = selectedPledges.includes(duty.id);
            return (
              <div
                key={duty.id}
                className="glass-card"
                style={{
                  borderColor: isPledged ? 'rgba(243, 198, 94, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                  background: isPledged ? 'rgba(243, 198, 94, 0.05)' : 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '1.6rem' }}>{duty.icon}</span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <span className="badge-gold" style={{ fontSize: '0.65rem' }}>{duty.persona}</span>
                      <span className="badge-azure" style={{ fontSize: '0.65rem' }}>{duty.frequency}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#F8FAFC', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {duty.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {duty.description}
                  </p>

                  <div style={{
                    fontSize: '0.8rem',
                    color: '#CBD5E1',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    marginBottom: '1.25rem',
                    borderLeft: '2px solid #F3C65E',
                  }}>
                    📜 <strong>Inspiration:</strong> {duty.freedomFighterConnection}
                  </div>
                </div>

                <button
                  onClick={() => onTogglePledge(duty.id)}
                  style={{
                    width: '100%',
                    background: isPledged ? 'linear-gradient(135deg, #34D399 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.05)',
                    color: isPledged ? '#050811' : '#F8FAFC',
                    border: isPledged ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isPledged ? (
                    <>
                      <CheckCircle2 size={18} />
                      {t.pledgedBtn}
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      {t.addPledgeBtn}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
