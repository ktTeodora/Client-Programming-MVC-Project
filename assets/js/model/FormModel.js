/**
 * Represents the form model. The model contains the data, the information 
 * regarding the order such as: name, email, address, country, phone number, and credit card information. 
 * The model can obtain data either from a database or files, which could be located locally or externally. 
 * This class holds a reference to an exernal file that contains data for select options.
 * 
 * The model does not talk directly to a view, instead is made available to a 
 * controller which accesses it when needed. 
 */
export class FormModel {

    constructor() {

        this.init();
    }

    // used to initialize the object
    // initialisation assumes getting the data from local storage and uploading the data into the model
    init() {

        // loading a js object from the local storage by using a key
        let parasol = JSON.parse(localStorage.getItem('custom-parasol')); // returns a json string, so we use JSON and parse to get back the actual object and store it under parasol

        for (let property in parasol) { // property is the model_name of the property, not its value
            this[property] = parasol[property];
        }
    }

    /**
     * Converts this object to a data object for the view. We could have also 
     * returned Object.entries(this), but in this case, we would be dealing 
     * with an array of arrays.
     * 
     * @returns {Object} a simple data object with inputs for the form view 
     */
    getInputData() {
        // 1. stringify this object to get rid of this object methods
        let inputsString = JSON.stringify(this);

        // 2. return as plain JS data object
        let object = JSON.parse(inputsString);
        return object;
    }

    /**
     * Stores animal data accross browser sessions. Window.localStorage is used 
     * to store the model as a JSON string under the key 'animal'.
     * 
     * @returns {undefined}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON}
     */

    /** Calling the persist() method to store the object in local storage by calling setItem(). */
    persist() {

        localStorage.setItem('custom-parasol', JSON.stringify(this));
    }

}