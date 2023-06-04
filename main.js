let div = document.getElementById("card")

function templateIndex(objeto){
    return `<div class="cards">
                <img src="${objeto.image}" alt="feria de comidas">
                <h5>${objeto.name}</h5>
                <p>${objeto.description}</p>
                <div class="price_button">
                    <p>${objeto.price}</p>
                    <a class="button" href="./assets/pages/details.html">Details</a>

                </div>
            </div>`
}
 function printData(array,place){
    let template = ""

    for(let event of array){
        template += templateIndex(event)
    }
    
    place.innerHTML += template
 }

 printData(data.events,div)
