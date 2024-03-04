// This file contains utility functions for saving and loading tasks to/from localStorage.

// Interfaces
// - Task: Represents a task object with an id, title, description, and completion status.

// saveActiveTasksToLocalStorage(tasks: Task[]): void
// - Saves the provided array of active tasks to localStorage.
// - Params:
//    - tasks: Task[] - Array of active tasks to be saved.

// loadActiveTasksFromLocalStorage(): Task[]
// - Loads active tasks from localStorage.
// - Returns:
//    - Task[] - Array of active tasks loaded from localStorage, or an empty array if no tasks are found.

// saveCompletedTasksToLocalStorage(tasks: Task[]): void
// - Saves the provided array of completed tasks to localStorage.
// - Params:
//    - tasks: Task[] - Array of completed tasks to be saved.

// loadCompletedTasksFromLocalStorage(): Task[]
// - Loads completed tasks from localStorage.
// - Returns:
//    - Task[] - Array of completed tasks loaded from localStorage, or an empty array if no tasks are found.



interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}
  
const activeTasksKey = 'activeTasks';

export const saveActiveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem(activeTasksKey, JSON.stringify(tasks));
};

export const loadActiveTasksFromLocalStorage = (): Task[] => {
    const tasksJSON = localStorage.getItem(activeTasksKey);
    return tasksJSON ? JSON.parse(tasksJSON) : [];
};
  
const completedTasksKey = 'completedTasks';

export const saveCompletedTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem(completedTasksKey, JSON.stringify(tasks));
};

export const loadCompletedTasksFromLocalStorage = (): Task[] => {
    const tasksJSON = localStorage.getItem(completedTasksKey);
    return tasksJSON ? JSON.parse(tasksJSON) : [];
};
