class Task {
    constructor(name) {
        this.name = name;

    }

    //updates the task input value
    //user can not save an empty value or just whitespaces > error message 
    updateAddedTaskValue = function (e) {
        e.preventDefault();
        errorDiv.innerHTML = "";
        let clickedBtn = e.target;
        let parent = clickedBtn.parentNode;
        let inputAddedTask = parent.children[0];


        if (inputAddedTask.value.trim() !== "") {
            // The trim() method removes whitespace from both sides of a string
            inputAddedTask.value = inputAddedTask.value.trim();
            if (clickedBtn.innerHTML === 'Ändra') {
                clickedBtn.innerHTML = "Spara";
                inputAddedTask.disabled = false;

            } else {
                clickedBtn.innerHTML = "Ändra";
                inputAddedTask.disabled = true;
            }
        } else {

            errorDiv.innerHTML = 'Tomma sysslor kan ej sparas';
            document.getElementById('incomplete-tasks-section').append(errorDiv);
        }


    }

    //moves the done task to doneList when user click on done button (färdig knap)
    //user can not move an empty or unsaved task to doneList
    moveDoneTaskToDoneList = function (e) {
      
        e.preventDefault();

        let clickedBtn = e.target;
        let inputToDoTask = clickedBtn.parentNode.children[0];
        let changeBtn = clickedBtn.parentNode.children[1];
        let deleteBtn = clickedBtn.parentNode.children[3];


        if (inputToDoTask.value.trim() !== "" && changeBtn.innerHTML != 'Spara') {
            errorDiv.innerHTML = "";

            clickedBtn.parentNode.remove();

            let li = document.createElement('li');

            //append children
            doneList.append(li);
            li.append(inputToDoTask, changeBtn, deleteBtn);
            document.getElementById('complete-tasks-section').append(doneList);
            task.countIncompletedTasks();
            task.countcompletedTasks();

        } else {
            errorDiv.innerHTML = 'Spara din syssla för att kunna flytta till Färdiga';
            document.getElementById('incomplete-tasks-section').append(errorDiv);
        }


    }

    // deletes a specific task 
    deleteTask = function (e) {
        e.preventDefault();
        e.target.parentNode.remove();
        errorDiv.innerHTML = "";
        if (toDoList.parentNode) { return task.countIncompletedTasks(); }
        if (doneList.parentNode) { return task.countcompletedTasks(); }

    }

    // deletes all tasks from both lists
    resetTasks = function () {

        let lists = document.querySelectorAll('li');
       //delete all tasks (li elements)
        for (let list of lists) {

            list.remove(); 

        }
        //if lists has no children (tasks) remove toDoList and doneList
       if(toDoList.childNodes.length == 0){
           toDoList.remove();
           document.getElementById("count-incompleted-tasks").innerHTML = '';
        
        }
       if(doneList.childNodes.length == 0){
           doneList.remove();
           document.getElementById("count-completed-tasks").innerHTML = '';
        }
        

    }

    // counts the incompleted tasks in toDoList
    countIncompletedTasks = function () {

        let numToDoListChildren = document.getElementById("toDoList").children.length;
        document.getElementById("count-incompleted-tasks").innerHTML = ` (${numToDoListChildren}) syssla/sysslor kvar att göra...`;

        if (numToDoListChildren == 0) {

            document.getElementById('toDoList').remove();

        }

    }

    // counts the completed tasks in doneList
    countcompletedTasks = function () {

        let numDoneListChildren = document.getElementById("doneList").children.length;
        document.getElementById("count-completed-tasks").innerHTML = ` (${numDoneListChildren}) syssla/sysslor är färdig/färdiga...`;

        if (numDoneListChildren == 0) {

            document.getElementById('doneList').remove();

        }

    }
}