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
    const taskBox = makeElement('div', '', 'task', '', container);
    const emptyCircle = makeElement('div', '', 'empty-circle', '', taskBox);
    const title = makeElement('p', '', 'task-text title-id existing-property', backendTask.title, taskBox);
    const description = makeElement('p', '', 'task-text description-id', '', taskBox);
    if (backendTask.description) {
        description.textContent = backendTask.description
        description.classList.add('existing-property');
    }
    const dueDate = makeElement('p', '', 'task-text date-id', '', taskBox);
    if (backendTask.dueDate) {
        dueDate.textContent = convertDate(backendTask.dueDate);
        dueDate.classList.add('existing-property');
    }
    const priority = makeElement('p', '', 'task-text priority-id existing-property', backendTask.priority, taskBox);
    const editButton = makeButton('', 'button', 'task-edit-button existing-property', 'Edit', taskBox);
    const deleteButton = makeButton('', 'button', 'task-delete-button', 'Delete', taskBox);
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

export function editFrontendTask(frontendTask, editForm, convertCalendarDate) {
    frontendTask[1].textContent = editForm.titleInput.value;
    if (editForm.descriptionInput.value !== '') {
        frontendTask[2].textContent = editForm.descriptionInput.value;
        frontendTask[2].classList.add('existing-property');
    } else if (editForm.descriptionInput.value === '') {
        frontendTask[2].textContent = '';
        frontendTask[2].classList.remove('existing-property');
    }
    
    if (convertCalendarDate(editForm.dueDateDropDownBox.value) !== '') {
        frontendTask[3].textContent = convertCalendarDate(editForm.dueDateDropDownBox.value);
        frontendTask[3].classList.add('existing-property');
    } else {
        frontendTask[3].textContent = "";
        frontendTask[3].classList.remove('existing-property');
    }
    frontendTask[4].textContent = editForm.priorityBox.value;
};