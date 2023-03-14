/**
 * This is application's entry point based on the MVC architectural pattern.
 * The controller that represents the brains of the application is being 
 * initialized and connects the model and the view. 
 * 
 * The controller is used to intermediate between the view and the model. 
 * The controller monitors user interaction with the view and communicates 
 * any changes to the model.
 */
import { ParasolModel } from './model/ParasolModel.js';
import { ParasolView } from './view/ParasolView.js';
import { ParasolController } from './controller/ParasolController.js';

import { FormController } from './controller/FormController.js';
import { FormModel } from './model/FormModel.js';
import { FormView } from './view/FormView.js';

/**
 * Defining the App class.
 */
class App {

    // constructor that contains procedural code for switching between the index.html and form.html pages as necessary
    constructor() {

            // finding the necessary page
            const url = window.location.href;
            // using a regex to find the page 
            // index.html || form.html

            let page = null;
            // console.log("url page" + page);

            if (url.match(/[a-z]+.html/) != null) {
                page = url.match(/[a-z]+.html/)[0];
            }

            // switching between pages as necessary with a switch statement
            switch (page) {

                /* If we are on the form page, create a new FormController where the Model takes in 
                 * 'parasol' parameter as its name and it handles the form on index.html
                 * the second instantiation of FormModel */
                case "form.html":
                    new FormController(new FormModel('parasol'), new FormView());
                    break;

                    /**
                     * If we are on the index page, create a new ParasolController
                     * Otherwise, if the page variable is null, go to the default case,
                     * and create a new ParasolController */
                case "index.html":
                default:
                    new ParasolController(new ParasolModel(), new ParasolView());
                    break;

            } // end of page switch

        } // end of App constructor

} // class App end

const app = new App();