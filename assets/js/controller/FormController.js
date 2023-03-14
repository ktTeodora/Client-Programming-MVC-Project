/**
 * Responds to user inputs. Here, we use the FormData, a JS built-in class that 
 * provides a way to easily construct a set of key/value pairs representing form 
 * fields and their values.
 * 
 * More at {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData FormData}.
 *
 * Importing the Validator class in order to validate the input inside the fields */
import { Validator } from '../other/Validator.js';
export class FormController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.renderParasol(this.model.getInputData());
        this.validator = new Validator();

        // register one event handler for all input 'change' events
        this.view.inputs.forEach((input) => {
            input.addEventListener('change', this.handleInputChange);
        });

        // register form submit handler
        this.view.form.addEventListener('submit', this.handleFormSubmit);

    }

    /**
     * A method that handles the changes of the input in the html form.
     * @param {*} event 
     */
    handleInputChange = (event) => {
        let input = event.target;
        this.validateInput(input);
    }

    /**
     * A method used to validate the input inside the text fields belonging to the html form.
     * @param {*} input 
     * @returns 
     */
    validateInput(input) {

        // Defining a switch case that will call the correct validation function on the specific field
        switch (input.name) {
            case "phone":
                if (this.validator.validateNumber(input.value)) {
                    this.model[input.name] = input.value;
                    input.nextElementSibling.innerHTML = "&#x2713;";
                    input.style = "border: 0px;";
                    return true;
                } else {
                    input.style = "border: 2px solid red;";
                    input.nextElementSibling.innerText = "Please insert a valid phone number (10 digits).";
                    return false;
                }
            case "email":
                if (this.validator.validateEmail(input.value)) {
                    this.model[input.name] = input.value;
                    input.nextElementSibling.innerHTML = "&#x2713;";
                    input.style = "border: 0px;";
                    return true;
                } else {
                    input.style = "border: 2px solid red;";
                    input.nextElementSibling.innerText = "Please insert a valid email.";
                    return false;
                }
            case "name":
                if (this.validator.validateName(input.value)) {
                    this.model[input.name] = input.value;
                    input.nextElementSibling.innerHTML = "&#x2713;";
                    input.style = "border: 0px;";
                    return true;
                } else {
                    input.style = "border: 2px solid red;";
                    input.nextElementSibling.innerText = "Please insert your full name";
                    return false;
                }
            case "address":
                if (this.validator.validateAddress(input.value)) {
                    this.model[input.name] = input.value;
                    input.nextElementSibling.innerHTML = "&#x2713;";
                    input.style = "border: 0px;";
                    return true;
                } else {
                    input.style = "border: 2px solid red;";
                    input.nextElementSibling.innerText = "Please insert the street, town and street number";
                    return false;
                }
            case "country":
                if (this.validator.validateCountry(input.value)) {
                    this.model[input.name] = input.value;
                    input.nextElementSibling.innerHTML = "&#x2713;";
                    input.style = "border: 0px;";
                    return true;
                } else {
                    input.style = "border: 2px solid red;";
                    input.nextElementSibling.innerText = "Please insert country name";
                    return false;
                }
            case "credit-number":
                if (this.validator.validateCreditCard(input.value)) {
                    this.model[input.name] = input.value;
                    input.nextElementSibling.innerHTML = "&#x2713;";
                    input.style = "border: 0px;";
                    return true;
                } else {
                    input.style = "border: 2px solid red;";
                    input.nextElementSibling.innerText = "Please insert a valid card number (16 digits).";
                    return false;
                }
            case "credit-expires":
                if (this.validator.validateExpirationDate(input.value)) {
                    this.model[input.name] = input.value;
                    input.nextElementSibling.innerHTML = "&#x2713;";
                    input.style = "border: 0px;";
                    return true;
                } else {
                    input.style = "border: 2px solid red;";
                    input.nextElementSibling.innerText = "Please insert a valid date (MM/YY).";
                    return false;
                }
            case "credit-cvc":
                if (this.validator.validateCVC(input.value)) {
                    this.model[input.name] = input.value;
                    input.nextElementSibling.innerHTML = "&#x2713;";
                    input.style = "border: 0px;";
                    return true;
                } else {
                    input.style = "border: 2px solid red;";
                    input.nextElementSibling.innerText = "Please insert a valid number (3 digits).";
                    return false;
                }
        }
    }

    /**
     * Implementing the method which will handle the form submit,
     * checks if local storage is supported by the browser,
     * then calls the persist() method to store the input in local 
     * storage if the storage check returned true.
     * Finally, it notifies the user that their order has been placed 
     * and returns to the index.html Home view
     * @param {*} event 
     * @returns 
     */
    handleFormSubmit = (event) => {
        //prevent the default action of a form (prevent submitting it)
        event.preventDefault();

        // checking for local storage availability
        if (!localStorage) {
            document.getElementById("submit-feedback").setText = "Local Storage not supported by the browser";
            return;
        }

        // taking in the results of the check of the parameters to see if all have been satisfied,
        // if not, alert the user to fill in the remaining fields with the necessary information.
        for (let input of this.view.inputs) {

            if (input.value === "" || input.value == undefined || !this.validateInput(input)) {
                let message = document.querySelector('#submit-feedback');
                message.innerHTML = "Please review all the fields.";
                return;
            }
        }


        // calling persist() to store the data and redirecting to Home Page again
        this.model.persist();
        let message = document.getElementById("submit-feedback");
        message.innerHTML = "Your order has been forwarded!<br>Redirecting to Home Page.";

        setTimeout(this.redirectAfterValidation, 4600);

    }

    /**
     * Method which will take the user back to index.html.
     */
    redirectAfterValidation() {

        location.href = 'index.html'
    }

}