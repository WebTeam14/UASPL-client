let meetings = JSON.parse(localStorage.getItem("meetings")) || [
  { date: "2025-10-01", time: "10:00", agenda: "Quarterly Maintenance Review", attendees: "Admin, Employees", status: "Scheduled" },
  { date: "2025-09-15", time: "15:00", agenda: "Annual Budget Discussion", attendees: "Committee Members", status: "Completed" }
];

const meetingTable = document.getElementById("meetingTable");
const totalMeetings = document.getElementById("totalMeetings");
const upcomingMeetings = document.getElementById("upcomingMeetings");
const completedMeetings = document.getElementById("completedMeetings");
const meetingForm = document.getElementById("meetingForm");

// Modal elements
const modal = document.getElementById("meetingModal");
const modalDate = document.getElementById("modalDate");
const modalTime = document.getElementById("modalTime");
const modalAgenda = document.getElementById("modalAgenda");
const modalAttendees = document.getElementById("modalAttendees");
const modalStatus = document.getElementById("modalStatus");

function renderMeetings() {
  meetingTable.innerHTML = "";
  let total = meetings.length;
  let upcoming = 0;
  let completed = 0;

  meetings.forEach((mtg, index) => {
    if (mtg.status === "Scheduled") upcoming++;
    if (mtg.status === "Completed") completed++;

    meetingTable.innerHTML += `
      <tr>
        <td class="py-2 px-4 border">${mtg.date}</td>
        <td class="py-2 px-4 border">${mtg.time}</td>
        <td class="py-2 px-4 border">${mtg.agenda}</td>
        <td class="py-2 px-4 border ${getStatusColor(mtg.status)}">${mtg.status}</td>
        <td class="py-2 px-4 border">
          <button onclick="openMeetingModal(${index})" class="text-blue-600 hover:underline">View</button>
        </td>
      </tr>
    `;
  });

  totalMeetings.textContent = total;
  upcomingMeetings.textContent = upcoming;
  completedMeetings.textContent = completed;

  localStorage.setItem("meetings", JSON.stringify(meetings));
}

meetingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newMeeting = {
    date: document.getElementById("meetingDate").value,
    time: document.getElementById("meetingTime").value,
    agenda: document.getElementById("meetingAgenda").value.trim(),
    attendees: document.getElementById("meetingAttendees").value.trim() || "N/A",
    status: "Scheduled"
  };

  meetings.push(newMeeting);
  meetingForm.reset();
  renderMeetings();
});

// Modal functions
function openMeetingModal(index) {
  const mtg = meetings[index];
  modalDate.textContent = mtg.date;
  modalTime.textContent = mtg.time;
  modalAgenda.textContent = mtg.agenda;
  modalAttendees.textContent = mtg.attendees;
  modalStatus.textContent = mtg.status;

  modal.classList.remove("hidden");
}

function closeMeetingModal() {
  modal.classList.add("hidden");
}

function getStatusColor(status) {
  if (status === "Scheduled") return "text-green-600";
  if (status === "Completed") return "text-gray-600";
  if (status === "Cancelled") return "text-red-600";
  return "text-gray-600";
}

// Initial render
renderMeetings();
