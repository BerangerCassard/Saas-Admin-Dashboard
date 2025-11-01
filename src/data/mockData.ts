import type {
	AcquisitionSource,
	CohortData,
	Customer,
	KPIMetrics,
	MRRData,
	PlanType,
	RecentSubscription,
	RevenueByPlan,
	Subscription,
	SubscriptionStatus,
	UserGrowthData,
} from "../types";

const PLAN_PRICES = {
	free: 0,
	basic: 29,
	pro: 79,
	enterprise: 299,
};

const firstNames = [
	"Emma",
	"Liam",
	"Olivia",
	"Noah",
	"Ava",
	"Ethan",
	"Sophia",
	"Mason",
	"Isabella",
	"William",
	"Mia",
	"James",
	"Charlotte",
	"Benjamin",
	"Amelia",
	"Lucas",
	"Harper",
	"Henry",
	"Evelyn",
	"Alexander",
];
const lastNames = [
	"Smith",
	"Johnson",
	"Williams",
	"Brown",
	"Jones",
	"Garcia",
	"Miller",
	"Davis",
	"Rodriguez",
	"Martinez",
	"Hernandez",
	"Lopez",
	"Gonzalez",
	"Wilson",
	"Anderson",
	"Thomas",
	"Taylor",
	"Moore",
	"Jackson",
	"Martin",
];
const companies = [
	"TechCorp",
	"InnoSoft",
	"DataFlow",
	"CloudSync",
	"NextGen",
	"PixelWorks",
	"CodeBase",
	"DevHub",
	"AppForge",
	"ByteStream",
	"LogicLab",
	"SyncFlow",
	"Quantum",
	"Nexus",
	"Vertex",
	"Zenith",
	"Horizon",
	"Catalyst",
	"Luminary",
	"Pinnacle",
];

