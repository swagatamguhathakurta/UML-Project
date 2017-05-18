var dfArray = null;
var columns = null;
var columnCount = null;
var originalColumnCount = null;
var selectedColumns = [];
var selectedDataArray = null;
var selectedIndices = [];
var filteredData = null;
var subject = null;
var observers = null;
var labelName = null;
var dfObject = null;
var dfData = null;
var DataFrame = null;
var data = null;

/*
 *  Singleton Design Pattern For Dataframe
 *
 */
var Singleton = (function () {
    var instance;

    function createInstance() {
        instance = dfjs.DataFrame;
        return instance;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


/*
 *  Load The Dataset From CSV File
 *
 */
function loadDatasetTable(datasetSelected) {

    data = new DataBean(columns, columnCount, dfArray, originalColumnCount, selectedColumns, selectedDataArray, selectedIndices,
        filteredData, subject, observers, labelName, dfObject);

    document.getElementById("divColumnSlicing").innerHTML = "";

    var divTable = document.getElementById("divTable");

    var dataset = datasetSelected.value;

    DataFrame = Singleton.getInstance();

    DataFrame.fromCSV('data/'+ datasetSelected.value +'.csv').then(df => {

    dfArray = df.toArray();

    columns = df.listColumns();

    dfData = df;

    dfData.sql.register('datasetTable',overwrite=true);

    originalColumnCount = dfArray[0].length;

    generateTable(columns, dfArray);

    data.displayColumnSlicing();

    subscribeObservers();
    });
}

/*
 *  Generate Table From The Data Inside The Dataset
 *
 */
function generateTable(columns, dfArray) {

    var table = document.createElement("TABLE");
    table.border = "1";

    columnCount =  dfArray[0].length;

    var row = table.insertRow(-1);

    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = columns[i];
        row.appendChild(headerCell);
    }

    for (var i = 0; i < dfArray.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = dfArray[i][j];
        }
    }

    var divTable = document.getElementById("divTable");
    divTable.innerHTML = "";
    divTable.appendChild(table);

}

/*
 *  Subscribe Observers
 *
 */
function subscribeObservers() {

    observers = [];

    for(var i = 0; i < columnCount; i++) {

      observers[i] = new Observer(columns[i]);

      subject = new Subject();

      subject.subscribeObserver(observers[i]);

    }

}

/*
 *  To notify all observers of the updated values
 *
 */
function update() {

    subject.notifyAllObservers();

}

/*
 *  Dynamically Generates The Values For Each Column To Include The Selected Columns In The Where Clause
 *
 */
function generateWhereClauseValues() {
    whereClauseValues = data.getComboValues('whereClause');
    var divCombo = document.getElementById("divCombo");
    var valueClauseDiv = document.getElementById("valueClauseDiv");
    valueClauseDiv.innerHTML = "";
    divCombo.hidden = false;
    valueClauseDiv.hidden = false;

    for (var i = 0; i < whereClauseValues.length; i++) {
        console.log("Value of "+i+" is "+ selectedColumns.indexOf(whereClauseValues[i]) +" with index "+selectedColumns[i]);
        var index = selectedColumns.indexOf(whereClauseValues[i]);
        var columnName = document.createElement("span");
        columnName.textContent = " " + selectedColumns[index] + " : ";
        var selectValues = document.createElement('select');
        selectValues.multiple = "multiple";
        selectValues.id = "newValue"+(i+1);
        valueClauseDiv.appendChild(document.createElement("span"));
        valueClauseDiv.appendChild(columnName);
        for (var j = 0; j < selectedDataArray.length; j++) {
            selectValues.appendChild(data.createNewComboBox(selectedDataArray[j][index]));
        }
        valueClauseDiv.appendChild(selectValues);
    }
}

/*
 *  Filters The Selected Columns To Provide User Fields For Select and Where clause
 *
 */
function fetchFilterData(){

    var query = "";
    var valuesSelected = "";
    var temp1 = [], temp2= [];
    var selectClause = data.getComboValues('selectClause');
    var whereClause = data.getComboValues('whereClause');

    for (var i = 0; i < whereClauseValues.length; i++) {
        valuesSelected = data.getComboValues("newValue"+(i+1));
        for (var j = 0; j < valuesSelected.length; j++) {
            if (query.length > 0) {
                query += " OR ";
            }
            query += whereClauseValues[i].toString() + " \= " + '"'+valuesSelected[j].toString()+'"';
        }
        console.log(query);
    }
    console.log("The generated query is "+'SELECT ' + selectClause.toString() + ' FROM datasetTable WHERE ' + query);
    console.log(whereClause.toString()+" is where clause. "+whereClauseValues.toString()+" is values");
    var result = DataFrame.sql.request("SELECT " + selectClause.toString() + " FROM datasetTable WHERE " + query);
    var resultArray = result.toArray();
    filteredData = resultArray;
    console.log(resultArray.length);
    console.log(resultArray);
    labelName = selectClause[0];
}