// Toggle for Admin icon

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('profileDropdownBtn');
  const menu = document.getElementById('profileDropdownMenu');

  // Toggle menu on button click
  btn.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent event bubbling
    menu.classList.toggle('hidden');
    
    // Update aria-expanded for accessibility
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });

  // Close menu if clicked outside
  document.addEventListener('click', function () {
    if (!menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

/// Load from localStorage or fallback to defaults
let compliances = JSON.parse(localStorage.getItem("compliances")) || [
  { doc: "Society Registration Certificate", status: "Valid", expiry: "2026-12-15" },
  { doc: "Fire Safety Certificate", status: "Expired", expiry: "2024-08-10" },
  { doc: "Lift License", status: "Valid", expiry: "2026-03-01" },
  { doc: "Property Tax Receipt", status: "Pending", expiry: "" },
  { doc: "Annual Audit Report", status: "Submitted", expiry: "2025-03-31" }
];

// DOM elements
const complianceTable = document.querySelector("tbody");
const totalCount = document.querySelector(".grid div:nth-child(1) p");
const expiredCount = document.querySelector(".grid div:nth-child(2) p");
const validCount = document.querySelector(".grid div:nth-child(3) p");
const uploadForm = document.querySelector("form");

// Save to localStorage
function saveCompliances() {
  localStorage.setItem("compliances", JSON.stringify(compliances));
}

// Render compliance table
function renderCompliances() {
  complianceTable.innerHTML = "";

  let total = compliances.length;
  let expired = 0;
  let valid = 0;

  compliances.forEach((c, index) => {
    if (c.status === "Expired" || c.status === "Pending") expired++;
    if (c.status === "Valid" || c.status === "Submitted") valid++;

    complianceTable.innerHTML += `
      <tr>
        <td class="py-2 px-4 border">${c.doc}</td>
        <td class="py-2 px-4 border ${getStatusColor(c.status)}">${c.status}</td>
        <td class="py-2 px-4 border">${c.expiry ? formatDate(c.expiry) : "--"}</td>
        <td class="py-2 px-4 border">
          ${c.status === "Expired" 
            ? `<button onclick="renewCompliance(${index})" class="bg-orange-500 text-white px-2 py-1 rounded">Renew</button>`
            : c.status === "Pending" 
              ? `<button onclick="payCompliance(${index})" class="bg-blue-600 text-white px-2 py-1 rounded">Pay Now</button>`
              : `<a href="#" class="text-blue-600 hover:underline">View</a>`}
        </td>
      </tr>
    `;
  });

  totalCount.textContent = total;
  expiredCount.textContent = expired;
  validCount.textContent = valid;

  saveCompliances();
}

// Helper: Status color classes
function getStatusColor(status) {
  if (status === "Valid" || status === "Submitted") return "text-green-600";
  if (status === "Expired") return "text-red-600";
  if (status === "Pending") return "text-red-500";
  return "text-gray-600";
}

// Helper: format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

// Add new compliance
uploadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const docName = uploadForm.querySelector("input[type='text']").value.trim();
  const expiryDate = uploadForm.querySelector("input[type='date']").value;

  if (!docName) return;

  const newCompliance = {
    doc: docName,
    status: "Pending", // default new entry
    expiry: expiryDate || ""
  };

  compliances.push(newCompliance);

  // Reset form
  uploadForm.reset();

  renderCompliances();
});

// Renew compliance
function renewCompliance(index) {
  compliances[index].status = "Valid";
  compliances[index].expiry = new Date();
  compliances[index].expiry.setFullYear(compliances[index].expiry.getFullYear() + 1);
  compliances[index].expiry = compliances[index].expiry.toISOString().split("T")[0];
  renderCompliances();
}

// Pay compliance (like Property Tax)
function payCompliance(index) {
  compliances[index].status = "Valid";
  compliances[index].expiry = new Date().toISOString().split("T")[0];
  renderCompliances();
}

// Initial render
renderCompliances();
