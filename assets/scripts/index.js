"use strict";

function findTravel() {
    fetch('assets/data/data.json')
    .then(res => res.json())
    .then(data => {
        let items = data.travel;
        info(items);
    });
}

function info(items) {
    let place = document.querySelector("#where").value.trim().toLowerCase();
    
    let travel = items.filter(obj => obj.country.toLowerCase().includes(place.toLowerCase()) || 
        obj.city.toLowerCase().includes(place.toLowerCase()) ||
        obj.title.toLowerCase().includes(place.toLowerCase())
    );

    console.log(travel);

    let list = document.querySelector(".list");
    list.innerHTML = "";
    for(let tr of travel) {
        list.innerHTML += `<li>${tr.title} - ${tr.country} - ${tr.city} - ${tr.fromPrice}</li>`;
    }
}