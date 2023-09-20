//generating the todo list template
let taskHtml = '' ;

let listCounter = Number(localStorage.getItem('count')) || 0 ;

const allTodoList = JSON.parse(localStorage.getItem('allList')) || [] ;

let allListHtml = '' ;

let renderTask = '' ;

const allDates = JSON.parse(localStorage.getItem('dates')) || [] ;

function renderingTodoList(){
    allListHtml = '' ;

    allTodoList.forEach((list) => {
        allListHtml += `
            <div class="todo-list-template">
                <div class="js-header-${list.id} list-header">
                    <div class="left">
                        <img src="images-and-icons/list-purple.png" alt="todo-icon" class="todo-icon">
                        <p class="list-title">Todo List</p>
                    </div>
    
                    <input type="date" name="" id="" class="js-list-date calendar">
                </div>
    
                <div class="add-task">
                    <input type="text" placeholder="Add a task" class="js-input-task-${list.id} input-box">
                    <input type="time" name="" id="" class="js-task-time-${list.id} time-box">
                    <button class="js-comit-task add-task-button"><img src="images-and-icons/plus.png" alt=""></button>
                </div>
    
                <div class="js-actual-task-${list.id} task-box">
                    
                </div>

                <div class="delete-list">
                    <button class="js-delete-list delete-list-button">Delete List</button>
                </div>
            </div>
        `;
    });

    localStorage.setItem('allList', JSON.stringify(allTodoList)) ;

    document.querySelector('.js-all-list').innerHTML = allListHtml ;

    document.querySelectorAll('.js-comit-task').forEach((button, index) => {
        button.addEventListener('click', () => {
            addingTask(index) ;
            renderingTask(index) ;
        })
    }) ;

    document.querySelectorAll('.js-delete-list').forEach((button, index) => {
        button.addEventListener('click', () => {
            deleteList(index) ;
        })
    }) ;

    document.querySelectorAll('.js-list-date').forEach((date, index) => {
        date.addEventListener('change', () => {
            allDates[index] = date.value ;
            localStorage.setItem('dates', JSON.stringify(allDates)) ;
        }); 
    }) ;
}

renderingTodoList() ;

//adding to list

function addingTodoList(){
    listCounter ++ ;
    allTodoList.push(
        {
            id: listCounter, 
            task: [] 
        }
        ) ;

    localStorage.setItem('count', `${listCounter}`) ;
    localStorage.setItem('allList', JSON.stringify(allTodoList)) ;
}

//adding task to list

function addingTask(id){
    allTodoList[id].task.push(                
        {
        content: '',
        time: '',
        done: false
    }
    ) ;

   
   /* allTodoList[id].task.forEach((value) => {
        if(value.content === '' && value.time === ''){
            value.content = document.querySelector(`.js-input-task-${id+1}`).value;
            value.time = document.querySelector(`.js-task-time-${id+1}`).value ;
        }
    }) ;*/

    if(allTodoList[id].task.length > 0){
        allTodoList[id].task.forEach((value) => {
            if(value.content === '' && value.time === ''){
                value.content = document.querySelector(`.js-input-task-${id+1}`).value;
                value.time = document.querySelector(`.js-task-time-${id+1}`).value ;
            }
        }) ;
    }
    

    localStorage.setItem(`list-${id}`, JSON.stringify(allTodoList[id].task)) ;
    localStorage.setItem('allList', JSON.stringify(allTodoList)) ;

    document.querySelector(`.js-input-task-${id+1}`).value = '' ;
    document.querySelector(`.js-task-time-${id+1}`).value = '' ;
}

//rendering task

