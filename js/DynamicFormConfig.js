/**
 * DynamicFormConfig: Class that defines the configuration settings for a DynamicForm instance.
 * Each property allows customization of the form's behavior, appearance, and logging.
 *
 * Properties:
 *  - parentId: The ID of the parent HTML element where the form will be rendered.
 *  - nameForm: The name of the form.
 *  - className: CSS class applied to the form element.
 *  - popupClassName: CSS class applied to validation popups or error messages.
 *  - enableLog: Boolean to enable or disable console logging for debugging.
 *  - tittle: The title text displayed at the top of the form.
 *  - tittleClassName: CSS class applied to the form's title.
 *  - leyend: Optional legend or description text displayed below the title.
 *  - leyendClassName: CSS class applied to the legend text.
 */

export class DynamicFormConfig {
    constructor() {
        this._parentId = "";
        this._nameForm = "";
        this._className = "";
        this._popupClassName = "";
        this._enableLog = false;
        this._tittle = "";
        this._tittleClassName = "";
        this._leyend = "";
        this._leyendClassName = "";
        this._onSubmitAction = () => {};
    }

    get parentId() {
        return this._parentId;
    }
    set parentId(value) {
        this._parentId = value;
    }

    get nameForm() {
        return this._nameForm;
    }
    set nameForm(value) {
        this._nameForm = value;
    }

    get className() {
        return this._className;
    }
    set className(value) {
        this._className = value;
    }

    get enableLog() {
        return this._enableLog;
    }
    set enableLog(value) {
        this._enableLog = Boolean(value);
    }

    get tittle() {
        return this._tittle;
    }
    set tittle(value) {
        this._tittle = value;
    }

    get tittleClassName() {
        return this._tittleClassName;
    }
    set tittleClassName(value) {
        this._tittleClassName = value;
    }

    get leyend() {
        return this._leyend;
    }
    set leyend(value) {
        this._leyend = value;
    }

    get leyendClassName() {
        return this._leyendClassName;
    }
    set leyendClassName(value) {
        this._leyendClassName = value;
    }

    get popupClassName() {
        return this._popupClassName;
    }
    set popupClassName(value) {
        this._popupClassName = value;
    }

    get onSubmitAction() {
        return this._onSubmitAction;
    }
    set onSubmitAction(value) {
        this._onSubmitAction = value;
    }
}
