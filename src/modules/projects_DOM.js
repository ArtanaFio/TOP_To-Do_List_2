import { makeElement } from './DOM_basic_functions';

export function panelList(panel, project, projectInterface, projectDetails, convertDate) {
    const leftPanelContainer = panel;
    const panelList = makeElement('ul', '', 'panel-list', '', leftPanelContainer);
    const defaultProjectName = makeElement('li', '', '', projectDetails.title, panelList);
    defaultProjectName.addEventListener('mouseenter', () => {
        if (!defaultProjectName.classList.contains('selected')) {
            defaultProjectName.classList.add('pre-select');
        }
    });
    defaultProjectName.addEventListener('mouseleave', () => {
        if (!defaultProjectName.classList.contains('selected')) {
            defaultProjectName.classList.remove('pre-select');
        }
    });
    defaultProjectName.addEventListener('click', () => {
         defaultProjectName.classList.add('selected');
         defaultProjectName.classList.remove('pre-select');
         displayProjectList(project, projectInterface, projectDetails, convertDate);
    });

    projectInterface.closeButton.addEventListener('click', () => {
        defaultProjectName.classList.remove('selected');
    });

    console.log(project);
    console.log(projectInterface);
};

function displayProjectList(project, projectInterface, projectDetails, convertDate) {
    project.classList.add('flexy');
    project.classList.remove('gone');
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
};

export function createProject(container) {
    const project = makeElement('div', '', 'project gone', '', container);
    const projectDetailBox = makeElement('div', '', 'detail-box', '', project);
    const projectButtonBox = makeElement('div', '', 'project-button-div', '', projectDetailBox);
    const editButton = makeElement('button', '', 'edit-button', 'edit', projectButtonBox);
    const closeButton = makeElement('button', '', 'close-button', 'close', projectButtonBox);
    
    closeButton.addEventListener('click', () => {
        closeProject(closeButton, project);
    });

    const projectTitle = makeElement('h1', '', 'project-title', '"TITLE"', projectDetailBox);
    const mainPropertyBox = makeElement('div', '', 'all-property-div', '', projectDetailBox);
    const descriptionBox = makeElement('div', '', 'property-box', '', mainPropertyBox);
    const descriptionHeader = makeElement('h3', '', 'property-header', 'Description:', descriptionBox);
    const projectDescription = makeElement('p', '', 'project-description', '"DESCRIPTION"', descriptionBox);
    const dateBox = makeElement('div', '', 'property-box', '', mainPropertyBox);
    const dateHeader = makeElement('h3', '', 'property-header', 'Due Date:', dateBox);
    const projectDueDate = makeElement('p', '', 'project-due-date', '', dateBox);
    const priorityBox = makeElement('div', '', 'property-box', '', mainPropertyBox);
    const priorityHeader = makeElement('h3', '', 'property-header', 'Priority:', priorityBox);
    const projectPriority = makeElement('p', '', 'project-priority', '', priorityBox);
    const taskBox = makeElement('div', '', 'task-box', '', project);
    const taskArea = makeElement('div', '', 'task-area', '', taskBox);
    const taskButtonBox = makeElement('div', '', 'task-button-box', '', taskBox);
    const addTaskButton = makeElement('button', '', 'add-button', 'Add Task', taskButtonBox);

    //console.log(`project description height: ${projectDescription.offsetHeight}px`);
    //console.log(`h1 font size: ${window.getComputedStyle(projectTitle).fontSize}`);
    //console.log(`h3 font size: ${window.getComputedStyle(descriptionHeader).fontSize}`);
    //console.log(`p font size: ${window.getComputedStyle(projectDescription).fontSize}`);

    return {
        project: project,
        editButton: editButton,
        closeButton: closeButton,
        projectTitle: projectTitle,
        projectDescription: projectDescription,
        dateBox: dateBox,
        dateHeader: dateHeader,
        projectDueDate: projectDueDate,
        projectPriority: projectPriority,
        taskArea: taskArea,
        addTaskButton: addTaskButton
    }
};

function closeProject(closeButton, project) {
    closeButton.addEventListener('click', () => {
        project.classList.add('gone');
        project.classList.remove('flexy');
    });
};