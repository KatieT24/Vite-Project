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
  id: string;
}

// NOTE - Function to generate HTML for a contact card
export function handleContact(contact: Contact) {
  console.log("Creating HTML for contact:", contact);

  return `
    <div class="card mb-3" style="width: 18rem;" id="contact-${
      contact.id
    }" data-id="${contact.id}">
      <div class="card-body">
        <h5 class="card-title">${contact.name}</h5>
        <p class="card-text">Phone: ${contact.phone || "No phone available"}</p>
        <button class="btn btn-danger delete-btn">Delete</button>
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
  } catch (error) {
    console.error("Error fetching data:", error);
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
  } catch (error) {
    console.error(
      "Error adding contact:",
      error instanceof Error ? error.message : error
    );
  }
}

document
  .getElementById("add-contact-btn")
  ?.addEventListener("click", async () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;

    if (name && phone) {
      try {
        const response = await fetch("http://your-api-url/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, phone }),
        });

        if (response.ok) {
          const newContact = await response.json();
          createHTML(newContact); // Add to the DOM dynamically
        } else {
          console.error("Failed to add contact.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please fill in both name and phone fields.");
    }
  });

//NOTE - used typegaurd to fix the issue with the error of unknown type.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addContactForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit); // Usage here
  } else {
    console.error("Form element with ID 'addContactForm' not found.");
  }
});

export function handleFormSubmit(e: Event) {
  e.preventDefault();

  const nameElement = document.getElementById(
    "contactName"
  ) as HTMLInputElement | null;
  const phoneElement = document.getElementById(
    "contactPhone"
  ) as HTMLInputElement | null;

  const name = nameElement?.value.trim() || "";
  const phone = phoneElement?.value.trim() || "";

  console.log("Form submitted with:", { name, phone });

  // Only add contact if both name and phone are provided
  //NOTE - had to add parsInt to fix issues with the phone number as it's not a string.
  if (name && phone) {
    const phoneNumber = parseInt(phone, 10);

    if (!isNaN(phoneNumber)) {
      addContact(name, phoneNumber);

      // Clear form inputs
      if (nameElement) nameElement.value = "";
      if (phoneElement) phoneElement.value = "";
    } else {
      console.error("Invalid phone number entered.");
    }
  } else {
    console.error("Name or phone number is missing.");
  }
}

export async function deleteContact(id: string, elementId: string) {
  try {
    console.log("Attempting to delete contact ID:", id);

    const response = await fetch(`${API_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete contact. Status: ${response.status}`);
    }

    console.log(`Contact with ID ${id} deleted successfully`);

    // Remove the element from the DOM
    const element = document.getElementById(elementId);
    if (element) {
      element.remove();
    } else {
      console.error(`Element with ID ${elementId} not found`);
    }

    // Refresh the contact list
    fetchData();
  } catch (error) {
    console.error(
      "Error deleting contact:",
      error instanceof Error ? error.message : error
    );
  }
}

//NOTE - added the deleteContact to the window object to be able to acess the delete button.
window.deleteContact = deleteContact;

//NOTE - continueation of the delete contact function.

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;

  if (target && target.classList.contains("delete-btn")) {
    const contactCard = target.closest(".card");

    if (contactCard instanceof HTMLElement && contactCard.dataset.id) {
      const contactId = contactCard.dataset.id;
      deleteContact(contactId, contactCard.id);
    }
  }
});
export function createHTML(newContact: Contact) {
  const contactsElement = document.getElementById("contacts");
  if (contactsElement) {
    contactsElement.insertAdjacentHTML("beforeend", handleContact(newContact));
  }
}
