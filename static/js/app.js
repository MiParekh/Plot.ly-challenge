// View data
d3.json("samples.json").then((data) => {
    console.log(data);
});

function plotData(id) {
    d3.json("samples.json").then((data) => {
        console.log(data);

        var samples = data.samples.filter(sample => sample.id === id)[0];
        console.log(samples)
        //var wfreq = data.metadata.filter(metadata => metadata.wfreq == wfreq);
        //console.log(wfreq);

        // Use slice to get the top 10 values & reverse to make bars stack greatest to smallest
        console.log(samples)
        var values = samples.sample_values.slice(0, 10).reverse();
        console.log(values);
        var labels = samples.otu_ids.slice(0, 10).reverse();
        console.log(labels);
        var labels1 = samples.otu_ids
        var hovertext = samples.otu_labels.slice(0, 10);
        console.log(hovertext);
        var labelsB = labels.map(d => "OTU "+ d);
        var labelsA = labels1.map(d => "OTU" + d);


        var trace1 = {
            type: "bar",
            x: values,
            y: labelsB,
            text: hovertext,
            orientation: "h"
        };

        console.log(trace1);
        

        var barData = [trace1];
        var barLayout = {
            title: "Belly Button Bar Chart",
            xaxis: { title: "Values" },
            yaxis: { title: "OTU IDs" }, 
        };

        // Create your bar chart using plotly
    Plotly.newPlot("bar", barData, barLayout);

        // Bubble plot
        
        var trace2 = {
            x: labels1,
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: 'markers',
            marker: {
                color: samples.otu_ids,
                size: samples.sample_values,
                // sizemode: 'area',
                sizemin: 5
            }
        };
        console.log(trace2);
        var bubble = [trace2];
        var bubbleLayout = {
            title: 'Belly Button Bubble Plot',
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Values" },
        };

    Plotly.newPlot("bubble", bubble, bubbleLayout);
    
    var gauge = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq, // couldn't figure out how to pull in washing frequency...can you please leave in comments?
          title: { text: "Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 1], color: "red" },
              { range: [1, 2], color: "red" },
              { range: [2, 3], color: "pink" },
              { range: [3, 4], color: "pink" },
              { range: [4, 5], color: "yellow" },
              { range: [5, 6], color: "yellow" },
              { range: [6, 7], color: "lime" },
              { range: [7, 8], color: "lime" },
              { range: [8, 9], color: "green" },
              { range: [9, 10], color: "green" },
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', gauge, layout);
    });
}
// Create dropdown Menu
// Use select.append to add options w/ texts and value

// Build charts and metadata for the first sample aka first "name" in names array

// Create bar chart for the first subject in the data

// Get the variables necessary to create bar plot. 

// Insert metadata into panel for first subject
// choose first subject's metadata to get selectedMetadata
// selectedMetadata --> Append something for each
// Use Object.entries to iterate over selectedMetadata


function populatePlot(id) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)
        var results = metadata.filter(md => md.id.toString() === id)[0];
        console.log(results);
        var mData = d3.select("#sample-metadata");
        mData.html(" ");
        Object.entries(results).forEach(([key, value]) => {
            mData.append("h5").text(`${key}:${value}`)
        return results;
        });
    });
}



// Initialize Page
function init() {
    d3.json("samples.json").then((data) => {
        console.log(data);

        var dropdown = d3.select("#selDataset");
        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        
        });
        plotData(data.names[0]);
        populatePlot(data.names[0]);
        
    });

}


// Update plots and metadata for newly selected value
function optionChanged(selectValue) {
    d3.json("samples.json").then((data) => {
        // Filter data by matching id for samples to the selectValue
        plotData(selectValue);
        populatePlot(selectValue);
        // Update values for barchart
        // Use restlye to update bar chart
        // Plotly.restyle("bar", [selectValue]);

        // Update values for bubbleplot
        // Use restyle to update bubbleplot
        // Plotly.restyle("bubble", [selectValue]);

        // Build metadata based on the filter
    });
}
init();