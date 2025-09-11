document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  // Top nav links
  document.querySelectorAll(".top-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("text-blue-600", "border-b-2", "border-blue-600");
      link.classList.remove("text-gray-600");
    } else {
      link.classList.remove("text-blue-600", "border-blue-600");
    }
  });

  // Sidebar links
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("text-blue-600", "bg-blue-100");
    } else {
      link.classList.remove("text-blue-600", "bg-blue-100");
    }
  });
});

// Progress chart
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
