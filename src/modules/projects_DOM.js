import { makeElement, makeLabel, makeButton, makeInput, makeDropDownOptions, makeNotAnOption } from './DOM_basic_functions';

//supposed to handle everything in the left panel's project list
export function createPanelList(panel) { //, project, projectInterface, editFormInterface, projectDetails, convertDate, dateForInput, convertCalendarDate, editBackendProject
    const leftPanelContainer = panel;
    const panelList = makeElement('ul', 'project-list', 'panel-list', '', leftPanelContainer);
    
    return panelList;
};

export function addtoPanelList(projectDetails, panelList) {
    const projectName = makeElement('li', '', 'project-name', projectDetails.title, panelList);
};

export function applyProjectSelectionStyling(parentContainer, closeProjectButton, addProjectSubmitButton) {
    parentContainer.addEventListener('mouseenter', (e) => {
        if (e.target.classList.contains('project-name')) {
            if (!e.target.classList.contains('selected')) {
                e.target.classList.add('pre-select');
            }
        }
    }, true);

    parentContainer.addEventListener('mouseleave', (e) => {
        if (e.target.classList.contains('project-name')) {
            if (!e.target.classList.contains('selected')) {
                e.target.classList.remove('pre-select');
            }
        }
    }, true);

    parentContainer.addEventListener('click', (e) => {
        for (let i = 0; i < parentContainer.children.length; i++) {
            if (parentContainer.children[i].classList.contains('selected')) {
                parentContainer.children[i].classList.remove('selected');
            }
        }

        if (e.target.classList.contains('project-name')) {
            e.target.classList.add('selected');
            e.target.classList.remove('pre-select');
        }

        closeProjectButton.addEventListener('click', () => {
            e.target.classList.remove('selected');
        });

        addProjectSubmitButton.addEventListener('click', () => {
            e.target.classList.remove('selected');
        });
    });
};

//makes the basic project interface
export function createProject(container, editFormInterface) {
    const project = makeElement('div', '', 'project gone', '', container);
    const projectDetailBox = makeElement('div', '', 'detail-box', '', project);
    const projectButtonBox = makeElement('div', '', 'project-button-div', '', projectDetailBox);
    const doubleButtonBox = makeElement('div', '', 'double-button-div', '', projectButtonBox);
    const titleAndLabelBox = makeElement('div', '', 'title-label-div', '', projectDetailBox);
    const projectTitle = makeElement('h1', '', 'project-title', '', titleAndLabelBox);
    const projectLabel = makeElement('h4', '', 'project-label', 'LABEL', titleAndLabelBox);
    const mainPropertyBox = makeElement('div', '', 'all-property-div', '', projectDetailBox);
    const descriptionBox = makeElement('div', '', 'property-box', '', mainPropertyBox);
    const descriptionHeader = makeElement('h3', '', 'property-header', 'Description:', descriptionBox);
    const projectDescription = makeElement('p', '', 'project-description', '', descriptionBox);
    const dateBox = makeElement('div', '', 'property-box', '', mainPropertyBox);
    const dateHeader = makeElement('h3', '', 'property-header', 'Due Date:', dateBox);
    const projectDueDate = makeElement('p', '', 'project-due-date', '', dateBox);
    const priorityBox = makeElement('div', '', 'property-box', '', mainPropertyBox);
    const priorityHeader = makeElement('h3', '', 'property-header', 'Priority:', priorityBox);
    const projectPriority = makeElement('p', '', 'project-priority', '', priorityBox);
    const taskBox = makeElement('div', '', 'task-box', '', project);
    const taskArea = makeElement('div', '', 'task-area', '', taskBox);
    const taskButtonBox = makeElement('div', '', 'task-button-box', '', taskBox);
    const addTaskButton = makeButton('', 'button', 'add-button', 'Add Task', taskButtonBox);
    const deleteButton = makeButton('', 'button', 'delete-button', 'Delete', doubleButtonBox);
    const editButton = makeButton('', 'button', 'edit-button', 'Edit', doubleButtonBox);
    const closeButton = makeButton('', 'button', 'close-button', 'Close', projectButtonBox);
    
    closeButton.addEventListener('click', () => {
        closeProject(project);
    });

    //console.log(`project description height: ${projectDescription.offsetHeight}px`);
    //console.log(`h1 font size: ${window.getComputedStyle(projectTitle).fontSize}`);
    //console.log(`h3 font size: ${window.getComputedStyle(descriptionHeader).fontSize}`);
    //console.log(`p font size: ${window.getComputedStyle(projectDescription).fontSize}`);

    return {
        project: project,
        deleteButton: deleteButton,
        editButton: editButton,
        closeButton: closeButton,
        projectTitle: projectTitle,
        projectDescription: projectDescription,
        dateBox: dateBox,
        dateHeader: dateHeader,
        projectDueDate: projectDueDate,
        projectPriority: projectPriority,
        projectLabel: projectLabel,
        taskArea: taskArea,
        addTaskButton: addTaskButton
    }
};

