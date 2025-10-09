import './assets/styles/main.css';
import './assets/styles/projects.css';

import makeProject from './modules/projects';
import makeTodoItem from './modules/to-do_items';
import { editBackendProject, deleteBackEndTask } from './modules/projects';
import { editBackendTask } from './modules/to-do_items';
import { titleCase, lowerCase, trim, getTodayDate, convertDate } from './modules/utility';
import { createPageLayout } from './modules/main_ui';
import { panelList, createProject } from './modules/projects_DOM';

function backEndProjectManager() {
    let project;

    function createBackendProject(title, description, dueDate, priority, label) {
        const properTitle = titleCase(trim(title));
        const properDescription = lowerCase(trim(description));
        project = new makeProject(properTitle, properDescription, dueDate, priority, label);

        return project;
    };

    // The default project should not be deleteable
    const defaultProject = createBackendProject('default list', 'list to begin tracking general todo items. ', '2025-02-10', 'Important', null);

    function deleteBackendProject(project) {
        if (project === defaultProject) {
            console.log("You cannot delete the default Project");
        } else {
            project.deleteProject();
            project = null;
        }
        
    };

    let task;

    function createBackendTask(title, description, dueDate, priority, project) {
        const properTitle = titleCase(trim(title));
        const properDescription = lowerCase(trim(description));
        task = new makeTodoItem(properTitle, properDescription, dueDate, priority);

        project.addTask(task);

        return task;
    };

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

    return defaultProject;
};

function userInterface() {
    const pageSpace = document.getElementById('page-space');
    const pageLayout = createPageLayout(pageSpace);
    const defaultProject = backEndProjectManager();
    const projectInterface = createProject(pageLayout.rightPanel);
    console.log(defaultProject);
    const listedDefaultProject = panelList(pageLayout.leftPanelContainer, projectInterface.project, projectInterface, defaultProject, convertDate);

    // defaultProject.title, defaultProject.description, convertDate(defaultProject.dueDate), defaultProject.priority
};
userInterface();

console.log('------------------------');
//console.log("REMINDER: might have to reconsider how we set up the backendManager() and defaultProject to work with everything that is the user interface");
//console.log("REMINDER: 10/6 finish initial css styling for project. Will clean up/improve styling later after connecting backend functions to frontend elements.");
//console.log('REMINDER: 10/7 need to rethink my create/display project functions to think of how the close function should work because I want to create a generic project and populate it with the specific selected project information');