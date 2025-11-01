import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen bg-slate-50">
			<Sidebar />
			<Header />
			<main className="ml-64 pt-16">
				<div className="p-8">{children}</div>
			</main>
		</div>
	);
}
