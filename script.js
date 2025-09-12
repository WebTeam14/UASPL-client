document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  // Top nav links - dashboard page
  document.querySelectorAll(".top-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("text-blue-600", "border-b-2", "border-blue-600");
      link.classList.remove("text-gray-600");
    } else {
      link.classList.remove("text-blue-600", "border-blue-600");
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

// Progress chart - dashboard page
const ctx = document.getElementById("progressChart").getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Avg Completion", "On Time"],
    datasets: [
      {
        label: "Progress (%)",
        data: [62, 78],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)", // Tailwind blue-500
          "rgba(16, 185, 129, 0.7)", // Tailwind green-500
        ],
        borderRadius: 8,
        barThickness: 50
      },
    ],
  },
  options: {
    indexAxis: "x", // ✅ Vertical bars
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + "%",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y}%`,
        },
      },
    },
  },
});

// Toggle for Admin icon - Dashboard page

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