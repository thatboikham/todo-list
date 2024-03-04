class Project {
    constructor(name){
        this.name = name
    }
}

class taskTodo extends Project{
    constructor(name,title,priority,decription,duedate){
        super(name)
        this.title = title;
        this.priority = priority;
        this.decription = decription;
        this.duedate = duedate;

    }
}
const project1 =  new Project("World Wide Chicken");
const task1 = new taskTodo("Programming","wolrd wide chiken","do this and that and that",`${new Date}`,`${new Date(8.64e15).toString()}`)
console.log(project1)
console.log(task1)