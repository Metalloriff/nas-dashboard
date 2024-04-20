import { useEffect, useState } from "react";
import InlineLoading from "../InlineLoading";
import { Module } from "../../Pages/Home";
import { formatBytes, getRandomKey } from "../../Classes/Constants";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function UsageModule() {
	const [data, setData] = useState(null);
	const [usageGraphs, setUsageGraphs] = useState({
		cpu: [],
		ram: [],
		gpu: []
	});

	useEffect(() => {
		for (const graph in usageGraphs) {
			for (let i = 0; i < 62; i += 2) {
				usageGraphs[graph].push({
					name: -(60 - i) + "s",
					load: 0
				});
			}

			setUsageGraphs(usageGraphs);
		}

		const interval = setInterval(() => {
			fetch(`http://${window.location.hostname}:3001/api/realtime`)
				.then(r => r.json())
				.then(data => {
					setData(data);

					for (const graph in usageGraphs) {
						usageGraphs[graph].splice(0, 1);
						usageGraphs[graph].push({
							name: 0,
							load: 0
						});

						for (let i = 0; i < 62; i += 2) {
							usageGraphs[graph][i / 2].name = -(60 - i) + "s";
						}
					}

					usageGraphs.cpu[usageGraphs.cpu.length - 1].load = data.cpu.load.currentLoad.toFixed(2);
					usageGraphs.ram[usageGraphs.ram.length - 1].load = Math.log2(data.ram.load.active).toFixed(1) / 2;

					setUsageGraphs(usageGraphs);
				})
				.catch(console.error);
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	if (!data) return <InlineLoading />;

	return (
		<div className="Flex">
			<Module title="CPU">
				<div className="Item">
					<b>Load</b>
					<div><span>{data.cpu.load.currentLoad.toFixed(1)}%</span></div>
				</div>

				<div className="Item">
					<b>Temperature</b>
					<div><span>{data.cpu.temp.main.toFixed(1)}C</span></div>
				</div>

				<Chart
					graph={usageGraphs.cpu}
					domain={[0, 100]}
					indicator={v => v + "%"}
				/>
			</Module>

			<Module title="CPU Threads">
				<div className="Flex" style={{ flexWrap: "wrap", gap: 10, justifyContent: "space-between" }}>
					{data.cpu.load.cpus.map((thread, idx) => (
						<div className="Item" key={idx}>
							<b>Core {idx + 1}</b>
							<div>{(thread.load || 0).toFixed(1)}%</div>
						</div>
					))}
				</div>
			</Module>

			<Module title="RAM">
				<div className="Item">
					<b>Load</b>
					<div>{formatBytes(data.ram.load.active)} / {formatBytes(data.ram.load.total)} <span>{((data.ram.load.active / data.ram.load.total) * 100.0).toFixed(1)}%</span></div>
				</div>

				<Chart
					graph={usageGraphs.ram}
					domain={[0, Math.ceil(data.ram.load.total / 1024 / 1024 / 1024)]}
					indicator={v => v + "GB"}
				/>
			</Module>

			{data.gpu.controllers.length > 0 ? data.gpu.controllers.map(gpu => gpu.memoryFree && (
				<Module title="GPU">
					<div className="Item">
						<b>VRAM Load</b>
						<div>{formatBytes((gpu.vram - gpu.memoryFree) * 1024 * 1024)} / {formatBytes(gpu.vram * 1024 * 1024)} <span>{(((gpu.vram - gpu.memoryFree) / gpu.vram) * 100.0).toFixed(1)}%</span></div>
					</div>
				</Module>
			)) : null}
		</div>
	);
}

function Chart({ graph, domain, indicator }) {
	return (
		<AreaChart
			width={320}
			height={300}
			data={graph}
			style={{ marginBottom: 15 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis domain={domain} tickFormatter={indicator} />
			<Tooltip isAnimationActive={false} formatter={(value, name) => indicator(value)} />
			<Area
				type="monotone"
				dataKey="load"
				stroke="var(--primary-color)"
				fill="var(--primary-color)"
				isAnimationActive={false}
				animationDuration={0}
			/>
		</AreaChart>
	);
}