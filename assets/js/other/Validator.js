export class Validator {

    // Method that uses a regex to validate the entered phone number
    // https://www.abstractapi.com/guides/validate-phone-number-javascript#how-to-validate-a-phone-number-using-a-javascript-regex
    /**
     * 
     * @param {*} input 
     * @returns 
     */
    validateNumber(value) {

        if (!value) {
            return false
        }

        let number = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return number.test(value)
    }


    /**
     * Method that uses a regex to validate the entered email
     * @param {*} input 
     * @returns 
     */
    validateEmail(input) {

        if (!input) {
            return false
        }

        let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailReg.test(input);
    }

    /**
     * Method that uses a regex to validate the entered name
     * @param {*} input 
     * @returns 
     */
    validateName(input) {

        if (!input) {
            return false
        }

        let text = /^[a-zA-Z\s\-?]*$/;
        return text.test(input)
    }

    /**
     * Method that uses a regex to validate the entered address
     * @param {*} input 
     * @returns 
     */
    validateAddress(input) {

        if (!input) {
            return false
        }

        let text = /^[A-Za-z]* [A-Za-z]* [0-9]+$/i;
        return text.test(input);
    }


    /**
     * Method that uses a regex to validate the entered country
     * @param {*} input 
     * @returns 
     */
    validateCountry(input) {

        if (!input) {
            return false
        }

        let text = /^[a-zA-Z\s]*$/;
        return text.test(input);
    }

    /**
     * Method that uses a regex to validate the entered credit card number
     * @param {*} input 
     * @returns 
     */
    validateCreditCard(input) {

        if (!input) {
            return false
        }

        let text = /^[0-9]{16}$/;
        return text.test(input);
    }

    /**
     * Method that uses a regex to validate the entered cvc
     * @param {*} input 
     * @returns 
     */
    validateCVC(input) {

        if (!input) {
            return false
        }

        let text = /^[0-9]{3}$/;
        return text.test(input);
    }

    /**
     * Method that uses a regex to validate the entered expiration date
     * @param {*} input 
     * @returns 
     */
    validateExpirationDate(input) {

        if (!input) {
            return false
        }

        let expirationDate = /^[0-9]{2}\/[0-9]{2}$/;
        return expirationDate.test(input);
    }

}