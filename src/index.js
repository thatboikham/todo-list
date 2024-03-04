import { compareAsc, format } from "date-fns";

function TasktoDO(title, priority, description, dueDate, notes){
    return{
        title,
        description,
        priority,
        dueDate,
        notes
    }
}

function project(name){
    const task = []
    const addTask = (title,description,priority,dueDate,notes) => {
        task.push(TasktoDO(title,priority,description,dueDate,notes));
    }
    return{
        name,
        task,
        addTask,
    }
};
const project1 = project("WORLD WIDE CHICKEN")

function createNewTask(projectObj,title,priority,description,dueDate,notes){
    projectObj.addTask(title,priority,description,dueDate,notes);
}
createNewTask(project1,"coding","high","working with factory functions",`${format(new Date(2014, 1, 11), "yyyy-MM-dd")}`,"factory functions are the best")
console.log(project1)
