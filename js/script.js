console.log("script loaded");

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

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const alertBox = document.getElementById("alert");

  function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className =
      "text-sm mb-4 text-center " +
      (type === "green"
        ? "text-green-700 bg-green-100 border border-green-300 p-2 rounded"
        : "text-red-700 bg-red-100 border border-red-300 p-2 rounded");
    alertBox.classList.remove("hidden");
  }

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
          } else if (role === "Employee") {
            window.location.href = "employeeDashboard.html";
          } else if (role === "Society") {
            window.location.href = "society.html";
          }
          clearForm();
        }, 1000);
      } else {
        showAlert("Invalid credentials.", "red");
        clearForm();
      }
    });
  }
});

//   const baseUrl =
//     window.location.origin +
//     window.location.pathname.replace("index.html", "");

//   setTimeout(() => {
//     if (role === "Admin") {
//       window.location.href = baseUrl + "adminDashboard.html";
//     } else if (role === "Employee") {
//       window.location.href = baseUrl + "employeeDashboard.html";
//     } else if (role === "Society") {
//       window.location.href = baseUrl + "society.html";
//     }
//     clearForm();
//   }, 1000);

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
