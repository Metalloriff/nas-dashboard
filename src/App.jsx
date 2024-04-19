import { useEffect } from "react";
import "./App.scss";
import RoutesStore from "./Classes/Stores/RoutesStore";
import ContextMenu from "./Components/ContextMenuHandler";
import DarkReaderDetector from "./Components/DarkReaderDetector";
import { Modals } from "./Components/Modals";
import PageFooter from "./Components/PageElements/PageFooter";
import Toasts from "./Components/Toasts";
import HomePage from "./Pages/Home";
import "./city-fog-theme.css";

function PageElement() {
	// Use the page route state
	RoutesStore.useState(() => RoutesStore.getCurrentRoute());
	// Get the hash and arguments from the formatted route
	const [hash, ...args] = RoutesStore.getFormattedRoute();

	// Zhu Li, do the thing!
	switch (hash) {
		default: return <HomePage />;
	}
}

export default function App() {
	function randomRange(arg0, arg1) {
		throw new Error("Function not implemented.");
	}

	return (
		<div className="App">
			<div className="Main">
				<PageElement />
			</div>

			<PageFooter />

			<Modals />
			<Toasts />
			<ContextMenu.Handler />
			<DarkReaderDetector />
		</div>
	);
}