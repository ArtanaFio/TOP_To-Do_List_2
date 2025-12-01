import './assets/styles/main.css';
import './assets/styles/projects.css';

import makeProject from './modules/projects';
import makeTodoItem from './modules/to-do_items';
import { editBackendProject, deleteBackEndTask } from './modules/projects';
import { editBackendTask } from './modules/to-do_items';
import { titleCase, lowerCase, trim, getTodayDate, convertDate, dateForInput, convertCalendarDate } from './modules/utility';
import { createPageLayout } from './modules/main_ui';
import { createPanelList, addtoPanelList, applyProjectSelectionStyling, displayProjectList, closeProject, openEditProjectForm, addErrorStyling, removeErrorStyling, createProject, createProjectEditForm, getProjectDetails, editFrontendProject, closeEditForm, createNewProjectForm, openForm, closeForm, getNewProject, clearInputs, createConfirmDeletionForm, deletePanelListProject, getProjectName, fillProjectName } from './modules/projects_DOM';

const backendService = (function () {

    function createBackendProject(title, description, dueDate, priority, label) {
        const properTitle = titleCase(trim(title));
        const properDescription = lowerCase(trim(description));
        return new makeProject(
            properTitle, 
            properDescription, 
            dueDate, 
            priority, 
            label
        );
    }

    // The default project should not be deleteable
    const defaultProject = createBackendProject(
        'default list', 
        'list to begin tracking general todo items. ', 
        '2026-02-10', 
        'Important', 
        null
    );
    //const testProject1 = createBackendProject('fake project 1', 'something', '2025-12-01', 'Minor', 'Daily');
    //const testProject2 = createBackendProject('fake project 2', 'something', '2025-12-02', 'Urgent', 'Weekly');
    //const testProject3 = createBackendProject('fake project 3', 'something', '2025-12-03', 'Minor', 'Monthly');

    function deleteBackendProject(project) {
        if (project === defaultProject) {
            console.log("You cannot delete the default Project");
            return;
        }

        project.deleteProject();
    };

    function createBackendTask(title, description, dueDate, priority, project) {
        const properTitle = titleCase(trim(title));
        const properDescription = lowerCase(trim(description));

        const task = new makeTodoItem(
            properTitle, 
            properDescription, 
            dueDate, 
            priority
        );

        project.addTask(task);
        return task;
    }

    if (process.env.NODE_ENV === "development") {
        window.titleCase = titleCase;
        window.lowerCase = lowerCase;
        window.trim = trim;
        window.getTodayDate = getTodayDate;
        window.makeProject = makeProject;
        window.makeTodoItem = makeTodoItem;
        window.createBackendProject = createBackendProject;
        window.editBackendProject = editBackendProject;
        window.deleteBackendProject = deleteBackendProject;
        window.createBackendTask = createBackendTask;
        window.editBackendTask = editBackendTask;
        window.deleteBackEndTask = deleteBackEndTask;
        window.defaultProject = defaultProject;
    }

    return {
        createBackendProject,
        editBackendProject,
        deleteBackendProject,
        createBackendTask,
        editBackendTask,
        deleteBackEndTask,
        defaultProject
    };

})();

function userInterface() {
    const pageSpace = document.getElementById('page-space');
    const pageLayout = createPageLayout(pageSpace);
    const defaultProject = backendService.defaultProject;
    const projectEditForm = createProjectEditForm(document.body);
    const newProjectForm = createNewProjectForm(document.body);
    const projectInterface = createProject(pageLayout.rightPanel, projectEditForm);
    const panelList = createPanelList(pageLayout.leftPanelContainer);
    const listedDefaultProject = addtoPanelList(defaultProject, panelList);
    applyProjectSelectionStyling(panelList, projectInterface.closeButton, newProjectForm.submitButton);
    
    panelList.addEventListener('click', (e) => {
        makeProject.MASTER_STORAGE.forEach((backendProject, index) => {
            if (backendProject.title === e.target.textContent) {
                if (index === 0) {
                    projectInterface.deleteButton.classList.add('gone');
                } else {
                    projectInterface.deleteButton.classList.remove('gone');
                }
                displayProjectList(projectInterface, backendProject, convertDate);
                projectEditForm.submitButton.addEventListener('click', () => {
                    if (projectEditForm.titleInput.value === '') {
                        addErrorStyling(projectEditForm);
                    } else {
                        editFrontendProject(projectInterface, projectEditForm, convertCalendarDate);
                        backendService.editBackendProject(backendProject, getProjectDetails(projectEditForm));
                        closeEditForm(projectEditForm.editModule);
                    }
                });
            }
        });
    });

    projectEditForm.editModule.addEventListener('click', () => {
        if (projectEditForm.titleInput.value !== '') {
            removeErrorStyling(projectEditForm);
        }
    });
    
    openEditProjectForm(projectInterface.editButton, projectEditForm, projectInterface.projectTitle, makeProject.MASTER_STORAGE, dateForInput);
    // defaultProject.title, defaultProject.description, convertDate(defaultProject.dueDate), defaultProject.priority

    pageLayout.addProjectButton.addEventListener('click', () => {
        openForm(newProjectForm);
    });

    newProjectForm.cancelButton.addEventListener('click', () => {
        clearInputs(newProjectForm);
        closeForm(newProjectForm);
    });

    newProjectForm.submitButton.addEventListener('click', () => {
        const newProjectDetails = getNewProject(newProjectForm);
        if (newProjectForm.titleInput.value === '') {
            addErrorStyling(newProjectForm);
        } else {
            //console.log('before creating a new project:')
            //console.log(makeProject.MASTER_STORAGE);
            const newProject = backendService.createBackendProject(newProjectDetails.title, newProjectDetails.description, newProjectDetails.dueDate, newProjectDetails.priority, newProjectDetails.label);
            //console.log('after creating a new project');
            //console.log(makeProject.MASTER_STORAGE);
            addtoPanelList(newProject, panelList);
            closeForm(newProjectForm);
            clearInputs(newProjectForm);
            closeProject(projectInterface.project);

        }
        
    });

    newProjectForm.module.addEventListener('click', () => {
        if (newProjectForm.titleInput.value !== '') {
            removeErrorStyling(newProjectForm);
        }
    });

    const deleteProjectForm = createConfirmDeletionForm(document.body);
    projectInterface.deleteButton.addEventListener('click', () => {
        const projectName = getProjectName(panelList);
        console.log(`replace the word with '${projectName}'`);
        fillProjectName(deleteProjectForm.projectSpace, projectName);
        openForm(deleteProjectForm);
        
    });
    
    deleteProjectForm.noButton.addEventListener('click', () => {
        closeForm(deleteProjectForm);
    });

    deleteProjectForm.yesButton.addEventListener('click', () => {
        for (let i = 0; i <  panelList.children.length; i++) {
            if (panelList.children[i].classList.contains('selected')) {
                const deletedProject = makeProject.MASTER_STORAGE.find(backendProject => backendProject.title === panelList.children[i].textContent);
                backendService.deleteBackendProject(deletedProject);
                deletePanelListProject(panelList.children[i]);
                
            }
        }
        console.log('after deleteBackendProject:');
        console.log(makeProject.MASTER_STORAGE);
        closeForm(deleteProjectForm);
        closeProject(projectInterface.project);
    });
};
userInterface();

