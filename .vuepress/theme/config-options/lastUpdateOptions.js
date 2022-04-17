module.exports = {
	transformer: (timestamp, lang) => {
		return new Date(timestamp).toLocaleDateString();
	},
	dateOptions: {
		hour12: true,
	},
};
