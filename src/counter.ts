interface Contact {
  name: string;
  phone?: string;
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
  `;
}

export function createHeader(title: string) {
  return `<h1>${title}</h1>`;
}
console.log("javascript is running correctly!");