function renderingTask(id){
    renderTask = ''

    const taskToRender = JSON.parse(localStorage.getItem(`list-${id}`)) || allTodoList[id].task ;

    if(taskToRender.length > -1){
        taskToRender.forEach((task) => {
            let taskText =  task.content ;
            let taskTime = task.time ;
    
            renderTask +=  `
            <div class="task-template">
                <input type="checkbox" class="js-checkbox-${id} check-box">
                <p class="js-task-content-${id} task-text">${taskText}</p>
                <p class="task-time">${taskTime}</p>
                <button class="js-delete-task-${id} delete-task-button"><img src="images-and-icons/delete.png" alt="delete-task"></button>
            </div>
            ` ;
    
            
        });

        document.querySelector(`.js-actual-task-${id+1}`).innerHTML = renderTask ; 

        document.querySelectorAll(`.js-delete-task-${id}`).forEach((button, index) => {
            button.addEventListener('click', () => {
                deleteTask(id, index) ;
                renderingTask(id) ;
            }) ;
        }) ;
    
        document.querySelectorAll(`.js-checkbox-${id}`).forEach((set, Index) => {
            let textContent = 'try' ;
            let checkIndex = Index ;
            let focusTask;
    
            document.querySelectorAll(`.js-task-content-${id}`).forEach((text, textIndex) => {
                if(textIndex === checkIndex){
                    textContent = text ;
                }
            }) ;
    
            taskToRender.forEach((value, taskIndex) => {
                if(checkIndex === taskIndex){
                    focusTask = value ;
                }
            }) ;
    
            set.addEventListener('click', () => {
                if(textContent.classList.contains('crossed')){
                    textContent.classList.remove('crossed') ;
                    focusTask.done = false ;
                }else{
                    textContent.classList.add('crossed') ;
                    focusTask.done = true ;
                }
                localStorage.setItem(`list-${id}`, JSON.stringify(taskToRender)) ;
                localStorage.setItem('allList', JSON.stringify(allTodoList)) ;
            }) ;
        }) ;
    
        taskToRender.forEach((task, taskIndex) => {
            let textContent = 'try' ;
            let checkIndex = taskIndex ;
            let checkBox;
    
            document.querySelectorAll(`.js-task-content-${id}`).forEach((text, textIndex) => {
                if(textIndex === checkIndex){
                    textContent = text ;
                }
            }) ;
    
            document.querySelectorAll(`.js-checkbox-${id}`).forEach((check, boxIndex) => {
                if(boxIndex === checkIndex){
                    checkBox = check ;
                }
            }) ;
    
            if(task.done === true){
                textContent.classList.add('crossed') ;
                checkBox.checked = true ;
                checkBox.classList.add('checked-box') ;
            }
        });
    }

   

    
}

//delete a todo task

function deleteTask(id, index){
    allTodoList[id].task.splice(index, 1) ;
    localStorage.setItem(`list-${id}`, JSON.stringify(allTodoList[id].task)) ;
    localStorage.setItem('allList', JSON.stringify(allTodoList)) ;
}

for(i = 0; i < allTodoList.length ; i++){
    renderingTask(i) ;
}


document.querySelector('.js-add-list-button').addEventListener('click', () => {
    addingTodoList() ;
    renderingTodoList() ;
    for(i = 0; i < allTodoList.length ; i++){
        renderingTask(i) ;
    }
});

document.querySelectorAll('.js-list-date').forEach((date, index) => {
    date.value = allDates[index]
}) ;

//deleting todo list

function deleteList(index){
    allTodoList.splice(index, 1) ;
    renderingTodoList() ;
    localStorage.setItem('allList', JSON.stringify(allTodoList)) ;

    if(allTodoList.length === 0){
        listCounter = 0 ;
        localStorage.setItem('count', `${listCounter}`) ;
    }

    allDates.splice(index, 1) ;

    listCounter -- ;

    let newId = 0 ;
    allTodoList.forEach(value => {
        newId++ ;
        value.id = newId ;
        console.log(value.id) ;
    }) ;

    renderingTodoList() ;

    localStorage.removeItem(`list-${index}`) ;

    localStorage.setItem('dates', JSON.stringify(allDates)) ;

    for(i = 0; i < allTodoList.length ; i++){
        renderingTask(i) ;
    }
}