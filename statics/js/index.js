function init_canvas(){
	posX=-900;
	setInterval('animation_canvas()',50);
}

function animation_canvas(){
	posX++;
	canvas.width=1150;
	c.font="20px Titillium Web"
	c.fillStyle="rgb(89, 87, 87)";
	c.fillText("Task Remind - Todos los derechos reservados",15-posX,35);
	c.closePath()
}

function init_validador(){
    nombre = document.getElementById("nombre")
    email = document.getElementById("email")
    nombre.addEventListener("input", validate_form, false)
    email.addEventListener("input", validate_form, false)
    validate_form()
}

function validate_form(){
    if(nombre.value==''){
        nombre.setCustomValidity('Ingrese su nombre por favor.')
        nombre.style.background='#FFF5D8'
    }else {
        nombre.setCustomValidity('')
        nombre.style.background='#FFFFFF'
    }
    if (email.value=='') {
        email.setCustomValidity('Ingrese su mail por favor.')
        email.style.background='#FFF5D8'

    }else{
        email.setCustomValidity('')
        email.style.background='#FFFFFF'
    }
}

window.addEventListener("load", init_validador, false)
window.addEventListener('load',init_canvas);
var canvas = document.getElementById("canvas_r2l");
var c = canvas.getContext("2d");