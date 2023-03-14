/**
 * Class that represents the form view. The view displays the user's current input 
 * and provides feedback on it through validation. 
 * 
 * The view holds references to all UI elements with which the user interacts with
 * AND for which the event-handling mechanism needs to be implemented.
 */
export class FormView {

    // Defining the class constructor.
    constructor() {

        this.form = document.querySelector("#form-parasol-name");
        this.inputs = this.form.querySelectorAll('fieldset>input');

    }

    /**
     * A method which renders the parasol image inside the targeted div.
     * It dynamically renders the 'src' string which would match the user's
     * selections inside the Shop section of the page.
     * @param {*} data 
     */
    renderParasol(data) {
        let parasol = document.querySelector('#div-parasol')
        let imgSrc = 'assets/media/';

        let counter = 0;

        for (let property in data) {
            if (counter < 3) {
                parasol.insertAdjacentHTML('beforeend', `<p>${property}: ${data[property]}</p>`);
                imgSrc += `${data[property]}-`;
            }
            counter++;
        }

        imgSrc = imgSrc.slice(0, -1) + '.png'; //remove the last character '-'.
        parasol.insertAdjacentHTML('beforeend', `<img src="${imgSrc}" alt="ordered item"  width="260px">`);

    }

    /**
     * Getting all the inputs from the form.
     */
    registerInputs() {

        this.inputs = form.querySelectorAll('fieldset>input');
    }
}