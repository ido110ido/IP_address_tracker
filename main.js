const ip_search = document.getElementById("ip_search");
const search_button = document.getElementById("search_button");
const ip_adress = document.getElementById("ip_adress");
const locationDiv = document.getElementById("location");
const timeZone = document.getElementById("timeZone");
const isp = document.getElementById("isp");
const locationIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconAnchor: [23, 56],
});
let map;
search_button.addEventListener("click", () => {
  if (ValidateIPaddress(ip_search.value)) {
    getLocationOfIdAndProcessIt(ip_search.value);
  }
  ip_search.value = "";
});
/**
 * it takes an ip and if we get information from api
 * it will display data on screan using presentIpInMap and presentIpInTable
 * @param {ip adress for search} ip
 */
const getLocationOfIdAndProcessIt = (ip) => {
  fetch(
    `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_XxVWNnEsxKArjddfcg6GnjdxZSHvu&ipAddress=${ip}`
  )
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        throw new Error(data.statusText);
      }
    })
    .then((data) => {
      presentIpInTable(data);
      presentIpInMap(data.location.lat, data.location.lng);
    })
    .catch((error) => console.error(error));
};
/**
 * it take coordinates and display it in a map
 * @param {ip lat} x
 * @param {ip lng} y
 * @param {map zoom in} zoom
 */
const presentIpInMap = async (x = 37.38605, y = -122.08385, zoom = 14) => {
  if (map) map.remove();
  map = L.map("map").setView([x, y], zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
  }).addTo(map);
  var marker = L.marker([x, y], { icon: locationIcon }).addTo(map);
};
/**
 * it take the ip data and present on table
 * @param {ip data} ipData
 */
const presentIpInTable = (ipData) => {
  ip_adress.innerHTML = `${ipData.ip}`;
  locationDiv.innerHTML = `${ipData.location.city}, ${ipData.location.country}<br>${ipData.location.postalCode}`;
  timeZone.innerText = `UTC ${ipData.location.timezone}`;
  isp.innerText = `UTC ${ipData.isp}`;
};
/**
 * it cheack if input is an ip adrees if not it
 * return fales and triger alart on screen
 * @param {ip value to cheack} ipaddress
 * @returns
 */
const ValidateIPaddress = (ipaddress) => {
  const ipTester =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipTester.test(ipaddress)) {
    return true;
  }
  alert("You have entered an invalid IP address!");
  return false;
};
getLocationOfIdAndProcessIt("176.229.188.203");
