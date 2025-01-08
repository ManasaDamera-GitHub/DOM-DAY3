let btn = document.getElementById("btn")
btn.addEventListener("click", async () => {
    console.log("Getting the data.......please wait")
    let response = await fetch("https://manasadamera-github.github.io/DOM-DAY3/db.json")
    try {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
    } catch (error) {
        alert(error, "Data Failed to fetch")
    }
    let data = await response.json();
    displayData(data)
})

function displayData(data) {
    let container = document.getElementsByClassName("container")[0];
    data.forEach(function (obj) {
        let item = document.createElement("div");
        item.innerHTML =
            `<img src="${obj.image}" alt ="${obj.title}">
            <p>${obj.title}</p>
                <p>${obj.description}</p>
                <button id = "${obj.id}">Remove</button>`;

        container.appendChild(item)
        let button = document.getElementById(`${obj.id}`);
        button.onclick = () => {
            deleteItem(obj.id, item)
        }
    })
}

async function deleteItem(id, item) {
    try {
        // Send DELETE request to the server
        const response = await fetch(`https://manasadamera-github.github.io/DOM-DAY3/db.json/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Failed to delete item");
        }

        console.log(`Item with ID ${id} deleted successfully`);

        // Remove the item from the DOM
        item.remove();
    } catch (error) {
        console.error("Error:", error);
    }
}
