document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    // Not logged in → go back to login page
    window.location.href = "index.html";
    return;
  }

  // Update navbar
  const roleEl = document.getElementById("userRole");
  const nameEl = document.getElementById("userName");
  const initialsEl = document.getElementById("userInitials");

  if (roleEl) roleEl.textContent = user.role;
  if (nameEl) nameEl.textContent = user.userId;
  if (initialsEl) initialsEl.textContent = user.userId.charAt(0).toUpperCase();

  // Fix Dashboard link dynamically
  const dashboardLink = document.getElementById("dashboardLink");
  if (dashboardLink) {
    if (user.role === "Admin") {
      dashboardLink.href = "adminDashboard.html";
    } else if (user.role === "Employee") {
      dashboardLink.href = "employeeDashboard.html";
    } else if (user.role === "Society") {
      dashboardLink.href = "society.html";
    }
  }

  // Logout handling from dropdown
  const logoutLink = document.querySelector("#profileDropdownMenu a[href='index.html']");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }
});
