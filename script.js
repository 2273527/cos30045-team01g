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
});
