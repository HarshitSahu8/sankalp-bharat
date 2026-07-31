import React, { useState } from 'react';
import { Visionary, Policy, Bill, Duty } from '../types';
import { Compass, Scroll, Building2, ChevronRight, Award, Layers } from 'lucide-react';
import { LanguageCode, UI_TRANSLATIONS } from '../i18n/translations';

interface VisionFlowProps {
  visionaries: Visionary[];
  policies: Policy[];
  bills: Bill[];
  duties: Duty[];
  lang: LanguageCode;
}

export const VisionFlow: React.FC<VisionFlowProps> = ({ visionaries, policies, bills, duties, lang }) => {
  const [selectedVisionaryId, setSelectedVisionaryId] = useState<string>(visionaries[0]?.id || 'gandhi');
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const selectedVisionary = visionaries.find((v) => v.id === selectedVisionaryId) || visionaries[0];
  const relatedPolicies = policies.filter((p) => p.visionaryId === selectedVisionaryId);
  const relatedBills = bills.filter((b) => b.visionaryId === selectedVisionaryId);
  const relatedDuties = duties.filter((d) => 
    d.freedomFighterConnection.toLowerCase().includes(selectedVisionary?.name.toLowerCase() || '') ||
    d.freedomFighterConnection.toLowerCase().includes(selectedVisionaryId.toLowerCase())
  );

  return (
    <section id="flow" style={{ padding: '5rem 0', width: '100%' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-gold" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            <Layers size={13} style={{ display: 'inline', marginRight: '4px' }} />
            {t.flowBadge}
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#F8FAFC' }}>
            {t.flowHeading}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {t.flowSub}
          </p>
        </div>

        {/* Visionary Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.65rem',
          marginBottom: '3.5rem',
        }}>
          {visionaries.map((v) => {
            const isSelected = v.id === selectedVisionaryId;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVisionaryId(v.id)}
                style={{
                  background: isSelected ? 'rgba(243, 198, 94, 0.15)' : 'rgba(11, 16, 29, 0.8)',
                  color: isSelected ? '#F3C65E' : '#94A3B8',
                  border: isSelected ? '1px solid #F3C65E' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.6rem 1.1rem',
                  borderRadius: '9999px',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 0 20px rgba(243, 198, 94, 0.15)' : 'none',
                }}
              >
                <span>{v.avatar}</span>
                {v.name}
              </button>
            );
          })}
        </div>

        {/* 4-Tier Lineage Grid */}
        {selectedVisionary && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            width: '100%',
          }}>
            {/* TIER 1: Foundational Vision */}
            <div className="glass-card" style={{ borderTop: '3px solid #F3C65E' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Scroll size={18} color="#F3C65E" />
                <span className="badge-gold" style={{ fontSize: '0.68rem' }}>{t.tier1}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '0.4rem' }}>
                {selectedVisionary.avatar} {selectedVisionary.name}
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#64748B', marginBottom: '1rem' }}>
                {selectedVisionary.title} ({selectedVisionary.period})
              </p>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '0.85rem',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontStyle: 'italic',
                color: '#CBD5E1',
                marginBottom: '1rem',
              }}>
                "{selectedVisionary.quote}"
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5 }}>
                <strong style={{ color: '#F8FAFC' }}>Core Objective:</strong> {selectedVisionary.historicalVision}
              </div>
            </div>

            {/* TIER 2: Government Vision & Policies */}
            <div className="glass-card" style={{ borderTop: '3px solid #38BDF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Compass size={18} color="#38BDF8" />
                <span className="badge-azure" style={{ fontSize: '0.68rem' }}>{t.tier2}</span>
              </div>
              {relatedPolicies.length > 0 ? (
                relatedPolicies.map((p) => (
                  <div key={p.id} style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#F8FAFC', marginBottom: '0.35rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#38BDF8', marginBottom: '0.6rem', fontWeight: 600 }}>
                      {p.tagline}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                      {p.description}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {p.keyTargets.slice(0, 2).map((target, idx) => (
                        <div key={idx} style={{ fontSize: '0.78rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <ChevronRight size={12} color="#38BDF8" />
                          {target}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  Integrated across general Viksit Bharat governance frameworks.
                </div>
              )}
            </div>

            {/* TIER 3: Parliamentary Acts & Bills */}
            <div className="glass-card" style={{ borderTop: '3px solid #F59E0B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Building2 size={18} color="#F59E0B" />
                <span className="badge-gold" style={{ fontSize: '0.68rem', color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
                  {t.tier3}
                </span>
              </div>
              {relatedBills.length > 0 ? (
                relatedBills.map((b) => (
                  <div key={b.id} style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                      Passed {b.housePassed} ({b.year})
                    </span>
                    <h3 style={{ fontSize: '1.05rem', color: '#F8FAFC', marginBottom: '0.35rem' }}>
                      {b.billName}
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: '#94A3B8', marginBottom: '0.6rem', lineHeight: 1.5 }}>
                      {b.summary}
                    </p>
                    <div style={{ fontSize: '0.78rem', color: '#F59E0B', background: 'rgba(245, 158, 11, 0.08)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      ⚡ <strong>Legal Effect:</strong> {b.whatItAchieves}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  Supported through statutory rules and executive directives.
                </div>
              )}
            </div>

            {/* TIER 4: Kartavya Daily Call to Duty */}
            <div className="glass-card" style={{ borderTop: '3px solid #34D399' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Award size={18} color="#34D399" />
                <span className="badge-emerald" style={{ fontSize: '0.68rem' }}>{t.tier4}</span>
              </div>
              {relatedDuties.length > 0 ? (
                relatedDuties.map((d) => (
                  <div key={d.id} style={{
                    background: 'rgba(52, 211, 153, 0.06)',
                    border: '1px solid rgba(52, 211, 153, 0.15)',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    marginBottom: '0.75rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{d.icon}</span>
                      <span className="badge-emerald" style={{ fontSize: '0.65rem' }}>{d.persona}</span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', color: '#F8FAFC', marginBottom: '0.35rem' }}>{d.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4 }}>{d.description}</p>
                  </div>
                ))
              ) : (
                <div style={{
                  background: 'rgba(52, 211, 153, 0.06)',
                  border: '1px solid rgba(52, 211, 153, 0.15)',
                  borderRadius: '8px',
                  padding: '0.85rem',
                }}>
                  <div style={{ fontSize: '0.85rem', color: '#34D399', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Everyday Action Commitment:
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4 }}>
                    Practice local buying, water conservation, civic hygiene, and community mentorship.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
