const api = "https://api.openweathermap.org/data/2.5/";
const key = "bd24a740cfc32bbe154cd68c60abc256";
const input = document.querySelector("#input");
const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  if (input.value == "") {
    document.querySelector(".container").innerText += "boş bırakma";
  }
});

localStorage.setItem("my", JSON.stringify(key));

const url = "https://api.openweathermap.org/data/2.5/";

const result = document.getElementById("result");
const buton = document.querySelector(".btn");
const searchCity = document.getElementById("input");

let cities = JSON.parse(localStorage.getItem("CİTY")) || [];

const getResult = (cityName) => {
  let key = JSON.parse(localStorage.getItem("my"));

  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      if (!weather.ok) {
        throw new Error(`something went wrong ${weather.status}`);
      }
      return weather.json();
    })
    .then(dispResult)

    .catch((err) => console.log(err));
  console.log(query);
  console.log(key);
};

const dispResult = (res) => {
  result.innerHTML += `
    <div id="wdiv" class=" d-flex flex-column justify-content-center align-items-center col-xs-12 col-sm-2 m-3 border border-radius shadow p-2 mb-5 bg-body rounded text-center ">
        <header  id="cty" class="text-center flex-wrap wrap fs-3">${res.name}<p id="tr">${res.sys.country}</p></header>
        <div class="temp py-3"><p class="fs-1">${res.main.temp}°C</p></div>
        <div class="image p-2"><img  src="https://openweathermap.org/img/w/${res.weather[0].icon}.png" alt=""></div>
        <div class="text"><p class="fs-5">${res.weather[0].description}</p></div>
        </div>
    `;
  cities.push(searchCity.value);
  console.log(cities);

  searchCity.value = "";
};

buton.addEventListener("click", () => {
  if (searchCity.value == "") {
    setTimeout(function () {
      alert("Lütfen bir şehir ismi giriniz.");
    }, 3000);
  }

  try {
    cities.forEach((value) => {
      if (value == searchCity.value) {
        searchCity.value = "";
        throw new Error("Lütfen farklı bir şehir ismi giriniz");
      }
    });
  } catch (error) {
    alert(error);
  }

  getResult(searchCity.value);
});

localStorage.setItem("CİTY", JSON.stringify(cities));

searchCity.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    buton.click();
  }
});

window.onload = function () {
  searchCity.focus();
};
