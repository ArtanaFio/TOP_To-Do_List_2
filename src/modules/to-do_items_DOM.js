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

export function applyExistingTasks(container, backendTask, convertDate) {
    const fullTaskBox = makeElement('div', '', 'full-task-box', '', container);
    const taskBox = makeElement('div', '', 'task', '', fullTaskBox);
    const mainBox = makeElement('div', '', 'main-box', '', taskBox);
    const emptyCircle = makeElement('div', '', 'empty-circle', '', mainBox);
    const title = makeElement('p', '', 'task-text title-id existing-property', backendTask.title, mainBox);
    const dateLabel = makeElement('p', '', 'date-label', '', mainBox);
    const dueDate = makeElement('p', '', 'date-id', '', mainBox);
    if (backendTask.dueDate) {
        dateLabel.textContent = 'Due:';
        dueDate.textContent = convertDate(backendTask.dueDate);
        dueDate.classList.add('existing-property');
    }
    const hiddenDetailsBox = makeElement('div', '', 'hidden-box gone', '', fullTaskBox);
    const leftBox = makeElement('div', '', 'left', '', hiddenDetailsBox);
    const descriptionLabel = makeElement('p', '', 'hidden-label', 'Description:', leftBox);
    const description = makeElement('p', '', 'task-text description-id', '', leftBox);
    if (backendTask.description) {
        description.textContent = backendTask.description
    } else {
        description.textContent = 'none';
    }
    const rightBox = makeElement('div', '', 'right', '', hiddenDetailsBox);
    const priorityLabel = makeElement('p', '', 'hidden-label', 'Priority:', rightBox);
    const priority = makeElement('p', '', 'priority-id existing-property', backendTask.priority, rightBox);
    const buttonBox = makeElement('div', '', 'mini-button-box', '', taskBox);
    const editButton = makeButton('', 'button', 'task-edit-button gone', 'Edit', buttonBox);
    const deleteButton = makeButton('', 'button', 'task-delete-button gone', 'Delete', buttonBox);
};

export function createTaskEditForm(container) {
    const module = makeElement('div', '', 'transparent-box gone', '', container);
    const formContainer = makeElement('div', '', 'form-container', '', module);
    const form = makeElement('form', '', '', '', formContainer);
    const formFieldset = makeElement('fieldset', '', '', '', form);
    const formLegend = makeElement('legend', '', '', 'Task Edit Form', formFieldset); 
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
        formLegend: formLegend,
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

export function fillTaskEditDetails(form, properties, dateForInput) {
    form.titleInput.value = properties.title;
    form.descriptionInput.value = properties.description;
    if (properties.dueDate) {
        form.dueDateDropDownBox.value = dateForInput(properties.dueDate);
    }
    form.priorityBox.value = properties.priority;
};

export function editFrontendTask(frontendTask, newDescription, newPriority, editForm, convertCalendarDate) {
    frontendTask[1].textContent = editForm.titleInput.value;
    if (editForm.descriptionInput.value !== '') {
        newDescription.textContent = editForm.descriptionInput.value;
    } else if (editForm.descriptionInput.value === '') {
        newDescription.textContent = '';
    }
    
    if (convertCalendarDate(editForm.dueDateDropDownBox.value) !== '') {
        frontendTask[3].textContent = convertCalendarDate(editForm.dueDateDropDownBox.value);
    } else {
        frontendTask[3].textContent = "no due date";
    }
    newPriority.textContent = editForm.priorityBox.value;
};

export function createTaskDeleteForm(container) {
    const module = makeElement('div', '', 'transparent-box gone', '', container);
    const formContainer = makeElement('div', '', 'delete-form-container', '', module);
    const form = makeElement('form', '', '', '', formContainer);
    const formFieldset = makeElement('fieldset', '', '', '', form);
    const formLegend = makeElement('legend', '', '', '', formFieldset);
    const formLegendText = makeElement('span', '', '', 'Do you want to delete ', formLegend);
    const taskSpace = makeElement('span', '', '', '', formLegend);
    const questionMark = makeElement('span', '', '', '?', formLegend);
    const formButtonBox = makeElement('div', '', 'form-button-box', '', formFieldset);
    const noButton = makeButton('', 'button', 'cancel-button', 'No', formButtonBox);
    const yesButton = makeButton('', 'button', 'submit-button', 'Yes', formButtonBox);

    return {
        module: module,
        taskSpace: taskSpace,
        noButton: noButton,
        yesButton: yesButton
    };
};