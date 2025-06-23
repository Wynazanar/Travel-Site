"use strict";

let id = window.location.search.split("id=")[1];

let _price = [];
let it_em_s;

window.onload = function () {
    fetch("assets/data/data.json")
        .then(res => res.json())
        .then(data => {
            let items = data.travel;
            it_em_s = items;
            SetItem(items, id);
        });
}

function SetItem(items, id) {
    let travel = items.find(item => item.id == id);

    document.title = travel.title + " - details";
    
    console.log(travel);

    _price = [travel["cost"]["adult"], travel["cost"]["youth"], travel["cost"]["children"], travel["cost"]["extraBooking"], travel["cost"]["extraPerson"]];

    document.querySelector("#cost_span").textContent = "$" + travel.fromPrice.toLocaleString();
    document.querySelector(".descr-text").textContent = travel.description;

    let list = document.querySelector("#info-list");
    list.innerHTML = "";
    list.innerHTML += `
        <h2 class="title">${travel.title}</h2>
            <div class="info">
                <div class="rate">
                <p class="info-rate">${travel.rating} (${travel['reviews'].length})</p>
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

    document.querySelector("#adult").textContent = `Adult (18+ years) $${travel.cost["adult"]}`;
    document.querySelector("#youth").textContent = `Youth (13-17 years) $${travel.cost["youth"]}`;
    document.querySelector("#children").textContent = `Children (0-12 years) $${travel.cost["children"]}`;
    document.querySelector("#extra-booking").textContent = `$${travel.cost["extraBooking"]}`;
    document.querySelector("#extra-person").textContent = `$${travel.cost["extraPerson"]}`;

    for (let rew of travel["reviews"]) {
        let str = 
        `<div class="review">
            <div class="top-bar">
                <div class="person">
                    <p class="person-img">${rew.reviewerName.split(" ").map(word => word.charAt(0)).join(".")}</p>
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

    let incllist = document.querySelector("#inclList");
    incllist.innerHTML = "";
    for (let _include of travel["includes"]) {
        incllist.innerHTML += `<li>${_include}</li>`;
    }
}

function remPerson(text) {
    let pers = Number(document.querySelector("#" + text).textContent);
    if(pers > 0) {
        pers--;
        document.querySelector("#" + text).textContent = pers;
        calc();
    }
}

function addPerson(text) {
    let pers = Number(document.querySelector("#" + text).textContent);
    if(pers < 25) {
        pers++;
        document.querySelector("#" + text).textContent = pers;
        calc();
    }
}

function checkBooking() {
    let checkbox = document.querySelector("#extra-booking-met");
    _booking = !_booking;
    checkbox.checked = _booking;

    calc();
}

function checkPerson() {
    let checkbox = document.querySelector("#extra-person-met");
    _person = !_person;
    checkbox.checked = _person;

    calc();
}

let _booking = false;
let _person = false;

function calc() {
    let adult = Number(document.querySelector("#adult-pers").textContent);
    let youth = Number(document.querySelector("#youth-pers").textContent);
    let children = Number(document.querySelector("#children-pers").textContent);
    
    let sum = (adult * _price[0] + youth * _price[1] + children * _price[2]);

    if (_booking) {
        sum += _price[3];    
    }

    if (_person) {
        sum += _price[4];
    }

    document.querySelector("#total-price").textContent = "$" + sum.toLocaleString();
}

function addPost() {
    try {

        let name = document.querySelector("#post-name").value;
        let email = document.querySelector("#post-email").value;
        let title = document.querySelector("#post-title").value;
        let comment = document.querySelector("#post-comm").value;

        let data = JSON.parse(`{
            "rating": "${title}",
            "comment": "${comment}",
            "date": "${new Date().toLocaleDateString()}",
            "reviewerName": "${name}",
            "reviewerEmail": "${email}",
            "reviewImages": []
        }`);

        it_em_s[id]["reviews"].push(data);
        console.log(it_em_s[id]["reviews"]);

    } catch(er) {
        console.log(er);
    }
}