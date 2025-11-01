import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Analytics } from "./pages/Analytics";
import { Customers } from "./pages/Customers";
import { Overview } from "./pages/Overview";
import { Settings } from "./pages/Settings";
import { Subscriptions } from "./pages/Subscriptions";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Overview />} />
					<Route path="/customers" element={<Customers />} />
					<Route path="/subscriptions" element={<Subscriptions />} />
					<Route path="/analytics" element={<Analytics />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
