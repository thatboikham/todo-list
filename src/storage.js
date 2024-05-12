// import { appendProject } from "./DOM";
// import default myProject from "./project"
// console.log(myProject)
// import { appendTasks } from "./tasks";

// import { myProject } from "./project";

function saveProjectToLocalStorage(updatedProject) {
    let projects = [];

    // Check if there are existing projects in local storage
    if (localStorage.getItem("projects")) {
        // Parse the existing projects from local storage and store them in the 'projects' array
        projects = JSON.parse(localStorage.getItem("projects"));
        // localStorage.setItem("projects",JSON.stringify(projects));
    }
    const projectExists = projects.some(proj => proj.name === updatedProject.name);
    console.log(projectExists)
    if (!projectExists) {
        // Add the updated project to the projects array only if it doesn't already exist
        projects.push(updatedProject);
    }
    // Add the updated project to the projects array
    // console.log(projects);
    // Store the updated projects array back to local storage
    localStorage.setItem("projects", JSON.stringify(projects));
}
function addTasktoLocalStroage(title, priority, description, dueDate){
    const projects = JSON.parse(localStorage.getItem("projects"));
    const projTitle = document.querySelector('.project-title').innerHTML;
    const index = projects.findIndex((proj) =>proj.name == projTitle);

    if(index !== -1){
        projects[index].tasks.push({title,priority,description,dueDate});
        localStorage.setItem("projects",JSON.stringify(projects));
    }
};
export{saveProjectToLocalStorage, addTasktoLocalStroage}; 