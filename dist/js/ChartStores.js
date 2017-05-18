/*
 *  Superclass of Dataset.
 *  Implements the displayChart function called from Dashboard.html homepage.
 *  Calls the prepareChart() function from the CustomChart class.
 */

class ChartStore {

  createChart(dataset, type) {
    //throw new Error("This method must be overwritten!");
  }

  displayChart(dataset, type) {
    let chartType = this.createChart(dataset, type);
    chartType.prepareChart();
  }
}