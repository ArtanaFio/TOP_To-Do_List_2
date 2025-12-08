import './assets/styles/main.css';
import './assets/styles/projects.css';
import './assets/styles/to-do_items.css';

import makeProject from './modules/projects';
import makeTodoItem from './modules/to-do_items';
import { editBackendProject, deleteBackEndTask } from './modules/projects';
import { editBackendTask } from './modules/to-do_items';
import { titleCase, lowerCase, trim, getTodayDate, convertDate, dateForInput, convertCalendarDate } from './modules/utility';
import { clearInputs, openForm, closeForm, addErrorStyling, removeErrorStyling, fillItemName } from './modules/DOM_basic_functions';
import { createPageLayout } from './modules/main_ui';
import { createPanelList, addtoPanelList, applyProjectSelectionStyling, displayProjectList, closeProject, createProject, createProjectEditForm, getProjectDetails, editFrontendProject, createNewProjectForm, getNewProject, createConfirmDeletionForm, deletePanelListProject, getProjectName, fillProjectEditForm } from './modules/projects_DOM';
import { createTaskForm, getTaskDetails, applyExistingTasks, fillTaskEditDetails, createTaskEditForm, createTaskDeleteForm, editFrontendTask } from './modules/to-do_items_DOM';

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
        '2026-02-01', 
        'Important', 
        null
    );

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
    createBackendTask('Task 1', 'first task', '2025-01-01', 'Minor', defaultProject);
    createBackendTask('Task 2', 'second task', '2025-02-02', 'Important', defaultProject);
    createBackendTask('Task 3', 'third task', '2025-03-13', 'Urgent', defaultProject);
    createBackendTask('Testing task', 'I just want to see how this behaves', '2026-10-28', 'Minor', defaultProject);

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
    const panelList = createPanelList(pageLayout.leftPanelContainer);
    const defaultProject = backendService.defaultProject;
    const listedDefaultProject = addtoPanelList(defaultProject, panelList);
    const projectEditForm = createProjectEditForm(document.body);
    const projectInterface = createProject(pageLayout.rightPanel, projectEditForm);
    const newProjectForm = createNewProjectForm(document.body);
    applyProjectSelectionStyling(panelList, projectInterface.closeButton, newProjectForm.submitButton);

    panelList.addEventListener('click', (e) => {
        while (projectInterface.taskArea.firstChild) {
            projectInterface.taskArea.removeChild(projectInterface.taskArea.firstChild);
        }
        makeProject.MASTER_STORAGE.forEach((backendProject, index) => {
            if (backendProject.title === e.target.textContent) {
                if (index === 0) {
                    projectInterface.deleteButton.classList.add('gone');
                } else {
                    projectInterface.deleteButton.classList.remove('gone');
                }
                displayProjectList(projectInterface, backendProject, convertDate);
                backendProject.tasks.forEach((task, index) => {
                    applyExistingTasks(projectInterface.taskArea, task, convertDate);
                });
                projectEditForm.submitButton.onclick = () => {
                    if (projectEditForm.titleInput.value === '') {
                        addErrorStyling(projectEditForm);
                    } else {
                        editFrontendProject(projectInterface, projectEditForm, convertCalendarDate);
                        backendService.editBackendProject(backendProject, getProjectDetails(projectEditForm));
                        for (let i = 0; i <panelList.children.length; i++) {
                            if (panelList.children[i].classList.contains('selected')) {
                                panelList.children[i].textContent = backendProject.title;
                            }
                        }
                        closeForm(projectEditForm);
                    }
                };
            }
        });
    });

    projectInterface.editButton.addEventListener('click', () => {
        makeProject.MASTER_STORAGE.forEach((backendProject, index) => {
            if (projectInterface.projectTitle.textContent === backendProject.title) {
                openForm(projectEditForm);
                fillProjectEditForm(projectEditForm, backendProject, dateForInput);
            }
        });
    });

    projectEditForm.cancelButton.addEventListener('click', () => {
        closeForm(projectEditForm);
    });

    projectEditForm.module.addEventListener('click', () => {
        if (projectEditForm.titleInput.value !== '') {
            removeErrorStyling(projectEditForm);
        }
    });

    projectInterface.closeButton.addEventListener('click', () => {
        while (projectInterface.taskArea.firstChild) {
            projectInterface.taskArea.removeChild(projectInterface.taskArea.firstChild);
        }
    });

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
            const newProject = backendService.createBackendProject(newProjectDetails.title, newProjectDetails.description, newProjectDetails.dueDate, newProjectDetails.priority, newProjectDetails.label);
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
        fillItemName(deleteProjectForm.projectSpace, projectName);
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
        closeForm(deleteProjectForm);
        closeProject(projectInterface.project);
    });

    const taskArea = projectInterface.taskArea;
    const addTaskButton = projectInterface.addTaskButton;
    const newTaskForm = createTaskForm(document.body);

    addTaskButton.addEventListener('click', () => {
        openForm(newTaskForm);
    });

    newTaskForm.cancelButton.addEventListener('click', () => {
        closeForm(newTaskForm);
        clearInputs(newTaskForm);
    });

    newTaskForm.submitButton.addEventListener('click', () => {
        const taskDetails = getTaskDetails(newTaskForm);
        makeProject.MASTER_STORAGE.forEach((backendProject, index) => {
            if (newTaskForm.titleInput.value === '') {
                addErrorStyling(newTaskForm);
            } else if (newTaskForm.titleInput.value !== '' && projectInterface.projectTitle.textContent === backendProject.title) {
                while (projectInterface.taskArea.firstChild) {
                    projectInterface.taskArea.removeChild(projectInterface.taskArea.firstChild);
                }
                backendService.createBackendTask(taskDetails.taskTitle, taskDetails.taskDescription, taskDetails.taskDueDate, taskDetails.taskPriority, backendProject);
                backendProject.tasks.forEach((task, index) => {
                    applyExistingTasks(projectInterface.taskArea, task, convertDate);
                });
                closeForm(newTaskForm);
                clearInputs(newTaskForm);
            }
        });
    });

    newTaskForm.module.addEventListener('click', () => {
        if (newTaskForm.titleInput.value !== '') {
            removeErrorStyling(newTaskForm);
        }
    });

    const taskEditForm = createTaskEditForm(document.body);
    const taskDeleteForm = createTaskDeleteForm(document.body);

    projectInterface.taskArea.addEventListener('click', (e) => {
        makeProject.MASTER_STORAGE.forEach((backendProject, ProjectIndex) => {
            if (projectInterface.projectTitle.textContent === backendProject.title) {
                backendProject.tasks.forEach((backendTask, taskIndex) => {
                    if (backendTask.title === e.target.parentNode.children[1].textContent && e.target.classList.contains('task-edit-button')) {
                        fillTaskEditDetails(taskEditForm, backendTask, dateForInput);
                        openForm(taskEditForm);
                        taskEditForm.submitButton.onclick = () => {
                            if (taskEditForm.titleInput.value === '') {
                                addErrorStyling(taskEditForm);
                            } else {
                                removeErrorStyling(taskEditForm);
                                editFrontendTask(e.target.parentNode.children, taskEditForm, convertCalendarDate);
                                closeForm(taskEditForm);
                                editBackendTask(backendTask, taskEditForm.titleInput.value, taskEditForm.descriptionInput.value, taskEditForm.dueDateDropDownBox.value, taskEditForm.priorityBox.value);
                            }
                        };
                    } else if (backendTask.title === e.target.parentNode.children[1].textContent && e.target.classList.contains('task-delete-button')) {
                        openForm(taskDeleteForm);
                        fillItemName(taskDeleteForm.taskSpace, backendTask.title);
                    }
                });
            }
        });
    });

    taskEditForm.cancelButton.addEventListener('click', () => {
        closeForm(taskEditForm);
        clearInputs(taskEditForm);
    });

    taskEditForm.module.addEventListener('click', () => {
        if (taskEditForm.titleInput.value !== '') {
            removeErrorStyling(taskEditForm);
        }
    });

    taskDeleteForm.noButton.addEventListener('click', () => {
        closeForm(taskDeleteForm);
    });

    taskDeleteForm.yesButton.addEventListener('click', () => {
        makeProject.MASTER_STORAGE.forEach(backendProject => {
            if (backendProject.title === projectInterface.projectTitle.textContent) {
                const deletedTask = backendProject.tasks.find((backendTask)=> backendTask.title === taskDeleteForm.taskSpace.textContent);
                const deletedIndex = backendProject.tasks.findIndex((backendTask)=> backendTask.title === taskDeleteForm.taskSpace.textContent);
                backendService.deleteBackEndTask(backendProject, deletedIndex, deletedTask);
                while (projectInterface.taskArea.firstChild) {
                    projectInterface.taskArea.removeChild(projectInterface.taskArea.firstChild);
                }
                backendProject.tasks.forEach((task, index) => {
                    applyExistingTasks(projectInterface.taskArea, task, convertDate);
                });
                closeForm(taskDeleteForm);
            }
        });
    });

};
userInterface();


console.log('------------------------');
console.log('REMINDER: 12/4 Get rid of the test projects and tasks from backendService later');
console.log('REMINDER: 12/8 add persistence');