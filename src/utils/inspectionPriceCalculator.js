const pricingData = {
    residential: {
        "single_family": [
            { minSqFt: 0, maxSqFt: 1199, price: 400 },
            { minSqFt: 1200, maxSqFt: 2599, price: 400 },
            { minSqFt: 2600, maxSqFt: 3099, price: 425 },
            { minSqFt: 3100, maxSqFt: 3599, price: 475 },
            { minSqFt: 3600, maxSqFt: 4099, price: 525 },
            { minSqFt: 4100, maxSqFt: 4599, price: 575 },
            { minSqFt: 4600, maxSqFt: 5099, price: 625 },
            { minSqFt: 5100, maxSqFt: 5599, price: 675 },
            { minSqFt: 5600, maxSqFt: 6099, price: 750 },
            { minSqFt: 6100, maxSqFt: 6599, price: 800 },
            { minSqFt: 6600, maxSqFt: 7099, price: 850 },
            { minSqFt: 7100, maxSqFt: 7599, price: 900 },
            { minSqFt: 7600, maxSqFt: 8099, price: 975 },
            { minSqFt: 8100, maxSqFt: 8599, price: 1025 },
            { minSqFt: 8600, maxSqFt: 9099, price: 1225 },
            { minSqFt: 9100, maxSqFt: 9599, price: 1525 },
            { minSqFt: 9600, maxSqFt: 10099, price: 2025 },
        ],
        "townhouse": [
            { minSqFt: 0, maxSqFt: 1199, price: 350 },
            { minSqFt: 1200, maxSqFt: 1599, price: 375 },
            { minSqFt: 1600, maxSqFt: 1999, price: 400 },
            { minSqFt: 2000, maxSqFt: 2599, price: 425 },
            { minSqFt: 2600, maxSqFt: 3599, price: 475 },
            { minSqFt: 3600, maxSqFt: 4000, price: 500 },
        ],
        "condo": [
            { minSqFt: 0, maxSqFt: 1299, price: 325 },
            { minSqFt: 1300, maxSqFt: 1599, price: 375 },
            { minSqFt: 1600, maxSqFt: 2099, price: 400 },
            { minSqFt: 2100, maxSqFt: 2999, price: 425 },
            { minSqFt: 3000, maxSqFt: 3599, price: 450 },
            { minSqFt: 3600, maxSqFt: 4099, price: 475 },
        ],
    },
    multiUnit: {
        duplex: 475,
        triplex: 575,
        fourplex: 650,
    },
    commercial: {
        perSqFt: 0.2,
    },
    additionalServices: {

        pool_inspection: 25,

        seawall_inspection: 450,
        drainpipe_inspection: 450,
        extra_structure_inspection: 200,
        asbestos_inspection: 550,
        lead_inspection: 550,
        well_water_inspection: 175,

        distance: {
            zipCodes: [
                "33426", "33435", "33436", "33437", "33444", "33445", "33446", "33483",
                "33484", "33460", "33461", "33462", "33463", "33467", "33401", "33403",
                "33404", "33405", "33406", "33407", "33409", "33411", "33412", "33413",
                "33414", "33415", "33417", "33418", "33419", "33421", "33422", "33408",
                "33410", "33458", "33469", "33477", "33478", "33470", "33449", "33480",
                "33465", "33156", "33176", "33143", "33173", "33183", "33186", "33157",
                "33177", "33189", "33190", "33170", "33187", "33193", "33196", "33165",
                "33158", "33185", "33175", "33167", "33168", "33169",
            ]
        },

        crawlspace_inspection: [
            { minSqFt: 0, maxSqFt: 2000, price: 75 },
            { minSqFt: 2001, maxSqFt: 3499, price: 100 },
            { minSqFt: 3500, maxSqFt: null, price: 150 }
        ],

        mold_air_samples: 350,
        thermal_imaging: 150,

        termiteRoofOnly: 150,

        mold_thermal_bundle: 450,
        rescheduleFee: 125,
        four_point: 225,
        mitigation: 150,
        roofCertification: 150,
        insurance_bundle: {
            wind_mitigation: 150,
            four_point: 150,
        }
    },
};

const packages = {
    basic: [
        'general_inspection',
        'roof_inspection',
        'termite_inspection',
        'wind_mitigation',
        'four_point',
    ],
    premium: [
        'general_inspection',
        'roof_inspection',
        'termite_inspection',
        'wind_mitigation',
        'four_point',
        'mold_air_samples',
        'thermal_imaging'
    ],
    preListing: [
        'general_inspection',
        'roof_inspection',
        'termite_inspection',
    ],
    insuranceOnly: [
        'wind_mitigation',
        'four_point',
    ],
    newConstruction: [
        'general_inspection',
        'roof_inspection',
        'termite_inspection',
        'cosmetic_conditions'
    ],
    dynamicServices: [
        'pool_inspection',
        'extra_structure_inspection',
        'outdoor_kitchen_inspection',
        'seawall_inspection',
        'crawlspace_inspection',
        'well_water_inspection'
    ]
};

