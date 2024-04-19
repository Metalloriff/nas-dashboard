import { useState } from "react";
import { Module } from "../../Pages/Home";
import "./RecyclingModule.scss";
import InlineLoading from "../InlineLoading";
import { useInterval } from "../../Classes/Hooks";

export default function RecyclingModule() {
	const [data, setData] = useState(null);

	useInterval(() => {
		fetch("https://nas.kinzoku.one/api/nfc/recycling/data").then(r => r.json()).then(setData).catch(Boolean);
	}, 5000, true);

	let totalCount = 0;

	if (data) {
		totalCount = data.plastic.count + data.metal.count;

		for (const bag of data.bags) {
			totalCount += bag.count;
		}
	}

	return data ? (
		<Module title="Recycling" className="RecyclingModule">
			<div className="Item">
				<b><span className="Blip Metal" /> Metal</b>
				<div>{data.metal.count} cans | ${(data.metal.count * 0.1).toFixed(2)}</div>
			</div>

			<div className="Item">
				<b><span className="Blip Plastic" /> Plastic</b>
				<div>{data.plastic.count} bottles | ${(data.plastic.count * 0.1).toFixed(2)}</div>
			</div>

			<div className="Item">
				<b>{data.bags.length} Bags</b>

				{data.bags.length > 0 ? (
					data.bags.map((bag, idx) => (
						<div className="Item" key={idx}>
							<b><span className={"Blip " + (bag.type === "plastic" ? "Plastic" : "Metal")} /></b>
							<div>{bag.count} Items | ${(bag.count * 0.1).toFixed(2)}</div>
							<div>Started on {bag.date_started}</div>
							<div>Bagged on {bag.date_bagged}</div>
						</div>
					))
				)
					: (
						<div style={{ opacity: 0.5 }}>
							Nothing bagged.
						</div>
					)}
			</div>

			<div className="Item GrandTotal">
				<b>Total</b>
				<div>{totalCount} items | ${(totalCount * 0.1).toFixed(2)}</div>
			</div>
		</Module>
	) : (
		<Module title="Recycling">
			<InlineLoading />
		</Module>
	)
}