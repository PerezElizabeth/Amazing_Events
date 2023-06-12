const contenedor= document.getElementById("contenedorDetails")

const params = new URLSearchParams(location.search) // creo una nueva instancia de UrlSearchParamns,enviandole un queryString "location.search"
const id = params.get('id')    // primer valor asociado al parametro (location.search) que contiene key/value  
//id creado desde la data                  
const idEncontrado = data.events.find(event=> event._id == id)// find me devuelve id de cada evento


contenedor.innerHTML = `<div class="details">
                                <img src="${idEncontrado.image} " alt="feria de comidas">
                            <div class="titulo">
                                <h5>"${idEncontrado.name}"</h5>
                                <p>Id:${idEncontrado._id}</p>
                                <p>Date: "${idEncontrado.date}"</p>
                                <p>Category:"${idEncontrado.category}"</p>
                                <p>Place: "${idEncontrado.place}"</p>
                                <p>Capacity: ${idEncontrado.capacity}</p>
                                <p>Assistance:${idEncontrado.assistance}</p>
                                <p>Price ${idEncontrado.price}</p>

                            </div>
                        </div> `


