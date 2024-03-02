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
