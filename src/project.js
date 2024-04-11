import { TasktoDO } from "./tasks";
import { appendProject } from "./DOM";
const myProject = [];
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

function createNewProject(projectName) {
    const project = Project(projectName);
    myProject.push(project);
    return project;
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


export{Project,createNewProject,myProject,ProjectSubmission}