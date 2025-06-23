"use strict";

window.onload = function () {
    let str = window.location.search.split("search=")[1];
    let place = str.split("&")[0];
    let date = str.split("date=")[1];

    console.log(place);
    console.log(date);

    setDate(date);

    fetch('assets/data/data.json')
    .then(res => res.json())
    .then(data => {
        let items = data.travel;
        info(items, place);
    });
}

function setDate(date) {
    let dateInput = document.querySelector("#date-inpt");
    dateInput.value = date;
    dateInput.min = date;
}

function info(items, place) {
    let travel = items.filter(obj => obj.country.toLowerCase().includes(place.toLowerCase()) ||
        obj.city.toLowerCase().includes(place.toLowerCase()) ||
        obj.title.toLowerCase().includes(place.toLowerCase())
    );

    console.log(travel);

    let cardList = document.querySelector(".card-list");
    cardList.innerHTML = "";

    if (travel.length > 0) {
        for (let tr of travel) {
            let str = `
                <div class="travel-card">
                                <img class="tr-card-img" src="${tr.images[0]}">
                                <div class="tr-card-info">
                                    <p>${tr.city}, ${tr.country}</p>
                                    <h3>${tr.description}</h3>
                                    <div class="tr-card-rate">`
    
                    let rate = Math.round(tr.rating);
                    for (let i = 0; i < rate; i++) {
                        str += `<img src="assets/images/star.png">`;
                    }
                    for (let i = 0; i < 5 - rate; i++) {
                        str += `<img src="assets/images/star_gray.png">`;
                    }
    
                    str +=`<p>${tr.rating} (${tr.reviews.length})</p>
                                    </div>
                                    <p>The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.</p>
                                </div>
                                <div class="tr-card-price">
                                    <p>${tr.duration} Days ${tr.duration > 0 ? tr.duration - 1 : 0} Nights</p>
                                    <h4><span style="font-weight: 400;">From</span> $114</h4>
                                    <button onclick="location.href='details.html?id=${tr.id}'">View Details</button>
                                </div>
                            </div>
            `;
    
            cardList.innerHTML += str;
        }
    } else {
        cardList.innerHTML = `<p style="text-align: center;">Sorry, but nothing was found.</p>`;
    }
}