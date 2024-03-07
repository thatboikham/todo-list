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
const project1 = project("WORLD WIDE CHICKEN")


function createNewTask(projectObj,title,priority,description,dueDate,notes){
    projectObj.addTask(title,priority,description,dueDate,notes);
}
createNewTask(project1,"coding","high","working with factory functions","factory functions are the best")
createNewTask(project1,"flight","high","working with factory functions ","factory functions are the best")

project1.changeStatus(0,"complete")
project1.changePriority(0,"High")
console.log(project1)

project1.deleteTodoList(1)
console.log(project1)

const projectDIalog = (function showProjectDIalog(){
    const addBtn = document.querySelector("#add")
    const myDialog = document.getElementById("ProjectDialog");

    addBtn.addEventListener("click", () => {
    myDialog.showModal();
});
})();
