let div = document.getElementById("upcoming");
function templateUpcoming(objeto){
    return `<div class="cards">
                <img src="${objeto.image}">
                <h5>${objeto.name}</h5>
                <p>${objeto.description}</p>
                <div class="price_button">
                    <p>${objeto.price}</p>
                    <a class="button" href="./details.html">Details</a>
                </div>
            </div>`
}

function printData(array,place){
    let template = ""

    for(let event of array){
        if(event.date > data.currentDate){
            template += templateUpcoming(event)
        }
    }
    place.innerHTML += template

}
printData(data.events,div)
    