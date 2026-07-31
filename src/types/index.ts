export interface Visionary {
  id: string;
  name: string;
  title: string;
  period: string;
  avatar: string;
  quote: string;
  coreValues: string[];
  historicalVision: string;
  modernAlignment: string;
}

export interface Policy {
  id: string;
  title: string;
  tagline: string;
  pillar: string;
  visionaryId: string;
  description: string;
  keyTargets: string[];
  statusProgress: string;
}

export interface Bill {
  id: string;
  billName: string;
  housePassed: string;
  year: string;
  policyId: string;
  visionaryId: string;
  summary: string;
  impactLevel: string;
  whatItAchieves: string;
}

export interface Duty {
  id: string;
  persona: 'citizen' | 'youth' | 'corporate' | 'community';
  category: 'environment' | 'economy' | 'society' | 'governance' | 'health';
  title: string;
  description: string;
  freedomFighterConnection: string;
  impactScore: number;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'One-time';
  difficulty: 'Easy' | 'Medium' | 'Proactive';
  icon: string;
}

export interface StateInfo {
  id: string;
  stateName: string;
  capital: string;
  primaryFocus: string;
  flagshipProjects: string[];
  localFreedomConnection: string;
}
