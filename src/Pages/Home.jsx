import React from "react";
import "./Home.scss";
import SpecsModule from "../Components/Modules/SpecsModule";
import UsageModule from "../Components/Modules/UsageModule";
import OctoPrintModule from "../Components/Modules/OctoPrintModule";
import NasModule from "../Components/Modules/NasModule";
import bookmarks from "../bookmarks.json";
import BookmarkModule from "../Components/Modules/BookmarkModule";
import { getRandomKey, joinClassNames } from "../Classes/Constants";
import Countdown from "react-countdown";
import StableDiffusionModule from "../Components/Modules/StableDiffusionModule";
import RecyclingModule from "../Components/Modules/RecyclingModule";
import config from "../config.jsx";

export default function HomePage() {
	function renderCountdown(t) {
		let r = [];
		const months = Math.floor(t.total / (1000 * 60 * 60 * 24 * 30));
		let days = t.days;

		if (months > 0) {
			r.push(`${months} Months`);
		}

		while (days > 30) {
			days -= 30;
		}

		if (t.days > 0) {
			r.push(`${days} Day${days > 1 ? "s" : ""}`);
		}

		return r.join(", ") + "\nTotal Days: " + t.days;
	}

	return (
		<div className="HomePage">
			<div className="Background" style={{
				backgroundImage: `url(${config.background.url})`,
				filter: `blur(${config.background.blur}px)`,
				opacity: config.background.opacity
			}} />

			<div className="SectionColumns Flex">
				{Object.keys(config.modules).map(title => (
					<div className="Section" key={getRandomKey()}>
						<h2>{title}</h2>

						<div className="Modules">
							{config.modules[title]}
						</div>
					</div>
				))}
			</div>

			{Object.keys(bookmarks).length > 0 && Object.keys(bookmarks).map(type => (
				<div className="Section">
					<h2>{type}</h2>
					<div className="Modules Bookmarks" style={{ flexDirection: "row" }}>
						{bookmarks[type].map(bookmark => <BookmarkModule {...bookmark} />)}
					</div>
				</div>
			))}

			<div className="Section">
				<h2>Usage</h2>
				<div className="Modules Flex">
					<UsageModule />
				</div>
			</div>

			<div className="Sections">
				<h2>Specs</h2>
				<div className="Modules Flex">
					<SpecsModule />
				</div>
			</div>
		</div>
	);
}

export function Module({ title = null, children = null, action = null, style = {}, className = null }) {
	return (
		<div className={joinClassNames("Module", className)} style={{ cursor: action ? "pointer" : null, ...style }} onClick={action}>
			{title && <h4 className="Title">{title}</h4>}

			<div className="Body">{children}</div>
		</div>
	);
}