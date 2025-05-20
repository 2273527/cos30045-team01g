// COS30045 Data Visualisation
// Group 01G

// Set the size of the SVG area
var width = 800;
var height = 500;
var margin = { top: 50, right: 30, bottom: 100, left: 60 };

// Create the SVG element and add it to the page
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var chartArea = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var innerWidth = width - margin.left - margin.right;
var innerHeight = height - margin.top - margin.bottom;

// Load psychiatrists data
d3.csv("psychiatrists_per_1000_clean.csv").then(function(data) {
  console.log("CSV loaded:");
  console.log(data);

// Convert numbers
data.forEach(function(d) {
d.OBS_VALUE = +d.OBS_VALUE;
});

// Filter for year 2021
var data2021 = data.filter(d => d.TIME_PERIOD === "2021");

// X and Y scales
var x = d3.scaleBand()
.domain(data2021.map(d => d["Reference Area"]))
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
.attr("transform", "rotate(-45)")
.style("text-anchor", "end");

// Y Axis
chartArea.append("g")
.call(d3.axisLeft(y));

// Draw the bars
  chartArea.selectAll("rect")
    .data(data2021)
    .enter()
    .append("rect")
    .attr("x", d => x(d["Reference Area"]))
    .attr("y", d => y(d.OBS_VALUE))
    .attr("width", x.bandwidth())
    .attr("height", d => innerHeight - y(d.OBS_VALUE))
    .attr("fill", "steelblue");

});
