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
                label: "Number of Penguins",
                data: counts
            }
        ]
    }
});
