document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

export const API_ENDPOINT =
  "https://66e92ede87e417609448606c.mockapi.io/PromineoCRUDAPI/Contacts";
console.log(Response);

let contactsElement = document.getElementById("contacts");
console.log("Contacts Element:", contactsElement);

//NOTE - Added on interface to be able to fix the 'any' error due to the contact paremeter - specifying - the type of the perameter has a separate property.

interface Contact {
  name: string;
  phone: string;
}

export function handleContact(contact: Contact) {
  //NOTE - fixing contact  to handle contact
  console.log("Creating HTML for contact:", contact);

  return `
    <div class="card mb-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${contact.name}</h5>
        <p class="card-text">Phone: ${contact.phone || "No phone available"}</p>
      </div>
    </div>
  `;
}

//NOTE - fixed null issues with boolean expression

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

    if (!column1 || !column2 || !column3) {
      throw new Error("One or more columns are missing in the html");
    }
    // Clear columns
    column1.innerHTML = "";
    column2.innerHTML = "";
    column3.innerHTML = "";

    // Distribute contacts across the three columns
    json.forEach((contact: Contact, index: number) => {
      const contactHTML = handleContact(contact);

      if (index % 3 === 0) {
        column1.insertAdjacentHTML("beforeend", contactHTML);
      } else if (index % 3 === 1) {
        column2.insertAdjacentHTML("beforeend", contactHTML);
      } else {
        column3.insertAdjacentHTML("beforeend", contactHTML);
      }
    });

    //NOTE -
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
  }
}

//NOTE - working on addContact funtion next for servicies.

export async function addContact(name: string, phone: number) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add new contact. Status: ${response.status}`);
    }

    const newContact = await response.json();
    console.log("New contact added:", newContact);

    //NOTE -  Add the new contact to the list
    const contactsElement = document.getElementById("contacts");
    if (contactsElement) {
      contactsElement.insertAdjacentHTML(
        "beforeend",
        handleContact(newContact)
      );
    }
    fetchData();

    //NOTE - used typegaurd to fix the issue with the error of unknown type.
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Error adding contact:", error);
    }
  }
}

export async function deleteContact(id: string, elementId: string) {
  try {
    console.log("attempting to delete contact ID:", id);

    const response = await fetch(`${API_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to Delete contact. 
      Status: ${response.status}`);
    }

    console.log(`Contact with the ID ${id} deleted successfully`);

    //NOTE - remoing the element from the DOM
    const element = document.getElementById(elementId);
    if (element) {
      element.remove();
    } else {
      console.error(`Element with ID ${elementId} not found`);
    }
    fetchData();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Error deleating contact:", error);
    }
  }
}
