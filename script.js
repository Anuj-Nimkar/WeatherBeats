// script.js

async function getWeatherAndPlaylist(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById("weather-info").innerText = "City not found!";
      document.getElementById("spotify-player").src = "";
      return;
    }

    const condition = data.weather[0].main; // e.g., "Clear", "Rain"
    const temp = data.main.temp;

    document.getElementById("weather-info").innerText =
      `Weather in ${city}: ${condition}, ${temp}°C`;

    // Map weather conditions to Spotify playlists
    const playlistMap = {
      Clear: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1BzILRveYHb", // Sunny vibes
      Rain: "https://open.spotify.com/embed/playlist/37i9dQZF1DXbvABJXBIyiY", // Rainy day
      Clouds: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWEJlAGA9gs0", // Cloudy chill
      Snow: "https://open.spotify.com/embed/playlist/37i9dQZF1DX2MyUCsl25eb", // Snowy mood
      Default: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M", // Top hits
    };

    document.getElementById("spotify-player").src =
      playlistMap[condition] || playlistMap["Default"];

  } catch (err) {
    console.error("Error:", err);
    document.getElementById("weather-info").innerText = "Error fetching data!";
  }
}

function searchCity() {
  const city = document.getElementById("city-input").value;
  if (city) {
    getWeatherAndPlaylist(city);
  } else {
    alert("Please enter a city name!");
  }
}

// Default city on load
getWeatherAndPlaylist("Pune");
