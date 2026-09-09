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
