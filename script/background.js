const body = document.querySelector("body");

function paintImage(){
    const image = new Image();
    image.src = `https://picsum.photos/${window.outerWidth}/${window.outerHeight}`;
    image.addEventListener("load", function(){
        this.classList.add("loaded");
    });
    body.prepend(image);
}

(function init(){
    paintImage();
})();