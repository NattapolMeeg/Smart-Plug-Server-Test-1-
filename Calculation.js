function getCurrentTime() {
    return new Date();
}
/*
// Function to calculate energy consumption using numerical integration
function Energy_con(voltageReadings, currentReadings, timeIntervals) {
    if (voltageReadings.length !== currentReadings.length || voltageReadings.length !== timeIntervals.length) {
        throw new Error('The length of voltage readings, current readings, and time intervals must be the same.');
    }

    let totalEnergy = 0;                            

    for (let i = 0; i < voltageReadings.length - 1; i++) {
        let avgPower = (voltageReadings[i] * currentReadings[i] + voltageReadings[i + 1] * currentReadings[i + 1]) / 2;
        let timeInterval = timeIntervals[i + 1] - timeIntervals[i];
        totalEnergy += avgPower * timeInterval / 3600 / 1000; // Convert to kWh
    }

    let Bill = Energy_cost(totalEnergy);

    return { totalEnergy, Bill };
}
*/

let totalEnergy = 0;
function avgPower(voltageReadings,currentReadings){
    let power = (voltageReadings * currentReadings) / 1000 ;
    totalEnergy += power * (30000 / 3600000);
    // totalEnergy = totalEnergy  / 60000;
    // console.log(totalEnergy);
    return totalEnergy;
}

setInterval(() => {avgPower}, 30000);

function Energy_con(voltageReadings, currentReadings){  
    let totalEnergy = 0;
    console.log("Calculating the energy consumsion");
    // console.log(voltageReadings);
    // console.log(currentReadings);
    totalEnergy = avgPower(voltageReadings, currentReadings);
    // console.log(totalEnergy);
    let Bill = Energy_cost(totalEnergy);
    // console.log(Bill);
    // let Bill = 2
    // let totalEnergy = 3 
    return { totalEnergy, Bill };
}

function Energy_cost(Unit) {
    let ft = 0.36972;
    let EE_Eng_cost = 0.00;
    let ServiceCharge = 0.00;

    if (Unit <= 150) {
        ServiceCharge = 8.19;
        if (Unit <= 15) {
            EE_Eng_cost = 2.3488;
        } else if (Unit >= 16 && Unit <= 25) {
            EE_Eng_cost = 2.9882;
        } else if (Unit >= 26 && Unit <= 35) {
            EE_Eng_cost = 3.2405;
        } else if (Unit >= 36 && Unit <= 100) {
            EE_Eng_cost = 3.6237;
        } else if (Unit >= 101 && Unit <= 150) {
            EE_Eng_cost = 3.7171;
        }
    } else if (Unit > 150) {
        ServiceCharge = 38.22;
        if (Unit <= 150) {
            EE_Eng_cost = 3.2484;
        } else if (Unit > 150 && Unit <= 400) {
            EE_Eng_cost = 4.2218;
        } else if (Unit > 400) {
            EE_Eng_cost = 4.4217;
        }
    }

    const EE_Bill = (Unit * (ft + EE_Eng_cost) + ServiceCharge) * 1.07;
    return EE_Bill;
}

module.exports = { Energy_con, getCurrentTime };
