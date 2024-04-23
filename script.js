//using function to create dom element
function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}
//creating a base(container,heading,row)
let container = element("div", "container", "", "");
let h1 = element(
  "h1",
  "text-center",
  "title",
  "Rest Countries Weather Details"
);
const row = element("div", "row", "", "");

//fetch part
const response = fetch("https://restcountries.com/v3.1/all");
//it return promise
response
  .then((data) => data.json())
  .then((result) => {
    //console.log(result)
    for (let i = 0; i < result.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
 <div class="card h-100">
 <div class="card-header">
 <h5 class="card-title text-center">${result[i].name.common}</h5>
 </div>
 <div class="img-box">
 <img src="${result[i].flags.png}"class="card-img-top" alt="country image"/>
 </div>
 <div class="card-body">
 <div class="card-text text-center">
 Region:${result[i].region}</div>
 <div class="card-text text-center">
 Capital:${result[i].capital}</div>
 
 <div class="card-text text-center">
 Country Code:${result[i].cca3}</div>
 <button class="btn btn-primary">Click for weather</button>
 </div>

 </div>
   
 `;
      row.append(col);
    }
    //button logic for appending weather details
    let buttons = document.querySelectorAll("button");
    //console.log(buttons);nodelist
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        //lating spliting
        let latlng = result[index].latlng; //log to print
        let lat = latlng[0];
        // console.log(lat);
        let lon = latlng[1];
        // console.log(lon);
        //weather api getting updating lat,lan,api
        let weatherApi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=075aa353e2d7988db8bd662b05662116`
        );
        //   
        weatherApi
          .then((data1) => data1.json())
          .then((res) => {
            alert(
              `weather of ${result[index].name.common}is ${Math.floor(
                res.main.temp
              )}`
            );
          });
      });
    });
  });

container.append(row);
document.body.append(h1, container);
