
// create todo-item
class makeTodoItem {
    static PRIORITIES = new Set(['Minor', 'Important', 'Urgent']);

    constructor(index, title, description, dueDate, priority) {
        if (!index) throw new Error("Index is required");
        if (!title) throw new Error("Title is required");
        if (!priority) throw new Error("Priority is required");
        if (!makeTodoItem.PRIORITIES.has(priority))  throw new Error("Priority must be one of the approved options");

        this.index = index;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ? this.constructor.parseLocalDate(dueDate) : null; // date object, default to null if not specified
        this.priority = priority;
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
            throw new Error("Title is required");
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
        if (makeTodoItem.PRIORITIES.has(newPriority)) {
            this.priority = newPriority;
        } else {
            throw new Error("Invalid priority. Choose from the appropriate list of priorities.");
        }
    }
}

export default makeTodoItem;

export function editTask(task, title, description, dueDate, priority) {
    task.editTitle(title);
    task.editDescription(description);
    task.editDueDate(dueDate);
    task.editPriority(priority);
    console.log(task);
};
