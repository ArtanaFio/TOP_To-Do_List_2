// Project Management Module
// single responsibility purpose: manage projects that group todo-items

class makeProject {

    static PRIORITIES = new Set(['Minor', 'Important', 'Urgent']);
    static LABELS = new Set(['Daily', 'Weekly', 'Monthly', 'Yearly']);
    static MASTER_STORAGE = []; // Central Storage for ALL lists, including the default list

    constructor(title, description, dueDate, priority, label) {
        if (!title) throw new Error("Title is required");
        if (!priority) throw new Error("Priority is required");
        if (!makeProject.PRIORITIES.has(priority)) throw new Error("Priority must be one of the approved options");

        this.title = title;
        this.description = description;
        this.dueDate = dueDate ? this.constructor.parseLocalDate(dueDate) : null; //date format is ISO 8601: YYYY-MM_DD
        this.priority = priority;
        this.label = makeProject.LABELS.has(label) ? label : null;
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
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
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
            throw new Error("Invalid priority. Choose from the appropriate list of priorities.");
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

    deleteProject() {
        const index = makeProject.MASTER_STORAGE.indexOf(this);
        if (index > -1) {
            makeProject.MASTER_STORAGE.splice(index, 1);
        }
    }
}

export default makeProject;

export function editProject(project, properties) {
    project.editTitle(properties[0]);
    project.editDescription(properties[1]);
    project.editDueDate(properties[2]);
    project.editPriority(properties[3]);
    project.editLabel(properties[4]);
};

export function addTaskToProject(project, task) {
    project.tasks.push(task);
};

export function deleteTaskFromProject(project, task) {
    project.tasks.splice(task, 1); // (task, 1), where task = index where I want to start removing items, and 1 is the number of items I want to remove.
};

// creation of a default project = new project(title, description, due date, priority, label), date format: "2025-03-18T00:00:00-05:00" or null
export const defaultProject = new makeProject('Default List', 'List to begin tracking general todo items.', null, 'Important', null);

export function createBackEndProject(title, description, date, priority, label) {
    const newBackendProject = new makeProject(title, description, date, priority, label);

    return newBackendProject;
};


// project completion status