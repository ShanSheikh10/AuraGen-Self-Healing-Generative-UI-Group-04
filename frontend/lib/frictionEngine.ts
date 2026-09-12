export type FrictionEventType =
  | "field_focus"
  | "field_blur"
  | "hesitation"
  | "validation_error"
  | "correction";

export type FrictionEvent = {
  id: string;
  field: string;
  type: FrictionEventType;
  timestamp: number;
  durationMs?: number;
};

export type FrictionMetrics = {
  fieldFocuses: number;
  hesitations: number;
  validationErrors: number;
  corrections: number;
  totalDwellTime: number;
};

export type FrictionLevel =
  | "Low"
  | "Moderate"
  | "High"
  | "Critical";

export const initialFrictionMetrics: FrictionMetrics = {
  fieldFocuses: 0,
  hesitations: 0,
  validationErrors: 0,
  corrections: 0,
  totalDwellTime: 0,
};

export function calculateFrictionScore(
  metrics: FrictionMetrics
): number {
  const hesitationScore = Math.min(
    metrics.hesitations * 10,
    30
  );

  const errorScore = Math.min(
    metrics.validationErrors * 15,
    30
  );

  const correctionScore = Math.min(
    metrics.corrections * 2,
    20
  );

  const dwellScore =
    metrics.totalDwellTime >= 10000 ? 20 : 0;

  return Math.min(
    hesitationScore +
      errorScore +
      correctionScore +
      dwellScore,
    100
  );
}

export function getFrictionLevel(
  score: number
): FrictionLevel {
  if (score >= 80) {
    return "Critical";
  }

  if (score >= 60) {
    return "High";
  }

  if (score >= 30) {
    return "Moderate";
  }

  return "Low";
}

export function shouldAdaptUI(
  score: number
): boolean {
  return score >= 60;
}