/*
 *  Observer Pattern on DataFrame and Filters
 *
 */

var Subject = function() {
  let observers = [];

  return {
    subscribeObserver: function(observer) {
      observers.push(observer);
    },
    unsubscribeObserver: function(observer) {
      var index = observers.indexOf(observer);
      if(index > -1) {
        observers.splice(index, 1);
      }
    },
    notifyObserver: function(observer) {
      var index = observers.indexOf(observer);
      if(index > -1) {
        observers[index].notify(index);
      }
    },
    notifyAllObservers: function() {
      for(var i = 0; i < observers.length; i++){
        observers[i].notify(i);
      };
    }
  };
};

var Observer = function filterTable() {
  return {
    notify: function filterTable() {


    selectedDataArray = [[]];
    selectedColumns = [];
    selectedIndices = [];

    var k = 0;

    for (var i = 0; i < originalColumnCount; i++) {

        if(document.getElementById("col"+(i+1)).checked) {

            selectedColumns[k] = columns[i];
            selectedIndices[k] = i;

            k++;
        }

    }

    for (var i = 0; i < dfArray.length; i++) {

        selectedDataArray[i] = new Array(selectedIndices.length);

        for (var j = 0; j < selectedIndices.length; j++) {
            selectedDataArray[i][j] = dfArray[i][selectedIndices[j]];
        }
    }

    document.getElementById("divTable").innerHTML = "";

    var dataBean = new DataBean();

    generateTable(selectedColumns, selectedDataArray);

    dataBean.generateCombo();


    }
  }
}

