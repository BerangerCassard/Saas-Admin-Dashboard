export type PlanType = "free" | "basic" | "pro" | "enterprise";
export type SubscriptionStatus =
	| "active"
	| "trial"
	| "canceled"
	| "past_due"
	| "churned";
export type BillingCycle = "monthly" | "yearly";
export type CustomerSegment = "SMB" | "Enterprise";
export type PaymentMethod = "card" | "invoice";
export type UserRole = "admin" | "member" | "viewer";

export interface Customer {
	id: string;
	name: string;
	email: string;
	company: string;
	plan: PlanType;
	status: SubscriptionStatus;
	mrr: number;
	registeredAt: Date;
	segment: CustomerSegment;
	avatar?: string;
	churnRisk?: number;
	trialProgress?: number;
}

export interface Subscription {
	id: string;
	customerId: string;
	customerName: string;
	plan: PlanType;
	billingCycle: BillingCycle;
	amount: number;
	status: SubscriptionStatus;
	nextPayment?: Date;
	startDate: Date;
	paymentMethod: PaymentMethod;
}

export interface MRRData {
	month: string;
	newMRR: number;
	expansion: number;
	churn: number;
	total: number;
}

export interface UserGrowthData {
	month: string;
	free: number;
	trial: number;
	basic: number;
	pro: number;
	enterprise: number;
}

export interface RevenueByPlan {
	plan: string;
	revenue: number;
}

export interface KPIMetrics {
	mrr: number;
	mrrGrowth: number;
	activeUsers: number;
	activeUsersGrowth: number;
	conversionRate: number;
	conversionRateChange: number;
	churnRate: number;
	churnRateChange: number;
}

export interface RecentSubscription {
	id: string;
	customerName: string;
	plan: PlanType;
	amount: number;
	status: SubscriptionStatus;
	date: Date;
}

export interface AcquisitionSource {
	name: string;
	value: number;
	color: string;
}

export interface CohortData {
	cohort: string;
	month0: number;
	month1: number;
	month2: number;
	month3: number;
	month4: number;
	month5: number;
}
