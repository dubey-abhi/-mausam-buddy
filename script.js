const apiKey = "dd567e65748cb3a314cfda8ef57d6580"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("description").innerText = `मौसम: ${data.weather[0].description}`;
    document.getElementById("temperature").innerText = `तापमान: ${data.main.temp} °C`;
    document.getElementById("humidity").innerText = `आर्द्रता: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `हवा: ${data.wind.speed} m/s`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const messageEl = document.getElementById("message");
    if (data.main.temp > 35) {
      messageEl.innerText = "🔥 बाहर बहुत गर्मी है! पानी ज़रूर पिएं।";
      document.body.style.background = "linear-gradient(135deg, #f857a6, #ff5858)";
    } else if (data.weather[0].main === "Rain") {
      messageEl.innerText = "🌧️ बारिश हो रही है! छाता ले जाना मत भूलना।";
      document.body.style.background = "linear-gradient(135deg, #2980b9, #6dd5fa)";
    } else if (data.main.temp < 15) {
      messageEl.innerText = "🥶 ठंड है! गरम कपड़े पहनें।";
      document.body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
    } else {
      messageEl.innerText = "😊 मौसम बढ़िया है! बाहर घूम सकते हैं।";
      document.body.style.background = "linear-gradient(135deg, #ff9966, #ff5e62)";
    }

    document.getElementById("weatherResult").classList.remove("hidden");
  } catch (error) {
    alert(error.message);
  }
}
