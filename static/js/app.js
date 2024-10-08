


// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);
      // get the metadata field
    const metadata = data.metadata;
    // Filter the metadata for the object with the desired sample number
    const result = metadata.filter(meta => meta.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("option")
        .text(`${key} : ${value}`);
    }); 
  }); 
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);
    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const bacteria = samples.filter(bact => bact.id == sample)[0];

    let sample_values = [];
    let otu_ids = []; 
    let otu_labels = [];
    
    for (let i = 0; i < 10; i++) {
      sample_values[i] = bacteria.sample_values[i];
      otu_ids[i] = bacteria.otu_ids[i];
      otu_labels[i] = bacteria.otu_labels[i];
      
    };
    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = [];
    for (let i = 0; i < otu_ids.length; i++) {
      yticks[i] = `OTU ${otu_ids[i]}`;     
    };  

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    let dataset = {
      x: sample_values,
      y: yticks,
      legend : otu_labels,
      type: 'bar',
      orientation: 'h'
    };
            
    let layout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {
        title: "Number of Bacteria"
      }
      
    };
    
    Plotly.newPlot("bar", dataset, layout);
  });
};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);
    // Get the names field
    const names = data.names; 

    // Use d3 to select the dropdown with id of `#selDataset`
    // d3.selectAll("#selDataset").on("change", getData);
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(name => {
      dropdownMenu.append("option")
                  .text(name)
                  .attr("value", `${name}`);

    // Get the first sample from the list
    let sample = names[0];  
    console.log(sample);  
    // Build charts and metadata panel with the first sample
    buildMetadata(sample);
    
    // let sample_values = [];
    // let otu_ids = []; 
    // let otu_labels = [];
    
    // for (let i = 0; i < 10; i++) {
    //   sample_values[i] = bacteria.id.sample_values[i];
    //   otu_ids[i] = bacteria.id.otu_ids[i];
    //   otu_labels[i] = bacteria.id.otu_labels[i];
      
    // };  
    // let yticks = [];
    // for (let i = 0; i < otu_ids.length; i++) {
    //   yticks[i] = `OTU ${otu_ids[i]}`;     
    // };  

    // let dataset0 = {
    //   x: sample_values,
    //   y: yticks,
    //   legend : otu_labels,
    //   type: 'bar',
    //   orientation: 'h'
    // };
            
    // let layout = {
    //   title: "Top 10 Bacteria Cultures Found",
    //   xaxis: {
    //     title: "Number of Bacteria"
    //   }
      
    // };
    // let barPlot = d3.select("#bar");
    // Plotly.newPlot("barPlot", dataset0, layout);

    buildCharts(sample);
    });
  });
};

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
//   let dataSet = dropdownMenu.property("value");
// }
  d3.select("#selDataset").on("change", function(){  
    const selectedValue = d3.select(this).property("value");
      newSample = selectedValue;
    console.log("Selected:", selectedValue);

});
};
// Initialize the dashboard
init();
