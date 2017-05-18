/*
 *  Main Class Instantiated from Dashboard.html
 *  Calls displayChart() on the chart type selected from ChartType
 *
 */

/*
 *  Assigns the respective class name based on the chart type selected
 *
 */
const CHARTS = {
  bar: Bar,
  line: Line,
  radar: Radar,
  pie: Pie,
  doughnut: Doughnut,
  stack: Stack
};

/*
 *  Instantiates of the specific chart type based on the selection from the browser.
 *  e.g. Selecting "bar" will instantiate "Bar" class.
 *
 */
class CustomChartFactory extends ChartStore {

  createChart(dataset, type) {
    let ChartConstructor = CHARTS[type];
    let chart = null;
    if (ChartConstructor) {
      chart = new ChartConstructor(dataset, type);
    }
    return chart;
  }

}