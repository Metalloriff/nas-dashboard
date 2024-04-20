import { useEffect, useState } from "react";
import { Module } from "../../Pages/Home";
import { Modals } from "../Modals";
import "./OctoPrintModule.scss";
import { useInterval } from "../../Classes/Hooks";
import InlineLoading from "../InlineLoading";

export default function OctoPrintModule({ api_url, stream_url = null, api_key }) {
	const [currentJob, setCurrentJob] = useState(null);

	async function api_req(path) {
		const uri = api_url + "/api/" + path;
		const response = await fetch(uri, { headers: { "Authorization": "Bearer " + api_key } });
		const json = await response.json().catch(err => console.error("Failed to initialize OctoprintModule", err));

		return json;
	}

	useInterval(() => {
		api_req("job").then(setCurrentJob);
	}, 5000, true);

	function openStreamModal() {
		Modals.push(
			<div className="OPStreamModal">
				<img src={stream_url} alt="" />
			</div>
		)
	}

	let jobInfo = null;
	if (currentJob && currentJob.job.file.display) {
		const re = RegExp(/\S+ (.+) (Generic .+) lw (.+) lh (.+) if (.+) ext1 (.+) bed (.+)\.gcode/g);
		const m = re.exec(currentJob.job.file.display);

		jobInfo = {
			name: m[1],
			mat: m[2],
			nozzleSize: m[3],
			layerHeight: m[4],
			infill: m[5],
			nozzleTemp: m[6],
			bedTemp: m[7]
		};
	}

	return (
		<Module title="OctoPrint">
			{currentJob ? (
				<>
					{stream_url ? (
						<div className="Item OPCamPreview">
							<img src={stream_url} alt="" onClick={openStreamModal} />
						</div>
					) : null}

					{jobInfo ? (
						<>
							<div className="Item OPProgressItem">
								<b>Progress - {Math.round(currentJob.progress.completion)}%</b>
								<div className="ProgressBarContainer">
									<div className="ProgressBar" style={{ width: currentJob.progress.completion + "%" }} />
								</div>
							</div>

							<div className="Item">
								<b>Model Name</b>
								<div>{jobInfo.name}</div>
							</div>

							<div className="Item">
								<b>Material Type</b>
								<div>{jobInfo.mat}</div>
							</div>

							<div className="Item">
								<b>Nozzle Size</b>
								<div>{jobInfo.nozzleSize}</div>
							</div>

							<div className="Item">
								<b>Layer Height</b>
								<div>{jobInfo.layerHeight}</div>
							</div>

							<div className="Item">
								<b>Infill Percentage</b>
								<div>{jobInfo.infill}</div>
							</div>

							<div className="Item">
								<b>Temperatures</b>
								<div>Bed <span>{jobInfo.bedTemp}</span>, Nozzle <span>{jobInfo.nozzleTemp}</span></div>
							</div>
						</>
					) :
						<>
							<div className="Item">
								<div>No jobs running</div>
							</div>
						</>
					}

					<div className="Item Button" onClick={() => window.open(api_url, "_blank")}>
						Open OctoPrint
					</div>
				</>
			) : <InlineLoading />}
		</Module>
	);
}