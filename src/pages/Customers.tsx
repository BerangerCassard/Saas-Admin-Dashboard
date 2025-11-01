import { format } from "date-fns";
import {
	AlertCircle,
	ArrowUpRight,
	ChevronLeft,
	ChevronRight,
	Filter,
	Mail,
	Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Input } from "../components/Input";
import { mockCustomers } from "../data/mockData";
import type { PlanType, SubscriptionStatus } from "../types";

const ITEMS_PER_PAGE = 20;

export function Customers() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPlan, setSelectedPlan] = useState<PlanType | "all">("all");
	const [selectedStatus, setSelectedStatus] = useState<
		SubscriptionStatus | "all"
	>("all");
	const [currentPage, setCurrentPage] = useState(1);

	const filteredCustomers = useMemo(() => {
		return mockCustomers.filter((customer) => {
			const matchesSearch =
				customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				customer.company.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesPlan =
				selectedPlan === "all" || customer.plan === selectedPlan;
			const matchesStatus =
				selectedStatus === "all" || customer.status === selectedStatus;

			return matchesSearch && matchesPlan && matchesStatus;
		});
	}, [searchQuery, selectedPlan, selectedStatus]);

	const paginatedCustomers = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	}, [filteredCustomers, currentPage]);

	const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(value);
	};

	const getStatusBadge = (status: SubscriptionStatus) => {
		switch (status) {
			case "active":
				return <Badge variant="success">Active</Badge>;
			case "trial":
				return <Badge variant="info">Trial</Badge>;
			case "canceled":
				return <Badge variant="neutral">Canceled</Badge>;
			case "past_due":
				return <Badge variant="warning">Past Due</Badge>;
			case "churned":
				return <Badge variant="danger">Churned</Badge>;
			default:
				return <Badge variant="neutral">{status}</Badge>;
		}
	};

	const getPlanBadge = (plan: PlanType) => {
		switch (plan) {
			case "enterprise":
				return <Badge variant="info">Enterprise</Badge>;
			case "pro":
				return <Badge variant="success">Pro</Badge>;
			case "basic":
				return <Badge variant="neutral">Basic</Badge>;
			case "free":
				return <Badge variant="neutral">Free</Badge>;
		}
	};

	const getChurnRiskBadge = (risk?: number) => {
		if (!risk) return null;
		if (risk > 70) return <Badge variant="danger">High Risk</Badge>;
		if (risk > 40) return <Badge variant="warning">Medium Risk</Badge>;
		return null;
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-slate-900">Customers</h1>
				<p className="mt-2 text-slate-600">
					Manage and view all customer accounts
				</p>
			</div>

			<Card>
				<CardContent className="py-6">
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="flex-1">
							<Input
								type="search"
								placeholder="Search by name, email, or company..."
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setCurrentPage(1);
								}}
								icon={<Search className="w-4 h-4" />}
							/>
						</div>

						<div className="flex gap-3">
							<select
								value={selectedPlan}
								onChange={(e) => {
									setSelectedPlan(e.target.value as PlanType | "all");
									setCurrentPage(1);
								}}
								className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
							>
								<option value="all">All Plans</option>
								<option value="free">Free</option>
								<option value="basic">Basic</option>
								<option value="pro">Pro</option>
								<option value="enterprise">Enterprise</option>
							</select>

							<select
								value={selectedStatus}
								onChange={(e) => {
									setSelectedStatus(
										e.target.value as SubscriptionStatus | "all",
									);
									setCurrentPage(1);
								}}
								className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
							>
								<option value="all">All Status</option>
								<option value="active">Active</option>
								<option value="trial">Trial</option>
								<option value="canceled">Canceled</option>
								<option value="past_due">Past Due</option>
								<option value="churned">Churned</option>
							</select>

							<Button variant="secondary">
								<Filter className="w-4 h-4 mr-2" />
								More Filters
							</Button>
						</div>
					</div>

					<div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
						<span>
							Showing {paginatedCustomers.length} of {filteredCustomers.length}{" "}
							customers
						</span>
					</div>
				</CardContent>
			</Card>

			<Card>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-slate-200 bg-slate-50">
								<th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
									Customer
								</th>
								<th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
									Company
								</th>
								<th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
									Plan
								</th>
								<th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
									Status
								</th>
								<th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
									MRR
								</th>
								<th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
									Joined
								</th>
								<th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{paginatedCustomers.map((customer) => (
								<tr
									key={customer.id}
									className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
								>
									<td className="py-4 px-4">
										<div>
											<div className="text-sm font-medium text-slate-900">
												{customer.name}
											</div>
											<div className="text-xs text-slate-500">
												{customer.email}
											</div>
										</div>
									</td>
									<td className="py-4 px-4">
										<div className="flex items-center gap-2">
											<span className="text-sm text-slate-700">
												{customer.company}
											</span>
											<Badge variant="neutral" className="text-xs">
												{customer.segment}
											</Badge>
										</div>
									</td>
									<td className="py-4 px-4">{getPlanBadge(customer.plan)}</td>
									<td className="py-4 px-4">
										<div className="flex items-center gap-2">
											{getStatusBadge(customer.status)}
											{getChurnRiskBadge(customer.churnRisk)}
										</div>
									</td>
									<td className="py-4 px-4 text-sm font-medium text-slate-900">
										{formatCurrency(customer.mrr)}
									</td>
									<td className="py-4 px-4 text-sm text-slate-600">
										{format(customer.registeredAt, "MMM d, yyyy")}
									</td>
									<td className="py-4 px-4">
										<div className="flex items-center gap-2">
											<button
												className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
												title="Send email"
											>
												<Mail className="w-4 h-4" />
											</button>
											<button
												className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
												title="View details"
											>
												<ArrowUpRight className="w-4 h-4" />
											</button>
											{customer.churnRisk && customer.churnRisk > 70 && (
												<button
													className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
													title="Churn risk alert"
												>
													<AlertCircle className="w-4 h-4" />
												</button>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{totalPages > 1 && (
					<div className="border-t border-slate-200 px-6 py-4">
						<div className="flex items-center justify-between">
							<div className="text-sm text-slate-600">
								Page {currentPage} of {totalPages}
							</div>
							<div className="flex gap-2">
								<Button
									variant="secondary"
									size="sm"
									onClick={() =>
										setCurrentPage((prev) => Math.max(1, prev - 1))
									}
									disabled={currentPage === 1}
								>
									<ChevronLeft className="w-4 h-4 mr-1" />
									Previous
								</Button>
								<Button
									variant="secondary"
									size="sm"
									onClick={() =>
										setCurrentPage((prev) => Math.min(totalPages, prev + 1))
									}
									disabled={currentPage === totalPages}
								>
									Next
									<ChevronRight className="w-4 h-4 ml-1" />
								</Button>
							</div>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
}