//displays the project in the viewport
export function displayProjectList(projectInterface, projectDetails, convertDate) {
    projectInterface.project.classList.add('flexy');
    projectInterface.project.classList.remove('gone');
    projectInterface.projectTitle.textContent = projectDetails.title;

    if (projectDetails.description) {
        projectInterface.projectDescription.textContent = projectDetails.description;
        if (projectDetails.description.length > 100) {
            projectInterface.projectDescription.classList.add('too-much-text');
        } else {
            projectInterface.projectDescription.classList.remove('too-much-text');
        }
    } else {
        projectInterface.projectDescription.textContent = 'This project wants to be mysterious';
    }
    
    if (projectDetails.dueDate) {
        projectInterface.projectDueDate.textContent = convertDate(projectDetails.dueDate);
    } else {
        projectInterface.projectDueDate.textContent = 'no due date';
    }

    projectInterface.projectPriority.textContent = projectDetails.priority;

    if (projectDetails.label !== null) {
        projectInterface.projectLabel.textContent = projectDetails.label;
    } else {
        projectInterface.projectLabel.textContent = 'unlabeled';

    }
};

export function closeProject(project) {
    project.classList.add('gone');
    project.classList.remove('flexy');
};

export function createProjectEditForm(container) {
    const module = makeElement('div', '', 'transparent-box gone', '', container);
    const formContainer = makeElement('div', '', 'form-container', '', module);
    const form = makeElement('form', '', '', '', formContainer);
    const formFieldset = makeElement('fieldset', '', '', '', form);
    const formLegend = makeElement('legend', '', '', 'Project Edit Form', formFieldset); 
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
    const labelDiv = makeElement('div', '', 'form-property-div', '', propertyBox);
    const labelLabel = makeLabel('', 'label', 'labels', 'Label:', labelDiv);
    const labelBox = makeElement('select', '', 'drop-box', '', labelDiv);
    const labelNotOption = makeNotAnOption(labelBox);
    const labelOptions = ['None', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
    labelOptions.forEach(labelType => {
        const option = makeDropDownOptions(labelType, labelBox);
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
        labelBox: labelBox,
        labelNotOption: labelNotOption,
        labelOptions: labelOptions,
        cancelButton: cancelButton,
        submitButton: submitButton
    }
};

export function fillProjectEditForm(editFormInterface, projectDetails, dateForInput) {
    editFormInterface.titleInput.value = projectDetails.title;
    editFormInterface.descriptionInput.value = projectDetails.description;
    if (projectDetails.dueDate !== null) {
        editFormInterface.dueDateDropDownBox.value = dateForInput(projectDetails.dueDate);
    } else {
        editFormInterface.dueDateDropDownBox.value = null;
    }
    
    editFormInterface.priorityBox.value = projectDetails.priority;
    if (projectDetails.label !== null) {
        editFormInterface.labelBox.value = projectDetails.label;
    } else {
        editFormInterface.labelBox.value = 'None';
    }
    
};

export function editFrontendProject(projectInterface, editForm, convertCalendarDate) {
    projectInterface.projectTitle.textContent = editForm.titleInput.value;
    projectInterface.projectDescription.textContent = editForm.descriptionInput.value;
    if (convertCalendarDate(editForm.dueDateDropDownBox.value) !== ''){
        projectInterface.projectDueDate.textContent = convertCalendarDate(editForm.dueDateDropDownBox.value);
    } else {
        projectInterface.projectDueDate.textContent = 'None';
    }
    projectInterface.projectPriority.textContent = editForm.priorityBox.value;
    if (editForm.labelBox.value !== 'None') {
        projectInterface.projectLabel.textContent = editForm.labelBox.value;
    } else {
        projectInterface.projectLabel.textContent = 'unlabeled';
    }
    
};

export function getProjectDetails(formInterface) {
    const newProjectTitle = formInterface.titleInput.value;
    const newProjectDescription = formInterface.descriptionInput.value;
    const newProjectDueDate = formInterface.dueDateDropDownBox.value;
    const newProjectPriority = formInterface.priorityBox.value;
    let newProjectLabel;
    if (formInterface.labelBox.value === 'None') {
        newProjectLabel = null;
    } else {
        newProjectLabel = formInterface.labelBox.value;
    }
    const newProjectDetails = [newProjectTitle, newProjectDescription, newProjectDueDate, newProjectPriority, newProjectLabel];
    return newProjectDetails;
};

export function addErrorStyling(formInterface) {
    formInterface.titleInput.classList.add('error-input');
};

export function removeErrorStyling(formInterface) {
    formInterface.titleInput.classList.remove('error-input');
};

export function createNewProjectForm(container) {
    const module = makeElement('div', '', 'transparent-box gone', '', container);
    const formContainer = makeElement('div', '', 'form-container', '', module);
    const form = makeElement('form', '', '', '', formContainer);
    const formFieldset = makeElement('fieldset', '', '', '', form);
    const formLegend = makeElement('legend', '', '', 'New Project Form', formFieldset); 
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

    const labelDiv = makeElement('div', '', 'form-property-div', '', propertyBox);
    const labelLabel = makeLabel('', 'label', 'labels', 'Label:', labelDiv);
    const labelBox = makeElement('select', '', 'drop-box', '', labelDiv);
    const labelNotOption = makeNotAnOption(labelBox);
    const labelOptions = ['None', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
    labelOptions.forEach(labelType => {
        const option = makeDropDownOptions(labelType, labelBox);
    });
    
    const formButtonBox = makeElement('div', '', 'form-button-box', '', formFieldset);
    const cancelButton = makeButton('', 'button', 'cancel-button', 'Cancel', formButtonBox);
    
    cancelButton.addEventListener('click', () => {
        closeEditForm(module);
    });
    
    const submitButton = makeButton('', 'button', 'submit-button', 'Submit', formButtonBox);

    return {
        module: module,
        titleInput: titleInput,
        descriptionInput: descriptionInput,
        dueDateDropDownBox: dueDateDropDownBox,
        priorityBox: priorityBox,
        priorityNotOption: priorityNotOption,
        priorityOptions: priorityOptions,
        labelBox: labelBox,
        labelNotOption: labelNotOption,
        labelOptions: labelOptions,
        cancelButton: cancelButton,
        submitButton: submitButton
    }
};

export function getNewProject(newProjectFormInterface) {
    const newProjectDetails = {
        title: newProjectFormInterface.titleInput.value,
        description: newProjectFormInterface.descriptionInput.value,
        dueDate: newProjectFormInterface.dueDateDropDownBox.value,
        priority: newProjectFormInterface.priorityBox.value,
        label: newProjectFormInterface.labelBox.value
    }
    return newProjectDetails;
};

export function createConfirmDeletionForm(container) {
    const module = makeElement('div', '', 'transparent-box gone', '', container);
    const formContainer = makeElement('div', '', 'delete-form-container', '', module);
    const form = makeElement('form', '', '', '', formContainer);
    const formFieldset = makeElement('fieldset', '', '', '', form);
    const formLegend = makeElement('legend', '', '', '', formFieldset);
    const formLegendText = makeElement('span', '', '', 'Do you want to delete ', formLegend);
    const projectSpace = makeElement('span', '', '', '', formLegend);
    const questionMark = makeElement('span', '', '', '?', formLegend);
    const formButtonBox = makeElement('div', '', 'form-button-box', '', formFieldset);
    const noButton = makeButton('', 'button', 'cancel-button', 'No', formButtonBox);
    const yesButton = makeButton('', 'button', 'submit-button', 'Yes', formButtonBox);

    return {
        module: module,
        projectSpace: projectSpace,
        noButton: noButton,
        yesButton: yesButton
    };
};

export function deletePanelListProject(project) {
    project.remove();
};

export function getProjectName(list) {
    for (let i = 0; i < list.children.length; i++) {
        if (list.children[i].classList.contains('selected')) {
            return list.children[i].textContent;
        }
    }
};

export function fillProjectName(formSpace, projectName) {
    formSpace.textContent = projectName;
};


