// Load existing or default data
let legalDocs = JSON.parse(localStorage.getItem("legalDocs")) || [
  { doc: "Land Agreement", type: "Agreement", status: "Active", expiry: "2026-05-10", file: "docs/agreement.pdf" },
  { doc: "Vendor Contract", type: "Contract", status: "Expired", expiry: "2024-11-01", file: "docs/contract.pdf" },
  { doc: "Court Case - Tower A", type: "Case", status: "Under Review", expiry: "", file: "docs/case.pdf" }
];

// DOM Elements
const legalTable = document.getElementById("legalTable");
const totalDocs = document.getElementById("totalDocs");
const activeCases = document.getElementById("activeCases");
const expiredDocs = document.getElementById("expiredDocs");
const legalForm = document.getElementById("legalForm");

// Modal Elements
const modal = document.getElementById("legalModal");
const previewFrame = document.getElementById("legalPreview");

function renderLegalDocs() {
  legalTable.innerHTML = "";
  let total = legalDocs.length;
  let active = 0;
  let expired = 0;

  legalDocs.forEach((doc, index) => {
    if (doc.status === "Active") active++;
    if (doc.status === "Expired") expired++;

    legalTable.innerHTML += `
      <tr>
        <td class="py-2 px-4 border">${doc.doc}</td>
        <td class="py-2 px-4 border">${doc.type}</td>
        <td class="py-2 px-4 border ${getStatusColor(doc.status)}">${doc.status}</td>
        <td class="py-2 px-4 border">${doc.expiry ? formatDate(doc.expiry) : "--"}</td>
        <td class="py-2 px-4 border">
          <button onclick="openModal('${doc.file}')" class="text-blue-600 hover:underline">View</button>
        </td>
      </tr>
    `;
  });

  totalDocs.textContent = total;
  activeCases.textContent = active;
  expiredDocs.textContent = expired;

  localStorage.setItem("legalDocs", JSON.stringify(legalDocs));
}

// Add Document
legalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("docFile");
  let filePath = fileInput.value ? URL.createObjectURL(fileInput.files[0]) : "";

  const newDoc = {
    doc: document.getElementById("docName").value.trim(),
    type: document.getElementById("docType").value.trim(),
    status: "Active",
    expiry: document.getElementById("docExpiry").value || "",
    file: filePath
  };

  legalDocs.push(newDoc);
  legalForm.reset();
  renderLegalDocs();
});

// Modal Functions
function openModal(filePath) {
  previewFrame.src = filePath;
  modal.classList.remove("hidden");
}

function closeModal() {
  previewFrame.src = "";
  modal.classList.add("hidden");
}

// Helpers
function getStatusColor(status) {
  if (status === "Active") return "text-green-600";
  if (status === "Expired") return "text-red-600";
  if (status === "Under Review") return "text-orange-600";
  return "text-gray-600";
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// Initial render
renderLegalDocs();