export function calculateInspectionPrice({
    propertyType,
    squareFootage,
    seawallLength,
    bundle,
    services = {},
    zipCode = null,
    isCommercial = false
}) {
    const servicesArray = Object.keys(services).filter((service) => services[service] === true);

    function calculateMoldFee() {
        const moldSampleCount = Math.round(squareFootage / 800) + 1;
        let fee = 0;
        if (moldSampleCount <= 3) {
            fee = pricingData.additionalServices.mold_air_samples;
        } else {
            let additionalSampleCount = moldSampleCount - 3;
            fee = pricingData.additionalServices.mold_air_samples + (additionalSampleCount * 25);
        }
        return fee;
    }

    let baseInspectionFee = 0;
    let addOnServiceCost = 0;
    const breakdown = {
        baseInspection: [],
        addOns: [],
    };

    // ** STEP 1: Determine Base Inspection Fee **
    if (servicesArray.includes('general_inspection')) {
        if (isCommercial) {
            // Commercial Pricing
            const commercialFee = Math.round(squareFootage * pricingData.commercial.perSqFt / 25) * 25;
            baseInspectionFee += commercialFee;
            breakdown.baseInspection.push({ description: "Commercial Inspection Fee", amount: commercialFee });

            if (servicesArray.includes('wind_mitigation')) {
                const windFee = squareFootage > 8000 ? 175 : 100;
                baseInspectionFee += windFee;
                breakdown.baseInspection.push({ description: "Wind Mitigation Fee (Commercial)", amount: windFee });
            }

            if (servicesArray.includes('four_point')) {
                const fourPointFee = squareFootage > 8000 ? 175 : 100;
                baseInspectionFee += fourPointFee;
                breakdown.baseInspection.push({ description: "4-Point Fee (Commercial)", amount: fourPointFee });
            }
        } else if (pricingData.residential[propertyType]) {
            // Residential Pricing
            const tiers = pricingData.residential[propertyType];
            const tier = tiers.find(
                (t) => squareFootage >= t.minSqFt && squareFootage <= t.maxSqFt
            );
            if (tier) {
                baseInspectionFee += tier.price;
                breakdown.baseInspection.push({ description: `${propertyType} Base Fee`, amount: tier.price });
            }

            if (servicesArray.includes('wind_mitigation')) {
                const windFee = squareFootage >= 5000 && squareFootage < 8000 ? 100 : squareFootage > 8000 ? 125 : 75;
                baseInspectionFee += windFee;
                breakdown.baseInspection.push({ description: "Wind Mitigation Fee (Residential)", amount: windFee });
            }

            if (servicesArray.includes('four_point')) {
                const fourPointFee = squareFootage >= 5000 && squareFootage < 8000 ? 75 : squareFootage > 8000 ? 100 : 50;
                baseInspectionFee += fourPointFee;
                breakdown.baseInspection.push({ description: "4-Point Fee (Residential)", amount: fourPointFee });
            }

            if (servicesArray.includes('pool_inspection')) {
                baseInspectionFee += pricingData.additionalServices.pool_inspection;
                breakdown.addOns.push({ description: "Pool Inspection Fee", amount: pricingData.additionalServices.pool_inspection });
            }
        }
    } else {
        // No General Inspection
        if (servicesArray.includes('wind_mitigation') && servicesArray.includes('four_point')) {
            const fee = 300;
            baseInspectionFee += fee;
            breakdown.baseInspection.push({ description: "Wind Mitigation + 4-Point Combo", amount: fee });
        } else if (servicesArray.includes('wind_mitigation')) {
            const fee = 150;
            baseInspectionFee += fee;
            breakdown.baseInspection.push({ description: "Wind Mitigation Only", amount: fee });
        } else if (servicesArray.includes('four_point')) {
            const fee = 225;
            baseInspectionFee += fee;
            breakdown.baseInspection.push({ description: "4-Point Only", amount: fee });
        }
    }

    // ** STEP 2: Add-On Services **
    if (servicesArray.includes('mold_air_samples')) {
        const moldFee = calculateMoldFee();
        addOnServiceCost += moldFee;
        breakdown.addOns.push({ description: "Mold Air Samples Fee", amount: moldFee });
    }

    // Add Thermal Imaging Fee with Conditional Logic
    if (servicesArray.includes('thermal_imaging')) {
        const thermalFee = servicesArray.includes('mold_air_samples') 
            ? 50 // Add $50 if mold inspection fee is included
            : pricingData.additionalServices.thermal_imaging; // Add $150 otherwise

        addOnServiceCost += thermalFee;
        breakdown.addOns.push({ description: "Thermal Imaging Fee", amount: thermalFee });
    }


    if (servicesArray.includes('seawall_inspection')) {
        const seawallFee = seawallLength >= 100 ? 550 : pricingData.additionalServices.seawall_inspection;
        addOnServiceCost += seawallFee;
        breakdown.addOns.push({ description: "Seawall Inspection Fee", amount: seawallFee });
    }

    if (servicesArray.includes('drain_pipe_inspection')) {
        const fee = pricingData.additionalServices.drainpipe_inspection;
        addOnServiceCost += fee;
        breakdown.addOns.push({ description: "Drainpipe Inspection Fee", amount: fee });
    }

    // Additional add-on services follow a similar pattern...

    // ** STEP 3: Distance Fee **
    if (pricingData.additionalServices.distance.zipCodes.includes(zipCode)) {
        const fee = 50;
        baseInspectionFee += fee;
        breakdown.addOns.push({ description: "Distance Fee", amount: fee });
    }

    const totalFee = baseInspectionFee + addOnServiceCost;

    return {
        baseInspectionFee,
        addOnServiceCost,
        totalFee,
        breakdown,
    };
}


