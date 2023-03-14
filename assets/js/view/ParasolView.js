/**
 * Class that represents the application view. The view displays information 
 * contained in the model: type, colour and pattern. The view does not obtain the information 
 * directly from the model, it uses the controller as a mediator which instructs 
 * it when and what to display. 
 * 
 * The view holds references to all UI elements with which the user interacts with
 * AND for which the event-handling mechanism needs to be implemented.
 */
export class ParasolView {
    constructor() {
        this.parasolForm = document.querySelector("#form-parasol");
        this.selectsDiv = document.querySelector("#div-selects");
        this.selects = null;
        this.parasolDiv = document.querySelector("#div-parasol");
        this.submitBtn = document.querySelector('#submit-btn')
    }

    /**
     * Renders HTML select elements. The options are not loaded in the process,
     * meaning that there are no Option elements as part of the select element.
     *  
     * @param {Array} selectIDs - array of strings (select ids)  
     */
    renderSelects(selectIDs) {
        selectIDs.forEach((name) => {
            let select = document.createElement('select');
            select.setAttribute("id", name);
            select.options.add(new Option(` -- Select a ${name} -- `, 'undefined'));
            this.selectsDiv.appendChild(select);
        });

        this.selects = this.selectsDiv.querySelectorAll('select');
    }

    /**
     * Resets all next selects, selects that are siblings to the one defined by
     * this method parameter.
     * 
     * @param {type} selectID - the ID of the select which next siblings are going to be reset
     */
    resetNextSiblings(selectID) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        let nextSelect = select.nextElementSibling;
        while (nextSelect) {
            nextSelect.length = 1;
            nextSelect = nextSelect.nextElementSibling;
        }
    }

    /** Reset all options inside the cascading selection sheets */
    resetSelectionForm() {
        let nextSelect = this.selectsDiv.childNodes[1];

        while (nextSelect) {
            console.log(nextSelect);
            nextSelect.selectedIndex = 0;
            nextSelect = nextSelect.nextElementSibling;
        }
    }

    /** Reset image to default */
    resetSelectionImage() {
        let imgDefault = "assets/media/undefined-undefined-undefined.png";

        this.parasolDiv.querySelector('img').src = imgDefault;
    }

    /**
     * Adds options to a select.
     * 
     * @param {String} selectID
     * @param {Array} options - array of strings (option names)
     */
    addOptions(selectID, options) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        select.length = 1;

        options.forEach((option) => {
            select.options.add(new Option(option, option, option));
        });
    }

    /**
     * Renders the image based on the current selects' values.
     * Checks if the submit button is disabled when the all the selects are not filled.
     * 
     * @returns {undefined}
     */
    renderParasol(isDisabled) {
        let imgSrc = 'assets/media/';

        this.selects.forEach((select) => {
            imgSrc += `${select.value}-`;
        });
        imgSrc = imgSrc.slice(0, -1) + '.png'; //remove the last character '-'.

        this.parasolDiv.querySelector('img').src = imgSrc;

        if (!isDisabled) this.submitBtn.disabled = false;

    }

}