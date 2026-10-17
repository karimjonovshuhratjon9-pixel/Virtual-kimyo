export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  grade?: number; // 7, 8, 9, 10, 11
  schoolClass?: string; // e.g. "8-B"
  avatar?: string;
  xp: number;
  completedExperiments: string[];
  completedLessons: string[];
  quizScores: Record<string, number>; // quizId -> percentage
  badges: string[];
  joinedDate: string;
}

export type ElementCategory = 
  | 'alkali'
  | 'alkaline-earth'
  | 'transition'
  | 'post-transition'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  latinName: string;
  atomicMass: number;
  period: number;
  group: number;
  category: ElementCategory;
  categoryNameUz: string;
  electronConfig: string;
  electronegativity?: number;
  density?: number; // g/cm³
  meltingPoint?: number; // °C
  boilingPoint?: number; // °C
  discoveredBy?: string;
  discoveryYear?: string | number;
  phase: 'Qattiq' | 'Suyuq' | 'Gaz' | 'Noma’lum';
  summaryUz: string;
  usesUz: string[];
  valence: string;
}

export interface LabReagent {
  id: string;
  name: string;
  formula: string;
  color: string;
  state: 'liquid' | 'solid' | 'powder' | 'gas';
  hazardLevel: 'safe' | 'warning' | 'danger';
  hazardNoteUz: string;
  volumeMl?: number;
}

export interface LabApparatus {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface LabStep {
  stepNumber: number;
  title: string;
  instructionUz: string;
  requiredAction: 'add_reagent' | 'heat' | 'stir' | 'measure_ph' | 'observe';
  targetReagentId?: string;
  targetApparatus?: string;
  hintUz?: string;
  observationUz: string;
  visualEffect: {
    liquidColor?: string;
    bubbling?: boolean;
    precipitateColor?: string;
    temperatureChange?: number; // delta in °C
    smokeOrGas?: string;
    flameColor?: string;
  };
}

export interface Experiment {
  id: string;
  title: string;
  grade: number; // 7, 8, 9, 10, 11
  topic: string;
  objectiveUz: string;
  durationMinutes: number;
  difficulty: 'Oson' | 'O‘rtacha' | 'Qiyin' | 'Murakkab';
  apparatus: string[];
  reagents: LabReagent[];
  safetyWarnings: string[];
  steps: LabStep[];
  chemicalEquation: string;
  equationType: string;
  scientificExplanationUz: string;
  conclusionUz: string;
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ChemicalReaction {
  id: string;
  name: string;
  type: 'Birikish' | 'Ajralish' | 'O‘rin olish' | 'Almashinish' | 'Neytrallanish' | 'Oksidlanish-qaytarilish' | 'Cho‘kma' | 'Gaz ajralishi';
  equation: string;
  reactants: string[];
  products: string[];
  conditions: string; // e.g. "t° = 400°C, katalizator (Pt)"
  observation: string;
  explanation: string;
  grade: number;
  balancedEquationChallenge?: {
    unbalancedEquation: string;
    reactants: { formula: string; correctCoef: number }[];
    products: { formula: string; correctCoef: number }[];
    hint: string;
  };
}

export interface Molecule3DData {
  id: string;
  name: string;
  formula: string;
  geometry: string; // e.g., "Chiziqli", "Burchakli", "Tetraedrik"
  bondAngle: string;
  descriptionUz: string;
  atoms: {
    element: string; // 'H', 'O', 'C', etc.
    position: [number, number, number];
    color: string;
    radius: number;
    symbol: string;
  }[];
  bonds: [number, number][]; // pairs of atom indices
  hybridization?: string;
  molarMass: number;
  structuralFormula2D?: string;
  substanceClassUz?: string;
  substanceTypeUz?: string;
  physicalStateUz?: string;
  separatedElementsSummaryUz?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  grade: number;
  chapter: string;
  summary: string;
  content: string; // Rich markdown-like or formatted text
  keyFormulas: string[];
  examples: {
    problem: string;
    solution: string;
  }[];
  relatedExperimentId?: string;
  checkpointQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface QuizItem {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'balance-equation' | 'identify-element';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  difficulty: 'Oson' | 'O‘rtacha' | 'Murakkab';
  grade: number;
  category: string;
}

export interface LabReport {
  id: string;
  userId: string;
  studentName: string;
  studentGrade: string;
  experimentId: string;
  experimentTitle: string;
  date: string;
  objective: string;
  apparatusUsed: string[];
  observations: string;
  reactionEquation: string;
  calculationResults?: string;
  conclusion: string;
  teacherGrade?: number; // 1-5 or 0-100
  teacherFeedback?: string;
  status: 'draft' | 'submitted' | 'graded';
}

export interface SafetyRule {
  id: string;
  category: 'Kiyim va himoya' | 'Reaktivlar bilan ishlash' | 'Favqulodda holatlar' | 'Laboratoriya tartibi';
  title: string;
  descriptionUz: string;
  severity: 'info' | 'warning' | 'danger';
  icon: string;
  doList: string[];
  dontList: string[];
}

export interface HazardSymbol {
  code: string;
  nameUz: string;
  descriptionUz: string;
  hazardType: string;
  precautionsUz: string;
  iconName: string;
  color: string;
}

export interface SchoolClass {
  id: string;
  name: string; // e.g. "8-A", "9-B"
  grade: number;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  averageScore: number;
  assignedExperiments: string[];
  deadlineDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  date: string;
  targetGrade?: number;
  isImportant?: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
}
