import CountdownModule, { BirthdayModules } from "./Components/Modules/CountdownModule";
import OctoPrintModule from "./Components/Modules/OctoPrintModule";
import RecyclingModule from "./Components/Modules/RecyclingModule";

export default {
	// background: {
	// 	url: "/assets/media/background.jpg",
	// 	opacity: 0.05,
	// 	blur: 0
	// },
	background: {
		url: "https://i.postimg.cc/T277xdTv/0kfcieieph081.png",
		opacity: 0.5,
		blur: 5
	},
	modules: {
		"Server":
			<>
				<OctoPrintModule
					stream_url="http://nas.kinzoku.one:8080/?action=stream"
					api_url="http://nas.kinzoku.one:5000"
					api_key="8FDD8FEC98A8436183416ABE430BEBDB"
				/>
			</>,
		"Household":
			<>
				<RecyclingModule />
				<CountdownModule title="Birthday" dateStr="05-20-2024" />
			</>
	}
};