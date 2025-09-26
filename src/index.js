import makeProject from './modules/projects';
import makeTodoItem from './modules/to-do_items';
import { editBackendProject, deleteBackEndTask } from './modules/projects';
import { editBackendTask } from './modules/to-do_items';
import { titleCase, lowerCase, trim, getTodayDate } from './modules/utility';

function backEndProjectManager() {
    let project;

    function createBackendProject(title, description, dueDate, priority, label) {
        const properTitle = titleCase(trim(title));
        const properDescription = lowerCase(trim(description));
        project = new makeProject(properTitle, properDescription, dueDate, priority, label);

        return project;
    };

    // The default project should not be deleteable
    const defaultProject = createBackendProject('default list', 'list to begin tracking general todo items.', null, 'Important', null);
    console.log(defaultProject);

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
};
backEndProjectManager();
