const clockContainer = document.querySelector(".js-clock");
const clock = clockContainer.querySelector(".js-clock__title");

function setClock(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clock.innerText = `${ hours < 10 ? `0${ hours }` : hours }:${ minutes < 10 ? `0${ minutes }` : minutes }:${ seconds < 10 ? `0${ seconds }` : seconds }`
}

(function init(){
    setInterval(setClock, 100);
})();
