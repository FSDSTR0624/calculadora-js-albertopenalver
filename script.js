
const botones = document.querySelectorAll(".boton");
const pantalla = document.getElementById("screen");
const calculadora = document.getElementById("calculadora");
let primerNumero = "";
let operador = "";
let nuevoNumero =false;

let calculadoraEncendida =false;

if(calculadoraEncendida === false){
    pantalla.value = "OFF"
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}


function product(a, b) {
    return a * b;
}


function division(a, b) {
    if (b === 0) {
        return 'Error: división por cero';
    } else {
        return a / b;
    }
}

function clear() {
    pantalla.value = "0";
    primerNumero = "";
    operador = "";
}

function quitarUltimo() {
        pantalla.value = pantalla.value.slice(0, -1) || "0";
}


function calcularResultado() {

    if(calculadoraEncendida === false){
        return;
    }

    const segundoNumero = Number(pantalla.value);

    if (operador === "" || primerNumero === "") {
        return;
    }

    let resultado = 0;

    if (operador === '+') {
        resultado = add(primerNumero, segundoNumero);
    } else if (operador === '-') {
        resultado = substract(primerNumero, segundoNumero);
    } else if (operador === '*') {
        resultado = product(primerNumero, segundoNumero);
    } else if (operador === '/') {
        resultado = division(primerNumero, segundoNumero);
    }

    pantalla.value = resultado;
    primerNumero = resultado;
}

function encenderApagar() {
    

    if (calculadoraEncendida === false) {
        calculadoraEncendida = true
        calculadora.classList.add('pantallaEncendida');
        calculadora.classList.remove('pantallaApagada');

        pantalla.value = "0";
        primerNumero = "";
        operador = "";
        botones.forEach(boton => boton.disabled = false);
        
    } else {
        calculadoraEncendida = false
        calculadora.classList.remove('pantallaEncendida');
        calculadora.classList.add('pantallaApagada');;
        
        pantalla.value = "OFF";
        botones.forEach(boton => {
            if (boton !== botonEncendidoApagado) {
                boton.disabled = true;
            }
        });
    }
}

botones.forEach(function(boton) {
    boton.addEventListener("click", function() {

        if(calculadoraEncendida === false){
            return;
        } 

        const contenidoPantalla = pantalla.value;

        if (boton.classList.contains('numero') || boton.classList.contains('decimal')) {
            if (boton.textContent === '.' && contenidoPantalla.includes('.')) {
                return;
            }
            if (nuevoNumero === true) {
                pantalla.value = boton.textContent;
                nuevoNumero = false;
            } else {
                if (contenidoPantalla === "0" && boton.textContent !== '.') {
                    pantalla.value = boton.textContent;
                } else {
                    pantalla.value += boton.textContent;
                }
            }
        } else if (boton.classList.contains('operador')) {
            if (operador !== "") {
                calcularResultado();
                pantalla.value = primerNumero;
            } else {
                primerNumero = Number(pantalla.value);
                pantalla.value = "";
            }
            operador = boton.textContent;
            nuevoNumero = true;
        } else if (boton.textContent === '=') {
            calcularResultado();
            operador = ""; 
        } else if (boton.classList.contains('limpiar')) {
            clear();
        } else if (boton.classList.contains('quitar')) {
            quitarUltimo();
        }
    });
});