import {myProject,createNewProject,ProjectSubmission} from "./project";
import { showProjectDialog,showTaskDialog} from "./dialog";
import { taskFormSubmission, appendTasks } from "./tasks";
import { roundToNearestMinutes,format } from "date-fns";
import { saveProjectToLocalStorage } from "./storage";
// import { tr } from "date-fns/locale/tr"

console.log(myProject)

// const saveProjectToLocalStorage = (myProject) => {
//     localStorage.setItem("projects", JSON.stringify(myProject));
// }


let counter = 0;
let selectedIndex = -1;
function appendProject(projectName) {

    const projectDiv = document.querySelector(".projects");
    const projectInstanceDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const dropdown = document.createElement("div");
    const dropdownContent = document.createElement("div");
    const horizotalDotts = document.createElement("span");
    const deleteIcon = document.createElement("span");
    const renameIcon = document.createElement("span");
    nameDiv.id = counter
    nameDiv.setAttribute("projectId", `project${counter}`);
    nameDiv.setAttribute("data-Index-Number", `${counter}`);
    nameDiv.focus();
    counter++;
    
    nameDiv.textContent = `${projectName}`;
    nameDiv.classList.add("proj");
    dropdown.classList.add("dropdown");
    dropdownContent.classList.add("dropdown-content")
    projectInstanceDiv.style.cssText = "display: flex; justify-content: space-between";
    projectInstanceDiv.setAttribute("id", "project");
    horizotalDotts.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    renameIcon.innerHTML = '<i class="fa-solid fa-pen"></i><p>Rename<p/>';
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #ff0000;"></i><p>Delete<p/>';
    deleteIcon.addEventListener("click",() => {
        // const project = myProject[selectedIndex];
        deleteProject(projectInstanceDiv,projectName);
    });
    horizotalDotts.addEventListener('click',() => {
        dropdownContent.classList.toggle('show-content');
    });
    dropdownContent.addEventListener("mouseleave", () => {
        dropdownContent.classList.remove("show-content");
    });
    const project = createNewProject(projectName);
    saveProjectToLocalStorage(project);


    projectInstanceDiv.appendChild(nameDiv);
    dropdownContent.append(renameIcon, deleteIcon);
    dropdown.append(horizotalDotts,dropdownContent);
    projectInstanceDiv.appendChild(dropdown);
    projectDiv.appendChild(projectInstanceDiv);

    nameDiv.addEventListener('click', () => {
        // ProjectIndex(nameDiv);
        selectedIndex = parseInt(nameDiv.dataset.indexNumber);
        console.log(selectedIndex)
        console.log(project)
        displayTask(project);
    });
    const handelRename = () => {
        nameDiv.setAttribute("contenteditable", 'true');
        nameDiv.focus();
        nameDiv.addEventListener("input",() => {
            const newName = nameDiv.innerText;
            project.name = newName;
        },false)
        dropdownContent.classList.remove("show-content");
    };
    renameIcon.addEventListener("click", handelRename);
    nameDiv.addEventListener("mouseout",() => {
        nameDiv.setAttribute("contenteditable", 'false');
    })
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

    return (taskContainer, title, dueDate, priority,description) => {
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
        counter++;
        changeColor(priority,priorityDiv,box);
        cancelTask(box,checkbox);
        editTask(box,title, dueDate, priority,description,titlediv,dueDateDiv,priorityDiv)
    };
})();


const deleteTask = (project,boxTitle,box) => {
    const index = project.tasks.findIndex(task => task.title === boxTitle);
    if(index !== -1){
        project.deleteTask(index);
        box.remove();
    }
};

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
    if(taskContainer){
        taskContainer.remove();
    }
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
function editTask(taskDiv,title, dueDate, priority,description,titlediv,dueDateDiv,priorityDiv){
    const editDialog = document.getElementById('edittasksdialog');
    const editForm = document.getElementById('edit-form');
    taskDiv.addEventListener("click",() => {
        const titleInput = editDialog.querySelector('[name="task-title"]');
        const descriptionInput = editDialog.querySelector('[name="description"');
        const duedateInput = editDialog.querySelector('[name="date"]');
        const prorityInput = editDialog.querySelector('[name="priority"]');
        
        duedateInput.value = dueDate;
        titleInput.value = title;
        descriptionInput.value = description;
        prorityInput.value = priority;

        editDialog.showModal();

        const handleTaskFormSubmit = (e) => {
            e.preventDefault();
    
            const formData = new FormData(editForm);
            const newTitle = formData.get('task-title');
            const newDescription = formData.get('description');
            const newDueDate = formData.get('date');
            const newPriority = formData.get('priority');
    
            const project = myProject[selectedIndex];
            const index = project.tasks.findIndex(task => task.title === title);
            
            project.editTask(index,newTitle,newPriority,newDescription,newDueDate);
            titlediv.textContent = newTitle;
            dueDateDiv.textContent = newDueDate;
            priorityDiv.textContent = newPriority;

            editDialog.close();
        };
        editForm.addEventListener('submit', handleTaskFormSubmit);
    })
}
function loadSavedData(){
    const projects = JSON.parse(localStorage.getItem("projects"));
    // console.log(projects);
    if(projects){
        if(projects.length > 0){
            projects.forEach(project => {
                displayTask(project);
                appendProject(project.name)
                appendTasks(project)
            });
    
        }
    }
};
loadSavedData();


showProjectDialog();
showTaskDialog();
ProjectSubmission();
taskFormSubmission();
export{createTaskDiv,appendProject,selectedIndex,myProject}