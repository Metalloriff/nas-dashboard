import { useEffect, useState } from "react";
import { Module } from "../../Pages/Home";
import InlineLoading from "../InlineLoading";
import { formatBytes } from "../../Classes/Constants";

export default function SpecsModule() {
	const [specs, setSpecs] = useState(null);
	const [ramCapacity, setRamCapacity] = useState(null);

	useEffect(() => {
		fetch(`http://${window.location.hostname}:3001/api/specs`)
			.then(r => r.json())
			.then(setSpecs)
			.catch(console.error);
	}, []);

	useEffect(() => {
		if (!specs) return;

		let rc = 0;
		for (const rn of specs.memLayout) {
			rc += rn.size;
		}
		setRamCapacity(rc);
	}, [specs]);

	if (!specs || !ramCapacity) return <InlineLoading />;

	return (
		<div className="Flex SpecsModule">
			<Module title="Motherboard">
				<div className="Item">
					<b>Manufacturer</b>
					<div>{specs.baseboard.manufacturer}</div>
				</div>

				<div className="Item">
					<b>Model</b>
					<div>{specs.baseboard.model}</div>
				</div>
			</Module>

			<Module title="Operating System">
				<div className="Item">
					<b>Architecture</b>
					<div>{specs.os.arch}</div>
				</div>

				<div className="Item">
					<b>Platform/Distro</b>
					<div>{specs.os.release} {specs.os.distro}</div>
				</div>

				<div className="Item">
					<b>Kernel</b>
					<div>{specs.os.kernel}</div>
				</div>
			</Module>

			<Module title="CPU">
				<div className="Item">
					<b>Manufacturer</b>
					<div>{specs.cpu.manufacturer}</div>
				</div>

				<div className="Item">
					<b>Model</b>
					<div>{specs.cpu.brand}</div>
				</div>

				<div className="Item">
					<b>Core Count</b>
					<div><span>{specs.cpu.physicalCores}</span> Physical</div>
					<div><span>{specs.cpu.cores}</span> Total</div>
				</div>

				<div className="Item">
					<b>Speed</b>
					<div><span>{specs.cpu.speed}</span>Ghz</div>
					<div><span>{specs.cpu.speedMin}</span>Ghz Min</div>
					<div><span>{specs.cpu.speedMax}</span>Ghz Max</div>
				</div>

				<div className="Item">
					<b>Virtualization</b>

					{specs.cpu.virtualization ? <div style={{ color: "var(--cf-green)" }}>Yes</div> : <div style={{ color: "var(--cf-red)" }}>No</div>}
				</div>
			</Module>

			{specs.graphics.controllers.length > 0 && (
				<Module title="GPU">
					<div className="Item">
						<b>Model</b>
						<div>{specs.graphics.controllers[0].model}</div>
					</div>

					<div className="Item">
						<b>VRAM Capacity</b>
						<div>{formatBytes(specs.graphics.controllers[0].vram * 1025 * 1024)}</div>
					</div>
				</Module>
			)}

			<Module title="RAM">
				<div className="Item">
					<b>Capacity</b>
					<div>{formatBytes(ramCapacity)}</div>
				</div>
			</Module>

			<Module title="Storage">
				{specs.diskLayout.map(disk => (
					<div className="Item" key={disk.device}>
						<b>{disk.device} - {disk.interfaceType} {disk.type}</b>
						<div><span>Size</span> {formatBytes(disk.size)}</div>
						<div><span>Vendor</span> {disk.vendor}</div>
						<div><span>Name</span> {disk.name}</div>
						<div><span>Serial</span> {disk.serialNum}</div>
					</div>
				))}

				<div className="Item">
					<b>Total Estimated Capacity</b>
					<div>{formatBytes(specs.diskLayout.map(x => x.size).reduce((x, y) => x + y))}</div>
				</div>
			</Module>
		</div>
	);
}