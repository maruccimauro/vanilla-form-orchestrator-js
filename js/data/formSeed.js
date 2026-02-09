import { validationRules } from "../Validator.js";
import { Validator } from "../Validator.js";

/**
 * formSeed: Object that defines the structure and validation of a registration form.
 * Each property represents a form field with its HTML attributes and validation rules.
 *
 * Properties:
 *  - type, id, name, label, className, placeholder, required, etc: define the structure and HTML attributes of the field.
 *  - validator: a function or rule from validationRules that validates the field's value.
 *    It should return `true` if the value is valid, or a string with an error message if invalid.
 */

export const formSeed = {
    name: {
        type: "text",
        id: "name",
        name: "name",
        label: "Name",
        className: "form_textbox",
        placeholder: "Enter your name",
        required: true,
        validator: validationRules.words.multipleWords,
    },
    email: {
        type: "email",
        id: "Email",
        name: "email",
        label: "Email",
        className: "form_textbox",
        placeholder: "Enter your email",
        required: true,
        validator: validationRules.miscellaneous.email,
    },
    password: {
        type: "password",
        id: "Password",
        name: "password",
        label: "Password",
        className: "form_textbox",
        placeholder: "Enter your password",
        required: true,
        validator: validationRules.password.strong,
    },
    age: {
        type: "number",
        id: "Age",
        name: "age",
        label: "Age",
        className: "form_textbox",
        placeholder: "Enter your age",
        required: true,
        validator: new Validator({
            regExp: /^(?:1[01][0-9]|120|[1-9]?[0-9])$/,
            validationMsg:
                "The field '%value%' must be a valid age between 0 and 120.",
            fieldName: "Age",
        }),
    },
    gender: {
        type: "select",
        id: "Gender",
        name: "gender",
        label: "Gender",
        className: "form_select",
        options: [
            { value: "", text: "Select gender" },
            { value: "male", text: "Male" },
            { value: "female", text: "Female" },
            { value: "other", text: "Other" },
        ],
        required: true,
        validator: new Validator({
            regExp: /^(male|female|other)$/i,
            validationMsg:
                "The field '%value%' must be 'male', 'female', or 'other'.",
            fieldName: "Gender",
        }),
    },
    terms: {
        type: "checkbox",
        id: "Terms",
        name: "terms",
        label: "Accept the terms and conditions",
        className: "form_checkbox",
        options: [{ value: "", text: "I accept" }],
        required: true,
    },
    submit: {
        type: "submit",
        id: "Submit",
        name: "submit",
        label: "",
        className: "form_button",
        action: "submit",
        text: "Submit",
    },
};
