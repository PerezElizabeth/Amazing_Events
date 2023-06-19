/* import {altaAsistencia,bajaAsistencia,capacidad,sumaRevenuesUpcoming,sumaRevenuesPast,porcentajeAsistenciaUpcoming,porcentajeAsistenciaPast,promedio,revenuesUpcoming,revenuesPastEvent,porcentajeUpcoming,porcentajePast} from '../funcionesjs' */
const tablaUno = document.getElementById("tablaUno")
const tablaDos = document.getElementById("tablaDos")
const tablaTres = document.getElementById("tablaTres")

let data;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json()) //resolve (respuesta positiva): utilizamos metodo json qe nos devuelve otra promesa
    .then(info =>{
        data = info
        console.log(data.events)
        
        //Estadisticas por categorias upcomingEvents
        console.log("Estadisticas por categorias upcomingEvents:")

        const upcomingEvents = data.events.filter(events =>{
            if(events.date > data.currentDate){
                return{};
            }  
        })

        console.log(upcomingEvents);

        //Saco mis categorias desde eventos futuros
        const categoriasUpcomingEvents = upcomingEvents.map(event => event.category);
        

        //elimino las categorias repetidas utilizando SET
        const categoriasUpcomingEventsSinRepetir = new Set(categoriasUpcomingEvents);
        //console.log(categoriesWithoutRepeats);

        //convierto ese SET nuevamente en Array
        const arrayCategoriasUpcomingEventsSinRepetir = Array.from(categoriasUpcomingEventsSinRepetir);
        console.log(arrayCategoriasUpcomingEventsSinRepetir);

        // Guardo en const el valor que me retorne la funciones pasandole los argumentos
        const revenuesUpcomingEvents = revenuesUpcoming(upcomingEvents, arrayCategoriasUpcomingEventsSinRepetir)
        console.log(revenuesUpcomingEvents)

        const porcentajeUpcomingEvents = porcentajeUpcoming(upcomingEvents, arrayCategoriasUpcomingEventsSinRepetir)
        console.log(porcentajeUpcomingEvents)
        // hago un mapeo para que me devuelva el objeto con las propiedades requeridas
        const arrayUpcomingEvents = arrayCategoriasUpcomingEventsSinRepetir.map((category, index)=>{
            return{
                category: category,
                revenue: revenuesUpcomingEvents[index].revenue,
                porcentaje: porcentajeUpcomingEvents[index].porcentajeAsistencia
            }
        });

        console.log(arrayUpcomingEvents);

        let estadisticasUpcomingEvents = [{arrayCategoriasUpcomingEventsSinRepetir}, revenuesUpcoming(upcomingEvents, arrayCategoriasUpcomingEventsSinRepetir), porcentajeUpcoming(upcomingEvents, arrayCategoriasUpcomingEventsSinRepetir)]

        console.log(estadisticasUpcomingEvents)
        // const para llenar los datos de la tabla
        const templatetablaDos = arrayUpcomingEvents.reduce((acc, act) =>{
                return  acc +  `<tr>
                                <td>${act.category}</td>
                                <td>$${act.revenue}</td>
                                <td>${act.porcentaje}%</td>
                            </tr>`           
        },"")
        
        tablaDos.innerHTML = templatetablaDos;

        //Estadisticas por categorias pastEvents
        console.log("Estadisticas por categorias pastEvents:")

        const pastEvents = data.events.filter(events =>{
            if(events.date < data.currentDate){
                return{}
            }  
        })
            
        console.log(pastEvents);

        //Saco mis categorias desde eventos pasados
        const categoriasPastEvents = pastEvents.map(event => event.category);

        //elimino las categorias repetidas utilizando SET
        const categoriasPastEventSinRepetir = new Set(categoriasPastEvents);
        //console.log(categoriesWithoutRepeats);

        //convierto ese SET nuevamente en Array
        const arrayCategoriasPastEventSinRepetir = Array.from(categoriasPastEventSinRepetir);
        console.log(arrayCategoriasPastEventSinRepetir);

        console.log(altaAsistencia(pastEvents))

        console.log(bajaAsistencia(pastEvents))

        console.log(capacidad(pastEvents))
        // Guardo en una const el valor que me retorne la funcion
        const revenuesPastEvents = revenuesPastEvent(pastEvents, arrayCategoriasPastEventSinRepetir)
        console.log(revenuesPastEvents);

        const porcentajePastEvents = porcentajePast(pastEvents, arrayCategoriasPastEventSinRepetir)
        console.log(porcentajePastEvents);


        const arrayPastEvents = arrayCategoriasPastEventSinRepetir.map((category, index)=>{
            return{
                category: category,
                revenue: revenuesPastEvents[index].revenue,
                porcentaje: (porcentajePastEvents[index].porcentajePorCategoria)
            }
        });

        console.log(arrayPastEvents);

        const templatetablaTres = arrayPastEvents.reduce((acc, act) =>{
            return  acc +  `<tr>
                                <td>${act.category}</td>
                                <td>$${act.revenue}</td>
                                <td>${act.porcentaje}%</td>
                            </tr>`
        },"")
        
        tablaTres.innerHTML = templatetablaTres;

        console.log("Estadisticas de los eventos:")

        const altaAsistenciaPastEvents = altaAsistencia(pastEvents)
        console.log(altaAsistenciaPastEvents)

        const bajaAsistenciaPastEvents = bajaAsistencia(pastEvents)
        console.log(bajaAsistenciaPastEvents)

        const mayorAsistenciaPastEvents = capacidad(pastEvents)
        console.log(mayorAsistenciaPastEvents)

        const arrayEstadisticasEventos = {
            HA: altaAsistenciaPastEvents,
            LA: bajaAsistenciaPastEvents,
            LAA: mayorAsistenciaPastEvents
        }

        console.log(arrayEstadisticasEventos);

        const templatetablaUno =
                            `<tr>
                                <td>${arrayEstadisticasEventos.HA}</td>
                                <td>${arrayEstadisticasEventos.LA}</td>
                                <td>${arrayEstadisticasEventos.LAA}</td>
                            </tr>`

        tablaUno.innerHTML = templatetablaUno;

    })
