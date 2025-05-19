// COS30045 Data Visualisation
// Group 01G

// Loading psychiatrists data
d3.csv("psychiatrists_per_1000_clean.csv").then(function(data) {
  console.log("Psychiatrists data loaded:");
  console.log(data); 
});

// Loading suicide data
d3.csv("intentional_self_harm_per_100k_clean.csv").then(function(data) {
  console.log("Suicide data loaded:");
  console.log(data); 
});
