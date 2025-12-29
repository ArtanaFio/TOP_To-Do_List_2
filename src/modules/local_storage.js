const project_key = "Projects";

export function getProjects() {
  return JSON.parse(localStorage.getItem(project_key));
}

export function fillTaskStorage(storage_key, taskArray, convertDate) {
  let newTaskArray = [];
  let taskDueDate;

  taskArray.forEach((taskObject) => {
    if (taskObject.dueDate) {
      taskDueDate = convertDate(taskObject.dueDate);
    } else {
      taskDueDate = "";
    }

    const translatedTask = {
      title: taskObject.title,
      description: taskObject.description,
      dueDate: taskDueDate,
      priority: taskObject.priority,
    };
    newTaskArray.push(translatedTask);
  });

  localStorage.setItem(storage_key, JSON.stringify(newTaskArray));
}

export function fillProjectStorage(projectArray, convertDate) {
  let newProjectArray = [];

  projectArray.forEach((projectObject) => {
    let dueDate;
    if (projectObject.dueDate) {
      dueDate = convertDate(projectObject.dueDate);
    } else {
      dueDate = projectObject.dueDate;
    }

    const translatedProject = {
      title: projectObject.title,
      description: projectObject.description,
      dueDate: dueDate,
      priority: projectObject.priority,
      label: projectObject.label,
    };

    newProjectArray.push(translatedProject);
  });

  localStorage.setItem(project_key, JSON.stringify(newProjectArray));
}

export function getTasks(task_key) {
  return JSON.parse(localStorage.getItem(task_key));
}

export function deleteTaskStorage(storage_key) {
  localStorage.removeItem(storage_key);
}
