// Toggle for Society icon

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

// Complaints data
let complaints = [
  { id: "C-101", issue: "Lift not working", status: "In Progress" },
  { id: "C-102", issue: "Water leakage", status: "Resolved" }
];

// Bills data (unchanged)
let bills = [
  { month: "August 2025", amount: 2500, status: "Pending" },
  { month: "July 2025", amount: 2500, status: "Paid" }
];

// DOM elements
const complaintTable = document.getElementById("complaintTable");
const complaintForm = document.getElementById("complaintForm");
const complaintIssue = document.getElementById("complaintIssue");
const complaintStatus = document.getElementById("complaintStatus");
const complaintCount = document.getElementById("complaintCount");
const billList = document.getElementById("billList");
const pendingAmount = document.getElementById("pendingAmount");

// Auto-generate Complaint ID
function generateComplaintId() {
  return "C-" + (complaints.length + 101);
}

// Render complaints
function renderComplaints() {
  complaintTable.innerHTML = "";
  let pending = 0;

  complaints.forEach((c, index) => {
    if (c.status !== "Resolved") pending++;

    complaintTable.innerHTML += `
      <tr>
        <td class="py-2 px-4 border">${c.id}</td>
        <td class="py-2 px-4 border">${c.issue}</td>
        <td class="py-2 px-4 border">${c.status}</td>
        <td class="py-2 px-4 border">
          ${c.status !== "Resolved" 
            ? `<button onclick="resolveComplaint(${index})" class="text-green-600 hover:underline">Mark Resolved</button>`
            : `<span class="text-gray-400">-</span>`}
        </td>
      </tr>`;
  });

  complaintCount.textContent = pending;
}

// Add complaint
complaintForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newComplaint = {
    id: generateComplaintId(),
    issue: complaintIssue.value.trim(),
    status: complaintStatus.value
  };

  complaints.push(newComplaint);

  // Reset form
  complaintIssue.value = "";
  complaintStatus.value = "";

  renderComplaints();
});

// Resolve complaint
function resolveComplaint(index) {
  complaints[index].status = "Resolved";
  renderComplaints();
}

// --- Bills section remains the same ---
function renderBills() {
  billList.innerHTML = "";
  let totalPending = 0;

  bills.forEach((b, index) => {
    if (b.status === "Pending") totalPending += b.amount;

    billList.innerHTML += `
      <li class="py-2 flex justify-between items-center">
        <span>${b.month} - ₹${b.amount}</span>
        <span class="${b.status === "Paid" ? "text-green-600" : "text-red-500"}">${b.status}</span>
        ${b.status === "Pending"
          ? `<button onclick="payBill(${index})" class="ml-4 bg-blue-600 text-white px-2 py-1 rounded">Pay</button>`
          : ""}
      </li>`;
  });

  pendingAmount.textContent = "₹ " + totalPending;
}

function payBill(index) {
  bills[index].status = "Paid";
  renderBills();
}

// Initial render
renderComplaints();
renderBills();
