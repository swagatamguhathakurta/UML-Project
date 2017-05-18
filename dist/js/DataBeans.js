/*
 *  Maintains The Getters and Setters Required By Our Various Classes.
 *  Extends Abstract Class Service. Implements Template Method.
 *
 */
class DataBean extends Services {

    /*
     *  Initialization of all fields
     *
     */
    constructor(columns=null, columnCount=null, dfArray=null, originalColumnCount=null, selectedColumns=null, selectedDataArray=null,
        selectedIndices=null, filteredData=null, subject=null,
        observers=null, labelName=null, dfObject=null) {
        super();
        this.columns = columns;
        this.columnCount = columnCount;
        this.dfArray = dfArray;
        this.originalColumnCount = originalColumnCount;
        this.selectedColumns = selectedColumns;
        this.selectedDataArray = selectedDataArray;
        this.selectedIndices = selectedIndices;
        this.filteredData = filteredData;
        this.subject = subject;
        this.observers = observers;
        this.labelName = labelName;
        this.dfObject = dfObject;
    }

    /*
     *  Dynamically Create Combo Boxes
     *
     */
    generateCombo() {

        var divCombo = document.getElementById("divCombo");

        selectClause = document.getElementById("selectClause");
        whereClause = document.getElementById("whereClause");

        selectClause.innerHTML = "";
        whereClause.innerHTML = "";

        divCombo.hidden = false;

        for (var i = 0; i < columnCount; i++) {

            selectClause.appendChild(this.createNewComboBox(selectedColumns[i]));
            selectClause.innerHTML += selectedColumns[i] + "&nbsp";

            whereClause.appendChild(this.createNewComboBox(selectedColumns[i]));
            whereClause.innerHTML += selectedColumns[i] + "&nbsp";
        }

    }


    /*
     *  Display The Columns Available In The Dataset Selected
     *
     */
    displayColumnSlicing() {

        var divColumnSlicing = document.getElementById("divColumnSlicing");

        for (var i = 0; i < columnCount; i++) {
            divColumnSlicing.appendChild(this.createNewCheckbox(columns[i], columns[i], "col"+(i+1)));
            divColumnSlicing.innerHTML += columns[i] + "&nbsp";
        }

    }

    /*
     *  Creates a New Checkbox To Display All The Columns Available In The Dataset Selected
     *
     */
    createNewCheckbox(name, value, id){

        var checkbox = document.createElement('input');
        checkbox.type= 'checkbox';
        checkbox.name = 'filterNames';
        checkbox.value = value;
        checkbox.id = id;
        return checkbox;
    }

    /*
     *  Creates a New Combo Box To Display All The Options Corresponding To The Columns Selected
     *
     */
    createNewComboBox(value){
        var combobox = document.createElement('option');
        combobox.value = value;
        combobox.innerHTML = value;
        return combobox;
    }

    /*
     *  Gets The Combo Values
     *
     */
    getComboValues(id) {
        var fld = document.getElementById(id);
        var values = [];
        for (var i = 0; i < fld.options.length; i++) {
          if (fld.options[i].selected) {
            values.push(fld.options[i].value);
          }
        }
        return values;
    }

}