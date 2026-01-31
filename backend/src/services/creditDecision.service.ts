export type ApplicationStatus = "APPROVED" | "REJECTED";

interface CreditDecisionResult {
  status: ApplicationStatus;
  creditScore: number;
  creditLimit?: number;
  reason?: string;
}

// -----------------------------
// 1. Credit Score (Mock CIBIL)
// -----------------------------
function generateCreditScore(pan: string): number {
  let hash = 0;
  for (let i = 0; i < pan.length; i++) {
    hash += pan.charCodeAt(i);
  }
  return 300 + (hash % 600);
}

// -----------------------------
// 2. Credit Limit
// -----------------------------
//
function calculateCreditLimit(annualIncome: number): number {
  if (annualIncome <= 200000) return 50000;
  if (annualIncome <= 300000) return 75000;
  if (annualIncome <= 500000) return 100000;
  return Math.floor(annualIncome * 0.3);
}

// -----------------------------
// 3. Age validation
// -----------------------------
function getAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();

  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// -----------------------------
// 5. Main Decision Engine
// -----------------------------
export const evaluateCreditCardApplication = async (applicant: {
  panCard: string;
  dob: string;
  annualIncome: number;
  hasRecentApplication: boolean;
}): Promise<CreditDecisionResult> => {
  const { panCard, dob, annualIncome, hasRecentApplication } = applicant;

  // Rule 1: Age ≥ 18
  const age = getAge(dob);
  if (age < 18) {
    return {
      status: "REJECTED",
      creditScore: 0,
      reason: "Applicant must be at least 18 years old",
    };
  }

  // Rule 2: No approved/rejected application in last 6 months
  if (hasRecentApplication) {
    return {
      status: "REJECTED",
      creditScore: 0,
      reason: "Previous application exists in last 6 months",
    };
  }

  // Rule 3: Fetch credit score from PAN
  const creditScore = generateCreditScore(panCard.toUpperCase());

  // Rule 4: Approve only if creditScore > 800
  if (creditScore <= 800) {
    return {
      status: "REJECTED",
      creditScore,
      reason: "Credit score is below approval threshold",
    };
  }

  // Rule 5: Assign credit limit
  const creditLimit = calculateCreditLimit(annualIncome);

  return {
    status: "APPROVED",
    creditScore,
    creditLimit,
  };
};
