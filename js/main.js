let inputNewTask = document.getElementById('newTask');
let addBtn = document.getElementById('addBtn');
let resetBtn = document.getElementById('resetBtn');

let errorDiv = document.createElement('div');
errorDiv.className = 'error';
errorDiv.id = 'error-message';
errorDiv.style.display = 'block';

//create to Do List
let toDoList = document.createElement('ul');
toDoList.id = 'toDoList';
toDoList.className = 'list-group-item list-group-item-danger';

//create done List
let doneList = document.createElement('ul');
doneList.id = 'doneList';
doneList.className = 'list-group-item list-group-item-success';

//create task object from class Task
let task = new Task('task');

//adds the new task to the toDoList
addBtn.addEventListener('click', function (e) {
    // preventDefault prevents the link from reloading the page
    e.preventDefault();

    // create li element
    let li = document.createElement('li');

    // create input
    let inputAddedTask = document.createElement('input');
    inputAddedTask.type = 'text';
    inputAddedTask.disabled = true;
    inputAddedTask.className = 'form-control';


    if (inputNewTask.value.trim() !== "") {
        errorDiv.innerHTML = "";

        // The trim() method removes whitespace from both sides of a string.
        inputAddedTask.value = inputNewTask.value.trim();

        // Reset the value of the form input
        inputNewTask.value = "";

        // create buttons
        let updateBtn = document.createElement('button');
        let doneBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        updateBtn.innerHTML = 'Ändra';
        updateBtn.className = 'btn btn-secondary';
        doneBtn.innerHTML = 'Färdig';
        doneBtn.className = 'btn btn-success';
        deleteBtn.innerHTML = 'Radera';
        deleteBtn.className = 'btn btn-danger';

        //append children
        toDoList.append(li);
        li.append(inputAddedTask, updateBtn, doneBtn, deleteBtn);
        document.getElementById('incomplete-tasks-section').append(toDoList);

        //call method which updates to do input value
        updateBtn.addEventListener('click', task.updateAddedTaskValue);

        //call method which moves completed task to done list
        doneBtn.addEventListener('click', task.moveDoneTaskToDoneList);

        //call method which deletes a task
        deleteBtn.addEventListener('click', task.deleteTask);

        //call method which deletes all tasks from both lists
        resetBtn.addEventListener('click', task.resetTasks);

    } else {

        errorDiv.innerHTML = 'For ej skapa tomma sysslor';
        document.getElementById('form').append(errorDiv);

    }

    task.countIncompletedTasks();
    task.countcompletedTasks();
    


});