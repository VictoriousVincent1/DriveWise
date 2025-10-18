// Financial calculation utilities for ToyotaPath

/**
 * Calculate monthly payment using loan formula
 */
export function calculateMonthlyPayment(
	principal: number,
	annualRate: number,
	months: number
): number {
	if (annualRate === 0) {
		return principal / months;
	}
  
	const monthlyRate = annualRate / 100 / 12;
	const payment = principal * 
		(monthlyRate * Math.pow(1 + monthlyRate, months)) / 
		(Math.pow(1 + monthlyRate, months) - 1);
  
	return Math.round(payment * 100) / 100;
}

/**
 * Calculate total interest paid over loan term
 */
export function calculateTotalInterest(
	monthlyPayment: number,
	months: number,
	principal: number
): number {
	const totalPaid = monthlyPayment * months;
	return Math.round((totalPaid - principal) * 100) / 100;
}

/**
 * Calculate total cost including interest
 */
export function calculateTotalCost(
	principal: number,
	annualRate: number,
	months: number
): number {
	const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
	return Math.round(monthlyPayment * months * 100) / 100;
}

/**
 * Estimate monthly lease payment
 */
export function estimateLeasePayment(
	msrp: number,
	downPayment: number,
	months: number,
	annualRate: number
): number {
	const capitalized = msrp - downPayment;
	const residualValue = msrp * 0.55;
	const depreciation = (capitalized - residualValue) / months;
	const monthlyRate = annualRate / 100 / 12;
	const rentCharge = (capitalized + residualValue) * monthlyRate;
  
	return Math.round((depreciation + rentCharge) * 100) / 100;
}

/**
 * Calculate lease payment with residual value
 */
export function calculateLeasePayment(
	msrp: number,
	downPayment: number,
	term: number,
	apr: number,
	residualPercent: number = 55
): number {
	const capitalized = msrp - downPayment;
	const residualValue = msrp * (residualPercent / 100);
	const depreciation = (capitalized - residualValue) / term;
	const monthlyRate = apr / 100 / 12;
	const rentCharge = (capitalized + residualValue) * monthlyRate;
  
	return Math.round((depreciation + rentCharge) * 100) / 100;
}

/**
 * Determine affordability tier based on income ratio
 */
export function getAffordabilityTier(
	monthlyPayment: number,
	monthlyIncome: number
): 'conservative' | 'moderate' | 'aggressive' {
	const ratio = monthlyPayment / monthlyIncome;
  
	if (ratio < 0.15) return 'conservative';
	if (ratio < 0.20) return 'moderate';
	return 'aggressive';
}

/**
 * Calculate affordability analysis
 */
export function calculateAffordability(
	monthlyIncome: number,
	monthlyExpenses: number,
	downPayment: number
): {
	maxMonthlyPayment: number;
	maxVehiclePrice: number;
	recommendedBudget: number;
	tier: 'conservative' | 'moderate' | 'aggressive';
} {
	const disposableIncome = monthlyIncome - monthlyExpenses;
	const conservativePayment = monthlyIncome * 0.15;
	const moderatePayment = monthlyIncome * 0.20;
	const aggressivePayment = monthlyIncome * 0.25;
	const ratio = disposableIncome / monthlyIncome;
  
	let tier: 'conservative' | 'moderate' | 'aggressive';
	let maxMonthlyPayment: number;
  
	if (ratio < 0.2) {
		tier = 'conservative';
		maxMonthlyPayment = conservativePayment;
	} else if (ratio < 0.4) {
		tier = 'moderate';
		maxMonthlyPayment = moderatePayment;
	} else {
		tier = 'aggressive';
		maxMonthlyPayment = aggressivePayment;
	}
  
	const months = 60;
	const apr = 6.5;
	const monthlyRate = apr / 100 / 12;
	const maxPrincipal = maxMonthlyPayment * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
	const maxVehiclePrice = maxPrincipal + downPayment;
  
	return {
		maxMonthlyPayment: Math.round(maxMonthlyPayment * 100) / 100,
		maxVehiclePrice: Math.round(maxVehiclePrice * 100) / 100,
		recommendedBudget: Math.round(conservativePayment * 100) / 100,
		tier
	};
}

/**
 * Get APR based on credit score
 */
export function getAPRFromCreditScore(creditScore: number): number {
	if (creditScore >= 750) return 4.5;
	if (creditScore >= 700) return 6.5;
	if (creditScore >= 650) return 9.0;
	if (creditScore >= 600) return 11.0;
	return 13.0;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}

/**
 * Calculate credit score impact on total cost
 */
export function calculateCreditScoreImpact(
	principal: number,
	months: number,
	creditScore: number
): {
	apr: number;
	monthlyPayment: number;
	totalCost: number;
	totalInterest: number;
} {
	const apr = getAPRFromCreditScore(creditScore);
	const monthlyPayment = calculateMonthlyPayment(principal, apr, months);
	const totalCost = monthlyPayment * months;
	const totalInterest = totalCost - principal;
  
	return {
		apr,
		monthlyPayment: Math.round(monthlyPayment * 100) / 100,
		totalCost: Math.round(totalCost * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100
	};
}

/**
 * Compare financing options
 */
export function compareFinancingOptions(
	principal: number,
	creditScore: number
): {
	option36: ReturnType<typeof calculateCreditScoreImpact>;
	option48: ReturnType<typeof calculateCreditScoreImpact>;
	option60: ReturnType<typeof calculateCreditScoreImpact>;
	option72: ReturnType<typeof calculateCreditScoreImpact>;
} {
	return {
		option36: calculateCreditScoreImpact(principal, 36, creditScore),
		option48: calculateCreditScoreImpact(principal, 48, creditScore),
		option60: calculateCreditScoreImpact(principal, 60, creditScore),
		option72: calculateCreditScoreImpact(principal, 72, creditScore)
	};
}

/**
 * Calculate trade-in depreciation
 */
export function calculateDepreciation(
	purchasePrice: number,
	currentMileage: number,
	yearsPurchased: number
): number {
	let value = purchasePrice;
  
	if (yearsPurchased >= 1) {
		value *= 0.80;
	}
  
	for (let i = 1; i < yearsPurchased; i++) {
		value *= 0.85;
	}
  
	const excessMileage = currentMileage - (yearsPurchased * 12000);
	if (excessMileage > 0) {
		value -= (excessMileage * 0.15);
	}
  
	return Math.max(Math.round(value * 100) / 100, purchasePrice * 0.25);
}

/**
 * Estimate trade-in value range
 */
export function estimateTradeInValue(
	make: string,
	model: string,
	year: number,
	mileage: number,
	condition: 'excellent' | 'good' | 'fair'
): {
	low: number;
	average: number;
	high: number;
} {
	const baseValue = 25000;
	const yearDepreciation = (2025 - year) * 0.15;
	const mileageDepreciation = (mileage / 100000) * 0.30;
  
	let adjustedValue = baseValue * (1 - yearDepreciation - mileageDepreciation);
  
	const conditionMultipliers = {
		excellent: 1.15,
		good: 1.0,
		fair: 0.85
	};
  
	adjustedValue *= conditionMultipliers[condition];
  
	return {
		low: Math.round(adjustedValue * 0.85 * 100) / 100,
		average: Math.round(adjustedValue * 100) / 100,
		high: Math.round(adjustedValue * 1.15 * 100) / 100
	};
}
