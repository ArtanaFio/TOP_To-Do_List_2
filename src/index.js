import "./assets/styles/main.css";
import "./assets/styles/projects.css";
import "./assets/styles/to-do_items.css";

import makeProject from "./modules/projects";
import makeTodoItem from "./modules/to-do_items";
import { deleteBackEndTask } from "./modules/projects";
import { editBackendTask } from "./modules/to-do_items";
import {
  titleCase,
  lowerCase,
  trim,
  getTodayDate,
  convertDate,
  dateForInput,
  convertCalendarDate,
  singleWhitespace,
  sentenceCase,
} from "./modules/utility";
import {
  clearInputs,
  openForm,
  closeForm,
  addErrorStyling,
  removeErrorStyling,
  fillItemName,
  sameTitle,
  notSameTitle,
} from "./modules/DOM_basic_functions";
import { createPageLayout } from "./modules/main_ui";
import {
  createPanelList,
  addtoPanelList,
  applyProjectSelectionStyling,
  displayProjectList,
  fillNewProjectList,
  createProject,
  createProjectEditForm,
  getProjectDetails,
  editFrontendProject,
  createNewProjectForm,
  getNewProject,
  createConfirmDeletionForm,
  deletePanelListProject,
  getProjectName,
  fillProjectEditForm,
  displayDefaultFirst,
  styleCurrentProject,
} from "./modules/projects_DOM";
import {
  createTaskForm,
  getTaskDetails,
  applyExistingTasks,
  fillTaskEditDetails,
  createTaskEditForm,
  createTaskDeleteForm,
  editFrontendTask,
} from "./modules/to-do_items_DOM";
import {
  getProjects,
  fillProjectStorage,
  getTasks,
  fillTaskStorage,
  deleteTaskStorage,
} from "./modules/local_storage";

const backendService = (function () {
  function createBackendProject(title, description, dueDate, priority, label) {
    const properTitle = titleCase(trim(title));
    const properDescription = sentenceCase(description);
    return new makeProject(
      properTitle,
      properDescription,
      dueDate,
      priority,
      label
    );
  }

  function editBackendProject(project, properties) {
    project.editTitle(titleCase(trim(properties[0])));
    project.editDescription(sentenceCase(properties[1]));
    project.editDueDate(properties[2]);
    project.editPriority(properties[3]);
    project.editLabel(properties[4]);
  }

  function deleteBackendProject(project) {
    if (project === defaultProject) {
      console.log("You cannot delete the default Project");
      return;
    }

    project.deleteProject();
  }

  function createBackendTask(title, description, dueDate, priority, project) {
    const properTitle = titleCase(trim(title));
    const properDescription = sentenceCase(trim(description));

    const task = new makeTodoItem(
      properTitle,
      properDescription,
      dueDate,
      priority
    );

    project.addTask(task);
    return task;
  }

  let defaultProject;

  if (localStorage.length === 0) {
    defaultProject = createBackendProject(
      "default list",
      "list to begin tracking general todo items.",
      "2026-02-01",
      "Important",
      null
    );
    fillProjectStorage(makeProject.MASTER_STORAGE, dateForInput);
    let task_key;
    makeProject.MASTER_STORAGE.forEach((project, projectIndex) => {
      task_key = project.title + "_Tasks";
      fillTaskStorage(task_key, project.tasks, dateForInput);
    });
  } else {
    let retrievedProjects = getProjects();
    for (let i = 0; i < retrievedProjects.length; i++) {
      createBackendProject(
        retrievedProjects[i].title,
        retrievedProjects[i].description,
        retrievedProjects[i].dueDate,
        retrievedProjects[i].priority,
        retrievedProjects[i].label
      );
    }
    for (let i = 0; i < localStorage.length; i++) {
      let storageKey = localStorage.key(i);
      if (storageKey !== "Projects") {
        let newStorageKey = storageKey.replace("_Tasks", "");
        let retrievedTasks = getTasks(storageKey);
        for (let i = 0; i < retrievedTasks.length; i++) {
          makeProject.MASTER_STORAGE.forEach((backendProject, projectIndex) => {
            if (backendProject.title === newStorageKey) {
              createBackendTask(
                retrievedTasks[i].title,
                retrievedTasks[i].description,
                retrievedTasks[i].dueDate,
                retrievedTasks[i].priority,
                backendProject
              );
            }
          });
        }
      }
    }
  }

  return {
    createBackendProject,
    editBackendProject,
    deleteBackendProject,
    createBackendTask,
    editBackendTask,
    deleteBackEndTask,
    defaultProject,
  };
})();

