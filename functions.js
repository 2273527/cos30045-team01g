function init() {
    var w = 600;
    var h = 300;

    d3.csv(
        "https://raw.githubusercontent.com/2273527/cos30045-team01g/refs/heads/main/Unemployment_78-95.csv",
        function(d) {
            return {
                date: new Date(+d.year, +d.month - 1),
                number: +d.number
            };
        }
    ).then(function(dataset) {
        lineChart(dataset);
        console.table(dataset, ["date", "number"]);
    });
}