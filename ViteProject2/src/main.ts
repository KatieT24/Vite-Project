import "./style.css";
console.log("Hellow Vite!");
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchData, postData } from "./services";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="container mt-5">
      <h1 class="mb-4">Contacts List</h1>

      <!-- Form Container -->
      <div id="form-container" class="mb-4">
        <form id="addContactForm" class="row mb-4">
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              id="contactName"
              placeholder="Name"
              required
            />
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              id="contactPhone"
              placeholder="Phone Number"
              required
            />
          </div>
          <div class="col-md-4">
            <button type="submit" class="btn btn-primary w-100">
              Add Contact
            </button>
          </div>
        </form>
      </div>

      <!-- Three Columns for Contacts -->
      <div class="row" id="contact-columns">
        <div class="col-md-4" id="column-1"></div>
        <div class="col-md-4" id="column-2"></div>
        <div class="col-md-4" id="column-3"></div>
      </div>
    </div>
`;