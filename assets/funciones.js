
 /*  export function filtrarPorCheck(array) {
    const checkbox = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map((check) => check.value);//no me interesa todo, solo su value 
    
    if (checkbox.length == 0) {
      return(array)
    } else {
      const categoriasFiltradas = array.filter((event) =>checkbox.includes(event.category));
      return categoriasFiltradas
    }
}

export function happenedEvent(event){
    const categoriasFiltradas = filtrosCruzados(data.events)// aqui se ejecuta(los parentesis)
    printData(categoriasFiltradas, contenedorCards)
}

export function filtrarPorSearch(array){
    const filtroSearch = array.filter(event => event.name.toLowerCase().includes(contenedorSearch.value.toLowerCase()))
    if(filtrarPorSearch.length != "0"){
      return filtroSearch
  }else{
      return alert("Evento no coincide con su busqueda")
  }
    
}

export function filtrosCruzados(array){
    const filters = filtrarPorSearch(array)
    const filters2 = filtrarPorCheck(filters)
    return filters2
}

export function insertarChecks(checks) {
    return `<input type="checkbox" id="${checks}-input" value="${checks}">
              <label for="${checks}-input">${checks}</label>
              
              `
  }

// stats
  function altaAsistencia(array){
    let alta = 0;
    let posicion = "";
    for(let i=0; i<array.length; i++){
        if((array[i].assistance * 100) / array[i].capacity > alta){
            alta = ((array[i].assistance * 100) / array[i].capacity).toFixed(1);
            posicion = array[i].name;
        }
    }
    return posicion + " " + alta + "%"; 
}

function bajaAsistencia(array){
    let baja = 100;
    let posicion = "";
    for(let i=0; i<array.length; i++){
        if((array[i].assistance * 100) / array[i].capacity < baja){
            baja = ((array[i].assistance * 100) / array[i].capacity).toFixed(1);
            posicion = array[i].name;
        }
    }
    return posicion + " " + baja + "%"; 
}

export function capacidad(array){
    let mayorCapacidad = 0;
    let position = "";
    for(let i=0; i<array.length; i++){
        if(array[i].capacity > mayorCapacidad){
          mayorCapacidad = array[i].capacity;
            position = array[i].name;
        }
    }
    return position + " " + mayorCapacidad.toLocaleString(); 
}


export function sumaRevenuesUpcoming(array, category){
    let totalRevenues = 0;
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
            totalRevenues += array[i].price * array[i].estimate;
        }
    }
    return totalRevenues;
}

export function sumaRevenuesPast(array, category){
    let totalRevenues = 0;
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
            totalRevenues += array[i].price * array[i].assistance;
        }
    }
    return totalRevenues;
}

export function porcentajeAsistenciaUpcoming(array, category){
    let porcentaje = [];
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
          porcentaje.push((array[i].estimate * 100) / array[i].capacity);
        }else{
        }
    }return porcentaje; 
}

export function porcentajeAsistenciaPast (array, category){
    let porcentaje = [];
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
          porcentaje.push((array[i].assistance * 100) / array[i].capacity);
        }
    }return porcentaje; 
}
export function promedio(array){
    let suma = 0;
    for(i=0; i<array.length; i++){
        suma += array[i]
    }
    const promedio = suma / array.length;
    return promedio
}

export function revenuesUpcoming(array, category){
    let resultado = [];
    for(i=0; i<category.length; i++){
        let revenuePorCategory = {
            revenue: (parseFloat(sumaRevenuesUpcoming(array, category[i]))).toLocaleString()
        }
        resultado.push(revenuePorCategory);
    }
    return resultado;
}

export function revenuesPastEvent(array, category){
    let resultado = []
    for(i=0; i<category.length; i++){
        let revenuePorCategory = {
            revenue: (parseFloat(sumaRevenuesPast(array, category[i]))).toLocaleString()
        }
        resultado.push(revenuePorCategory);
    }
    return resultado;
}

export function porcentajeUpcoming(array, category){
    let resultado = [];
    for(j=0; j<category.length; j++){
        let porcentajePorCategoria = {
            porcentajeAsistencia: promedio( porcentajeAsistenciaUpcoming(array, category[j])).toFixed(1)
        }
        resultado.push(porcentajePorCategoria);
    }
    return resultado;
}

export function porcentajePast(array, category){
    let resultado = [];
    for(j=0; j<category.length; j++){
        let porcentajePorCategoria = {
          porcentajePorCategoria: promedio(porcentajeAsistenciaPast(array, category[j])).toFixed(1)
        }
        resultado.push(porcentajePorCategoria);
    }
    return resultado;
} */
