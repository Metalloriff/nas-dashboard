import CountdownModule, { BirthdayModules } from "../Components/Modules/CountdownModule";
import OctoPrintModule from "../Components/Modules/OctoPrintModule";
import RecyclingModule from "../Components/Modules/RecyclingModule";

export default {
	background: {
		url: "https://i.postimg.cc/3wyfhwCS/vincentiu-solomon-ln5drpv-Im-I-unsplash.jpg",
		opacity: 0.5,
		blur: 5
	},
	modules: {
		"Server":
			<>
				<OctoPrintModule
					stream_url="YOUR STREAM URL"
					api_url="YOUR API URL"
					api_key="INSERT YOUR API KEY HERE"
				/>
			</>,
		"Household":
			<>
				<RecyclingModule />
				<CountdownModule title="Birthday" dateStr="05-20-2024" />
			</>
	}
};