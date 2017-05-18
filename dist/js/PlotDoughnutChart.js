/*
 *  Calls the constructor of the superclass CustomChart
 *  Initialises the dataset and type with the selected values from the UI
 *  e.g. "Chicago" dataset and "doughnut" type
 *
 */

class Doughnut extends CustomChart {
  constructor(dataset, type) {
    super({
        name: dataset,
        type: type
    });
  }
}