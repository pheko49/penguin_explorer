const data = JSON.parse(
    document.getElementById("species-data").textContent
);

const scatterData = JSON.parse(
    document.getElementById("scatter-data").textContent
)

console.log(data)

console.log(scatterData)

const scatterPoints = scatterData.map(penguin => ({
    species: penguin.species,
    x: penguin.bill_length_mm,
    y: penguin.body_mass_g
}));

const bodyMasses = scatterData.map(
    penguin => penguin.body_mass_g
);

console.log(bodyMasses)

const binSize = 500;

const bins = bodyMasses.map(
    bodyMass => Math.floor(bodyMass / binSize) * binSize
);

console.log(bins)

const binCounts ={};

for (const bin of bins) {
    binCounts[bin] = (binCounts[bin] || 0) + 1;
}

console.log(binCounts);

const entries = Object.entries(binCounts);

console.log(entries);

const distributionData = entries.map(entry => ({
    range: `${entry[0]}-${Number(entry[0]) + binSize -1}`,
    count: entry[1]
}));

console.log(distributionData)

const bodyMassCanvas = document.getElementById("bodyMassChart")

const adeliePoints = scatterPoints.filter(
    penguin => penguin.species === "Adelie"
);

const chinstrapPoints = scatterPoints.filter(
    penguin => penguin.species === "Chinstrap"
);

const gentooPoints = scatterPoints.filter(
    penguin => penguin.species === "Gentoo"
);

console.log(scatterPoints);

console.log(data.map(item => item.species));
console.log(data.map(item => item.count));

const labels = data.map(item => item.species);
const counts = data.map(item => item.count);

const canvas = document.getElementById("speciesChart");

const scatterCanvas = document.getElementById("scatterChart");

console.log(typeof Chart)

new Chart(canvas,{
    type: "bar",
    data: {
        labels: labels,
        datasets: [
            {
                label: "Penguin Count",
                data: counts
            }
        ]
    },

    plugins: [ChartDataLabels],

    options: {
        plugins: {
            title: {
                display: true,
                text: "Penguin Population by Species"
            },

            datalabels: {
                anchor: "end",
                align: "top",
                
                font: {
                    weight: "bold"
                }
            }
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: "Penguin Species"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Number of Penguins"
                }
            }
        }
    }
});

new Chart(scatterCanvas, {
    type: "scatter",

    // data: {
    //     datasets: [
    //         {
    //             label: "Penguins",
    //             data: scatterPoints
    //         }
    //     ]
    // },
    data: {
        datasets: [
            {
                label: "Adielie",
                data: adeliePoints
            },

            {
                label: "Chinstrap",
                data: chinstrapPoints
            },

            {
                label: "Gentoo",
                data: gentooPoints
            }
        ]
    },

    options: {
        plugins: {
            title: {
                display: true,
                text: "Bill Length vs Body Mass"
            }
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: "Bill Length (mm)"
                }
            },

            y: {
                title: {
                    display: true,
                    text: "Body Mass (g)"
                }
            }
        }
    }
});

new Chart(bodyMassCanvas,{
    type: "bar",

    data: {
        labels: distributionData.map(item => item.range),

        datasets: [
            {
                label: "Penguin Count",
                data: distributionData.map(item => item.count)
            }
        ]
    },

    options: {
        plugins: {
            title: {
                display: true,
                text: "Body Mass Distribution"
            }
        },
        
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Body Mass (g)"
                }
            },

            y: {
                title: {
                    display: true,
                    text: "Number of Penguins"
                }
            }
        }
    }
})