import { makeElement, makeLabel, makeButton, makeInput, makeDropDownOptions, makeNotAnOption } from './DOM_basic_functions';

export function createTaskForm(container) {
    const module = makeElement('div', '', 'transparent-box gone', '', container);
    const formContainer = makeElement('div', '', 'form-container', '', module);
    const form = makeElement('form', '', '', '', formContainer);
    const formFieldset = makeElement('fieldset', '', '', '', form);
    const formLegend = makeElement('legend', '', '', 'New Task Form', formFieldset); 
    const propertyBox = makeElement('div', '', 'form-property-box', '', formFieldset);
    const titleDiv = makeElement('div', '', 'form-property-div', '', propertyBox);
    const titleLabel = makeLabel('', 'title', 'labels', 'Title:', titleDiv);
    const titleInput = makeInput('input', 'title', 'text', 'title', 'regular-input', 'Do you have a title?', titleDiv);
    const descriptionDiv = makeElement('div', '', 'form-property-div', '', propertyBox);
    const descriptionLabel = makeLabel('', 'description', 'labels', 'Description:', descriptionDiv);
    const descriptionInput = makeInput('textarea', 'description', '', 'description', 'textarea', 'Do you have a description?', descriptionDiv);
    const dueDateDiv = makeElement('div', '', 'form-property-div', '', propertyBox);
    const dueDateLabel = makeLabel('', 'dueDate', 'labels', 'Due Date:', dueDateDiv);
    const dueDateDropDownBox = makeInput('input', 'dueDate', 'date', 'dueDate', 'drop-box', '', dueDateDiv);
    const priorityDiv = makeElement('div', '', 'form-property-div', '', propertyBox);
    const priorityLabel = makeLabel('', 'priority', 'labels', 'Priority:', priorityDiv);
    const priorityBox = makeElement('select', '', 'drop-box', '', priorityDiv);
    const priorityNotOption = makeNotAnOption(priorityBox);
    const priorityOptions = ['Minor', 'Important', 'Urgent'];
    priorityOptions.forEach(priorityType => {
        const option = makeDropDownOptions(priorityType, priorityBox);
    });
    
    const formButtonBox = makeElement('div', '', 'form-button-box', '', formFieldset);
    const cancelButton = makeButton('', 'button', 'cancel-button', 'Cancel', formButtonBox);
    const submitButton = makeButton('', 'button', 'submit-button', 'Submit', formButtonBox);

    return {
        module: module,
        titleInput: titleInput,
        descriptionInput: descriptionInput,
        dueDateDropDownBox: dueDateDropDownBox,
        priorityBox: priorityBox,
        priorityNotOption: priorityNotOption,
        priorityOptions: priorityOptions,
        cancelButton: cancelButton,
        submitButton: submitButton
    }
};

export function getTaskDetails(form) {
    const taskTitle = form.titleInput.value;
    const taskDescription = form.descriptionInput.value;
    const taskDueDate = form.dueDateDropDownBox.value;
    const taskPriority = form.priorityBox.value;

    return {
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskDueDate: taskDueDate,
        taskPriority: taskPriority
    }
};

export function createFrontendTask(container, properties, convertCalendarDate) {
    const taskBox = makeElement('div', '', 'task', '', container);
    const emptyCircle = makeElement('div', '', 'empty-circle', '', taskBox);
    const title = makeElement('p', '', 'task-text', properties.taskTitle, taskBox);
    if (properties.taskDescription) {
        const description = makeElement('p', '', 'task-text', properties.taskDescription, taskBox);
    }
    if (properties.taskDueDate) {
        const dueDate = makeElement('p', '', 'task-text', convertCalendarDate(properties.taskDueDate), taskBox);
    }
    const priority = makeElement('p', '', 'task-text', properties.taskPriority, taskBox);
};

export function applyExistingTasks(container, backendTask, convertDate) {
    const taskBox = makeElement('div', '', 'task', '', container);
    const emptyCircle = makeElement('div', '', 'empty-circle', '', taskBox);
    const title = makeElement('p', '', 'task-text', backendTask.title, taskBox);
    if (backendTask.description) {
        const description = makeElement('p', '', 'task-text', backendTask.description, taskBox);
    }
    if (backendTask.dueDate) {
        const dueDate = makeElement('p', '', 'task-text', convertDate(backendTask.dueDate), taskBox);
    }
    const priority = makeElement('p', '', 'task-text', backendTask.priority, taskBox);
};