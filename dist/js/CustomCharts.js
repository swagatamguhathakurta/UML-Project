/*
 *  Calls the prepareChart function generic for any chart types
 *
 *  Initialises the dataset and type with the selected values from the UI
 *  e.g. "Chicago" dataset and "bar" type
 *
 */

class CustomChart {

    /*
     *  Called from the specific chart class to initialise with dataset and chart type selected
     *
     */
    constructor({name = '',type = ''}) {
        this.name = name;
        this.type = type;
    }

    /*
     *  Gets the canvas context to display chart on UI.
     *  Generates background and border colors depending on the no of columns in the table.
     *  Gets all the table data and uses as needed.
     *  Generates chart dynamically based on the input chart and the dataset selected.
     *
     */
    prepareChart() {

        //console.log("Preparing " + this.name + " chart");
        var ctx = document.getElementById("myChart");

        //console.log("DFArray is "+dfArray[0].length);
        //var columnCount = dfArray[0].length;

        var backgroundColorArray = [];
        var borderColorArray = [];
        var labelsArray = [];
        var red, green, blue, alpha;

        for (var i = 0; i < filteredData.length; i++) {
            red = Math.floor((Math.random() * 150) + 0);
            green = Math.floor((Math.random() * 150) + 0);
            blue = Math.floor((Math.random() * 150) + 0);
            alpha = 0.8;
            backgroundColorArray[i] = 'rgba('+red+','+green+','+blue+','+alpha+')';
            labelsArray[i] = selectedColumns[i];
        }

        for (var i = 0; i < filteredData.length; i++) {
            red = Math.floor((Math.random() * 106) + 150);
            green = Math.floor((Math.random() * 106) + 150);
            blue = Math.floor((Math.random() * 106) + 150);
            alpha = 0.8;
            borderColorArray[i] = 'rgba('+red+','+green+','+blue+','+alpha+')';
        }


        var columnData = [];

        for (var i = 0; i < dfArray.length; i++) {
            columnData[i] = "";
            for (var j = 0; j < columnCount; j++) {
                columnData[i] += "" + dfArray[i][j] + " | ";
            }
            //console.log("Column data is "+columnData[i]);
        }

        //console.log(this.type + " is chart type");

        var chartData = [];

        for (var i = 0; i < filteredData.length; i++) {
            chartData[i] = filteredData[i][0];
            console.log("Column data is "+chartData[i]);
        }

        function getChartData(chartData) {
            var a = [], b = [], prev;

            chartData.sort();
            for ( var i = 0; i < chartData.length; i++ ) {
                if ( chartData[i] !== prev ) {
                    a.push(chartData[i]);
                    b.push(1);
                } else {
                    b[b.length-1]++;
                }
                prev = chartData[i];
            }

            return [a, b];
        }

        //console.log("Column 0 is "+selectedColumns[0]);

        //alert("Here");

        var result = getChartData(chartData);

        console.log("Type is "+this.type);

        if(this.type !== "stack") {

            var myChart = new Chart(ctx, {
                type: this.type,
                data: {
                    labels: result[0],
                    datasets: [{
                        label: labelName,
                        data: result[1],
                        backgroundColor: backgroundColorArray,
                        borderColor: borderColorArray,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes:[{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        } else {

            //var ctx = document.getElementById("myChart").getContext("2d");
            var data = {
              labels: result[0],
              datasets: [{
                  label: result[0][0],
                  backgroundColor: "#F29220",
                  borderColor: "#F29220",
                  data: result[1]
                }, {
                  label: result[0][1],
                  backgroundColor: "#4365B0",
                  borderColor: "#4365B0",
                  data: result[1]
                }]
            };

            var myChart = new Chart(ctx, {
              type: 'bar',
              data: data,
              options: {
                scales: {
                    xAxes: [{stacked: true}],
                    yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                     }
                  }]
                }
              }
            });
        }

    }


    getName() {
        return this.name;
    }


}