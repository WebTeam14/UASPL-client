// Script for Login page

// Add a demo user to localStorage
// Script for Login page

// Define demo users
const demoUser = {
  userId: "demoUser",
  password: "demoPass",
  role: "Admin",
};

const demoEmp = {
  userId: "demoEmp",
  password: "demoPass",
  role: "Employee",
};

const demoSoc = {
  userId: "demoSoc",
  password: "demoPass", 
  role: "Society",
};

function clearForm() {
  document.getElementById("userId").value = "";
  document.getElementById("password").value = "";
  document.getElementById("role").value = "";
}

// Store all users in localStorage with their userId as key
localStorage.setItem(demoUser.userId, JSON.stringify(demoUser));
localStorage.setItem(demoEmp.userId, JSON.stringify(demoEmp));
localStorage.setItem(demoSoc.userId, JSON.stringify(demoSoc));

const loginForm = document.getElementById("loginForm");
const alertBox = document.getElementById("alert");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!userId || !password || !role) {
      showAlert("Please fill in all fields.", "red");
      return;
    }

    // Get user by ID from localStorage
    const storedUser = JSON.parse(localStorage.getItem(userId));

    if (
      storedUser &&
      storedUser.userId === userId &&
      storedUser.password === password &&
      storedUser.role === role
    ) {
      showAlert("Login successful! Redirecting...", "green");

      setTimeout(() => {
        if (role === "Admin") {
          window.location.href = "adminDashboard.html";
          clearForm();
        } else if (role === "Employee") {
          window.location.href = "employeeDashboard.html";
          clearForm();
        } else if (role === "Society") {
          window.location.href = "society.html";
          clearForm();
        }
      }, 1000);
    } else {
      showAlert("Invalid credentials.", "red");
      clearForm();
    }
  });
}

// loginForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const userId = document.getElementById("userId").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const role = document.getElementById("role").value;

//   if (!userId || !password || !role) {
//     showAlert("Please fill in all fields.", "red");
//     return;
//   }

//   const storedUser = JSON.parse(localStorage.getItem(userId));

//   if (
//     storedUser &&
//     storedUser.userId === userId &&
//     storedUser.password === password &&
//     storedUser.role === role
//   ) {
//     showAlert("Login successful! Redirecting...", "green");

//     setTimeout(() => {
//       if (role === "Admin") {
//         window.location.href = "adminDashboard.html";
//         clearForm();
//       } else if (role === "Employee") {
//         window.location.href = "employeeDashboard.html";
//         clearForm();
//       } else if (role === "Society") {
//         window.location.href = "society.html";
//         clearForm();
//       }
//     }, 1000);
//   } else {
//     showAlert("Invalid credentials.", "red");
//     clearForm();
//   }
// });

function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className =
    "text-sm mb-4 text-center " +
    (type === "green"
      ? "text-green-700 bg-green-100 border border-green-300 p-2 rounded"
      : "text-red-700 bg-red-100 border border-red-300 p-2 rounded");
  alertBox.classList.remove("hidden");
}


// script common to all pages(Top and side navbar)

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  // Top nav links - dashboard page
  document.querySelectorAll(".top-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("text-white-600");
      link.classList.remove("text-blue-600");
    } else {
      link.classList.remove("text-white-600");
    }
  });

  // Sidebar links - dashboard page
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("text-blue-600", "bg-blue-100");
    } else {
      link.classList.remove("text-blue-600", "bg-blue-100");
    }
  });
});
