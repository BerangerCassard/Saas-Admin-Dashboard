import type { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	hover?: boolean;
}

export function Card({
	children,
	className = "",
	onClick,
	hover = false,
}: CardProps) {
	const hoverClass = hover
		? "hover:shadow-md transition-shadow duration-200 cursor-pointer"
		: "";

	return (
		<div
			className={`bg-white rounded-lg shadow-sm border border-slate-200 ${hoverClass} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
}

interface CardHeaderProps {
	children: ReactNode;
	className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
	return (
		<div className={`px-6 py-4 border-b border-slate-200 ${className}`}>
			{children}
		</div>
	);
}

interface CardContentProps {
	children: ReactNode;
	className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
	return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
	children: ReactNode;
	className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
	return (
		<h3 className={`text-lg font-semibold text-slate-900 ${className}`}>
			{children}
		</h3>
	);
}
