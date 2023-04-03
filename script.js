const polygons = document.querySelectorAll("polygon");
const regionInfoDisplay = document.getElementById("region-info");


//class to create region objects
class Region {
  constructor(id, displayName, data) {
    this.id = id;
    this.displayName = displayName;
    this.data = data;
  }
}


//fetch the json data then create a region object for each polygon, add properties from json data
async function loadData() {
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
}
loadData().then((data) => {
  polygons.forEach((polygon) => {
    const regionId = polygon.getAttribute("id").replace(/_/g, " ");
    const regionData = data.find((d) => d.name === regionId);
    const region = new Region(regionId, regionData.name, regionData);

    polygon.addEventListener("click", () => {
      polygons.forEach((p) => p.classList.remove("selected"));
      polygon.classList.add("selected");

      document.getElementById("region-name").textContent = region.displayName;
      document.getElementById("population").textContent = region.data.population;
      document.getElementById("welsh-lang").textContent = region.data.welsh_lang + "%";
      document.getElementById("value-3").textContent = "value-3";
      document.getElementById("value-4").textContent = "value-4";
    });
  });
});

