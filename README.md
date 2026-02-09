# Dynamic Form – JavaScript Form Orchestrator (Without HTML)

---

## Overview

This repository contains a pure JavaScript dynamic form orchestrator that builds, renders, and validates HTML forms entirely from the DOM, without writing any form markup in HTML.

The form structure, behavior, validation rules, and styles are fully driven by JavaScript configuration objects, making the solution highly reusable, extensible, and framework-agnostic.

The project demonstrates clean separation of concerns between:

- Form configuration
- Form rendering logic
- Validation rules
- Styling
- Application bootstrap

---

## Key Concepts

This project focuses on:

- Declarative form definition via JavaScript objects
- Runtime DOM generation
- Custom validation engine using regular expressions
- Configuration-driven UI orchestration
- UI orchestration purely from configuration
- Zero HTML form markup
- Clean, modular, and extensible architecture

---

## JavaScript Concepts Demonstrated

This repository demonstrates strong understanding of:

- DOM APIs
- Object-oriented JavaScript
- ES Modules
- Separation of concerns
- Declarative configuration
- Validation abstraction
- Event-driven programming
- Reusable UI logic
- Clean architecture without frameworks

---

## Features

- **Fully dynamic form rendering** (no HTML form tags written manually)
- **Support for multiple field types:**
    - Text
    - Email
    - Password
    - Number
    - Textarea
    - Select
    - Checkbox
    - Radio
    - Submit button
- Centralized form configuration via `DynamicFormConfig`
- Reusable validation rules with `Validator` abstraction
- Floating popup validation errors near invalid fields
- Custom submit action hook
- Responsive and modern UI styling
- Dark mode support via `prefers-color-scheme`
- ES Modules (`type="module"`) architecture

---

## Project Structure

```
dynamic-form/
├── js/
│   ├── data/
│   │   └── formSeed.js
│   ├── DynamicForm.js
│   ├── DynamicFormConfig.js
│   ├── Validator.js
│   └── main.js
├── styles/
│   └── style.css
└── index.html

```

---

## How It Works

### 1. No HTML Form Markup

The `index.html` file contains only a container element:

```html
<div id="form_container"></div>
```

Everything else is generated dynamically using JavaScript.

### 2. Form Configuration

The `DynamicFormConfig` class defines global form behavior and appearance:

- Parent container
- CSS classes
- Title and legend
- Popup styling
- Submit callback
- Logging behavior

**Example:**

```javascript
let formConfig = new DynamicFormConfig();
formConfig.parentId = "form_container";
formConfig.className = "dinamic_form";
formConfig.name = "register_form";
formConfig.tittle = "Form without HTML";
formConfig.leyend =
    "This form was developed from the DOM using a personal Javascript orchestrator.";
formConfig.onSubmitAction = () => {
    alert("Success!");
};
```

### 3. Declarative Form Definition (Seed)

The entire form structure is defined in a single object (`formSeed.js`).

Each field describes:

- Type
- HTML attributes
- Validation logic
- Options (for select, checkbox, radio)
- Required flags

**Example:**

```javascript
name: {
    type: "text",
    id: "name",
    name: "name",
    label: "Name",
    className: "form_textbox",
    placeholder: "Enter your name",
    required: true,
    validator: validationRules.words.multipleWords,
}
```

### 4. Validation Engine

Validation is handled by a dedicated `Validator` class:

- Encapsulates a regular expression
- Returns `true` or a formatted error message
- Fully reusable across fields and forms

**Predefined rule groups include:**

- Numeric
- Words
- Password strength
- Email
- Custom validators

**Example:**

```javascript
new Validator({
    regExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    validationMsg: "The field '%value%' must be a valid email.",
    fieldName: "Email",
});
```

### 5. Runtime Rendering & Validation Flow

1. Fields are added dynamically via `addField`
2. The form is rendered into the DOM
3. On submit:
    - Each field is validated sequentially
    - The first invalid field triggers a popup error
    - Submission stops until all fields are valid
4. When valid, the configured submit action executes

---

## Usage

### Run Locally

No build step required.

This project uses native ES Modules (`import / export`), which are part of the modern web platform.
For security reasons, browsers only allow ES Modules to be loaded from a valid HTTP(S) origin.

Opening `index.html` directly from the file system (`file://`) will NOT work.

To run the project locally, you must serve it through a local web server:

- VS Code Live Server
- `npx serve`
- `python -m http.server`

Then open the provided `http://localhost` URL in your browser.

### Why is a local server required?

When using ES Modules, browsers load JavaScript files using the same rules as other web resources.
This means module files are fetched via HTTP and are subject to security policies such as CORS
and origin isolation.

When a page is opened using `file://`, there is no valid web origin.
Because of this, browsers block module imports to prevent unrestricted access to the local file system.

This is expected browser behavior and not a limitation or bug of this project.

### Common Errors

If the project is opened directly from the file system, you may encounter errors such as:

- `Cannot use import statement outside a module`
- `Failed to load module script`
- `The requested module does not provide an export`

Running the project through a local server resolves these issues.

![dynamic_form](doc/dynamic_form.gif)

---

### Styling

- Modern UI with gradients and subtle animations
- Fully responsive layout
- Dark mode support
- Accessible focus and hover states
- No external CSS frameworks

All styles are located in: `styles/style.css`

---

## Purpose of This Repository

This project was created to:

- Demonstrate advanced JavaScript fundamentals
- Show how to orchestrate UI purely from configuration
- Avoid framework dependency for learning purposes
- Serve as a base for more complex form engines

## Author

**Mauro**
