/**
 * Class that represents the application controller. The controller is responsible 
 * for accessing data from the model and displaying it on the view. The controller 
 * is used to intermediate between the view and the model. It monitors user interactions 
 * with the view and communicates any changes to the model. On the other hand, 
 * changes (if any) to the model are observed by the controller and subsequently 
 * reflected in the view.  
 * 
 * The controller contains the code that handles different types of events. The
 * controller's methods are event handlers.
 * 
 * BEWARE of the 'this' keyword. The 'this' keyword behaves a little differently
 * in JavaScript compared to other languages. In most cases, the value of 'this'
 * is determined by how a function is called (runtime binding). Inside a handler,
 * 'this' points to the UI element that triggered the event. Inside an arrow 
 * function, 'this' points to the object that owns/defines the arrow function.
 * Here, that's the ParasolController object.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 */
export class ParasolController {
    /**
     * Creates an object representing the parasol controller.
     * 
     * @param {type} model - The model the controller interacts with.
     * @param {type} view - The view the controller interatcs with.
     * @returns {ParasolController} The object representing the parasol controller.
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // 1. render all selects
        let properties = this.model.getProperties();
        this.view.renderSelects(properties);

        // 2. populate the first select
        let firstSelectID = properties[0];
        this.view.addOptions(firstSelectID, this.model.getOptions(firstSelectID));

        // 3. register one event handler for all select 'change' events
        this.view.selects.forEach((select) => {
            select.addEventListener('change', this.handleSelectChange);
        });

        this.view.parasolForm.addEventListener('submit', this.handleFormSubmit);
        this.view.parasolForm.addEventListener('reset', this.handleFormReset);

    }

    /**
     * Handles the change event generated by a select. When 'change' event is 
     * triggered, 
     * @param {type} event
     * @returns {undefined}
     */
    handleSelectChange = (event) => {
        let select = event.target;

        //1. UPDATE MODEL ------------------------------------------------------
        //Once the current model property is updated, the other model properties
        //that are defined after the current property, they need to be reset to 
        //"undefined".
        this.model[select.id] = select.value;
        this.model.resetNextProperties(select.id);


        //2. UPDATE VIEW (selectsDiv + parasolDiv -------------------------------    

        //2.1 Update the selectsDiv - reset next selects & load new options into
        // the next select only if the current selected option is different than 
        // '-- Select the ... --', which index is 0
        this.view.resetNextSiblings(select.id);
        let nextSelect = select.nextElementSibling;
        if (select.selectedIndex > 0 && nextSelect) {
            this.view.addOptions(nextSelect.id, this.model.getOptions(nextSelect.id));
        }

        //2.2. Update the parasolDiv 
        this.view.renderParasol(this.model.getLastPropertyValue() === 'undefined');
    }

    /**
     * A method that handles the submission of the form that contains the selected property values.
     * @param {*} event 
     */
    handleFormSubmit = (event) => {
        // Prevent the default action of a form (prevent submitting it)
        console.log(this.model.getLastPropertyValue())
        if (this.model.getLastPropertyValue() === 'undefined') {
            event.preventDefault();
        } else {
            // Store data into the local storage
            this.model.persist(); // the model handles local storage
        }
    }

    /** 
     * A method that will reset the form selects and disable the submit button
     * until all the fields will be filled and the form will be ready for submission again.
     * @param {*} event 
     */
    handleFormReset = (event) => {
        /** Reset the selection */
        this.view.resetSelectionForm();
        this.view.resetNextSiblings("type");

        this.view.resetSelectionImage();
        this.view.submitBtn.disabled = true;

    }

}