function userInterface() {
  const pageSpace = document.getElementById("page-space");
  const pageLayout = createPageLayout(pageSpace);
  const panelList = createPanelList(pageLayout.leftPanelContainer);
  const projectEditForm = createProjectEditForm(document.body);
  const projectInterface = createProject(
    pageLayout.rightPanel,
    projectEditForm
  );
  const newProjectForm = createNewProjectForm(document.body);
  applyProjectSelectionStyling(panelList, newProjectForm.submitButton);

  makeProject.MASTER_STORAGE.forEach((backendProject) => {
    addtoPanelList(backendProject, panelList);
  });

  displayDefaultFirst(
    displayProjectList,
    projectInterface,
    makeProject.MASTER_STORAGE[0],
    convertDate,
    applyExistingTasks,
    panelList.children[0]
  );

  panelList.addEventListener("click", (e) => {
    while (projectInterface.taskArea.firstChild) {
      projectInterface.taskArea.removeChild(
        projectInterface.taskArea.firstChild
      );
    }
    makeProject.MASTER_STORAGE.forEach((backendProject, index) => {
      if (backendProject.title === e.target.textContent) {
        if (index === 0) {
          projectInterface.deleteButton.classList.add("gone");
        } else {
          projectInterface.deleteButton.classList.remove("gone");
        }
        displayProjectList(projectInterface, backendProject, convertDate);
        backendProject.tasks.forEach((task, index) => {
          applyExistingTasks(projectInterface.taskArea, task, convertDate);
        });
      }
    });
  });

  projectInterface.descriptionHeader.addEventListener("click", () => {
    projectInterface.projectDescriptionModal.classList.add("flexy");
    projectInterface.projectDescriptionModal.classList.remove("gone");
  });

  projectInterface.descriptionCloseButton.addEventListener("click", () => {
    projectInterface.projectDescriptionModal.classList.add("gone");
    projectInterface.projectDescriptionModal.classList.remove("flexy");
  });

  projectInterface.editButton.addEventListener("click", () => {
    makeProject.MASTER_STORAGE.forEach((backendProject, index) => {
      if (projectInterface.projectTitle.textContent === backendProject.title) {
        openForm(projectEditForm);
        fillProjectEditForm(projectEditForm, backendProject, dateForInput);
      }
    });
  });

  projectEditForm.cancelButton.addEventListener("click", () => {
    closeForm(projectEditForm);
  });

  projectEditForm.submitButton.onclick = () => {
    const existingProject = makeProject.MASTER_STORAGE.find(
      (backendProject) =>
        backendProject.title ===
        titleCase(trim(projectEditForm.titleInput.value))
    );
    if (projectEditForm.titleInput.value === "") {
      addErrorStyling(projectEditForm);
      projectEditForm.module.addEventListener("click", () => {
        if (projectEditForm.titleInput.value !== "") {
          removeErrorStyling(projectEditForm);
        }
      });
    } else if (
      existingProject &&
      existingProject.title !== projectInterface.projectTitle.textContent
    ) {
      sameTitle(projectEditForm);
      projectEditForm.module.addEventListener("click", () => {
        const newMatchTitle = makeProject.MASTER_STORAGE.find(
          (backendProject) =>
            backendProject.title ===
            titleCase(singleWhitespace(projectEditForm.titleInput.value))
        );
        if (!newMatchTitle) {
          notSameTitle(projectEditForm);
        }
      });
    } else {
      makeProject.MASTER_STORAGE.forEach((backendProject) => {
        if (
          backendProject.title === projectInterface.projectTitle.textContent
        ) {
          backendService.editBackendProject(
            backendProject,
            getProjectDetails(projectEditForm)
          );
          let newStorageKey = backendProject.title + "_Tasks";
          fillProjectStorage(makeProject.MASTER_STORAGE, dateForInput);
          for (let i = 0; i < localStorage.length; i++) {
            let taskKey = localStorage.key(i);
            let oldProjectTitle = taskKey.replace("_Tasks", "");
            if (
              localStorage.key(i) !== "Projects" &&
              oldProjectTitle === backendProject.title
            ) {
              deleteTaskStorage(localStorage.key(i));
              fillTaskStorage(
                newStorageKey,
                backendProject.tasks,
                dateForInput
              );
            }
          }
          for (let i = 0; i < panelList.children.length; i++) {
            if (panelList.children[i].classList.contains("selected")) {
              panelList.children[i].textContent = backendProject.title;
            }
          }
          editFrontendProject(
            projectInterface,
            projectEditForm,
            titleCase,
            trim,
            sentenceCase,
            convertCalendarDate
          );
          closeForm(projectEditForm);
        }
      });
    }
  };

  pageLayout.addProjectButton.addEventListener("click", () => {
    openForm(newProjectForm);
  });

  newProjectForm.cancelButton.addEventListener("click", () => {
    clearInputs(newProjectForm);
    closeForm(newProjectForm);
    removeErrorStyling(newProjectForm);
    notSameTitle(newProjectForm);
  });

  newProjectForm.submitButton.onclick = () => {
    const existingProject = makeProject.MASTER_STORAGE.find(
      (backendProject) =>
        backendProject.title ===
        titleCase(trim(newProjectForm.titleInput.value))
    );

    if (newProjectForm.titleInput.value === "") {
      addErrorStyling(newProjectForm);
      newProjectForm.module.addEventListener("click", () => {
        if (newProjectForm.titleInput.value !== "") {
          removeErrorStyling(newProjectForm);
        }
      });
    } else if (existingProject) {
      sameTitle(newProjectForm);
      newProjectForm.module.addEventListener("click", () => {
        const newMatchTitle = makeProject.MASTER_STORAGE.find(
          (backendProject) =>
            backendProject.title ===
            titleCase(singleWhitespace(newProjectForm.titleInput.value))
        );
        if (!newMatchTitle) {
          notSameTitle(newProjectForm);
        }
      });
    } else {
      removeErrorStyling(newProjectForm);
      notSameTitle(newProjectForm);
      const newProjectDetails = getNewProject(newProjectForm);
      const newProject = backendService.createBackendProject(
        singleWhitespace(newProjectDetails.title),
        newProjectDetails.description,
        newProjectDetails.dueDate,
        newProjectDetails.priority,
        newProjectDetails.label,
        null
      );
      fillProjectStorage(makeProject.MASTER_STORAGE, dateForInput);
      addtoPanelList(newProject, panelList);
      while (projectInterface.taskArea.firstChild) {
        projectInterface.taskArea.removeChild(
          projectInterface.taskArea.firstChild
        );
      }
      projectInterface.deleteButton.classList.add("flexy");
      projectInterface.deleteButton.classList.remove("gone");
      fillNewProjectList(
        projectInterface,
        newProjectDetails,
        titleCase,
        convertCalendarDate
      );
      styleCurrentProject(panelList, projectInterface.projectTitle);
      closeForm(newProjectForm);
      clearInputs(newProjectForm);
    }
  };

  const deleteProjectForm = createConfirmDeletionForm(document.body);
  projectInterface.deleteButton.addEventListener("click", () => {
    const projectName = getProjectName(panelList);
    fillItemName(deleteProjectForm.projectSpace, projectName);
    openForm(deleteProjectForm);
  });

  deleteProjectForm.noButton.addEventListener("click", () => {
    closeForm(deleteProjectForm);
  });

  deleteProjectForm.yesButton.addEventListener("click", () => {
    for (let i = 0; i < panelList.children.length; i++) {
      if (panelList.children[i].classList.contains("selected")) {
        const deletedProject = makeProject.MASTER_STORAGE.find(
          (backendProject) =>
            backendProject.title === panelList.children[i].textContent
        );
        let storageKey = deletedProject.title + "_Tasks";
        deleteTaskStorage(storageKey);
        backendService.deleteBackendProject(deletedProject);
        deletePanelListProject(panelList.children[i]);
      } else if (i === 0) {
        panelList.children[i].classList.add("selected");
      }
    }
    fillProjectStorage(makeProject.MASTER_STORAGE, dateForInput);

    closeForm(deleteProjectForm);
    while (projectInterface.taskArea.firstChild) {
      projectInterface.taskArea.removeChild(
        projectInterface.taskArea.firstChild
      );
    }

    displayDefaultFirst(
      displayProjectList,
      projectInterface,
      makeProject.MASTER_STORAGE[0],
      convertDate,
      applyExistingTasks,
      projectInterface.taskArea,
      panelList.children[0]
    );
  });

  const taskArea = projectInterface.taskArea;
  const addTaskButton = projectInterface.addTaskButton;
  const newTaskForm = createTaskForm(document.body);

  addTaskButton.addEventListener("click", () => {
    openForm(newTaskForm);
  });

  newTaskForm.cancelButton.addEventListener("click", () => {
    removeErrorStyling(newTaskForm);
    notSameTitle(newTaskForm);
    closeForm(newTaskForm);
    clearInputs(newTaskForm);
  });

  newTaskForm.submitButton.addEventListener("click", () => {
    const taskDetails = getTaskDetails(newTaskForm);
    makeProject.MASTER_STORAGE.forEach((backendProject, index) => {
      const existingTask = backendProject.tasks.find(
        (backendTask) =>
          backendTask.title ===
          titleCase(singleWhitespace(newTaskForm.titleInput.value))
      );
      if (newTaskForm.titleInput.value === "") {
        addErrorStyling(newTaskForm);
        newTaskForm.module.addEventListener("click", () => {
          if (newTaskForm.titleInput.value !== "") {
            removeErrorStyling(newTaskForm);
          }
        });
      } else if (existingTask) {
        sameTitle(newTaskForm);
        newTaskForm.module.addEventListener("click", () => {
          const newMatchTitle = backendProject.tasks.find(
            (backendTask) =>
              backendTask.title ===
              titleCase(singleWhitespace(newTaskForm.titleInput.value))
          );
          if (!newMatchTitle) {
            notSameTitle(newTaskForm);
          }
        });
      } else if (
        newTaskForm.titleInput.value !== "" &&
        projectInterface.projectTitle.textContent === backendProject.title
      ) {
        while (projectInterface.taskArea.firstChild) {
          projectInterface.taskArea.removeChild(
            projectInterface.taskArea.firstChild
          );
        }
        backendService.createBackendTask(
          taskDetails.taskTitle,
          taskDetails.taskDescription,
          taskDetails.taskDueDate,
          taskDetails.taskPriority,
          backendProject
        );
        let task_Storage_key = backendProject.title + "_Tasks";
        backendProject.tasks.forEach((task, index) => {
          fillTaskStorage(task_Storage_key, backendProject.tasks, dateForInput);
          applyExistingTasks(projectInterface.taskArea, task, convertDate);
        });
        closeForm(newTaskForm);
        clearInputs(newTaskForm);
      }
    });
  });

  const taskEditForm = createTaskEditForm(document.body);
  const taskDeleteForm = createTaskDeleteForm(document.body);

  projectInterface.taskArea.addEventListener("click", (e) => {
    makeProject.MASTER_STORAGE.forEach((backendProject, ProjectIndex) => {
      if (projectInterface.projectTitle.textContent === backendProject.title) {
        backendProject.tasks.forEach((backendTask, taskIndex) => {
          if (
            e.target.classList.contains("task-edit-button") &&
            backendTask.title ===
              e.target.parentNode.parentNode.children[0].children[1].textContent
          ) {
            fillTaskEditDetails(taskEditForm, backendTask, dateForInput);
            openForm(taskEditForm);
            taskEditForm.submitButton.onclick = () => {
              if (taskEditForm.titleInput.value === "") {
                addErrorStyling(taskEditForm);
                taskEditForm.module.addEventListener("click", () => {
                  if (taskEditForm.titleInput.value !== "") {
                    removeErrorStyling(taskEditForm);
                  }
                });
              } else {
                removeErrorStyling(taskEditForm);
                editFrontendTask(
                  e.target.parentNode.parentNode.children[0].children,
                  e.target.parentNode.parentNode.parentNode.children[1]
                    .children[0].children[1],
                  e.target.parentNode.parentNode.parentNode.children[1]
                    .children[1].children[1],
                  taskEditForm,
                  titleCase,
                  sentenceCase,
                  trim,
                  convertCalendarDate
                );
                closeForm(taskEditForm);
                editBackendTask(
                  backendTask,
                  taskEditForm.titleInput.value,
                  taskEditForm.descriptionInput.value,
                  taskEditForm.dueDateDropDownBox.value,
                  taskEditForm.priorityBox.value,
                  titleCase,
                  trim
                );
                let task_Storage_key = backendProject.title + "_Tasks";
                backendProject.tasks.forEach((task, index) => {
                  fillTaskStorage(
                    task_Storage_key,
                    backendProject.tasks,
                    dateForInput
                  );
                });
              }
            };
          } else if (
            e.target.classList.contains("task-delete-button") &&
            backendTask.title ===
              e.target.parentNode.parentNode.children[0].children[1].textContent
          ) {
            openForm(taskDeleteForm);
            fillItemName(taskDeleteForm.taskSpace, backendTask.title);
          }
        });
      }
    });
  });

  projectInterface.taskArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("empty-circle")) {
      e.target.classList.add("full-circle");
      e.target.classList.remove("empty-circle");
      e.target.parentNode.children[1].classList.add("strike-through");
    } else if (e.target.classList.contains("full-circle")) {
      e.target.classList.remove("full-circle");
      e.target.classList.add("empty-circle");
      e.target.parentNode.children[1].classList.remove("strike-through");
    }
  });

  projectInterface.taskArea.addEventListener("mouseover", (e) => {
    const child = e.target.closest(".full-task-box");
    if (!child || !taskArea.contains(child)) return;

    child.children[0].classList.add("task-hover");
    child.children[0].children[1].children[0].classList.add("flexy");
    child.children[0].children[1].children[0].classList.remove("gone");
    child.children[0].children[1].children[1].classList.add("flexy");
    child.children[0].children[1].children[1].classList.remove("gone");
    child.children[1].classList.add("flexy");
    child.children[1].classList.remove("gone");
  });

  projectInterface.taskArea.addEventListener("mouseout", (e) => {
    const child = e.target.closest(".full-task-box");
    if (!child || !taskArea.contains(child)) return;

    child.children[0].classList.remove("task-hover");
    child.children[0].children[1].children[0].classList.remove("flexy");
    child.children[0].children[1].children[0].classList.add("gone");
    child.children[0].children[1].children[1].classList.remove("flexy");
    child.children[0].children[1].children[1].classList.add("gone");
    child.children[1].classList.remove("flexy");
    child.children[1].classList.add("gone");
  });

  taskEditForm.cancelButton.addEventListener("click", () => {
    closeForm(taskEditForm);
    clearInputs(taskEditForm);
  });

  taskDeleteForm.noButton.addEventListener("click", () => {
    closeForm(taskDeleteForm);
  });

  taskDeleteForm.yesButton.addEventListener("click", () => {
    makeProject.MASTER_STORAGE.forEach((backendProject) => {
      if (backendProject.title === projectInterface.projectTitle.textContent) {
        const deletedTask = backendProject.tasks.find(
          (backendTask) =>
            backendTask.title === taskDeleteForm.taskSpace.textContent
        );
        const deletedIndex = backendProject.tasks.findIndex(
          (backendTask) =>
            backendTask.title === taskDeleteForm.taskSpace.textContent
        );
        backendService.deleteBackEndTask(
          backendProject,
          deletedIndex,
          deletedTask
        );
        while (projectInterface.taskArea.firstChild) {
          projectInterface.taskArea.removeChild(
            projectInterface.taskArea.firstChild
          );
        }
        let task_Storage_key = backendProject.title + "_Tasks";
        backendProject.tasks.forEach((task, index) => {
          fillTaskStorage(task_Storage_key, backendProject.tasks, dateForInput);
          applyExistingTasks(projectInterface.taskArea, task, convertDate);
        });
        closeForm(taskDeleteForm);
      }
    });
  });
}
userInterface();
