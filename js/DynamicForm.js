import { DynamicFormConfig } from "./DynamicFormConfig.js";
import { validationRules } from "./Validator.js";
import { Validator } from "./Validator.js";

/**
 * DynamicForm: Class to create, render, and manage a dynamic HTML form with custom validation.
 *
 * Constructor:
 *  - config: an instance of DynamicFormConfig that defines the form's configuration such as parent container,
 *    CSS classes, title, legend, popup class, and logging settings.
 *
 * Methods:
 *  - sendLog(message): Logs a message to the console if enableLog is true.
 *  - addField(field): Adds a form field object to the form. Each field must have at least type, id, and name.
 *    Optional properties include label, placeholder, required, default value, options, visibility, and validator.
 *  - render(): Generates and appends the form to the parent element defined in config.parentId. Handles
 *    creating titles, legends, and all field types including input, textarea, select, checkbox, radio, and buttons.
 *  - createForm(): Creates the <form> element, attaches submit listener, and disables native validation.
 *  - createTitle(), createLegend(): Helper methods to generate form title and legend elements.
 *  - createInput(field), createTextArea(field), createSelect(field), createOptionsInput(field), createButton(field):
 *    Helper methods to generate specific HTML elements based on the field configuration.
 *  - validateField(field): Runs the custom validator for a field and shows a popup if invalid.
 *  - validateAllFields(): Iterates through all fields and validates them. Stops on the first invalid field.
 *  - showPopup(message, inputElement): Creates a floating error popup near the invalid input element.
 *  - getValues(): Returns an object with the current values of all form fields.
 *
 * Notes:
 *  - Custom validation is handled through the field.validator property, which should return true if valid
 *    or a string with an error message if invalid.
 *  - The class supports dynamic addition of fields and custom styling via CSS classes defined in the config.
 */
export class DynamicForm {
    constructor(config) {
        this.config = new DynamicFormConfig();
        this.config = config;
        this.fields = [];
        this.formElement = null;
    }

    sendLog(message) {
        if (this.config.enableLog) {
            console.error(message);
        }
    }

    addField(field) {
        if (!field.type || !field.id || !field.name) {
            this.sendLog("El campo debe tener al menos type, id y name");
            return;
        }

        if (field.visible === undefined) field.visible = true;

        this.fields.push(field);
    }

    render() {
        const parent = document.getElementById(this.config.parentId);
        if (!parent) {
            this.sendLog(
                `No se encontró el nodo padre con id "${this.config.parentId}"`,
            );
            return;
        }

        const form = this.createForm();
        const title = this.createTitle();
        if (title) form.appendChild(title);
        const legend = this.createLegend();
        if (legend) form.appendChild(legend);

        this.fields.forEach((field) => {
            if (!field.visible) return;

            const wrapper = document.createElement("div");
            wrapper.className = "form-field";

            if (field.label) {
                const label = document.createElement("label");
                label.htmlFor = field.id;
                label.textContent = field.label;
                wrapper.appendChild(label);
            }

            let input;
            switch (field.type) {
                case "select":
                    input = this.createSelect(field);
                    break;
                case "textarea":
                    input = this.createTextArea(field);
                    break;
                case "checkbox":
                case "radio":
                    input = this.createOptionsInput(field);
                    break;
                case "submit":
                    input = this.createButton(field);
                    break;
                default:
                    input = this.createInput(field);
            }

            wrapper.appendChild(input);
            form.appendChild(wrapper);
        });

        parent.appendChild(form);
    }

    createForm() {
        const form = document.createElement("form");
        form.id = `form_${this.config.parentId}`;
        form.className = this.config.className || "dinamic_form";
        this.formElement = form;
        form.addEventListener("submit", (e) => {
            if (!this.validateAllFields()) {
                e.preventDefault();
            }
        });
        return form;
    }

    createTitle() {
        if (!this.config.tittle) return null;
        const title = document.createElement("h2");
        title.textContent = this.config.tittle;
        title.className = this.config.tittleClassName || "";
        return title;
    }

    createLegend() {
        if (!this.config.leyend) return null;
        const legend = document.createElement("p");
        legend.textContent = this.config.leyend;
        legend.className = this.config.leyendClassName || "";
        return legend;
    }

    createInput(field) {
        const input = document.createElement("input");
        input.type = field.type;
        input.value = field.default || "";
        if (field.min !== undefined) input.min = field.min;
        if (field.max !== undefined) input.max = field.max;
        if (field.regExp) input.pattern = field.regExp;
        input.id = field.id;
        input.name = field.name;
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.required) input.required = true;
        if (field.className) input.className = field.className;
        return input;
    }

    createTextArea(field) {
        const textarea = document.createElement("textarea");
        textarea.id = field.id;
        textarea.name = field.name;
        if (field.placeholder) textarea.placeholder = field.placeholder;
        if (field.required) textarea.required = true;
        if (field.className) textarea.className = field.className;
        return textarea;
    }

    createSelect(field) {
        const select = document.createElement("select");
        select.id = field.id;
        select.name = field.name;
        if (field.className) select.className = field.className;
        field.options?.forEach((opt) => {
            const option = document.createElement("option");
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });
        return select;
    }

    createOptionsInput(field) {
        const container = document.createElement("div");
        const options = field.options || [];
        options.forEach((opt) => {
            const optionWrapper = document.createElement("label");
            optionWrapper.style.display = "flex";
            optionWrapper.style.alignItems = "center";
            optionWrapper.style.gap = "8px";
            optionWrapper.style.cursor = "pointer";

            const input = document.createElement("input");
            input.type = field.type;
            input.name = field.name;
            input.value = opt.value;
            input.required = field.required || false;

            const textNode = document.createTextNode(opt.text);

            optionWrapper.appendChild(input);
            optionWrapper.appendChild(textNode);
            container.appendChild(optionWrapper);
        });
        return container;
    }

    createButton(field) {
        const button = document.createElement("button");
        button.type = field.buttonType || "submit";
        button.textContent = field.text || "Click";
        if (field.className) button.className = field.className;
        button.id = field.id;
        button.name = field.name;
        return button;
    }

    validateField(field) {
        if (!field.validator) return true;

        const inputElement = this.formElement.querySelector(`#${field.id}`);
        if (!inputElement) return true;

        const value = inputElement.value;
        const result = field.validator.validate(value, field.name);

        if (result !== true) {
            this.showPopup(result, inputElement);

            return false;
        }

        return true;
    }
    showPopup(message, inputElement) {
        const existingPopup = document.querySelector(
            `.${this.config.popupClassName}`,
        );
        if (existingPopup) existingPopup.remove();

        const popup = document.createElement("div");
        popup.className = this.config.popupClassName || "dynamic-form-popup";
        popup.textContent = message;

        popup.style.position = "absolute";
        popup.style.background = "#f44336";
        popup.style.color = "#fff";
        popup.style.padding = "10px 15px";
        popup.style.borderRadius = "4px";
        popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
        popup.style.zIndex = 9999;

        const rect = inputElement.getBoundingClientRect();
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        popup.style.top = `${rect.top + scrollTop - rect.height - 10}px`;
        popup.style.left = `${rect.left}px`;

        document.body.appendChild(popup);

        inputElement.focus();

        setTimeout(() => {
            popup.remove();
        }, 3000);
    }

    validateAllFields() {
        let allValid = true;

        for (const field of this.fields) {
            if (!this.validateField(field)) {
                allValid = false;
                break;
            }
        }
        if (allValid) {
            this.config.onSubmitAction();
        }
        return allValid;
    }

    getValues() {
        if (!this.formElement) return null;
        const formData = new FormData(this.formElement);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
}
