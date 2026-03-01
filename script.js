// ===============================
// WEATHER CONFIG
// ===============================
const API_KEY = "6379c02462e04c51a05174111260103";
const LOCATION_QUERY = "686510";

// ===============================
// FETCH WEATHER (3 DAYS)
// ===============================
fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION_QUERY}&days=3&aqi=no&alerts=no`)
    .then(res => res.json())
    .then(data => {

        if (data.error) throw new Error(data.error.message);

        const locationText = "Chathanthara, Kerala, PIN 686510";

        /* -------- Today weather -------- */
        const current = data.current;
        const today = data.forecast.forecastday[0];

        document.getElementById("weather").innerHTML = `
            📍 സ്ഥലം: ${locationText}<br><br>
            🌡️ താപനില: ${current.temp_c}°C<br>
            🤒 അനുഭവപ്പെടുന്നത്: ${current.feelslike_c}°C<br>
            💧 ഈർപ്പം: ${current.humidity}%<br>
            ☁️ കാലാവസ്ഥ: ${current.condition.text}
        `;

        /* -------- Rain chance -------- */
        document.getElementById("rain").innerText =
            `🌧️ മഴ സാധ്യത: ${today.day.daily_chance_of_rain}%`;

        /* -------- Next 2 days -------- */
        let forecastText = "";

        for (let i = 1; i <= 2; i++) {
            const day = data.forecast.forecastday[i];
            const chance = day.day.daily_chance_of_rain;

            const result =
                chance >= 40
                    ? "മഴയുള്ള ദിവസം 🌧️"
                    : "സൂര്യപ്രകാശമുള്ള ദിവസം ☀️";

            forecastText +=
                `➡️ ${i === 1 ? "നാളെ" : "മറ്റന്നാൾ"}: ${result}<br>`;
        }

        document.getElementById("forecast").innerHTML = forecastText;
    })
    .catch(err => {
        console.error(err);
        document.getElementById("weather").innerText = "കാലാവസ്ഥ ലഭ്യമല്ല";
        document.getElementById("rain").innerText = "മഴ വിവരം ലഭ്യമല്ല";
        document.getElementById("forecast").innerText = "പ്രവചനം ലഭ്യമല്ല";
    });

/* -------- Auto refresh every 30 minutes -------- */
setInterval(() => {
    location.reload();
}, 30 * 60 * 1000);
