"use strict";

let id = window.location.search.split("id=")[1];

window.onload = function () {
    fetch("assets/data/data.json")
        .then(res => res.json())
        .then(data => {
            let items = data.travel;
            SetItem(items, id);
        });
}

function SetItem(items, id) {
    let travel = items.find(item => item.id == id);

    console.log(travel);

    let list = document.querySelector("#info-list");
    list.innerHTML = "";
    list.innerHTML += `
        <h2 class="title">${travel.title}</h2>
            <div class="info">
                <div class="rate">
                <p class="info-rate">${travel.rating} (${travel.reviews.length})</p>
                </div>
                <p id="place">${travel.city}, ${travel.country}</p>
                <p class="info-booked">${travel.booked}K+ booked</p>
            </div>
            <div class="info-images">
                <img class="img_one" src="${travel.images[0]}"/>
                <div class="right-block">
                    <img class="img_two" src="${travel.images[1]}"/>
                    <div class="info-img-split">
                        <img class="img_three" src="${travel.images[2]}"/>
                        <img class="img_four" src="${travel.images[3]}"/>
                    </div>
                </div>
            </div>
    `;

    let rate = document.querySelector(".info");
    let rateNumber = Math.round(travel.rating);
    for (let i = 0; i < 5 - rateNumber; i++) {
        let img = document.createElement("img");
        img.src = "assets/images/star_gray.png";
        rate.prepend(img);
    }
    for (let i = 0; i < rateNumber; i++) {
        let img = document.createElement("img");
        img.src = "assets/images/star.png";
        rate.prepend(img);
    }

    let rev = document.querySelector("#reviews");
    rev.innerHTML = "";

    for (let rew of travel["reviews"]) {
        let str = 
        `<div class="review">
            <div class="top-bar">
                <div class="person">
                    <p class="person-img">a.w</p>
                    <p class="rew-name">${rew.reviewerName}</p>
                </div>
                <p class="rew-date">${rew.date}</p>
            </div>
            <div class="rew-rate">`;
            let rateRew = Math.round(rew.rating);
                for (let i = 0; i < rateRew; i++) {
                    str += `<img src="assets/images/star.png">`;
                }
                for (let i = 0; i < 5 - rateRew; i++) {
                    str += `<img src="assets/images/star_gray.png">`;
                }
                str += `
                <p>Take this tour! Its fantastic!</p>
            </div>
            <p class="rew-comment">${rew.comment}</p>
            <div class="rew-images">`;

            for (let img of rew["reviewImages"]) {
                str += `<img src="${img}">`;
            }
            str += `</div></div>`;

            rev.innerHTML += str;
    }
}