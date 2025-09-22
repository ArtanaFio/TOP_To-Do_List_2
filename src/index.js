import makeProject from './modules/projects';
import makeTodoItem from './modules/to-do_items';
import { defaultProject, editProject, addTaskToProject, deleteTaskFromProject } from './modules/projects';
import { editTask } from './modules/to-do_items';


console.log("----");
console.log("TASK:");
console.log("okay, next thing is to make sure that all the backend fuctions work without using any DOM maniputlation or even logic and utility functions");
console.log("need to validate addTaskToProject so that only accepts proper tasks");
console.log("need to clean up and validate to-do_items.js");
if (process.env.NODE_ENV === "development") {
    window.makeProject = makeProject;
    window.makeTodoItem = makeTodoItem;
    window.defaultProject = defaultProject;
    window.editProject = editProject;
    window.addTaskToProject = addTaskToProject;
    window.deleteTaskFromProject = deleteTaskFromProject;
    window.editTask = editTask;
}

//console.log(defaultProject);
