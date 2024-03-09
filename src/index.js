// import { compareAsc, format } from "date-fns";

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
            // form.reset();
        });
    } else {
        console.log("Form or dialog not found");
    }
}

formSubmision((projectName) => {
    console.log("Submitted project name:", projectName);
    appendProject(projectName)
});




const appendProject =  (projectName) =>{
    const projectDiv = document.querySelector(".projects");
    const projectInstanceDiv = document.createElement("div");
    const spanDiv = document.createElement("span");
    const nameDiv = document.createElement("div");

    nameDiv.textContent = `${projectName}`
    const newProject = project(`${projectName}`)
    console.log(newProject)

    projectInstanceDiv.appendChild(spanDiv);
    projectInstanceDiv.appendChild(nameDiv);
    projectDiv.appendChild(projectInstanceDiv);
}


