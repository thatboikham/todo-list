import {myProject,createNewProject,ProjectSubmission} from "./project";
import { showProjectDialog,showTaskDialog } from "./dialog";
import { taskFormSubmission } from "./tasks";

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
        deleteProject(projectInstanceDiv,projectName);
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
        cancelTask(box,checkbox);
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

const deleteProject = (projectInstanceDiv,projectName) => {
    const index = selectedIndex;
    const taskContainer = document.getElementById(`${projectName}-tasks`);
    myProject.splice(index, 1);
    projectInstanceDiv.remove();
    taskContainer.remove();
};

function cancelTask(taskBox,checkbox){
    const hrLine = document.createElement('hr');
    checkbox.addEventListener('change',function(){
        if(this.checked){
            taskBox.append(hrLine);
        }else{
             hrLine.remove();
        }
        console.log(this.checked)
   })
};

// const myProject = [];
// console.log(myProject)

showProjectDialog();
showTaskDialog();
ProjectSubmission();
taskFormSubmission();
export{createTaskDiv,appendProject,selectedIndex}