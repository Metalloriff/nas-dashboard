import { File } from "react-feather";
import { Module } from "../../Pages/Home";
import "./NasModule.scss";

export default function NasModule() {
	const link = path => () => window.open("https://nas.kinzoku.one/" + path, "_blank");

	return (
		<div className="NasModule Modules">
			<div className="Flex">
				<Module title="Alpha" action={link("/metalloriff/alpha")}>
					<File />
				</Module>

				<Module title="Anime" action={link("/public/anime")}>
					<File />
				</Module>
			</div>

			<div className="Flex">
				<Module title="Memes" action={link("/public/memes")}>
					<File />
				</Module>
				<Module title="Evidence" action={link("/public/evidence")}>
					<File />
				</Module>
			</div>

			<div className="Flex">
				<Module title="WID" action={link("/private/wid")}>
					<File />
				</Module>
			</div>
		</div>
	);
}