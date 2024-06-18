"use strict";
// RANDOM TITAN
let n = document.getElementById("name");
let h = document.getElementById("height");
let abl = document.getElementById("abilities");
let alg = document.getElementById("allegiance");

// Current Inheritor
let cName = document.getElementById("curName");
let aliC = document.getElementById("alias1");
let bp = document.getElementById("birthplace");
let genC = document.getElementById("gender1");
let occC = document.getElementById("occupation1");
let resC = document.getElementById("residence1");
let rolC = document.getElementById("roles1");
let spC = document.getElementById("species1");
let statC = document.getElementById("status1");

// Former Inheritors
let fName = document.getElementById("forName");
let aliF = document.getElementById("alias2");
let spF = document.getElementById("species2");
let genF = document.getElementById("gender2");
let age = document.getElementById("age");
let occF = document.getElementById("occupation2");
let resF = document.getElementById("residence2");
let rolF = document.getElementById("roles2");
let statF = document.getElementById("status2");

// Get the button element and add an event listener for click events
let btn = document.getElementById("generateTitan");
btn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log('clicked')

    // random titan
    fetch("https://api.attackontitanapi.com/titans")
        .then((response) => response.json())
        .then((data) => {
            let aot = data;
            let Tit = aot["results"];

            const randomNum = Tit[Math.ceil(Math.random() * (Tit.length - 1))];

            n.innerHTML = randomNum.name;
            h.innerHTML = randomNum.height;

            let abilitiesList = "";
            for (let i in randomNum.abilities) {
                abilitiesList += `&#10149; &nbsp ${randomNum.abilities[i]}<br>`;
            }
            abl.innerHTML = abilitiesList;
            alg.innerHTML = randomNum.allegiance;

            // current inheritor
            fetch(randomNum.current_inheritor)
                .then((response) => response.json())
                .then((data) => {
                    let curIn = data;

                    cName.innerHTML = curIn.name;

                    let aliCList = "";
                    for (let i in curIn.alias) {
                        aliCList += `&#10031; &nbsp ${curIn.alias[i]}<br>`;
                    }
                    aliC.innerHTML = aliCList;
                    bp.innerHTML = curIn.birthplace;

                    if (curIn.gender == 'Male') {
                        genC.innerHTML = `&#9794; ${curIn.gender}`;
                    } if (curIn.gender == 'Female') {
                        genC.innerHTML = `&#9792; ${curIn.gender}`;
                    }

                    occC.innerHTML = curIn.occupation;
                    resC.innerHTML = curIn.residence;

                    let rolesList = "";
                    for (let i in curIn.roles) {
                        rolesList += `&#x2623; &nbsp ${curIn.roles[i]}<br>`;
                    }
                    rolC.innerHTML = rolesList;

                    let spCList = "";
                    for (let i in curIn.species) {
                        spCList += `&#10686; &nbsp ${curIn.species[i]}<br>`;
                    }
                    spC.innerHTML = spCList;
                    statC.innerHTML = curIn.status + ' &#9760;';
                });

            // former inheritor
            if (randomNum.former_inheritor != "null") {
                fetch(randomNum.former_inheritors)
                    .then((response) => response.json())
                    .then((data) => {
                        let forIn = data;

                        fName.innerHTML = forIn.name;

                        let aliFList = "";
                        for (let i in forIn.alias) {
                            aliFList += `&#10031; &nbsp ${forIn.alias[i]}<br>`;
                        }
                        aliF.innerHTML = aliFList;

                        let spFList = "";
                        for (let i in forIn.species) {
                            spFList += `&#10686; &nbsp ${forIn.species[i]}<br>`;
                        }
                        spF.innerHTML = spFList;

                        if (forIn.gender == 'Male') {
                            genF.innerHTML = `&#9794; ${forIn.gender}`;
                        } if (forIn.gender == 'Female') {
                            genF.innerHTML = `&#9792; ${forIn.gender}`;
                        }

                        if (forIn.age == Number(forIn.age)) {
                            age.innerHTML = forIn.age + ' years';
                        } else {
                            age.innerHTML = 'Not Available';
                        }

                        occF.innerHTML = forIn.occupation;
                        resF.innerHTML = forIn.residence;
                        rolF.innerHTML = forIn.roles;
                        statF.innerHTML = forIn.status + ' &#9760;';
                    })
            } if (!randomNum.former_inheritor) {
                var l = [fName, aliF, spF, genF, age, occF, resF, rolF, statF];
                for (let i in l) {
                    l[i].innerHTML = "Unknown";
                }
            }
        }
        );
})