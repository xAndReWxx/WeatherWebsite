const ApiKey = "81b4ced42e26a72d732b8daedfafd02c";

let isFirstSearch = true;

let btn = document.querySelector(".btn-search");
let searchResult = document.querySelector(".search-result");
let foreCast = document.querySelector(".forecast");


function go(){
    const cityName = document.querySelector(".cityInput").value;
    getWether(cityName);
    foreCastWether(cityName);
}

btn.addEventListener("click", go);

document.querySelector(".cityInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") 
    go(); 
  
});




async function getWether(cityName){

    let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}&units=metric`,
    res = await fetch(ApiUrl),
    data = await res.json();

    
   
    console.log(data);
    
    let feels_like = data.main.feels_like,
    temp_max = data.main.temp_max,
    temp_min = data.main.temp_min,
    temp = data.main.temp,
    humidity = data.main.humidity,
    description = data.weather[0].description,
    icon = data.weather[0].icon,
    wind_speed = data.wind.speed,
    pressure = data.main.pressure,
    visibility = data.visibility /1000,
    dt = data.dt,
    date = new Date(dt * 1000),
    dayName = date.toLocaleDateString("en-US", { weekday: "short" }),
    dayNum = date.toLocaleDateString("en-US", { day: "numeric" }),
    month = date.toLocaleDateString("en-US", {month: "short"}),
    year = date.toLocaleDateString("en-US", {year: "numeric"}),
    country = data.sys.country,
    city = data.name;
    searchResult.classList.remove("hidden");
    searchResult.classList.add("show");
    


    searchResult.innerHTML =`
                    <div class="card-1" >
                        <div class="current-weather">
                            <div class="details">
                                <p>Now</p>
                                <h2>${temp}<span>°C</span></h2>
                                <p>${description}</p>
                            </div>
                            <div class="weather-icon">
                                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Broken Clouds Weather Icon" loading="lazy">
                            </div>
                        </div>
                        <hr>
                        <div class="card-footerr">
                            <p><i class="fa fa-calendar" aria-hidden="true"></i>${dayName}, ${dayNum} ${month}, ${year}</p>
                            <p><i class="fa-solid fa-location-dot"></i>${country}, ${city}</p>
                        </div>
                    </div>
                    





    <div class="card-2 " >
    <div class="hi">
        <p>High Temp</p>
        <div>
            <i class="fa-solid fa-temperature-high details-icons"></i>
            <p>${temp_max}<span class="orange-hot cc">°</span>C</p>
        </div>
    </div>
    <hr>
    <div class="lo">
        <p>Low Temp</p>
        <div>
            <i class="fa-solid fa-temperature-low details-icons"></i>
            <p>${temp_min}<span class="orange-hot cc">°</span>C</p>
        </div>
    </div>
    <hr>
    <div class="feel-like">
        <p>Feel Like</p>
        <div>
            <i class="fa-solid fa-temperature-half details-icons"></i>
            <p>${feels_like}<span class="orange-hot cc">°</span>C</p>
        </div>
    </div>
    <hr>
    <div class="humidity">
        <p>Humidity</p>
        <div>
            <i class="fa-solid fa-droplet details-icons"></i>
            <p>${humidity}<span class="orange-hot cc">%</span></p>
        </div>
    </div>
</div>







                    <div class="card-3"  >
                        <div class="air-details">
                            <p>Air Details</p>
                            <i class="fa-solid fa-wind"></i>
                        </div>
                        <hr>
                        <div class="air-block-details">
                            <div class="air-speed">
                                <div>
                                    <p>Wind Speed</p>
                                    <i class="fa-solid fa-location-arrow orange-hot air-icons"></i>
                                </div>
                                <p>${wind_speed} <span class="orange-hot">m</span>/<span class="orange-hot">s</span></p>
                            </div>
                            <div class="pressure">
                                <div>
                                    <p>Pressure</p>
                                    <i class="fa-regular fa-compass orange-hot air-icons"></i>
                                </div>
                                <p>${pressure} <span class="orange-hot">h</span>Pa</p>
                            </div>
                            <div class="visibility">
                                <div>
                                    <p>Visibility</p>
                                    <i class="fa-regular fa-eye orange-hot air-icons"></i>
                                </div>
                                <p>${visibility} <span class="orange-hot">k</span>m</p>
                            </div>
                        </div>
                    </div>

    `;

    document.querySelector(".main").classList.add("showMain")


}

async function foreCastWether(cityName){
    let ApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=6&appid=${ApiKey}&units=metric`; 
    let res = await fetch(ApiUrl);
    let data = await res.json();
    foreCast.innerHTML = ``;

    foreCast.classList.remove("hidden");
    foreCast.classList.add("grow");




    for (let i =1; i<6; i++){
        let max = data.list[i].temp.max,
        min =  data.list[i].temp.min,
        day =  data.list[i].temp.day,
        icon = data.list[i].weather[0].icon,
        dt = data.list[i].dt,

        date = new Date(dt * 1000),
        dayName = date.toLocaleDateString("en-US", { weekday: "long" }),
        dayNum = date.toLocaleDateString("en-US", { day: "numeric" }),
        month = date.toLocaleDateString("en-US", {month: "short"});
       
        
        const block = document.createElement("div");
        block.className = "block show";
        block.innerHTML = `
            <div class="temp-details">
                <div>
                    <i class="fa-solid fa-temperature-high details-icons"></i>
                    <p>${max}<span class="orange-hot cc">°</span>C</p>
                </div>
                <div>
                    <i class="fa-solid fa-temperature-low details-icons"></i>
                    <p>${min}<span class="orange-hot cc">°</span>C</p>
                </div>
            </div>
            <p class="temp">${day}<span class="orange-hot cc">°</span>C</p>
            <p class="date">${dayNum} ${month}</p>
            <p class="day">${dayName}</p>
            <div class="forcast-img">
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Forecast Icon" class="forecast-icon" loading="lazy">
            </div>
        `;


        
        if(!isFirstSearch) {
            foreCast.appendChild(block);
        } else {

            setTimeout(() => {
                foreCast.appendChild(block);
            }, i * 300);
        }

    }

    if (isFirstSearch) {
        isFirstSearch = false;
    }



  


    console.log(data);






}