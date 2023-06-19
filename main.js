let contenedorCheckbox = document.getElementById("checkbox");
/* import {filtrarPorCheck,happenedEvent,filtrarPorSearch,filtrosCruzados,insertarChecks} from './assets/funcionesjs' */


let data;
fetch ('https://mindhub-xj03.onrender.com/api/amazing')
.then(data => data.json())
.then(res => {
  data = res
  console.log(data)
  
  printData(data.events, contenedorCards)
  const fnMap = (elemento) => elemento.category;
  const categorias = data.events.map(fnMap);
  const categoriasNoRepetidas = new Set(categorias);
  const arrayCategoriasNoRepetidas = Array.from(categoriasNoRepetidas)
  let template = "";
  categoriasNoRepetidas.forEach((element) => {
    console.log(element);
    template += insertarChecks(element);
  });
  contenedorCheckbox.innerHTML += template;
  let inputCheckbox = Array.from(document.querySelectorAll("input[type=checkbox]"));
  inputCheckbox.forEach((input) => {
  input.addEventListener("click", (event) => {
  const categoriasFiltradas= filtrosCruzados(data.events);
  printData(categoriasFiltradas, contenedorCards)
});
});
})
.catch(err => console.log (err))

// funcion para crear los checkbox
function insertarChecks(checks) {
  return `<input type="checkbox" id="${checks}-input" value="${checks}">
            <label for="${checks}-input">${checks}</label>
            
            `
} 


//Obtener las categorias
// recibe el elemento y me muestra las categorias de ese elemento
/* const fnMap = (elemento) => elemento.category; */
/* const categorias = data.events.map(fnMap); */
/* console.log(categorias); */ // array nuevo con las categorias(pero estan repetidas)
// Sacar las categorias repetidas con Set(almacena valores unicos)
/* const categoriasNoRepetidas = new Set(categorias); // new set del array que tiene las categorias repetidas y me las devuelve solo con valores unicos
const arrayCategoriasNoRepetidas = Array.from(categoriasNoRepetidas);// debo convertirlo en array para poder usar un metodo de array
console.log(arrayCategoriasNoRepetidas);  */



// funcion que lleve los checks al dom
/* let template = "";
categoriasNoRepetidas.forEach((element) => {
  console.log(element);
  template += insertarChecks(element);
});
contenedorCheckbox.innerHTML += template;

// colocarle el escuchador a los checkbox
let inputCheckbox = Array.from(document.querySelectorAll("input[type=checkbox]"));// todos los checkbox,con query vienen en nodelist,los paso a array
console.log(inputCheckbox);

inputCheckbox.forEach((input) => {
  input.addEventListener("click", (event) => { //genero el escuchador de evento
   const categoriasFiltradas= filtrosCruzados(data.events);// cuando se genere, mostrar las cards de cada categoria de la data(antes tenia filtrarPorChecks)
   printData(categoriasFiltradas, contenedorCards) // Ejecuto funcion para imprimir
  });
}); */
//funcion para crear las cards 
let contenedorCards = document.getElementById("card");
function templateIndex(objeto) {
  return `<div class="cards">
                <img src="${objeto.image}" alt="feria de comidas">
                <h5>${objeto.name}</h5>
                <p>${objeto.description}</p>
                <div class="price_button">
                    <p>$${objeto.price}</p>
                    <a class="button" href="./assets/pages/details.html?id=${objeto._id}">Details</a>

                </div>
            </div>`;
}


// funcion para imprimir las cards
function printData(array, place) {
  let template = "";
 

  for (let event of array) {
    
    template += templateIndex(event);// concateno lo que va devolviendo la funcion
  }

  place.innerHTML = template;
}

/* printData(data.events, contenedorCards); */// ejecuto la funcion para imprimmir las cards

// cuando se genere el evento filtrar las categorias que esten checkeds(necesito esos checkbox y los traigo con query)
function filtrarPorCheck(array) {
    const checkbox = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map((check) => check.value);//no me interesa todo, solo su value 
    
    if (checkbox.length == 0) {
      return(array)
    } else {
      const categoriasFiltradas = array.filter((event) =>checkbox.includes(event.category));
      return categoriasFiltradas
    }
}  

const contenedorSearch = document.getElementById("searchBox")
 
contenedorSearch.addEventListener("keyup", happenedEvent)

function happenedEvent(event){
    const categoriasFiltradas = filtrosCruzados(data.events)// aqui se ejecuta(los parentesis)
    printData(categoriasFiltradas, contenedorCards)
} 

function filtrarPorSearch(array){
    const filtroSearch = array.filter(event => event.name.toLowerCase().includes(contenedorSearch.value.toLowerCase()))
    if(filtrarPorSearch.length != "0"){
      return filtroSearch
  }else{
      return alert("Evento no coincide con su busqueda")
  }
    
}
// Combinar los filtros
function filtrosCruzados(array){
    const filters = filtrarPorSearch(array)
    const filters2 = filtrarPorCheck(filters)
    return filters2
}   
