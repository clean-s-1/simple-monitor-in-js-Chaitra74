const BMS_FIXED = {
    temperature: {      
      min: 0,
      max: 45,
      name: "Temperature"
    },
    stateOfCharge: {
      min: 20,
      max: 80,   
      name: "State of charge"  
    },
    chargeRate: {     
      max: 0.8, 
      name: "Charge rate"    
    },
  };
  module.exports = BMS_FIXED;