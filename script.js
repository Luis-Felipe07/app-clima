// api
const apiKey = "0c4c0dff5f70179c30b263dc997ecb27"; 


const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn"); 
const errorMessage = document.getElementById("errorMessage");
const weatherResult = document.getElementById("weatherResult");
const welcomeMessage = document.getElementById("welcomeMessage");


async function fetchWeather(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
           
            errorMessage.style.display = "block";
            weatherResult.style.display = "none";
            welcomeMessage.style.display = "none";
            return;
        }

        const data = await response.json();

        
        document.getElementById("cityName").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("description").innerHTML = data.weather[0].description;

        weatherResult.style.display = "block";
        errorMessage.style.display = "none";
        welcomeMessage.style.display = "none";

    } catch (error) {
        console.error("Error de conexión:", error);
    }
}


function searchByCity() {
    const city = searchBox.value;
    if(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&q=${city}&appid=${apiKey}`;
        fetchWeather(url);
    }
}


function searchByLocation() {
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat=${lat}&lon=${lon}&appid=${apiKey}`;
                fetchWeather(url);
            },
            (error) => {
                alert("No se pudo obtener tu ubicación. Verifica los permisos de tu navegador.");
                console.error(error);
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}


searchBtn.addEventListener("click", searchByCity);
locationBtn.addEventListener("click", searchByLocation);

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchByCity();
    }
});