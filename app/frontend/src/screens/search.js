let searchBar = document.getElementById("search")

function catalogList(data) {
    for (let i = 0; i < data.products.length; i++) {
        let item = data.products[i];
        let itemInCatalog = item.name.includes(searchBar.value);
        if (itemInCatalog) {
            let displayText = document.getElementById("display");
            let image = document.createElement("IMG");
            image.setAttribute("src", `${item.image}`);
            displayText.appendChild(image);
        }
    }
}

searchBar.addEventListener("onkeyup", function () {
    let url = `/auth`;
    fetch(url).then(function (response) {
        if (response.status === 200) {
            response.json().then(function(data) {
                console.log(data);
                catalogList(data);
            });
        }
        else {
            response.json().then(function(error) {
                let displayText = document.getElementById("display");
                displayText.textContent = "No items found";
            });
        }
    });
});