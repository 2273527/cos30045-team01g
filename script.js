// COS30045 Data Visualisation
// Group 01G

function drawPsychiatristsChart(data2021) {

// Set the size of the SVG area
var width = 1400;
var height = 800;
var margin = { top: 50, right: 30, bottom: 100, left: 60 };

// Create the SVG element and add it to the page
var svg = d3.select("#chart1")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var chartArea = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var innerWidth = width - margin.left - margin.right;
var innerHeight = height - margin.top - margin.bottom;

// Load psychiatrists data
  console.log("CSV loaded:");
  console.log(data);

// Convert numbers
data.forEach(function(d) {
d.OBS_VALUE = +d.OBS_VALUE;
});

// Filter for year 2021
var data2021 = data.filter(d => d.TIME_PERIOD === "2021");
// data2021 = data2021.slice(0, 10); // Debug: shows only 10 countries

// X and Y scales
var x = d3.scaleBand()
.domain(data2021.map(d => d["Reference area"]))
.range([0, innerWidth])
.padding(0.1);

var y = d3.scaleLinear()
.domain([0, d3.max(data2021, d => d.OBS_VALUE)])
.nice()
.range([innerHeight, 0]);

// X Axis
chartArea.append("g")
.attr("transform", "translate(0," + innerHeight + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "rotate(-30)")
.style("text-anchor", "end");

// Y Axis
chartArea.append("g")
.call(d3.axisLeft(y));

// X Axis Label
svg.append("text")
.attr("x", width / 2)
.attr("y", height - 10)
.attr("text-anchor", "middle")
.style("font-size", "14px")
.text("Country");

// Y Axis Label
svg.append("text")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.attr("x", -height / 2)
.attr("y", 20)
.style("font-size", "14px")
.text("Psychiatrists per 1,000 people");

// Draw the bars
  chartArea.selectAll("rect")
    .data(data2021)
    .enter()
    .append("rect")
.attr("x", d => x(d["Reference area"]))
    .attr("y", d => y(d.OBS_VALUE))
    .attr("width", x.bandwidth())
    .attr("height", d => innerHeight - y(d.OBS_VALUE))
    .attr("fill", "skyblue");

// Add value labels above bars
chartArea.selectAll(".label")
  .data(data2021)
  .enter()
  .append("text")
  .attr("class", "label")
  .attr("x", d => x(d["Reference area"]) + x.bandwidth() / 2)
  .attr("y", d => y(d.OBS_VALUE) - 5)
  .attr("text-anchor", "middle")
  .style("fill", "black")
  .text(d => d.OBS_VALUE.toFixed(2));
  } // closes drawPsychiatristsChart

function drawSuicideChart(data) {
// Load suicide rates data (chart 2)
console.log("Suicide CSV loaded:");
console.log(data);

var suicideData2021 = data;  // Use already-filtered data passed in

// Set up chart dimensions
var width2 = 1400;
var height2 = 800;
var margin2 = { top: 50, right: 30, bottom: 100, left: 60 };
var innerWidth2 = width2 - margin2.left - margin2.right;
var innerHeight2 = height2 - margin2.top - margin2.bottom;

  // Create new SVG for second chart
  var svg2 = d3.select("#chart2")
    .append("svg")
    .attr("width", width2)
    .attr("height", height2);

  var chartArea2 = svg2.append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  // X and Y scales
  var x2 = d3.scaleBand()
    .domain(suicideData2021.map(d => d["Reference area"]))
    .range([0, innerWidth2])
    .padding(0.1);

  var y2 = d3.scaleLinear()
    .domain([0, d3.max(suicideData2021, d => d.OBS_VALUE)])
    .nice()
    .range([innerHeight2, 0]);

  // X Axis
  chartArea2.append("g")
    .attr("transform", "translate(0," + innerHeight2 + ")")
    .call(d3.axisBottom(x2))
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .style("text-anchor", "end");

  // Y Axis
  chartArea2.append("g")
    .call(d3.axisLeft(y2));

  // X Axis Label
  svg2.append("text")
    .attr("x", width2 / 2)
    .attr("y", height2 - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Country");

  // Y Axis Label
  svg2.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -height2 / 2)
    .attr("y", 20)
    .style("font-size", "14px")
    .text("Suicides per 100,000 people");

  // Draw bars for each country
  chartArea2.selectAll("rect")
    .data(suicideData2021)
    .enter()
    .append("rect")
    .attr("x", d => x2(d["Reference area"]))
    .attr("y", d => y2(d.OBS_VALUE))
    .attr("width", x2.bandwidth())
    .attr("height", d => innerHeight2 - y2(d.OBS_VALUE))
    .attr("fill", "tomato");

  // Add value labels above each bar
  chartArea2.selectAll(".label")
    .data(suicideData2021)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x2(d["Reference area"]) + x2.bandwidth() / 2)
    .attr("y", d => y2(d.OBS_VALUE) - 5)
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .text(d => d.OBS_VALUE.toFixed(1));

// Listen for year change from dropdown
d3.select("#yearSelect").on("change", function() {
var selectedYear = this.value;
updateCharts(selectedYear);
});

function updateCharts(selectedYear) {
// Clear existing SVGs so we can redraw them
d3.select("#chart1").selectAll("*").remove();
d3.select("#chart2").selectAll("*").remove();

// Reload both datasets and redraw for the selected year
Promise.all([
d3.csv("psychiatrists_per_1000_clean.csv"),
d3.csv("intentional_self_harm_per_100k_clean.csv")
]).then(function([psyData, suicideData]) {

    // Convert numbers
    psyData.forEach(d => d.OBS_VALUE = +d.OBS_VALUE);
    suicideData.forEach(d => d.OBS_VALUE = +d.OBS_VALUE);

    // Filter for the selected year
    let filteredPsy = psyData.filter(d => d.TIME_PERIOD === selectedYear);
    let filteredSuicide = suicideData.filter(d => d.TIME_PERIOD === selectedYear);

    // Create both charts again
    drawPsychiatristsChart(filteredPsy);
    drawSuicideChart(filteredSuicide);
  });
}

// Load initial charts with default year 2021
updateCharts("2021");
