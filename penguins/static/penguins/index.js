const data = JSON.parse(
    document.getElementById("species-data").textContent
);

console.log(data)

console.log(data.map(item => item.species));
console.log(data.map(item => item.count));

const labels = data.map(item => item.species);
const counts = data.map(item => item.count);

const canvas = document.getElementById("speciesChart");

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
