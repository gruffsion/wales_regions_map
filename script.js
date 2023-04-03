const polygons = document.querySelectorAll("polygon");
const regionInfoDisplay = document.getElementById("region-info");

class Region {
  constructor(id, displayName, data) {
    this.id = id;
    this.displayName = displayName;
    this.data = data;
  }
}

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

      regionInfoDisplay.innerHTML = `
        <h2>${region.displayName}</h2>
        <p>Population: ${region.data.population}</p>
        <p>Able to speak Welsh: ${region.data.welsh_lang}%</p>
      `;
    });
  });
});
