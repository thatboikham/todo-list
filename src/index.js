function TasktoDO(title, priority, description, dueDate, notes, taskStatus) {
    return {
        title,
        description,
        priority,
        dueDate,
        notes,
        taskStatus: taskStatus || "incomplete",
    }
}

function Project(name) {
    const tasks = [];

    function addTask(title, description, priority, dueDate, notes) {
        const newTask = TasktoDO(title, priority, description, dueDate, notes);
        tasks.push(newTask);
    }

    function changeStatus(index, newStatus) {
        const statusOptions = ["pending", "inprogress", "complete"];
        if (statusOptions.includes(newStatus)) {
            tasks[index].taskStatus = newStatus;
        } else {
            console.error("Invalid status provided.");
        }
    }

    function changePriority(index, priority) {
        const priorityOptions = ["High", "Medium", "Low"];
        if (priorityOptions.includes(priority)) {
            tasks[index].priority = priority;
        } else {
            console.error('Invalid priority provided');
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
    }

    return {
        name,
        tasks,
        addTask,
        changeStatus,
        changePriority,
        deleteTask,
    }
}

function createNewTask(projectObj, title, priority, description, dueDate, notes) {
    projectObj.addTask(title, priority, description, dueDate, notes);
}

function showProjectDialog() {
    const addBtn = document.querySelector("#add");
    const myDialog = document.getElementById("ProjectDialog");
    addBtn.addEventListener("click", () => {
        myDialog.showModal();
    });
}

function showTaskDialog() {
    const addicon = document.getElementById('add-tasks');
    const taskDialog = document.getElementById('tasks-dialog');
    addicon.addEventListener("click", () => {
        taskDialog.showModal();
    });
}

function createNewProject(projectName) {
    const project = Project(projectName);
    myProject.push(project);
    return project;
}

let counter = 0;
let selectedIndex = -1;
function appendProject(projectName) {

    const projectDiv = document.querySelector(".projects");
    const projectInstanceDiv = document.createElement("div");
    const spanDiv = document.createElement("span");
    const nameDiv = document.createElement("div");
    nameDiv.id = counter
    nameDiv.setAttribute("projectId", `project${counter}`)
    nameDiv.setAttribute("data-Index-Number", `${counter}`)
    counter++;

    nameDiv.textContent = `${projectName}`
    nameDiv.classList.add("proj")
    const project = createNewProject(projectName);

    projectInstanceDiv.appendChild(spanDiv);
    projectInstanceDiv.appendChild(nameDiv);
    projectDiv.appendChild(projectInstanceDiv);

    nameDiv.addEventListener('click', () => {
        // ProjectIndex(nameDiv);
        selectedIndex = parseInt(nameDiv.dataset.indexNumber);
        console.log(selectedIndex)
        console.log(project)
        displayTask(project);
    });
}

function formSubmission() {
    const myDialog = document.getElementById("ProjectDialog");
    const form = document.getElementById("projectTitle");

    if (form && myDialog) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const projectName = formData.get("title");
            appendProject(projectName);
            myDialog.close();
            form.reset();
        });
    } else {
        console.log("Form or dialog not found");
    }
}

function appendTasks(project) {
    let taskContainer = document.getElementById(`${project.name}-tasks`);
    const projectDiv = document.querySelector('.project-task');
    if(!taskContainer){
        taskContainer = document.createElement('div');
        taskContainer.id = `${project.name}-tasks`;
        taskContainer.classList.add('task-container');
    }
    taskContainer.innerHTML = "";
    project.tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = task.title;
        taskContainer.appendChild(taskElement);
    });

    projectDiv.appendChild(taskContainer);
}

const ProjectIndex = (nameDiv) => {
    console.log(nameDiv.dataset.indexNumber);
    return nameDiv.dataset.indexNumber;
}

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

function displayTask(project) {
    const title = document.querySelector('.project-title');
    const projectDiv = document.querySelector('.project-task');
    title.textContent = project.name;
    // appendTasks(project);
    // console.log(currentProject)s
}

const myProject = [];
console.log(myProject)

showProjectDialog();
showTaskDialog();
formSubmission();
taskFormSubmission();