console.log('------------------------');
//console.log("REMINDER: might have to reconsider how we set up the backendManager() and defaultProject to work with everything that is the user interface");
//console.log("REMINDER: 10/6 finish initial css styling for project. Will clean up/improve styling later after connecting backend functions to frontend elements.");
//console.log('REMINDER: 10/7 need to rethink my create/display project functions to think of how the close function should work because I want to create a generic project and populate it with the specific selected project information');
//console.log("REMINDER: 10/9 come back to function displayEditForm's input values. Look at function createProject's edit button's event listener. Trying to populate the form's inputs with the right information");
//console.log("REMINDER: fix dateForInput because it's not updating the due date on the edit form");
//console.log('REMINDER: 11/17 work on editFrontEndProject() to get all the values to edit the project');
//console.log('REMINDER: 11/18 now work on editing the backend default project');
//console.log('REMINDER: move some things out of panelList() because that function should not handle so many different things');
//console.log('REMINDER: 11/20 go back to selectProject and figure out how to get the function to correctly select the corresponding backend project instead of just feeding in defaultProject');
//console.log('REMINDER: 11/21 now finish working on submitProjectEdits to edit the backend');
//console.log('REMINDER: 11/21 fix createProjectEditForm labelbox options because we do not want a not-option and we also want to display the correct label in the fill function');
//console.log('REMINDER: 11/24 inside submitProjectEdits, figure out how to set up editBackendProject');
// had created applyProjectSelectionStyling() to only handle styling that was originally in selectProject(), and deconstructed submitProjectEdits to move the event listener on the submit button directly to the entry point.
//console.log('REMINDER: 11/25 Something is wrong with backEndProjectManager().createBackendProject. Whenever I submit a new project, it creates a new default project before the one I specified');
//console.log('REMINDER: 11/25 the panel list also will not let me select the new project');
//11/25 replaced the querySelectorAll('project-name') variable with event delegation to handle dynamic element changes since querSelectorAll is static and only captures elements at that specific point in the code.
//console.log('REMINDER: 11/25 fix the date format. Uncaught runtime error happens when I click the edit button on the new project. Uncaught error: Cannot read properties of null(reading "getFullYear")at utility.js:33 ---> dateForInput (utility.js:33:1), at fillProjectEditForm (projects.DOM.js:218:1), at eval (projects_DOM.js:49:1), at Array.forEach(anonymous), at HTMLButtonElement.eval (projects_DOM.js:46:1)');
//console.log('REMINDER: 111/26 edits made to the default project are being treated like new projects and are being added to MASTER_STORAGE as the 0 index instead of adding to the end of the array.');
//console.log('REMINDER: 11/26 decide to turn backendProjectManager into either a singleton or IIFE');
//console.log('11/28 turned the function backendProjectManager() into the singleton backendService to ensure only one instance of the backend state exists and is called');
//console.log('11/28 changed "closeNewProjectForm" into "closeForm" so that I can use it with the deleteProjectForm');
//console.log('REMINDER: 11/28 need to find the function that closes the project and add it to the yesButton. Need to write function to delete front end and connect it to the backend');
//console.log('11/28 began writing up the frontend delete project function. Need to remove unnecessary console messages and then connect the backend delete project function');
//console.log('REMINDER: 11/28 fix the uncaught typeerror: cannot read properties of undefined (reading textContent) for trying to delete the backend using the panelList.children[i].textContent');
//console.log('11/30 used array.find to get the backend project to match the frontend project for deletion');
console.log('REMINDER: 11/30 need to unapply select stying to previously selected project whenever user selects a new project without closing the project first and update the project Interface details');
