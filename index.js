const { generate } = require("./lib/srtGenerator");

exports.generateSRT = (data, format, startTime='00:00:00:00') => {
	try {
		return generate(data, format, startTime);
	} catch (error) {
		console.error(error);
	}
}
