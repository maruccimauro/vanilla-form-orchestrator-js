import { DynamicForm } from "./DynamicForm.js";
import { formSeed } from "./data/formSeed.js";
import { DynamicFormConfig } from "./DynamicFormConfig.js";

/**
 * Example usage of the DynamicForm class.
 *
 * This script demonstrates how to create and render a dynamic registration form using:
 *  - DynamicFormConfig: to configure form settings such as parent container, CSS classes, title, legend, and popup class.
 *  - DynamicForm: to build the form structure, add fields, validate inputs, and handle submission.
 *  - formSeed: predefined field objects that include HTML attributes and validation rules for each form input.
 *
 * Steps performed:
 *  1. Create a new DynamicFormConfig instance and set properties like parentId, className, name, title, legend, and popup class.
 *  2. Create a DynamicForm instance with the configuration.
 *  3. Add individual fields from formSeed (name, email, password, age, gender, terms, submit).
 *  4. Render the form inside the specified parent container.
 *
 * Notes:
 *  - The form is fully dynamic and does not rely on pre-existing HTML form elements.
 */

let formConfig = new DynamicFormConfig();
formConfig.parentId = "form_container";
formConfig.className = "dinamic_form";
formConfig.name = "register_form";
formConfig.tittle = "Form without HTML";
formConfig.tittleClassName = "register_form_tittle";
formConfig._popupClassName = "pupup_error";
formConfig.leyend =
    "This form was developed from the DOM using a personal Javascript orchestrator.";
formConfig.leyendClassName = "register_form_leyend";
formConfig._onSubmitAction = () => {
    alert("Success!");
};

let form = new DynamicForm(formConfig);
form.addField(formSeed.name);
form.addField(formSeed.email);
form.addField(formSeed.password);
form.addField(formSeed.age);
form.addField(formSeed.gender);
form.addField(formSeed.terms);
form.addField(formSeed.submit);

form.render();
