const form = document.querySelector(".form-name");
const input = form.querySelector("input");
const greet = document.querySelector(".greeting");

const USER_LS = "user", SHOW_CN = "show";

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askName();
    }
    else{
        paintGreeting(currentUser);
    }
}

function askName(){
    form.classList.add(SHOW_CN);
}

function paintGreeting(text){
    form.classList.remove(SHOW_CN);
    greet.innerText = `Hello, ${ text }!!`;
    greet.classList.add(SHOW_CN);
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

(function init(){
    form.addEventListener("submit", function(event){
        event.preventDefault();
        const userName = input.value;
        input.value = "";
        saveName(userName);
        loadName();
    });

    greet.addEventListener("click", function(){
        form.classList.toggle(SHOW_CN);
        greet.classList.toggle(SHOW_CN);
        input.value = localStorage.getItem(USER_LS);
        input.focus();
    });

    loadName();
})();