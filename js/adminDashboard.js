
//Script for Admin Dashboard page

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

// dynamic rendering of tabs and details
function showDetails(sectionId) {
  const sourceContent = document.getElementById(sectionId);
  const detailsPanel = document.getElementById('detailsPanel');

  if (!sourceContent || !detailsPanel) return;

  // Clone the node (deep = true)
  const cloned = sourceContent.cloneNode(true);
  cloned.classList.remove('hidden');

  // Clear existing content and insert new one
  detailsPanel.innerHTML = '';
  detailsPanel.appendChild(cloned);

  // detailsPanel.scrollIntoView({ behavior: 'smooth' });
}

if (window.innerWidth < 768) {
  detailsPanel.scrollIntoView({ behavior: 'smooth' });
}
