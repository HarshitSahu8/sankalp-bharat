import React, { useState, useRef, useEffect } from 'react';
import { Duty } from '../types';
import { Download, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageCode, UI_TRANSLATIONS } from '../i18n/translations';

interface PledgeGeneratorProps {
  duties: Duty[];
  selectedPledgeIds: string[];
  lang: LanguageCode;
}

export const PledgeGenerator: React.FC<PledgeGeneratorProps> = ({ duties, selectedPledgeIds, lang }) => {
  const [citizenName, setCitizenName] = useState('Harshit Sahu');
  const [citizenLocation, setCitizenLocation] = useState('New Delhi, India');
  const [organization, setOrganization] = useState('Citizen Innovator');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const pledgedDuties = duties.filter((d) => selectedPledgeIds.includes(d.id));

  // Default fallback if user has no selected duties yet
  const displayDuties = pledgedDuties.length > 0 ? pledgedDuties : duties.slice(0, 3);

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas (1200x800)
    canvas.width = 1200;
    canvas.height = 800;

    // Deep Obsidian Fill
    ctx.fillStyle = '#080C17';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Elegant Outer Frame
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F3C65E';
    ctx.strokeRect(35, 35, 1130, 730);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.strokeRect(45, 45, 1110, 710);

    // Certificate Header Badge
    ctx.fillStyle = '#F3C65E';
    ctx.font = '600 18px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SANKALP BHARAT • NATIONAL DUTY PLEDGE', 600, 105);

    // Main Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 42px "Outfit", sans-serif';
    ctx.fillText('CERTIFICATE OF KARTAVYA SANKALP', 600, 165);

    // Subtitle
    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px "Inter", sans-serif';
    ctx.fillText('This official pledge is proudly presented to', 600, 215);

    // Citizen Name
    ctx.fillStyle = '#F3C65E';
    ctx.font = 'bold 44px "Outfit", sans-serif';
    ctx.fillText(citizenName || 'Valued Indian Citizen', 600, 280);

    // Organization / Location
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillText(`${organization ? organization + ' • ' : ''}${citizenLocation}`, 600, 315);

    // Divider Line
    ctx.strokeStyle = 'rgba(243, 198, 94, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(350, 345);
    ctx.lineTo(850, 345);
    ctx.stroke();

    // Commitment Text Header
    ctx.fillStyle = '#34D399';
    ctx.font = '600 18px "Outfit", sans-serif';
    ctx.fillText('Solemnly Pledged Commitments for Viksit Bharat @ 2047:', 600, 390);

    // Duties List
    ctx.textAlign = 'left';
    displayDuties.slice(0, 3).forEach((duty, idx) => {
      const yPos = 445 + idx * 75;
      
      // Card Container Fill
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(160, yPos - 25, 880, 60);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeRect(160, yPos - 25, 880, 60);

      // Icon & Title
      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 19px "Outfit", sans-serif';
      ctx.fillText(`${duty.icon}  ${duty.title}`, 185, yPos + 2);

      // Meta details
      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px "Inter", sans-serif';
      ctx.fillText(`Role: ${duty.persona.toUpperCase()} | ${duty.frequency} | ${duty.freedomFighterConnection}`, 185, yPos + 24);
    });

    // Date & Verification Footer
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748B';
    ctx.font = '13px "Inter", sans-serif';
    ctx.fillText(`Issued on ${today} • Sankalp Verification: SB-${Math.floor(100000 + Math.random() * 900000)}`, 600, 715);
  };

  useEffect(() => {
    drawCertificate();
  }, [citizenName, citizenLocation, organization, displayDuties]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Sankalp_Pledge_${citizenName.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <section id="pledge" style={{ padding: '5rem 0', width: '100%' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-gold" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            {t.pledgeBadge}
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#F8FAFC' }}>
            {t.pledgeHeading}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {t.pledgeSub}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
          gap: '3rem',
          alignItems: 'start',
          width: '100%',
        }}>
          {/* Controls Column */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.2rem', color: '#F8FAFC', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award color="#F3C65E" size={20} />
              {t.certPersonalization}
            </h3>

            {/* Input Fields */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.4rem', fontWeight: 600 }}>
                {t.labelFullName}
              </label>
              <input
                type="text"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.4rem', fontWeight: 600 }}>
                {t.labelLocation}
              </label>
              <input
                type="text"
                value={citizenLocation}
                onChange={(e) => setCitizenLocation(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.4rem', fontWeight: 600 }}>
                {t.labelOrg}
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem' }}
              />
            </div>

            {/* Included Duties Summary */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#F3C65E', fontWeight: 700, marginBottom: '0.5rem' }}>
                {t.includedDuties} ({displayDuties.length}):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {displayDuties.map((d) => (
                  <div key={d.id} style={{
                    fontSize: '0.825rem',
                    color: '#CBD5E1',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}>
                    <span>{d.icon}</span>
                    <span style={{ fontWeight: 600 }}>{d.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <button className="btn-primary" onClick={handleDownload} style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={18} />
              {t.btnDownload}
            </button>
          </div>

          {/* Canvas Live Preview Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '100%',
              overflow: 'hidden',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(243, 198, 94, 0.3)',
            }}>
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.85rem', textAlign: 'center' }}>
              💡 HD Canvas rendered at 1200x800 resolution ready for print or sharing.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
