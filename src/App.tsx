import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VisionFlow } from './components/VisionFlow';
import { KartavyaMatrix } from './components/KartavyaMatrix';
import { PledgeGenerator } from './components/PledgeGenerator';
import { ParliamentTracker } from './components/ParliamentTracker';
import { StateExplorer } from './components/StateExplorer';
import { Footer } from './components/Footer';
import { Visionary, Policy, Bill, Duty, StateInfo } from './types';
import { LanguageCode } from './i18n/translations';
import './styles/index.css';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('flow');
  const [lang, setLang] = useState<LanguageCode>('en');
  const [visionaries, setVisionaries] = useState<Visionary[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [duties, setDuties] = useState<Duty[]>([]);
  const [states, setStates] = useState<StateInfo[]>([]);
  const [selectedPledges, setSelectedPledges] = useState<string[]>(['duty-waste-segregation', 'duty-vocal-for-local']);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vRes, pRes, bRes, dRes, sRes] = await Promise.all([
          fetch('/data/visionaries.json'),
          fetch('/data/policies.json'),
          fetch('/data/bills.json'),
          fetch('/data/duties.json'),
          fetch('/data/states.json'),
        ]);

        const vData = await vRes.json();
        const pData = await pRes.json();
        const bData = await bRes.json();
        const dData = await dRes.json();
        const sData = await sRes.json();

        setVisionaries(vData);
        setPolicies(pData);
        setBills(bData);
        setDuties(dData);
        setStates(sData);
      } catch (error) {
        console.error('Error loading vision datasets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTogglePledge = (dutyId: string) => {
    setSelectedPledges((prev) =>
      prev.includes(dutyId) ? prev.filter((id) => id !== dutyId) : [...prev, dutyId]
    );
  };

  const handleExplore = () => {
    setActiveTab('flow');
    const el = document.getElementById('flow');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTakePledge = () => {
    setActiveTab('pledge');
    const el = document.getElementById('pledge');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
        <div style={{ textAlign: 'center', color: '#F3C65E', fontFamily: "'Outfit', sans-serif" }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🇮🇳</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Loading Sankalp Bharat Research Engine...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Top Subtle Bar */}
      <div className="top-tricolor-bar" />

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Hero Section */}
      <Hero
        visionaries={visionaries}
        onExplore={handleExplore}
        onTakePledge={handleTakePledge}
        lang={lang}
      />

      {/* Main Content Modules */}
      <VisionFlow
        visionaries={visionaries}
        policies={policies}
        bills={bills}
        duties={duties}
        lang={lang}
      />

      <KartavyaMatrix
        duties={duties}
        selectedPledges={selectedPledges}
        onTogglePledge={handleTogglePledge}
        onGenerateCertificate={() => setActiveTab('pledge')}
        lang={lang}
      />

      <PledgeGenerator
        duties={duties}
        selectedPledgeIds={selectedPledges}
        lang={lang}
      />

      <ParliamentTracker
        bills={bills}
        policies={policies}
        lang={lang}
      />

      <StateExplorer
        states={states}
        lang={lang}
      />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
};

export default App;
