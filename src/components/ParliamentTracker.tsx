import React, { useState } from 'react';
import { Bill, Policy } from '../types';
import { Building2, Search, CheckCircle2 } from 'lucide-react';
import { LanguageCode, UI_TRANSLATIONS } from '../i18n/translations';

interface ParliamentTrackerProps {
  bills: Bill[];
  policies: Policy[];
  lang: LanguageCode;
}

export const ParliamentTracker: React.FC<ParliamentTrackerProps> = ({ bills, policies, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const filteredBills = bills.filter((b) => {
    const matchesSearch = b.billName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <section id="parliament" style={{ padding: '5rem 0', width: '100%' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-gold" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            {t.parliamentBadge}
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#F8FAFC' }}>
            {t.parliamentHeading}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {t.parliamentSub}
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '580px', margin: '0 auto 3rem auto', position: 'relative' }}>
          <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 3rem',
              borderRadius: '9999px',
              fontSize: '0.95rem',
            }}
          />
        </div>

        {/* Bills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          width: '100%',
        }}>
          {filteredBills.map((bill) => {
            const matchedPolicy = policies.find((p) => p.id === bill.policyId);
            return (
              <div key={bill.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="badge-gold" style={{ fontSize: '0.68rem' }}>
                      Passed {bill.housePassed} ({bill.year})
                    </span>
                    <Building2 size={18} color="#F3C65E" />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: '#F8FAFC', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                    {bill.billName}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {bill.summary}
                  </p>

                  {matchedPolicy && (
                    <div style={{
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      borderRadius: '8px',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.8rem',
                      color: '#38BDF8',
                      marginBottom: '1rem',
                    }}>
                      🏛️ <strong>Fulfills Policy:</strong> {matchedPolicy.title}
                    </div>
                  )}
                </div>

                <div style={{
                  background: 'rgba(52, 211, 153, 0.06)',
                  border: '1px solid rgba(52, 211, 153, 0.15)',
                  borderRadius: '8px',
                  padding: '0.75rem 0.85rem',
                  fontSize: '0.825rem',
                  color: '#34D399',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                }}>
                  <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Impact Target:</strong> {bill.whatItAchieves}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
