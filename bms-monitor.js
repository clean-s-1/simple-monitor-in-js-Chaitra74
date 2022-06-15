const {expect} = require('chai');
const Battery = require('./battery');
const BMS_FIXED = require('./bmsConfig');


isPropertyOutOfRange = function(name,battery, bmsFixedValue) { 
    let isOutOfRange = false;
    if (battery[name] > bmsFixedValue.max || battery[name] < bmsFixedValue.min) {
        console.log(`${bmsFixedValue.name} is out of range! - ${battery.printAllBatteryValues()}`);
        isOutOfRange = true;
    }
    return isOutOfRange;
}

function batteryIsOk(battery, bmsFixedValues) {
   return !(isPropertyOutOfRange("temperature",battery,bmsFixedValues.temperature) || 
             isPropertyOutOfRange("stateOfCharge",battery,bmsFixedValues.stateOfCharge)|| 
             isPropertyOutOfRange("chargeRate",battery,bmsFixedValues.chargeRate))       
}

expect(batteryIsOk(new Battery(25, 70, 0.7), BMS_FIXED)).to.be.true;
expect(batteryIsOk(new Battery(50, 70, 0.8), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(40, 90, 0.8), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(20, 70, 0.9), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(-25, 70, 0.8), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(40, 10, 0.8), BMS_FIXED)).to.be.false;
expect(batteryIsOk(new Battery(20, 100, 0.08), BMS_FIXED)).to.be.false;