export const generateCustomers = (): Customer[] => {
	const customers: Customer[] = [];
	const statuses: SubscriptionStatus[] = [
		"active",
		"active",
		"active",
		"active",
		"active",
		"active",
		"active",
		"trial",
		"trial",
		"canceled",
		"past_due",
	];
	const plans: PlanType[] = [
		"free",
		"basic",
		"basic",
		"pro",
		"pro",
		"pro",
		"enterprise",
	];

	for (let i = 0; i < 120; i++) {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		const company =
			companies[Math.floor(Math.random() * companies.length)] +
			(Math.random() > 0.5 ? " Inc" : " Ltd");
		const plan = plans[Math.floor(Math.random() * plans.length)];
		const status = statuses[Math.floor(Math.random() * statuses.length)];
		const segment =
			plan === "enterprise" || (plan === "pro" && Math.random() > 0.5)
				? "Enterprise"
				: "SMB";

		const daysAgo = Math.floor(Math.random() * 365);
		const registeredAt = new Date();
		registeredAt.setDate(registeredAt.getDate() - daysAgo);

		customers.push({
			id: `cus_${i.toString().padStart(6, "0")}`,
			name: `${firstName} ${lastName}`,
			email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s/g, "")}.com`,
			company,
			plan,
			status,
			mrr: PLAN_PRICES[plan],
			registeredAt,
			segment,
			churnRisk: status === "active" ? Math.random() * 100 : undefined,
			trialProgress: status === "trial" ? Math.random() * 100 : undefined,
		});
	}

	return customers.sort(
		(a, b) => b.registeredAt.getTime() - a.registeredAt.getTime(),
	);
};

export const generateSubscriptions = (
	customers: Customer[],
): Subscription[] => {
	return customers
		.filter(
			(c) =>
				c.plan !== "free" && (c.status === "active" || c.status === "past_due"),
		)
		.map((customer, i) => {
			const billingCycle = Math.random() > 0.4 ? "monthly" : "yearly";
			const multiplier = billingCycle === "yearly" ? 10 : 1;
			const nextPayment = new Date();
			nextPayment.setDate(
				nextPayment.getDate() + (billingCycle === "monthly" ? 30 : 365),
			);

			return {
				id: `sub_${i.toString().padStart(6, "0")}`,
				customerId: customer.id,
				customerName: customer.name,
				plan: customer.plan,
				billingCycle,
				amount: PLAN_PRICES[customer.plan] * multiplier,
				status: customer.status,
				nextPayment,
				startDate: customer.registeredAt,
				paymentMethod: Math.random() > 0.2 ? "card" : "invoice",
			};
		});
};

export const generateMRRData = (): MRRData[] => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const data: MRRData[] = [];
	let baseMRR = 50000;

	for (let i = 0; i < 12; i++) {
		const newMRR = 8000 + Math.random() * 4000;
		const expansion = 2000 + Math.random() * 2000;
		const churn = 1500 + Math.random() * 1000;
		baseMRR = baseMRR + newMRR + expansion - churn;

		data.push({
			month: months[i],
			newMRR: Math.round(newMRR),
			expansion: Math.round(expansion),
			churn: Math.round(churn),
			total: Math.round(baseMRR),
		});
	}

	return data;
};

export const generateUserGrowthData = (): UserGrowthData[] => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const data: UserGrowthData[] = [];

	let free = 200,
		trial = 30,
		basic = 40,
		pro = 25,
		enterprise = 5;

	for (let i = 0; i < 12; i++) {
		free += Math.floor(Math.random() * 30 + 10);
		trial += Math.floor(Math.random() * 10 - 2);
		basic += Math.floor(Math.random() * 8 + 2);
		pro += Math.floor(Math.random() * 6 + 2);
		enterprise += Math.floor(Math.random() * 3);

		data.push({
			month: months[i],
			free: Math.max(0, free),
			trial: Math.max(0, trial),
			basic: Math.max(0, basic),
			pro: Math.max(0, pro),
			enterprise: Math.max(0, enterprise),
		});
	}

	return data;
};

export const generateRevenueByPlan = (): RevenueByPlan[] => {
	return [
		{ plan: "Basic", revenue: 28400 },
		{ plan: "Pro", revenue: 52300 },
		{ plan: "Enterprise", revenue: 41850 },
	];
};

export const generateKPIMetrics = (): KPIMetrics => {
	return {
		mrr: 122550,
		mrrGrowth: 12.5,
		activeUsers: 3547,
		activeUsersGrowth: 8.3,
		conversionRate: 24.7,
		conversionRateChange: 3.2,
		churnRate: 3.8,
		churnRateChange: -0.5,
	};
};

export const generateRecentSubscriptions = (): RecentSubscription[] => {
	const plans: PlanType[] = ["basic", "pro", "enterprise"];
	const statuses: SubscriptionStatus[] = [
		"active",
		"active",
		"active",
		"trial",
	];
	const subs: RecentSubscription[] = [];

	for (let i = 0; i < 10; i++) {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		const plan = plans[Math.floor(Math.random() * plans.length)];
		const status = statuses[Math.floor(Math.random() * statuses.length)];
		const date = new Date();
		date.setDate(date.getDate() - i);

		subs.push({
			id: `sub_recent_${i}`,
			customerName: `${firstName} ${lastName}`,
			plan,
			amount: PLAN_PRICES[plan],
			status,
			date,
		});
	}

	return subs;
};

export const generateAcquisitionSources = (): AcquisitionSource[] => {
	return [
		{ name: "Organic", value: 1847, color: "#10b981" },
		{ name: "Paid", value: 982, color: "#6366f1" },
		{ name: "Referral", value: 534, color: "#f59e0b" },
		{ name: "Direct", value: 184, color: "#ef4444" },
	];
};

export const generateCohortData = (): CohortData[] => {
	return [
		{
			cohort: "Jan 2024",
			month0: 100,
			month1: 87,
			month2: 79,
			month3: 74,
			month4: 71,
			month5: 68,
		},
		{
			cohort: "Feb 2024",
			month0: 100,
			month1: 89,
			month2: 82,
			month3: 78,
			month4: 75,
			month5: 0,
		},
		{
			cohort: "Mar 2024",
			month0: 100,
			month1: 91,
			month2: 85,
			month3: 81,
			month4: 0,
			month5: 0,
		},
		{
			cohort: "Apr 2024",
			month0: 100,
			month1: 88,
			month2: 83,
			month3: 0,
			month4: 0,
			month5: 0,
		},
		{
			cohort: "May 2024",
			month0: 100,
			month1: 92,
			month2: 0,
			month3: 0,
			month4: 0,
			month5: 0,
		},
		{
			cohort: "Jun 2024",
			month0: 100,
			month1: 0,
			month2: 0,
			month3: 0,
			month4: 0,
			month5: 0,
		},
	];
};

export const mockCustomers = generateCustomers();
export const mockSubscriptions = generateSubscriptions(mockCustomers);
export const mockMRRData = generateMRRData();
export const mockUserGrowthData = generateUserGrowthData();
export const mockRevenueByPlan = generateRevenueByPlan();
export const mockKPIMetrics = generateKPIMetrics();
export const mockRecentSubscriptions = generateRecentSubscriptions();
export const mockAcquisitionSources = generateAcquisitionSources();
export const mockCohortData = generateCohortData();
