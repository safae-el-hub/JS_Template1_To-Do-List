/*
1- use sweet alert in the user add a empty value
2- check if task is exist
3- create delete all tasks
4- create finish all tasks
5- add to tasks to the local storage
 */

//setting up variables
let theInput = document.querySelector(".add-task input");
let theAddBtn = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let deleteAllBtn = document.querySelector(".deleteAll");
let finishAllBtn = document.querySelector(".finishAll");
let storageArr = JSON.parse(window.localStorage.getItem("tasks")) || [];

// Focus On Input feild
window.onload = function () {
  theInput.focus();
};

//Adding The Task

theAddBtn.onclick = function () {
  //if input is empty
  if (theInput.value === "") {
    Swal.fire({
      title: "Empty Value!",
      theme: "dark",
      text: "You Can Not Add A Empty Value",
      icon: "warning",
      confirmButtonColor: "#e79d3c",
    });
  } else {
    // add tasks in local storage as Array
    storageArr.push(theInput.value);
    window.localStorage.setItem("tasks", JSON.stringify(storageArr));

    let isExists = false;
    let tasks_box = document.querySelectorAll(".tasks-content .task-box");

    for (let i = 0; i < tasks_box.length; i++) {
      if (tasks_box[i].firstChild.textContent === theInput.value) {
        //if task aleready exist dont added in localstorage
        storageArr = storageArr.filter((_, index) => index !== i);
        window.localStorage.setItem("tasks", JSON.stringify(storageArr));
        // window.localStorage.setItem("tasks",JSON.stringify(storageArr.slice(i,1)));

        isExists = true;
        break;
      }
    }

    if (isExists) {
      Swal.fire({
        title: "Already Exists!",
        text: "This task already exists",
        icon: "error",
        theme: "dark",
        confirmButtonColor: "#e74c3c",
      });
      return false;
    }

    createTasks(theInput.value);
    
  }
};

function createTasks(task) {
  let noTasksMsg = document.querySelector(".no-tasks-message");

  // check if span with no tasks message is exist
  if (document.body.contains(document.querySelector(".no-tasks-message"))) {
    //remove no tasks message
    noTasksMsg.remove();
  }
  //create  main span element
  let mainSpan = document.createElement("span");

  // create delete btn
  let deleteBtn = document.createElement("span");

  // create finish btn
  let finishBtn = document.createElement("i");

  // create the finished class icon
  finishBtn.className = "fa-solid fa-check check-icon";

  //create the main span text
  let text = document.createTextNode(task);

  //create the delete button text
  let textDelete = document.createTextNode("x");

  // add text to main span
  mainSpan.appendChild(text);

  // add class to main span
  mainSpan.className = "task-box";

  // add text to delete button
  deleteBtn.appendChild(textDelete);

  //add class to delete element
  deleteBtn.className = "delete";

  // add delete btn to main span
  mainSpan.appendChild(deleteBtn);
  mainSpan.appendChild(finishBtn);

  //add the task to the container

  tasksContainer.appendChild(mainSpan);

  if (document.querySelectorAll(".tasks-content .task-box").length > 0) {
    deleteAllBtn.style.display = "block";
    finishAllBtn.style.display = "block";
  }

  // emplty the input
    theInput.value = "";
    // focus on field
    theInput.focus();
    // calculate tasks function
    calculatTasks();
  // finished all function
  finishAll();
  // delete all function

  deleteAll();
}

document.addEventListener("click", function (e) {
  // delete task
  if (e.target.className == "delete") {
    // remove current task
    e.target.parentNode.remove();
    storageArr = storageArr.filter(
      (ele) => ele !== e.target.parentNode.firstChild.textContent,
    );
    window.localStorage.setItem("tasks", JSON.stringify(storageArr));
    // check number of tasks in side the conatiner
    if (document.querySelectorAll(".tasks-content .task-box").length == 0) {
      deleteAllBtn.style.display = "none";
      finishAllBtn.style.display = "none";
      createNoTasks();
    }

    // calculate tasks function
    calculatTasks();
  }

  // //finish task
    if (e.target.classList.contains("check-icon")) {
      let task = e.target.parentNode;
       // toggle class "finished"
    task.classList.toggle("finished");
    // calculate tasks function
    calculatTasks();
  }
  
  
});




// function to create no tasks message
function createNoTasks() {
  // create message span element
  let msgSpan = document.createElement("span");

  //create the text message
  let msgText = document.createTextNode("No Tasks To Show");

  //add text to message span element
  msgSpan.appendChild(msgText);

  // add class to message span
  msgSpan.className = "no-tasks-message";

  // append the message  span element to task container
  tasksContainer.appendChild(msgSpan);
}

storageArr.forEach(function (task) {
  createTasks(task);
});

// function to calculate tasks
function calculatTasks() {
  // claculate all tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box",
  ).length;

  // claculate completed tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished",
  ).length;
}

function deleteAll() {
  deleteAllBtn.onclick = function () {
    let deleteTasks = document.querySelectorAll(".tasks-content .task-box");
    deleteTasks.forEach((task) => {
      task.remove();
    });
    storageArr = [];
    window.localStorage.removeItem("tasks");
    deleteAllBtn.style.display = "none";
    finishAllBtn.style.display = "none";
    tasksCount.innerHTML = 0;
    tasksCompleted.innerHTML = 0;
    createNoTasks();
  };
}

function finishAll() {
  finishAllBtn.onclick = function () {
    let completedtasks = document.querySelectorAll(".tasks-content .task-box");
    completedtasks.forEach((task) => {
      task.classList.add("finished");
    });
    tasksCompleted.innerHTML = completedtasks.length;
  };
}
