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

export{showProjectDialog, showTaskDialog};
