const todoForm = document.querySelector(".form-todo");
const todoInput = todoForm.querySelector("input");
const addTodo = todoForm.querySelector("button");

const todoBox = document.querySelector(".todo-box");
const todoList = todoBox.querySelector(".todo");
const progressList = todoBox.querySelector(".progress");
const completedList = todoBox.querySelector(".completed");

const TODO_CN = "todo",
    PROGRESS_CN = "progress",
    COMPLETED_CN = "completed";

function createItem(type, text){
    // create todoItem html element
    const item = document.createElement("li");
    switch(type){
        case TODO_CN:
            item.setAttribute("class", "todo__item");
            item.innerHTML = `
            <span>${ text }</span>
            <button class="remove">X</button>
            <button class="right">></button>
            `
            break;
        case PROGRESS_CN:
            item.setAttribute("class", "progress__item");
            item.innerHTML = `
            <button class="left"><</button>
            <span>${ text }</span>
            <button class="remove">X</button>
            <button class="right">></button>
            `
            break;
        case COMPLETED_CN:
            item.setAttribute("class", "completed__item");
            item.innerHTML = `
            <button class="left"><</button>
            <span>${ text }</span>
            <button class="remove">X</button>
            `
            break;
        default:
            break;
    }

    const buttons = item.getElementsByTagName("button");
    for(let button of buttons){
        button.addEventListener("click", buttonHandler);
    }

    return item;
}

function addItem(type, item){
    // add todoItem into html
    switch(type){
        case TODO_CN:
            todoList.appendChild(item);
            break;
        case PROGRESS_CN:
            progressList.appendChild(item);
            break;
        case COMPLETED_CN:
            completedList.appendChild(item);
            break;
        default:
            break;
    }
}

function removeItem(type, item){
    // remove todoItem from html
    switch(type){
        case TODO_CN:
            todoList.removeChild(item);
            break;
        case PROGRESS_CN:
            progressList.removeChild(item);
            break;
        case COMPLETED_CN:
            completedList.removeChild(item);
            break;
        default:
            break;
    }
}

function buttonHandler(){
    // todoItem button handler
    const currentItem = this.parentElement;
    const currentList = currentItem.parentElement;
    const currentType = currentList.getAttribute("class");
    const currentIndex = Array.prototype.indexOf.call(currentList.getElementsByTagName("li"), currentItem);
    const todo = currentItem.querySelector("span").innerText;
    
    if(this.classList.contains("left")){
        // left button
        const type = currentType === PROGRESS_CN ? TODO_CN : PROGRESS_CN;
        const item = createItem(type, todo);
        addItem(type, item);
        removeItem(currentType, currentItem);
        saveTodo(type, todo);
        deleteTodo(currentType, currentIndex);
    }
    else if(this.classList.contains("right")){
        // right button
        const type = currentType === PROGRESS_CN ? COMPLETED_CN : PROGRESS_CN;
        const item = createItem(type, todo);
        addItem(type, item);
        removeItem(currentType, currentItem);
        saveTodo(type, todo);
        deleteTodo(currentType, currentIndex);
    }
    else{
        // remove button
        removeItem(currentType, currentItem);
        deleteTodo(currentType, currentIndex);

    }
}

function getList(type){
    // get todo list from local storage
    const list = JSON.parse(localStorage.getItem(type));
    if(list === null){
        return [];
    }
    return list;
}

function saveTodo(type, text){
    // save todo into local storage
    const todos = getList(type);
    todos.push(text);
    localStorage.setItem(type, JSON.stringify(todos));
}

function deleteTodo(type, index){
    // delete todo from local storage
    const todos = getList(type);
    todos.splice(index, 1);
    localStorage.setItem(type, JSON.stringify(todos));
}


(function init(){
    // draw saved todos on screen
    const todos = getList(TODO_CN);
    const progs = getList(PROGRESS_CN);
    const comps = getList(COMPLETED_CN);

    for(let todo in todos){
        const item = createItem(TODO_CN, todos[todo]);
        addItem(TODO_CN, item);
    }
    for(let prog in progs){
        const item = createItem(PROGRESS_CN, progs[prog]);
        addItem(PROGRESS_CN, item);
    }
    for(let comp in comps){
        const item = createItem(COMPLETED_CN, comps[comp]);
        addItem(COMPLETED_CN, item);
    }

    // todo form event
    todoForm.addEventListener("submit", function(event){
        event.preventDefault();
        const todo = todoInput.value;
        const item = createItem(TODO_CN, todo);
        addItem(TODO_CN, item);
        saveTodo(TODO_CN, todo);
        todoInput.value = "";
    });

})();