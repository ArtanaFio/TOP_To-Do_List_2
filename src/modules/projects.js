// Project Management Module
// single responsibility purpose: manage projects that group todo-items
// date format: "2025-03-18T00:00:00-05:00" or null

class makeProject {
  static PRIORITIES = new Set(["Minor", "Important", "Urgent"]);
  static LABELS = new Set(["Daily", "Weekly", "Monthly", "Yearly"]);
  static MASTER_STORAGE = []; // Central Storage for ALL lists, including the default list

  constructor(title, description, dueDate, priority, label, tasks) {
    if (!title || !title.trim()) throw new Error("Title is required");
    if (!priority || !makeProject.PRIORITIES.has(priority))
      throw new Error("Invalid priority");

    this.title = title.trim();
    this.description = description ? description.trim() : "";
    this.dueDate = dueDate ? this.constructor.parseLocalDate(dueDate) : null; //date format is ISO 8601: YYYY-MM_DD
    this.priority = priority;
    this.label = label && makeProject.LABELS.has(label) ? label : null;
    this.tasks = [];

    makeProject.MASTER_STORAGE.push(this); // Add project to Master Storage
  }

  static parseLocalDate(dueDate) {
    if (!dueDate) return null;
    if (typeof dueDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      throw new Error("Date must be in YYYY-MM-DD format");
    }
    const [year, month, day] = dueDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      throw new Error("Invalid date");
    }
    return date;
  }

  editTitle(newTitle) {
    if (newTitle) {
      this.title = newTitle;
    } else {
      throw new Error("Title is required.");
    }
  }

  editDescription(newDescription) {
    this.description = newDescription;
  }

  editDueDate(newDueDate) {
    if (newDueDate === null || newDueDate === "") {
      this.dueDate = null;
      return;
    }

    this.dueDate = this.constructor.parseLocalDate(newDueDate);
  }

  editPriority(newPriority) {
    if (makeProject.PRIORITIES.has(newPriority)) {
      this.priority = newPriority;
    } else {
      throw new Error(
        "Invalid priority. Choose from the appropriate list of priorities."
      );
    }
  }

  setLabel(label) {
    return makeProject.LABELS.has(label) ? label : null;
  }

  editLabel(newLabel) {
    if (makeProject.LABELS.has(newLabel)) {
      this.label = newLabel;
    } else if (newLabel === null) {
      this.label = null;
    } else {
      throw new Error(`'${newLabel}' is not a valid label.`);
    }
  }

  removelabel() {
    if (this.label !== null) {
      console.log(`${this.label} label has been removed from '${this.title}'`);
      this.label = null;
    } else {
      console.log(`No label to remove from '${this.title}'`);
    }
  }

  addTask(task) {
    if (
      !task ||
      typeof task !== "object" ||
      !("title" in task) ||
      !("priority" in task)
    )
      throw new Error("Invalid task");
    this.index = this.tasks.length;
    this.tasks.push(task);
  }

  deleteTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      this.tasks.forEach((task, i) => {
        task.index = i;
      });
    } else {
      throw new Error("Invalid task index");
    }
  }

  deleteProject() {
    const index = makeProject.MASTER_STORAGE.indexOf(this);
    if (index > -1) {
      makeProject.MASTER_STORAGE.splice(index, 1);
    }
  }
}

export default makeProject;

export function deleteBackEndTask(project, index, task) {
  project.deleteTask(index);
  task = null;
}

// project completion status
