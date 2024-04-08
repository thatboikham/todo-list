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

function Project(name) {
    const tasks = [];
    let index = 0;

    function addTask(title, priority, description, dueDate, notes) {
        const newTask = TasktoDO(title, priority, description, dueDate, notes);
        newTask.index = index;
        index++;
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

    nameDiv.textContent = `${projectName}`;
    nameDiv.classList.add("proj");
    projectInstanceDiv.style.cssText = "display: flex; justify-content: space-between";
    projectInstanceDiv.setAttribute("id", "project");
    spanDiv.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #ff0000;"></i>';
    spanDiv.addEventListener("click",() => {
        // const project = myProject[selectedIndex];
        deleteProject(projectInstanceDiv);
    })
    const project = createNewProject(projectName);

    projectInstanceDiv.appendChild(nameDiv);
    projectInstanceDiv.appendChild(spanDiv);
    projectDiv.appendChild(projectInstanceDiv);

    nameDiv.addEventListener('click', () => {
        // ProjectIndex(nameDiv);
        selectedIndex = parseInt(nameDiv.dataset.indexNumber);
        console.log(selectedIndex)
        console.log(project)
        displayTask(project);
    });
}

function ProjectSubmission() {
    const myDialog = document.getElementById("ProjectDialog");
    const form = document.getElementById("projectTitle");
    const cancelBtn = form.querySelector('[value = "cancel"]')
    // const confrimBtn = form.querySelector("#confirmBtn");

    if (form && myDialog) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const projectName = formData.get("title");
            appendProject(projectName);
            myDialog.close();
            form.reset();
        });
        form.addEventListener("keydown",(e) => {
            const code = e.keyCode;
            const enterCode = 13;
            if(code === enterCode){
                e.preventDefault();
                const formData = new FormData(form);
                const projectName = formData.get("title");
                appendProject(projectName);
                myDialog.close();
                form.reset();
            }
        })
    } else {
        console.log("Form or dialog not found");
    }

    if(cancelBtn){
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            myDialog.close();
            form.reset();
            console.log("Cancelled project submission");
        })
    }
}

function appendTasks(project) {
    const taskContainer = document.getElementById(`${project.name}-tasks`);

    project.tasks.forEach(task => {
        const existingTask = taskContainer.querySelector(`[data-title="${task.title}"]`);
        if (!existingTask) {
            createTaskDiv(taskContainer, task.title, task.dueDate, task.priority);
        }
    });
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
    title.textContent = project.name;
    // const taskContainer = document.getElementById(`${project.name}-tasks`);

    let taskContainer = document.getElementById(`${project.name}-tasks`);
    const projectDiv = document.querySelector('.project-task');
    
    if (!taskContainer) {
        taskContainer = document.createElement('div');
        taskContainer.id = `${project.name}-tasks`;
        taskContainer.classList.add('task-container');
        taskContainer.classList.add('tasks');
        projectDiv.appendChild(taskContainer);
    } 
    if(taskContainer){
        activeProjectTask(taskContainer);
    }
}

const activeProjectTask = (clickedProjectDiv) => {
    const projectDiv = document.querySelector('.project-task');
    const allTaskContainers = projectDiv.querySelectorAll('.tasks');

    for(let i = 0; i < allTaskContainers.length;i++){
        allTaskContainers[i].style.display = "none";
    }
    clickedProjectDiv.style.display = "block";
}

const createTaskDiv = (() => {
    let counter = 0; // Counter is encapsulated within this function

    return (taskContainer, title, dueDate, priority) => {
        const box = document.createElement('div');
        const rightdiv = document.createElement('div');
        const leftdiv = document.createElement('div');
        const checkbox = document.createElement('input');
        const titlediv = document.createElement('div');
        const dueDateDiv = document.createElement('div');
        const priorityDiv = document.createElement('div');
        const deleteDiv = document.createElement('div');

        box.classList.add('task-box');
        box.setAttribute('data-task-index', counter);
        box.setAttribute('data-title',`${title}`);
        rightdiv.classList.add('right');
        leftdiv.classList.add('left');
        checkbox.setAttribute('type', 'checkbox');
        titlediv.classList.add('task-title', 'center');
        dueDateDiv.classList.add('task-date', 'center');
        priorityDiv.classList.add('task-prority', 'center');
        deleteDiv.classList.add('delete-task', 'center');

        deleteDiv.addEventListener('click',() => {
            const project = myProject[selectedIndex];
            deleteTask(project,title,box);
        } );
        titlediv.textContent = title;
        dueDateDiv.textContent = dueDate;
        priorityDiv.textContent = priority;
        deleteDiv.textContent = "Delete";

        taskContainer.append(box);
        leftdiv.append(checkbox, titlediv);
        rightdiv.append(dueDateDiv, priorityDiv,deleteDiv);
        box.append(leftdiv, rightdiv);
        counter++; // Increment the counter for the next task
        changeColor(priority,priorityDiv,box);
    };
})();

const deleteTask = (project,boxTitle,box) => {
    const index = project.tasks.findIndex(task => task.title === boxTitle);
    if(index !== -1){
        project.deleteTask(index);
        box.remove();
    }
}

const changeColor = (priority,priorityDiv,box) =>{
    switch(priority){
        case "high":
            priorityDiv.style.color = 'purple';
            box.style.borderLeft = '8px solid purple';
            break;
        case "medium":
            priorityDiv.style.color = 'orange';
            box.style.borderLeft = '8px solid orange';
            break;
        case "low":
            priorityDiv.style.color = 'green';
            box.style.borderLeft = '8px solid green';
            break;
            default:
    }
};

const deleteProject = (projectInstanceDiv) => {
    const index = selectedIndex;
    myProject.splice(index, 1);
    projectInstanceDiv.remove();
};

const myProject = [];
console.log(myProject)

showProjectDialog();
showTaskDialog();
ProjectSubmission();
taskFormSubmission();
