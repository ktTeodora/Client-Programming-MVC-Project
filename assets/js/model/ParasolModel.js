import { selectData } from '../store/selectData.js';

/**
 * Represents the application model. The model contains the data, the information 
 * regarding the parasol such as: type, color & pattern. The model can obtain data either 
 * from a database or files, which could be located locally or externally. This 
 * class holds a reference to an exernal file that contains data for select options.
 * 
 * The model does not talk directly to a view, instead is made available to a 
 * controller which accesses it when needed. 
 */
export class ParasolModel {
    static store = selectData; // external resource

    /**
     * Creates an object representing the parasol model.
     * @param {String} type - The type of the parasol.
     * @param {String} color - The color of the parasol.
     * @param {String} pattern - The pattern on the parasol.
     * @returns {ParasolModel} The object representing the animal model.
     */
    constructor() {
        this.type = "undefined";
        this.color = "undefined";
        this.pattern = "undefined";
    }

    /**
     * Returns an array of this object's properties names.
     * The returned array is used by View to dynamically render the selects. 
     * For each Model property, a select is being rendered in View.
     * 
     * @returns {Array} array of property names (strings)
     */
    getProperties() {
        return Object.keys(this);
    }

    getLastPropertyValue() {
        return this.pattern;
    }

    /**
     * Gets the data from the external resource to be used as select options.
     * 
     * @param {String} selectID - select ID
     * @returns {Array} array of select's options (strings)
     */
    getOptions(selectID) {
        // 1. extract the data from the external resource (ParasolModel.store).
        let options; // a JS object
        switch (selectID) {
            case 'type':
                options = Object.keys(ParasolModel.store);
                // ["Bangasa", "Janome", "Maigasa"]
                break;
            case 'color':
                options = Object.keys(ParasolModel.store[this.type]);
                // ["Ivory", "Crepe"], ["Isabelline", "Crimson"] OR ["Sweet bianca", "Periwinkle"]
                break;
            case 'pattern':
                options = Object.keys(ParasolModel.store[this.type][this.color]);
                // ["Gradient", "Spiral"], ["Ring", "Ring Chain"], ["Tori (Birds)", 
                // "Kitsune (Nine-tailed Fox)"], ["Bonsai branches", "O Tera (Temple)"], 
                // ["Mountain landscape", "Ghibli (Kaguya-hime)"] OR ["Ryu (Dragon)", "Ookami (Wolf)"]
                break;
        }

        // 2. return select options
        return options;
    }

    /**
     * Resets this object's properties to "undefined". Not all properties are
     * going to be reset, only those that are listed after the property defined 
     * by this method parameter. 
     * 
     * @param {type} property - property from which the reset starts.
     */
    resetNextProperties(property) {
        let properties = Object.keys(this);
        let index = properties.indexOf(property);
        while (++index < properties.length) {
            this[properties[index]] = "undefined";
        }
    }

    /**
     * Persist sets the wanted item in the local storage as 'custom-parasol'.
     */
    persist() {

        localStorage.setItem('custom-parasol', JSON.stringify(this));
        // only takes the properties and builds a json file out of the js object
    }
}