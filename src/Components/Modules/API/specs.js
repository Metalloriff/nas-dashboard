const sysinf = require("systeminformation");

module.exports = function (app) {
	app.get("/api/specs", async (req, res) => {
		res.json(await sysinf.getStaticData());
	});

	app.get("/api/realtime", async (req, res) => {
		res.json({
			cpu: {
				load: await sysinf.currentLoad(),
				speed: await sysinf.cpuCurrentSpeed(),
				temp: await sysinf.cpuTemperature()
			},
			ram: {
				load: await sysinf.mem()
			},
			gpu: await sysinf.graphics(),
			ping: await sysinf.inetLatency()
		});
	});
}