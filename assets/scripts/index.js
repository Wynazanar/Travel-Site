"use strict";

const today = new Date().toISOString().split("T")[0];
document.querySelector("#inpt-time").setAttribute("min", today);

window.onload = function () {
    fetch("assets/data/data.json")
    .then(res => res.json())
    .then(data => {
        let items = data.travel;
        loadSlider(items);
        loadPopularTours(items);
    });
}

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
for (let tr of travel) {
    list.innerHTML += `<a href="details.html?id=${tr.id}">${tr.title} - ${tr.country} - ${tr.city} - ${tr.fromPrice}</a><br>`;
}
}

function searchTravel() {
    let _place = document.querySelector("#inpt-place").value.toLowerCase().trim();
    let _date = document.querySelector("#inpt-time").value;
    if (_place != "" && _date >= today) {
        location.href = `list.html?search=${_place}&date=${_date}`;
    }else {
        alert("Input where you want to travel!");
    }
}



function loadSlider(data) {
    console.log(data);
}

function loadPopularTours(data) {
    let index = [];

    while(index.length < 8) {
        let num = Math.floor(Math.random() * data.length);
        
        if (!index.includes(num)) {
            index.push(num);
        }
    }

    let popList = document.querySelector(".pop-list");
    popList.innerHTML = '';

    for (let elem of index) {

        let travel = data.find(item => item.id == elem+1);

        let str = `
        <div class="pop-card" onclick="location.href='details.html?id=${travel.id}'">
            <div class="pop-card-cont">
                <img class="pop-card-img" src="${travel["images"][0]}">
                <p class="pop-card-city">${travel.city}, ${travel.country}</p>
                <h3>${travel.title}</h3>
                <div class="pop-card-rate">`;

        let rate = Math.round(travel.rating);
                for (let i = 0; i < rate; i++) {
                    str += `<img src="assets/images/star.png">`;
                }
                for (let i = 0; i < 5 - rate; i++) {
                    str += `<img src="assets/images/star_gray.png">`;
                }

        str += `
                <p>${travel.rating} (${travel["reviews"].length})</p>
                </div>
                <div class="pop-card-bottom">
                    <p>${travel.duration} days</p>
                    <div style="display: flex;">
                        <p>From <span style="font-weight: 700; font-size: 14.5px;">$${travel.fromPrice}</span></p>
                    </div>
                </div>
            </div>                    
        </div>
        `;

        popList.innerHTML += str;
    }
}