export function calculateInspectionPrice1({
    propertyType,
    squareFootage,
    seawallLength,
    bundle,
    services = {},
    zipCode = null,
    isCommercial = false
}) {

    const servicesArray = Object.keys(services).filter((service) => services[service] === true);

    function calculateMoldFee() {
        const moldSampleCount = Math.round(squareFootage / 800) + 1;
        let fee = 0;
        if (moldSampleCount <= 3) {
            fee = pricingData.additionalServices.mold_air_samples;
        } else {
            let additionalSampleCount = moldSampleCount - 3;
            fee = pricingData.additionalServices.mold_air_samples + (additionalSampleCount * 25);
        }
        return fee;
    }





    let baseInspectionFee = 0;
    let addOnServiceCost = 0;

    if (servicesArray.includes('general_inspection')) { //& IF GENERAL INSPECTION  //! STEP 1: DETERMINE GENERAL INSPECTION FEE

        //^ IF COMMERCIAL
        if (isCommercial) {

            baseInspectionFee += squareFootage * pricingData.commercial.perSqFt;
            baseInspectionFee = Math.round(baseInspectionFee / 25) * 25;

            // //* IF GENERAL && WIND MITIGATION
            // if (servicesArray.includes('wind_mitigation')) {
            //     baseInspectionFee += 100;
            // }

            // //* IF GENERAL && 4-POINT
            // if (servicesArray.includes('four_point')) {
            //     baseInspectionFee += 100;
            // }

            //* IF GENERAL && WIND MITIGATION ???
            if (servicesArray.includes('wind_mitigation')) {
                if (squareFootage > 8000) {
                    baseInspectionFee += 175
                } else {
                    baseInspectionFee += 100;
                }
            }

            //* IF GENERAL && 4-POINT ???
            if (servicesArray.includes('four_point')) {
                if (squareFootage > 8000) {
                    baseInspectionFee += 175
                } else {
                    baseInspectionFee += 100;
                }
            }

        //^ IF RESIDENTIAL
        } else if (pricingData.residential[propertyType]) { // If not commercial

            //* DETERMINE BASE PRICE BASED ON SQUARE FOOTAGE & PROPERTY TYPE
            const tiers = pricingData.residential[propertyType];
            const tier = tiers.find(
                (t) => squareFootage >= t.minSqFt && squareFootage <= t.maxSqFt
            );
            if (tier) baseInspectionFee = tier.price;

            //* IF GENERAL && WIND MITIGATION ???
            if (servicesArray.includes('wind_mitigation')) {
                if (squareFootage >= 5000 && squareFootage < 8000) {
                    baseInspectionFee += 100;
                } else if (squareFootage > 8000) {
                    baseInspectionFee += 125
                } else {
                    baseInspectionFee += 75;
                }
            }

            //* IF GENERAL && 4-POINT ???
            if (servicesArray.includes('four_point')) {
                if (squareFootage >= 5000 && squareFootage < 8000) {
                    baseInspectionFee += 75;
                } else if (squareFootage > 8000) {
                    baseInspectionFee += 100
                } else {
                    baseInspectionFee += 50;
                }
            }

            //* ADD POOL ADD ON SERVICE
            if (servicesArray.includes('pool_inspection')) {
                baseInspectionFee += pricingData.additionalServices.pool_inspection;
            }

        } else if (pricingData.multiUnit[propertyType]) {
            baseInspectionFee = pricingData.multiUnit[propertyType];
        }

    } else { //& IF NO GENERAL INSPECTION

        //* IF WIND MIT + 4PT
        if (servicesArray.includes('wind_mitigation') && servicesArray.includes('four_point')) {
            baseInspectionFee += 300;
        } else if (servicesArray.includes('wind_mitigation') && !servicesArray.includes('four_point')) { //* IF WIND MIT && NO 4PT
            baseInspectionFee += 150;
        } else if (!servicesArray.includes('wind_mitigation') && servicesArray.includes('four_point')) { //* IF 4PT && NO WIND MIT
            baseInspectionFee += 225;
        }

        //* HANDLE ROOF ONLY
        if (servicesArray.includes('roof_inspection') && servicesArray.length === 1) {
            baseInspectionFee += 150;
        }

        //* HANDLE TERMITE ONLY
        if (servicesArray.includes('termite_inspection') && servicesArray.length === 1) {
            baseInspectionFee += 150;
        }

    }

    //* IF LARGE PROPERTY, INCREASE ROOF PRICE
    if (squareFootage >= 3000 && squareFootage <= 5000 && servicesArray.includes('roof_inspection')) {
        baseInspectionFee += 75;
    } else if (squareFootage > 5000 && squareFootage <= 8000 && servicesArray.includes('roof_inspection')) {
        baseInspectionFee += 100;
    } else if (squareFootage > 8000 && squareFootage < 10000 && servicesArray.includes('roof_inspection')) {
        baseInspectionFee += 150;
    } else if (squareFootage >= 10000 && servicesArray.includes('roof_inspection')) {
        baseInspectionFee += 175;
    }

    //* IF LARGE PROPERTY, INCREASE TERMITE PRICE
    if (squareFootage >= 3000 && squareFootage <= 5000 && servicesArray.includes('termite_inspection')) {
        baseInspectionFee += 75;
    } else if (squareFootage > 5000 && squareFootage <= 8000 && servicesArray.includes('termite_inspection')) {
        baseInspectionFee += 100;
    } else if (squareFootage > 8000 && servicesArray.includes('termite_inspection')) {
        baseInspectionFee += 150;
    } else if (squareFootage > 10000 && servicesArray.includes('termite_inspection')) {
        baseInspectionFee += 175;
    }

    //& STEP 2: CALCULATE ADDITIONAL SERVICE COSTS
    //* HANDLE MOLD & THERMAL IMAGING
    if (servicesArray.includes('mold_air_samples') && servicesArray.includes('thermal_imaging')) {
        let moldFee = calculateMoldFee();
        addOnServiceCost += moldFee + 100;
    } else if (servicesArray.includes('mold_air_samples') && !servicesArray.includes('thermal_imaging')) {
        addOnServiceCost += calculateMoldFee();
    } else if (servicesArray.includes('thermal_imaging') && !servicesArray.includes('mold_air_samples')) {
        addOnServiceCost += pricingData.additionalServices.thermal_imaging;
    }

    //* HANDLE SEAWALL
    if (servicesArray.includes('seawall_inspection')) {
        if (seawallLength >= 100) {
            addOnServiceCost += 550;
        } else {
            addOnServiceCost += pricingData.additionalServices.seawall_inspection;
        }
    }

    //* HANDLE DRAINPIPE
    if (servicesArray.includes('drain_pipe_inspection')) {
        addOnServiceCost += pricingData.additionalServices.drainpipe_inspection;
    }

    //* HANDLE ASBESTOS
    if (servicesArray.includes('asbestos_inspection')) {
        addOnServiceCost += pricingData.additionalServices.asbestos_inspection;
    }

    //* HANDLE LEAD
    if (servicesArray.includes('lead_based_paint_inspection')) {
        addOnServiceCost += pricingData.additionalServices.lead_inspection;
    }

    //* HANDLE WELL WATER
    if (servicesArray.includes('well_water_inspection')) {
        addOnServiceCost += pricingData.additionalServices.well_water_inspection;
    }

    //* HANDLE EXTRA STRUCTURE
    if (servicesArray.includes('extra_structure_inspection')) {
        addOnServiceCost += pricingData.additionalServices.extra_structure_inspection;
    }

    //* HANDLE OUTDOOR KITCHEN
    if (servicesArray.includes('outdoor_kitchen_inspection')) {
        addOnServiceCost += 50;
    }

    //* HANDLE CRAWLSPACE
    if (servicesArray.includes('crawlspace_inspection')) {
        if (squareFootage <= 2000) {
            baseInspectionFee += 75;
        } else if (squareFootage <= 3500) {
            baseInspectionFee += 100;
        } else {
            baseInspectionFee += 150;
        }
    }

    //* ADD DISTANCE FEE
    if (pricingData.additionalServices.distance.zipCodes.includes(zipCode)) {
        baseInspectionFee += 50;
    }

    const totalFee = baseInspectionFee + addOnServiceCost;

    return {
        baseInspectionFee,
        addOnServiceCost,
        totalFee,
    }

}

