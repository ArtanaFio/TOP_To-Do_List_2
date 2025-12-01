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
