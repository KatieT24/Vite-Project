declare global {
  interface Window {
    deleteContact: (id: string, elementId: string) => void;
  }
}

interface Contact {
  name: string;
  phone: string;
  id: string;
}

export function createHTML(contact: Contact) {
  //NOTE - Log the contact to ensure phone is present
  console.log("Creating HTML for contact:", contact);

  return `
    <div class="card mb-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${contact.name}</h5>
        <p class="card-text">Phone: ${contact.phone || "No phone available"}</p>
      </div>
    </div>

    <div class="card mb-3" style="width: 18rem;" id="contact-${
      contact.id
    }" data-id="${contact.id}">
      <div class="card-body">
        <h5 class="card-title">${contact.name}</h5>
        <p class="card-text">Phone: ${contact.phone || "No phone available"}</p>
       <button class="btn btn-danger delete-btn" id="delete-${contact.id}">
  Delete
</button>
      </div>
    </div>
  `;
}

export function createHeader(title: string) {
  return `<h1>${title}</h1>`;
}
console.log("javascript is running correctly!");
