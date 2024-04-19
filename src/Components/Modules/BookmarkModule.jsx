import { Module } from "../../Pages/Home";
import LinkWrapper from "../LinkWrapper";
import "./BookmarkModule.scss";

export default function BookmarkModule({ title, uri, color = "white", textColor = "black", icon = "https://i.imgur.com/AAXYcZZ.png" }) {
	return (
		<LinkWrapper href={uri}>
			<Module
				title={title}
				className="BookmarkModule FlexCenter"
				style={{ color: textColor }}
				action={() => { }}
			>
				<div className="BG" style={{ background: color }} />
				<img src={icon} alt="" className="Icon" />
			</Module>
		</LinkWrapper>
	)
}