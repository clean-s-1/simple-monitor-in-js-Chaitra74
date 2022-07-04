const { expect } = require('chai');
const Battery = require('./battery');
const { BMS_FIXED, GLOBAL_LANGUAGE } = require('./bmsConfig');
const translate = require('@vitalets/google-translate-api');

checkBatteryState = function (value, ranges) {
	isValidRange = false;
	ranges.forEach((range) => {
		if (value >= range.min && value < range.max) {
			isValidRange = range.isRangeValid;
			printMessage(range.message);
		}
	});
	return isValidRange;
};

printMessage = function (message) {
	if (message) {
		translate(message, {
			to: GLOBAL_LANGUAGE,
		}).then((res) => console.log(res.text));
	}
};

function batteryIsOk(battery, bmsFixedValues) {
	let tempState = checkBatteryState(
		battery['temperature'],
		getRanges(bmsFixedValues.temperature)
	);
	let socState = checkBatteryState(
		battery['stateOfCharge'],
		getRanges(bmsFixedValues.stateOfCharge)
	);
	let crState = checkBatteryState(
		battery['chargeRate'],
		getRanges(bmsFixedValues.chargeRate)
	);
	return tempState && socState && crState;
}

function getRanges(params) {
	let ranges = [
		{
			min: -Infinity,
			max: params.min,
			message: `${params.name} out of range. Low ${params.name} breach`,
			isRangeValid: false,
		},
		{
			min: params.min + params.warningPoint,
			max: params.max - params.warningPoint,
			isRangeValid: true,
		},
		{
			min: params.max,
			max: Infinity,
			message: `${params.name} out of range. High ${params.name} breach`,
			isRangeValid: false,
		},
		{
			min: params.min,
			max: params.min + params.warningPoint,
			message: `Warning: ${params.name} Approaching low`,
			isRangeValid: true,
		},
		{
			min: params.max - params.warningPoint,
			max: params.max,
			message: `Warning: ${params.name} Approaching peak`,
			isRangeValid: true,
		},
	];
	return ranges;
}

expect(batteryIsOk(new Battery(45, 77, 0.9), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(50, 70, 0.8), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(40, 90, 0.8), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(20, 70, 0.9), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(-25, 70, 0.8), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(40, 10, 0.8), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(20, 100, 0.08), BMS_FIXED)).to.be.false;
