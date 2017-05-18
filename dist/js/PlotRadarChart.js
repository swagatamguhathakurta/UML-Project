/*
 *  Calls the constructor of the superclass CustomChart
 *  Initialises the dataset and type with the selected values from the UI
 *  e.g. "Chicago" dataset and "radar" type
 *
 */

class Radar extends CustomChart {
  constructor(dataset, type) {
    super({
        name: dataset,
        type: type
    });
    //console.log("Dataset fetched in Radar chart is "+dataset+" and type is "+type);
  }
}