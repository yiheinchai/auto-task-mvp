async function call_gpt(message) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer <YOUR_API_KEY>`);

  const raw = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: false,
    max_tokens: 4000,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  const result = await response.json();

  return result.choices[0].message.content;
}

async function generateSubtasks(task) {
  const response = await call_gpt(task + " What are the steps that needs to be taken?");
  const subtasks = extractListItems(response);
  return subtasks;
}

function extractListItems(text) {
  const pattern = /\d+\.\s+(.*)/g;
  const matches = text.match(pattern);

  if (matches) {
    const items = matches.map((match) => match.replace(/\d+\.\s+/, ""));
    return items;
  }

  return [];
}

// Get the DOM elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

// Define a function to create a new task element
function createTaskElement(task) {
  // Create a list item element
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  // Create a checkbox element
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.className = "task-checkbox";
  taskCheckbox.checked = task.completed;

  // Create a label element
  const taskLabel = document.createElement("label");
  taskLabel.className = "task-label";
  taskLabel.textContent = task.name;
  if (task.completed) {
    taskLabel.classList.add("checked");
  }

  // Create an edit button element
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.textContent = "Edit";

  // Create a delete button element
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  // Create an add subtask button element // NEW CODE
  const addSubtaskButton = document.createElement("button"); // NEW CODE
  addSubtaskButton.className = "add-subtask-button"; // NEW CODE
  addSubtaskButton.textContent = "+"; // NEW CODE

  // Create generate subtask button element
  const generateSubtaskButton = document.createElement("button");
  generateSubtaskButton.className = "generate-subtask-button";
  generateSubtaskButton.textContent = "+ auto";

  // Create wrapper for task
  const taskWrapper = document.createElement("div");
  taskWrapper.className = "task-wrapper";

  // Create container for subtasks // NEW CODE
  const subtaskList = document.createElement("ul");
  subtaskList.className = "task-list";

  if (task.subtasks.length > 0) {
    const subtaskElements = task.subtasks.map((subtask) => createTaskElement(subtask));
    subtaskElements.forEach((subtaskElement, index) => {
      subtaskList.appendChild(subtaskElement);
      addTaskEventListeners(subtaskElement, task.subtasks, index);
    });
  }

  // Append the elements to the list item element
  taskWrapper.appendChild(taskCheckbox);
  taskWrapper.appendChild(taskLabel);
  taskWrapper.appendChild(editButton);
  taskWrapper.appendChild(deleteButton);
  taskWrapper.appendChild(addSubtaskButton); // NEW CODE
  taskWrapper.appendChild(generateSubtaskButton);
  taskItem.appendChild(taskWrapper);
  taskItem.appendChild(subtaskList); // NEW CODE

  // Return the list item element
  return taskItem;
}

// Define a function to update the parent label style based on the subtasks completion status
function updateParentLabelStyle(subtasks) {
  // Get the parent element of the subtasks list element
  const parentElement = subtasks[0].parentElement.parentElement;
  // If the parent element is a task item element, get its label element
  if (parentElement.classList.contains("task-item")) {
    const parentLabel = parentElement.querySelector(".task-label");
    // Check if all the subtasks are completed or not
    const allCompleted = subtasks.every((subtask) => subtask.completed);
    // Add or remove the checked class to or from the parent label element depending on whether all the subtasks are completed or not
    if (allCompleted) {
      parentLabel.classList.add("checked");
    } else {
      parentLabel.classList.remove("checked");
    }
  }
}

// Define a function to update the local storage data based on the changes in the tasks array
function updateLocalStorage() {
  // Convert the tasks array into a JSON string and store it in the local storage under the key "tasks"
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Define an array to store the tasks data
let tasks = [];

// Check if there is any data stored in the local storage under the key "tasks"
if (localStorage.getItem("tasks")) {
  // Parse the JSON string stored in the local storage into an array and assign it to the tasks variable
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

renderTasks(tasks);

function renderTasks(tasks) {
  // Loop through the tasks array and append each task element to the task list element
  for (let i = 0; i < tasks.length; i++) {
    const taskElement = createTaskElement(tasks[i]);
    taskList.appendChild(taskElement);
    // Add event listeners to the elements of the task element
    addTaskEventListeners(taskElement, tasks, i);
  }
}
// Add a submit event listener to the add task form element
addTaskButton.addEventListener("click", onAddTaskButtonClick);

function onAddTaskButtonClick(event) {
  // Prevent the default behavior of the form submission
  event.preventDefault();
  // Get the value of the task input element and trim any whitespace
  const taskName = taskInput.value.trim();
  // If the task name is not empty, create a new task object and push it to the tasks array
  if (taskName !== "") {
    const newTask = {
      name: taskName,
      completed: false,
      subtasks: [],
    };
    tasks.push(newTask);
    // Create a new task element
    const newTaskElement = createTaskElement(newTask);
    // Append the new task element to the task list element
    taskList.appendChild(newTaskElement);
    // Add event listeners to the elements of the new task element
    addTaskEventListeners(newTaskElement, tasks, tasks.length - 1);
    // Clear the value of the task input element
    taskInput.value = "";
    // Update the local storage data based on the changes in the tasks array
    updateLocalStorage();
  }
}

// Define a function to add event listeners to the elements of a task element
function addTaskEventListeners(taskElement, tasks, index) {
  // Get the checkbox, label, edit button and delete button elements from the task element
  const taskCheckbox = taskElement.querySelector(".task-checkbox");
  const taskLabel = taskElement.querySelector(".task-label");
  const editButton = taskElement.querySelector(".edit-button");
  const deleteButton = taskElement.querySelector(".delete-button");
  const addSubtaskButton = taskElement.querySelector(".add-subtask-button"); // NEW CODE
  const generateSubtaskButton = taskElement.querySelector(".generate-subtask-button");
  const subtasks = tasks[index].subtasks;
  const subtaskList = taskElement.querySelector(".task-list");
  // Add a change event listener to the checkbox element
  taskCheckbox.addEventListener("change", function () {
    // Toggle the completed property of the task object in the tasks array
    tasks[index].completed = !tasks[index].completed;
    // Toggle the checked class to or from the label element depending on whether the task is completed or not
    if (tasks[index].completed) {
      taskLabel.classList.add("checked");
    } else {
      taskLabel.classList.remove("checked");
    }
    // Update the local storage data based on the changes in the tasks array
    updateLocalStorage();
  });

  // Add a click event listener to the edit button element
  editButton.addEventListener("click", function () {
    // Prompt the user to enter a new name for the task
    const newName = prompt("Enter a new name for the task", taskLabel.textContent);
    // If the user enters a valid name, update the name property of the task object in the tasks array and the text content of the label element
    if (newName && newName.trim() !== "") {
      tasks[index].name = newName;
      taskLabel.textContent = newName;
      // Update the local storage data based on the changes in the tasks array
      updateLocalStorage();
    }
  });

  // Add a click event listener to the delete button element
  deleteButton.addEventListener("click", function () {
    // Confirm with the user if they want to delete the task
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    // If the user confirms, remove the task object from the tasks array and remove the task element and its subtask list element (if any) from the task list element
    if (confirmDelete) {
      tasks.splice(index, 1);
      taskElement.remove();
      const nextElement = taskElement.nextElementSibling;
      if (nextElement && nextElement.classList.contains("task-list")) {
        taskList.removeChild(nextElement);
      }
      // Update the local storage data based on the changes in the tasks array
      updateLocalStorage();
    }
  });

  addSubtaskButton.addEventListener("click", function (event) {
    // Prevent the default behavior of the form submission
    event.preventDefault();

    const taskName = prompt("Enter a name for task");
    if (taskName !== "") {
      const newTask = {
        name: taskName,
        completed: false,
        subtasks: [],
      };
      tasks[index].subtasks.push(newTask);
      // Create a new task element
      const newTaskElement = createTaskElement(newTask);
      // Append the new task element to the task list element
      subtaskList.appendChild(newTaskElement);
      // Add event listeners to the elements of the new task element
      addTaskEventListeners(newTaskElement, tasks[index].subtasks, subtasks.length - 1);
      // Clear the value of the task input element
      taskInput.value = "";
      // Update the local storage data based on the changes in the tasks array
      updateLocalStorage();
    }
  }); // NEW CODE

  generateSubtaskButton.addEventListener("click", async function (event) {
    const subtasksNames = await generateSubtasks(tasks[index].name);
    const subtasks = subtasksNames.map((subtaskName) => {
      return {
        name: subtaskName,
        completed: false,
        subtasks: [],
      };
    });
    tasks[index].subtasks = subtasks;
    subtasks.forEach((subtask, index) => {
      const element = createTaskElement(subtask);
      addTaskEventListeners(element, subtasks, index);
      subtaskList.appendChild(element);
    });

    updateLocalStorage();
  });
}
