const API = "what ever your api key"

function getWeather() {
    var zip = document.getElementById("zip").value;
    var request = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${API}`;
    var promise = fetch(request);
    promise.then((response) => {
        var jsonPromise = response.json();
        jsonPromise.then((jsonResponse) => {
            try {
                var response = jsonResponse.name + ": " + jsonResponse.main.temp + "\n";
                document.getElementById("output").value = response + document.getElementById("output").value;
            }
            catch {
                document.getElementById("output").value = "code not found\n" + document.getElementById("output").value;
            }
        });
    });
}

document.getElementById("clear").addEventListener("click", () => {
    document.getElementById("output").value = "";
});
