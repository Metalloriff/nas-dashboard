import { useEffect, useState } from "react";
import { Module } from "../../Pages/Home";
import InlineLoading from "../InlineLoading";

export default function MinecraftServerModule({ host, port = 25565, ...props }) {
	const [state, setState] = useState(null);

	useEffect(() => {

	}, [host, port]);

	return (
		<Module title="Minecraft server" {...props}>
			{state === null ? <InlineLoading />
				: (
					<div className="Item">

					</div>
				)}
		</Module>
	)
}