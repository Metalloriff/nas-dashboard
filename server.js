const express = require("express");
const { exec } = require("child_process");
const app = express();
const fs = require("fs");

// app.use(express.static("/var/www/html"));

for (const API_SRC of ["./src/Components/Modules/API", "./src/Components/Modules/Custom/API"]) {
	if (!fs.existsSync(API_SRC)) continue;
	const apis = fs.readdirSync(API_SRC);

	for (const api_fp of apis) {
		try {
			const api = require(API_SRC + "/" + api_fp);
			api(app);
		}
		catch (err) {
			console.error(err);
		}
	}
}

app.post("/api/sd_start", async (req, res) => {
	exec("cd /storage/ai/stable-diffusion-webui && bash webui-user.sh && bash webui.sh -f", (err, stdout, stderr) => {
		console.log({ err, stdout, stderr });
	});

	res.status(200);
});

const PORT = 3001;
app.listen(PORT);