// aquí va el código

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let total = document.getElementById("Total");
let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidaciones = document.getElementById("alertValidaciones");
let idTimeout;
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
// txtNombre.value = txtNombre.value.trim();
// alertValidaciones.style.display="none";
// alertValidaciones.innerHTML="";



//Genera un precio al azar
    function getPrecio(){
        return Math.floor(Math.random() * 50 *100)/100;
    } //getPrecio

    function validarNombre(){
        // if (txtNombre.value.trim().replaceAll("  " , "").length <=2) {  //se remplazan los espacios y se configura para que no tenga menos de 20 letras
        //     alertValidaciones.innerHTML= "El producto debe tener mas de una letra";
        //     alertValidaciones.style.display="block";
        //     txtNombre.focus();
        //     txtNombre.select();
        //     txtNombre.style.border="solid red 1px";
        // } else {  //if
        //     txtNombre.style.border="solid green 1px";
        //     validos++;
        // }  //else
        return (txtNombre.value.length>=2)?true:false;
    }//validarNombre

    function validarCantidad(){
        // if (txtNumber.value.trim().replaceAll("  " , "").length <=0) {  //se remplazan los espacios y se configura para que no tenga menos de 20 letras
        //     alertValidaciones.innerHTML= "¿Cuantos productos quieres?";
        //     alertValidaciones.style.display="block";
        //     txtNumber.style.border="solid red 1px";
        // } else {  //if
        //     txtNumber.style.border="solid green 1px";
        //     validos++;
        // }  //else
        if(txtNumber.value.length==0){
            return false;
        }// if
        //isNan es si no es un numero
        if (isNaN(txtNumber.value)){
            return false;
        }//if
        if (parseFloat(txtNumber.value)<=0){
            return false;
        } //if
        return true;
    }//validarCantidad


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    clearTimeout(idTimeout);
        if ((! validarNombre()) || (! validarCantidad())) {
            let lista ="<ul>";
            if (! validarNombre()) {
                txtNombre.style.border="red thin solid";
                lista += "<li>Se debe escribir un nombre válido</li>";
            }// if validarNombre
            
            if (! validarCantidad()) {
                txtNumber.style.border = "red thin solid";
                lista += "<li>Se debe escribir un numero válido</li>";
            }// if validarCantidad
            lista += "<ul>";
            alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
            alertValidaciones.style.display="block";
            idTimeout = setTimeout (function() {
                alertValidaciones.style.display="none";
            }, 5000);
    

        }     
});