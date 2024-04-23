import { createTaskDiv ,selectedIndex} from "./DOM";
import { myProject } from "./project";
function TasktoDO(title, priority, description, dueDate, notes, taskStatus) {
    return {
        title,
        priority,
        description,
        dueDate,
        notes,
        taskStatus: taskStatus || "incomplete",
    }
}

function appendTasks(project) {
    const taskContainer = document.getElementById(`${project.name}-tasks`);

    project.tasks.forEach(task => {
        const existingTask = taskContainer.querySelector(`[data-title="${task.title}"]`);
        if (!existingTask) {
            createTaskDiv(taskContainer, task.title, task.dueDate, task.priority,task.description);
        }
    });
};

function taskFormSubmission() {
    const taskForm = document.getElementById('task-form');
    const taskDialog = document.getElementById('tasks-dialog');

    const index = selectedIndex;
    const project = myProject[index];
    console.log(project)

    const handleTaskFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(taskForm);
        const taskTitle = formData.get('task-title');
        const taskDescription = formData.get('description');
        const taskDueDate = formData.get('date');
        const taskPriority = formData.get('priority');

        if (selectedIndex >= 0 && selectedIndex < myProject.length) {
            const project = myProject[selectedIndex];
            if (project) {
                project.addTask(taskTitle, taskPriority, taskDescription, taskDueDate);
                appendTasks(project);
                console.log(project)
            }
        }
        taskDialog.close();
        taskForm.reset();
    };
    taskForm.addEventListener('submit', handleTaskFormSubmit);
}



export{TasktoDO,
    appendTasks,taskFormSubmission
};