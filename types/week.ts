export interface BabyToday {
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  image: string;
}

export interface WeekGreeting {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: BabyToday;
  momHint: string;
}

export interface WeekBaby {
  analogy: string;
  image: string;
  description: string[];
  interestingFact: string;
}

export interface WeekMom {
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: { category: string; tip: string }[];
}
