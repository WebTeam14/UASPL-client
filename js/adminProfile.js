
//Script for Admin Profile page

// Toggle for edit profile and change password - Admin page

function toggleSection(sectionId) {
      const section = document.getElementById(sectionId);
      section.classList.toggle('hidden');
      section.scrollIntoView({ behavior: 'smooth' });
    }

    function hideSection(sectionId) {
      document.getElementById(sectionId).classList.add('hidden');
    }

    function handleSuccess(message, sectionToClose) {
      const alertBox = document.getElementById('alertBox');
      const alertMessage = document.getElementById('alertMessage');

      alertMessage.textContent = message;
      alertBox.classList.remove('hidden', 'opacity-0');
      alertBox.classList.add('opacity-100');
      alertBox.scrollIntoView({ behavior: 'smooth' });

      // Auto-close alert and section after 3 seconds
      setTimeout(() => {
        closeAlert();
        hideSection(sectionToClose);
      }, 2000);
    }

    function closeAlert() {
      const alertBox = document.getElementById('alertBox');
      alertBox.classList.add('opacity-0');
      setTimeout(() => {
        alertBox.classList.add('hidden');
      }, 500); // Matches CSS transition duration
    }

    // Manage users

    document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
    renderUserTable();
  }

  function renderUserTable() {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.classList.add("border-t");

      row.innerHTML = `
        <td class="px-4 py-2">
          <input type="text" value="${user.name}" class="rounded px-2 py-1 w-full" onchange="editUser(${index}, 'name', this.value)" />
        </td>
        <td class="px-4 py-2">
          <input type="text" value="${user.role}" class="rounded px-2 py-1 w-full" onchange="editUser(${index}, 'role', this.value)" />
        </td>
        <td class="px-4 py-2">
          <button data-index="${index}" class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
        </td>
      `;

      tbody.appendChild(row);
    });

    // Attach delete event handlers after rendering
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        deleteUser(index);
      });
    });
  }

  function editUser(index, key, value) {
    users[index][key] = value;
    saveUsers();
  }

  function deleteUser(index) {
    users.splice(index, 1);
    saveUsers();
  }

  const form = document.getElementById("userForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value.trim();

    if (name && role) {
      users.push({ name, role });
      saveUsers();
      form.reset();
    }
  });

  // Initial render
  renderUserTable();
});
