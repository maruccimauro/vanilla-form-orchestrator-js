/**
 * Validator class: Encapsulates a validation rule using a regular expression,
 * a custom validation message, and an optional field name.
 */
export class Validator {
    /**
     * @param {Object} config - Configuration object
     * @param {RegExp} config.regExp - Regular expression to test the field value
     * @param {string} config.validationMsg - Message returned if validation fails
     * @param {string} config.fieldName - Name of the field for error messages
     */
    constructor({ regExp, validationMsg, fieldName }) {
        this.regExp = regExp;
        this.validationMsg = validationMsg;
        this.fieldName = fieldName;
    }

    /**
     * validate: Tests the given value against the stored regular expression.
     * @param {string} value - Value to validate
     * @param {string} fieldName - Name of the field to use in the error message
     * @returns {true|string} - Returns true if valid, otherwise a formatted error message
     */
    validate(value, fieldName) {
        if (!this.regExp) return true; // No validation needed if regExp is not provided

        const isValid = this.regExp.test(value); // Test value against the regex

        if (isValid) return true;

        // Return formatted validation message with field name capitalized
        return this.validationMsg.replace(
            "%value%",
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
        );
    }
}

/**
 * validationRules: Predefined validation rules grouped by type.
 * Can be reused throughout forms for consistent validation logic.
 */
export const validationRules = {
    numeric: {
        numeric: new Validator({
            regExp: /^\d+$/,
            validationMsg: "The field '%value%' only accepts numbers.",
            fieldName: "Numeric Field",
        }),
        numericWithSpaces: new Validator({
            regExp: /^[\d\s]+$/,
            validationMsg:
                "The field '%value%' only accepts numbers and spaces.",
            fieldName: "Numeric Field",
        }),
        phone: new Validator({
            regExp: /^(\+?\d{1,3}[-\s]?)?(\(?\d+\)?[-\s]?)+$/,
            validationMsg:
                "The field '%value%' only accepts valid phone numbers.",
            fieldName: "Phone Number",
        }),
    },
    words: {
        singleWord: new Validator({
            regExp: /^[a-zA-Z]+$/,
            validationMsg: "The field '%value%' only accepts letters.",
            fieldName: "Word",
        }),
        multipleWords: new Validator({
            regExp: /^[a-zA-Z\s]+$/,
            validationMsg:
                "The field '%value%' only accepts letters and spaces.",
            fieldName: "Words",
        }),
        sentence: new Validator({
            regExp: /^[A-Za-z0-9.,!?¿¡:;'\s-]+$/,
            validationMsg: "The field '%value%' contains invalid characters.",
            fieldName: "Sentence",
        }),
        paragraph: new Validator({
            regExp: /^[A-Za-z0-9.,!?¿¡:;'\s-\n]+$/,
            validationMsg: "The field '%value%' contains invalid characters.",
            fieldName: "Paragraph",
        }),
    },
    password: {
        medium: new Validator({
            regExp: /(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
            validationMsg:
                "The field '%value%' must be at least 8 characters long, including an uppercase letter and a number.",
            fieldName: "Password",
        }),
        strong: new Validator({
            regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/,
            validationMsg:
                "The field '%value%' must be at least 10 characters long, including a lowercase letter, an uppercase letter, a number, and a special character.",
            fieldName: "Password",
        }),
    },
    miscellaneous: {
        email: new Validator({
            regExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            validationMsg: "The field '%value%' must be a valid email.",
            fieldName: "Email",
        }),
    },
};
