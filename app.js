const newTask = document.querySelector(".input-task");
const newTaskBtn = document.querySelector(".btn-task-add");
const taskList = document.querySelector(".task-list");
let prevValue = "";

newTaskBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let task = newTask.value;
    if (task.length == 0) {
        alert("Lütfen görev açıklamasını boş bırakmayınız!");
    } else {

        addNewTask(task);
        newTask.value = "";
        newTask.focus();
        saveLocalStorage(task);
    }
});
taskList.addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("btn-task-completed")) {
        clickedElement.parentElement.classList.toggle("task-completed");
    }
    else if (clickedElement.classList.contains("btn-task-deleted")) {
        if (confirm("Silmek istediğinizden emin misiniz?")) {
            clickedElement.parentElement.remove();
            const deletedTask = clickedElement.parentElement.children[0].innerText;
            removeFromLocalStorage(deletedTask);
        }
    }
    else if (clickedElement.classList.contains("btn-task-edit")) {
        const editedTask = clickedElement.parentElement.children[0].innerText;
        editTask(editedTask);

    }
})



function addNewTask(task) {
    //1) task-item divini oluşturuyoruz
    const taskItemDiv = document.createElement("div");
    taskItemDiv.classList.add("task-item");

    //2) task-description li'sini oluşturup task-itema ekliyoruz.
    const taskdescriptionLi = document.createElement("li");
    taskdescriptionLi.classList.add("task-description");
    taskdescriptionLi.innerText = task;
    taskItemDiv.appendChild(taskdescriptionLi);

    //3) btn-task-completed buttonunu oluşturup task-itema ekliyoruz.
    const taskBtnCompleted = document.createElement("button");
    taskBtnCompleted.classList.add("btn-task");
    taskBtnCompleted.classList.add("btn-task-completed");
    const squareIcon = document.createElement("i");
    squareIcon.classList.add("fa-solid");
    squareIcon.classList.add("fa-square-check");
    taskBtnCompleted.appendChild(squareIcon);
    taskItemDiv.appendChild(taskBtnCompleted);

    //4) btn-task-edit buttonunu oluşturup task-itema ekliyoruz.
    const taskBtnEdit = document.createElement("button");
    taskBtnEdit.classList.add("btn-task");
    taskBtnEdit.classList.add("btn-task-edit");
    const squarePen = document.createElement("i");
    squarePen.classList.add("fa-solid");
    squarePen.classList.add("fa-square-pen");
    taskBtnEdit.appendChild(squarePen);
    taskItemDiv.appendChild(taskBtnEdit);

    //5) btn-task-deleted buttonunu oluşturup task-itema ekliyoruz.
    const taskBtnDeleted = document.createElement("button");
    taskBtnDeleted.classList.add("btn-task");
    taskBtnDeleted.classList.add("btn-task-deleted");
    const squareMinus = document.createElement("i");
    squareMinus.classList.add("fa-solid");
    squareMinus.classList.add("fa-square-minus");
    taskBtnDeleted.appendChild(squareMinus);
    taskItemDiv.appendChild(taskBtnDeleted);

    taskList.appendChild(taskItemDiv);
}

function saveLocalStorage(task) {
    let tasks = convertToArray();
    if (prevValue === "") {
        tasks.push(task);
    } else {
        const indexEditedText = tasks.indexOf(prevValue);
        tasks[indexEditedText] = task;
        newTaskBtn.children[0].classList.remove("fa-square-pen");
        newTaskBtn.children[0].classList.add("fa-square-plus");
        prevValue = "";
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getLocalStorage();
}

function convertToArray() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
}

function getLocalStorage() {
    let tasks = convertToArray();
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        addNewTask(task);
    })
}

function removeFromLocalStorage(task) {
    let tasks = convertToArray();
    const indexDeletedTask = tasks.indexOf(task);
    tasks.splice(indexDeletedTask, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function editTask(task) {
    newTask.value = task;
    newTaskBtn.children[0].classList.remove("fa-square-plus");
    newTaskBtn.children[0].classList.add("fa-square-pen");
    prevValue = task;
}

getLocalStorage();