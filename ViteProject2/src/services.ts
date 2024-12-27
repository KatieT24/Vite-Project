export const API_ENDPOINT =
  "https://66e92ede87e417609448606c.mockapi.io/PromineoCRUDAPI/Contacts";
console.log(Response);

let contactsElement = document.getElementById("contacts");
console.log("Contacts Element:", contactsElement);

export async function fetchData() {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("API GET DATA:", json);

    // Get the three columns
    const column1 = document.getElementById("column-1");
    const column2 = document.getElementById("column-2");
    const column3 = document.getElementById("column-3");

    // Clear columns
    column1.innerHTML = "";
    column2.innerHTML = "";
    column3.innerHTML = "";

    // Distribute contacts across the three columns
    json.forEach((contact, index) => {
      const contactHTML = createHTML(contact);

      if (index % 3 === 0) {
        column1.insertAdjacentHTML("beforeend", contactHTML);
      } else if (index % 3 === 1) {
        column2.insertAdjacentHTML("beforeend", contactHTML);
      } else {
        column3.insertAdjacentHTML("beforeend", contactHTML);
      }
    });
  } catch (error) {
    console.log("Error, Unable to fetch data:", error.message);
  }
}