.catch(err => console.log(err))


//TABLA 1

/* creo dos variables */
function altaAsistencia(array){
    let alta = 0;
    let posicion = "";
    for(let i=0; i<array.length; i++){
        if((array[i].assistance * 100) / array[i].capacity > alta){
            alta = ((array[i].assistance * 100) / array[i].capacity).toFixed(1);/* si se cumple la condicion guardo ese valor tomando la propiedad nombre de ese array */
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

function capacidad(array){
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
//TABLAS 2 Y 3

/*obtengo la suma de todos los revenues por categoria recorro el array, si ese array en su categoria es igual igual 
a las categorias le va sumando esa categoria a la variable totalRevenues y se multiplica precio por estimado. 
 */
function sumaRevenuesUpcoming(array, category){
    let totalRevenues = 0;
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
            totalRevenues += array[i].price * array[i].estimate;
        }
    }
    
    return totalRevenues;
}

function sumaRevenuesPast(array, category){
    let totalRevenues = 0;
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
            totalRevenues += array[i].price * array[i].assistance;
        }
    }
    return totalRevenues;
}
//suma porcentajes
/* declaro variable con array vacio, hago recorrido en ese array.. si la propiedad categoria de ese array es igual igual
a las categorias pasadas por parametros que me pushee el valor de propiedad estimate por cien dividida por el valor de la 
capacidad de ese array
*/

function porcentajeAsistenciaUpcoming(array, category){
    let porcentaje = [];
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
          porcentaje.push((array[i].estimate * 100) / array[i].capacity);
        }
    }return porcentaje; 
}

function porcentajeAsistenciaPast (array, category){
    let porcentaje = [];
    for(let i=0; i<array.length; i++){
        if(array[i].category == category){
          porcentaje.push((array[i].assistance * 100) / array[i].capacity);
        }
    }return porcentaje; 
}

/* recorre el array y a la variable suma le sumo el valor de ese array dividido entre el largo del array
*/
function promedio(array){
    let suma = 0;
    for(i=0; i<array.length; i++){
        suma += array[i]
    }
    const promedio = suma / array.length;
    return promedio
}
/* estadisticas de ganancias por categorias itulizando la funcion de suma por categorias
*/
function revenuesUpcoming(array, category){
    let resultado = [];
    for(i=0; i<category.length; i++){
        let revenuePorCategory = {
            revenue: (parseFloat(sumaRevenuesUpcoming(array, category[i]))).toLocaleString()
        }
        resultado.push(revenuePorCategory);
    }
    return resultado;
}

function revenuesPastEvent(array, category){
    let resultado = []
    for(i=0; i<category.length; i++){
        let revenuePorCategory = {
            revenue: (parseFloat(sumaRevenuesPast(array, category[i]))).toLocaleString()
        }
        resultado.push(revenuePorCategory);
    }
    return resultado;
}

function porcentajeUpcoming(array, category){
    let resultado = [];
    for(j=0; j<category.length; j++){
        let porcentajePorCategoria = {
            porcentajeAsistencia: promedio( porcentajeAsistenciaUpcoming(array, category[j])).toFixed(1)
        }
        resultado.push(porcentajePorCategoria);
    }
    return resultado;
}

function porcentajePast(array, category){
    let resultado = [];
    for(j=0; j<category.length; j++){
        let porcentajePorCategoria = {
          porcentajePorCategoria: promedio(porcentajeAsistenciaPast(array, category[j])).toFixed(1)
        }
        resultado.push(porcentajePorCategoria);
    }
    return resultado;
}




              
                
                
                

                

            
              
                
              
               
              