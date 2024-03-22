// import { compareAsc, format } from "date-fns";
const myProject = [];

function TasktoDO(title, priority, description, dueDate, notes,taskStatus){
    return{
        title,
        description,
        priority,
        dueDate,
        notes,
        taskStatus:taskStatus || "incomplete",
    }
}

function project(name){
    const task = []
    const addTask = (title,description,priority,dueDate,notes) => {
        task.push(TasktoDO(title,priority,description,dueDate,notes));
    }
    const changeStatus = (index,newStatus) => {
        const status = ["pending","inprogress","complete"]
        if (status.includes(newStatus)) {
            task[index].taskStatus = newStatus;
        } else {
            console.error("Invalid statsu provided.");
        }
    }
    const changePriority = (index,priority) => {
        const priorities = ["High","Medium","Low"];
        if(priorities.includes(priority)){
            task[index].priority = priority;
        }
        else{
            console.error('invalid priority provided')
        }
        }

    const deleteTodoList = (index) => {
        task.splice(index, 1)
    }
    return{
        name,
        task,
        addTask,
        changeStatus,
        changePriority,
        deleteTodoList,
    }
};
// const project1 = project("WORLD WIDE CHICKEN")


function createNewTask(projectObj,title,priority,description,dueDate,notes){
    projectObj.addTask(title,priority,description,dueDate,notes);
}

const projectDIalog = (function showProjectDIalog(){
const addBtn = document.querySelector("#add")
const myDialog = document.getElementById("ProjectDialog");
addBtn.addEventListener("click", () => {
myDialog.showModal();

});
})();

const tasksDialog = (function showTaskDialog(){
    const addicon = document.getElementById('add-tasks');
    const taskDialog = document.getElementById('tasks-dialog');
    addicon.addEventListener("click",() => {
        taskDialog.showModal();
    })
})();



function createNewProject(projectName){
    const newProject = project(`${projectName}`)
    return newProject;
};


let counter = 0;
const appendProject =  (projectName) =>{
    const projectDiv = document.querySelector(".projects");
    const projectInstanceDiv = document.createElement("div");
    const spanDiv = document.createElement("span");
    const nameDiv = document.createElement("div");
    nameDiv.id = counter
    nameDiv.setAttribute("projectId",`project${counter}`)
    counter++;

    nameDiv.textContent = `${projectName}`
    nameDiv.classList.add("proj")
    const project = createNewProject(projectName);
    myProject.push(project);
    
    const projectAtribute = nameDiv.getAttribute('projectId');

    projectInstanceDiv.appendChild(spanDiv);
    projectInstanceDiv.appendChild(nameDiv);
    projectDiv.appendChild(projectInstanceDiv);

    nameDiv.addEventListener('click', () => {
        displayTask(nameDiv.getAttribute('projectId'), project); // Pass project attribute here
    });    
}

const formSubmision = (callback) => {
    const myDialog = document.getElementById("ProjectDialog");
    const form = document.getElementById("projectTitle");

    if (form && myDialog) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const projectName = formData.get("title");

            callback(projectName);

            myDialog.close();
            form.reset();
        });
    } else {
        console.log("Form or dialog not found");
    }
}

formSubmision((projectName) => {
    appendProject(projectName);
});

function appendTasks(projectAtribute, project) {
    const taskContainer = document.getElementById(`${projectAtribute}-tasks`);
    const projectDiv = document.querySelector('.project-task');
    if (taskContainer) {
        taskContainer.innerHTML = ''; // Clear the container first
        project.task.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.textContent = task.title;
            taskContainer.appendChild(taskElement);
        });
        projectDiv.appendChild(taskContainer); // Move this line inside the if block
    } else {
        console.error(`Task container ${projectAtribute}-tasks not found.`);
    }
    console.log(taskContainer);
}



function TaskFormSubmition(projectAtribute, project, callback){
    const taskForm = document.getElementById('task-form');
    const taskDialog = document.getElementById('tasks-dialog');

    const handleTaskFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(taskForm);
        const taskTitle = formData.get('task-title');
        const taskDescription = formData.get('description');
        const taskDueDate = formData.get('date');
        const taskPriority = formData.get('priority');

        callback(project, taskTitle, taskDescription, taskDueDate, taskPriority, projectAtribute); // Pass projectAtribute

        taskDialog.close();
        taskForm.reset();
        // appendTasks(projectAtribute, project); //here i get projectAtribute is not defined

    };
    taskForm.removeEventListener('submit', handleTaskFormSubmit);
    taskForm.addEventListener('submit', handleTaskFormSubmit); 
}

function displayTask(projectAtribute, project){
    const title = document.querySelector('.project-title');
    const projectDiv = document.querySelector('.project-task');
    console.log(projectAtribute);
    let taskContainer = document.getElementById(`${projectAtribute}-tasks`);
    console.log(taskContainer)
    if(taskContainer){
        taskContainer.style.display = 'none';
    }

    if (project) {
        title.textContent = project.name;
        TaskFormSubmition(projectAtribute, project, (project, title, priority, description, dueDate, projectAtribute) => {
            project.addTask(title, priority, description, dueDate);
            appendTasks(projectAtribute, project);
        });    
    }

     if(!taskContainer){
        taskContainer = document.createElement('div');
        taskContainer.id = `${projectAtribute}-tasks`;
        taskContainer.classList.add('task-container');

        projectDiv.appendChild(taskContainer);
    } 

    taskContainer.style.display = 'block';
    taskContainer.style.height = '100vh';
    taskContainer.style.color = 'black';
}
console.log(myProject);