let input = document.getElementById('input');
let addBtn = document.getElementById('addBtn');
let resetBtn = document.getElementById('resetBtn');
let errorDiv = document.createElement('div');
errorDiv.className = 'error';
errorDiv.id = 'error-message';
errorDiv.style.display = 'block';

//create to Do List
let toDoList = document.createElement('ul');
toDoList.id = 'toDoList';

//create done List
let doneList = document.createElement('ul');
doneList.id = 'doneList';

let count = toDoList.childElementCount;

addBtn.addEventListener('click', function (e) {
    // preventDefault prevents the link from reloading the page
    e.preventDefault();


    let li = document.createElement('li');

    // create input
    let inputToDo = document.createElement('input');
    inputToDo.type = 'text';
    inputToDo.disabled = true;

    inputToDo.className = 'form-control';
    let value = inputToDo.value.trim();

    if (input.value !== "" ) {

        inputToDo.value = input.value;
        removeErrorMessages();

        // create buttons
        let changeBtn = document.createElement('button');
        let doneBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        changeBtn.innerHTML = 'Ändra';
        changeBtn.id = 'change';
        changeBtn.className = 'btn btn-outline-secondary';
        doneBtn.innerHTML = 'Färdig';
        doneBtn.className = 'btn btn-outline-secondary';
        deleteBtn.innerHTML = 'Radera';
        deleteBtn.className = 'btn btn-outline-secondary';

        //append children
        toDoList.append(li);
        li.append(inputToDo, changeBtn, doneBtn, deleteBtn);
        document.getElementById('toDoSection').append(toDoList);

        //change to do list text
        changeBtn.addEventListener('click', function (e) {
            // preventDefault prevents the link from reloading the page
            e.preventDefault();

            if (inputToDo.value !== "") {
                removeErrorMessages();

                if (e.target.innerHTML === 'Ändra') {
                    e.target.innerHTML = "Spara";
                    inputToDo.disabled = false;

                }
                else {
                    e.target.innerHTML = "Ändra";
                    inputToDo.disabled = true;

                }
            }
            else {

                errorDiv.innerHTML = 'Tomma sysslor kan ej sparas';
                document.getElementById('toDoSection').append(errorDiv);

            }
        });

        //move done work to finish list
        doneBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (inputToDo.value !== "") {
                removeErrorMessages();

                let li = document.createElement('li');
                e.target.parentNode.remove();

                //append children
                doneList.append(li);
                li.append(inputToDo, changeBtn, deleteBtn);
                document.getElementById('doneSection').append(doneList);


            }


            else {
                errorDiv.innerHTML = 'Tomma sysslor kan ej flyttas';
                document.getElementById('toDoSection').append(errorDiv);
            }

        });

        //delete the planed list
        deleteBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.target.parentNode.remove();

        });

        //delete all planed and done list
        resetBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var lists = document.getElementsByTagName('ul');
            console.log(lists);
            for (let list of lists) {
                list.remove();
            }


        });



    }
    else {


        errorDiv.innerHTML = 'For ej skapa tomma sysslor';
        document.getElementById('form').append(errorDiv);


    }



    //remove error meassages
    function removeErrorMessages() {
        let errors = document.querySelectorAll(".error");
        for (let error of errors) {
            error.innerHTML = "";
        }

    }


    isStringEmpty = function (field) {
        // trim() removes all spaces beofe and after the string
        return field.value.trim() === ''
    }



});