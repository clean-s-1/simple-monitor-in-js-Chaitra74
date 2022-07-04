const BMS_FIXED = {
	temperature: {
		min: 0,
		max: 45,
		name: 'Temperature',
		keyName: 'temperature',
		warningPoint: 2.25,
	},
	stateOfCharge: {
		min: 20,
		max: 80,
		name: 'State of charge',
		keyName: 'stateOfCharge',
		warningPoint: 4,
	},
	chargeRate: {
		max: 0.8,
		name: 'Charge rate',
		keyName: 'chargeRate',
		warningPoint: 0.04,
	},
};

const GLOBAL_LANGUAGE = 'de';
module.exports = { BMS_FIXED, GLOBAL_LANGUAGE };
