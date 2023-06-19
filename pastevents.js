let contenedorCheckbox = document.getElementById("checkbox");
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


function insertarChecks(checks) {
  return `<input type="checkbox" id="${checks}-input" value="${checks}">
            <label for="${checks}-input">${checks}</label>
            
            `
}

/* const fnMap = (elemento) => elemento.category;
const categorias = data.events.map(fnMap);
console.log(categorias);

const categoriasNoRepetidas = new Set(categorias);
const arrayCategoriasNoRepetidas = Array.from(categoriasNoRepetidas);
console.log(arrayCategoriasNoRepetidas);

let template = "";

categoriasNoRepetidas.forEach((element) => {
  console.log(element);
  template += insertarChecks(element);
});
contenedorCheckbox.innerHTML += template;
let inputCheckbox = Array.from(
  document.querySelectorAll("input[type=checkbox]")
);
console.log(inputCheckbox);
inputCheckbox.forEach((input) => {
  input.addEventListener("change", (event) => {
   const categoriasFiltradas= filtrosCruzados(data.events);
   printData(categoriasFiltradas, contenedorCards)
  });
}); */

let contenedorCards = document.getElementById("past");
function templatePast(objeto){
    return `<div class="cards">
                <img src="${objeto.image}">
                <h5>${objeto.name}</h5>
                <p>${objeto.description}</p>
                <div class="price_button">
                    <p>$${objeto.price}</p>
                    <a class="button" href="./details.html?id=${objeto._id}">Details</a>
                </div>
            </div>`
}

function printData(array,place){
    let template = ""

    for(let event of array){
        if(event.date < data.currentDate){
            template += templatePast(event)
        }
    }
    place.innerHTML = template

}
/* printData(data.events,contenedorCards) */

function filtrarPorCheck(array) {
    const checkbox = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map((check) => check.value);
    
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
    const categoriasFiltradas = filtrosCruzados(data.events)
    printData(categoriasFiltradas, contenedorCards)
} 

function filtrarPorSearch(array){
    const filtroSearch = array.filter(event => event.name.toLowerCase().includes(contenedorSearch.value.toLowerCase()))
    return filtroSearch
}

function filtrosCruzados(array){
    const filters = filtrarPorSearch(array)
    const filters2 = filtrarPorCheck(filters)
    return filters2
}  