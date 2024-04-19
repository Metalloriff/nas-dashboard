import { useState } from "react";
import { Module } from "../../Pages/Home";
import InlineLoading from "../InlineLoading";

export default function StableDiffusionModule() {
	const [running, setRunning] = useState(false);
	const [busy, setBusy] = useState(false);

	const events = {
		start: () => {
			fetch("http://nas.kinzoku.one:42070/api/sd_start", { method: "POST" }).then(r => {
				console.log(r);
			});
		},
		stop: () => {

		}
	};

	return (
		<Module title="Stable Diffusion">
			{busy ? (
				<div className="Item Button Disabled">
					<InlineLoading />
				</div>
			)
				: running ? (
					<div className="Item Button" onClick={events.stop}>
						Stop
					</div>
				)
					: (
						<div className="Item Button" onCanPlay={events.start}>
							Start
						</div>
					)}
		</Module>
	)
}