// aquí va el código

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let total = document.getElementById("Total");
let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");
let idTimeout;
let contador = 0;
let cantidad = 0;
let totalEnProductos = 0;
let costoTotal = 0;
let precio = 0;
let datos = []; //new Array();
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
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
            return false;
        }  // if ! validaciones
        txtNombre.style.border="";
        txtNumber.style.border="";
        alertValidaciones.style.display="none";
        contador++;
        contadorProductos.innerHTML = contador;
        cantidad = parseFloat(txtNumber.value);
        totalEnProductos += cantidad;
        productosTotal.innerHTML = totalEnProductos;
        precio = getPrecio();
        costoTotal += precio * cantidad;
        precioTotal.innerHTML ="$ " + costoTotal.toFixed(2);
        
        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal)

        let row = `<tr>
            <td> ${contador} </td>
            <td> ${txtNombre.value} </td>
            <td> ${txtNumber.value} </td>
            <td> ${precio} </td>
        </tr>`; 

        cuerpoTabla[0].insertAdjacentHTML("beforeend", row);

        let elemento = `{
            "id" : ${contador},
            "nombre" : "${txtNombre.value}",
            "cantidad" : ${txtNumber.value},
            "precio" : ${precio} 
    }`; 
    datos.push(JSON.parse(elemento) );
    // console.log(datos);
    localStorage.setItem("datos", JSON.stringify(datos));
    
    

        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

});


txtNombre.addEventListener("blur", function (event) {
    event.preventDefault();
    // txtNombre.value = txtNombre.value.trim();
    event.target.value = event.target.value.trim();
});
txtNumber.addEventListener("blur", function (event) {
    event.preventDefault();
    event.target.value = event.target.value.trim();
});

window.addEventListener("load", function(event){
    let tmp = localStorage.getItem("contadorProductos");
    if(tmp!=null) {
        contador=parseInt(tmp);
        contadorProductos.innerHTML=contador;
    }//if
    tmp = localStorage.getItem("totalEnProductos");
    if(tmp!=null) {
        totalEnProductos=parseInt(tmp);
        productosTotal.innerHTML=totalEnProductos;
    }//if
    tmp = localStorage.getItem("costoTotal");
    if(tmp!=null) {
        costoTotal=parseFloat(tmp);
        precioTotal.innerHTML="$ "+ costoTotal.toFixed(2);
    }//id

    tmp = localStorage.getItem("datos");
    if (tmp!=null) {
        datos = JSON.parse(tmp);
        datos.forEach(element => {
            cuerpoTabla[0].innerHTML += `<tr>
            <th>${element.id}</th>
            <td> ${element.nombre} </td>
            <td> ${element.cantidad} </td>
            <td> ${element.precio} </td>
        </tr>`; 
        
        }); //if
    }
    btnClear.addEventListener("click", function(event) {
        contador=0;
        contadorProductos.innerHTML=contador;
        totalEnProductos=0;
        productosTotal.innerHTML=totalEnProductos;
        costoTotal=0;
        precioTotal.innerHTML="$ "+ costoTotal.toFixed(2);
        cuerpoTabla[0].innerHTML="";

        localStorage.removeItem("contadorProductos");
        localStorage.removeItem("totalEnProductos");
        localStorage.removeItem("costoTotal");
        localStorage.removeItem("datos");

        localStorage.clear();

    });
});
