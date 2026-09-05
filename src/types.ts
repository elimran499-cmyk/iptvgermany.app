export interface PricingPlan {
  id: string;
  duration: string;
  price: string;
  originalPrice: string;
  perMonthLabel: string;
  highlightLabel: string;
  highlightIcon: string;
  ribbon?: string;
  badge?: string;
  featured?: boolean;
  screens: string;
  features: string[];
}

export interface MultiScreenPlan {
  id: string;
  title: string;
  price: string;
  screensLabel: string;
  badge: string;
  badgeIcon: string;
  connections: string;
}

export interface BenefitCard {
  id: string;
  title: string;
  body: string;
}

export interface StepCard {
  id: string;
  number: number;
  title: string;
  body: string;
  bullets: string[];
}

export interface ComparisonRow {
  id: string;
  criterion: string;
  iconName: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  comment: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AppLogo {
  id: string;
  name: string;
  /** Brand colour for the text fallback shown when `logo` is absent. */
  color: string;
  logo?: string;
}
