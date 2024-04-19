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
				<CountdownModule title="Freedom" dateStr="05-05-2024" />
				<CountdownModule title="Jezza" dateStr="05-11-2024" />
				<CountdownModule title="NBU 2.0" dateStr="07-08-2024" />
			</>,
		"Birthdays":
			<>
				<BirthdayModules birthdays={{
					"Me": "05-20-2001",
					"Danny": "03-05-1993",
					"Max": "06-05-2002",
					"Cal": "04-20-1987",
					"Nate": "06-10-2003",
					"Jezza": "06-21-2002"
				}} />
			</>
	}
};