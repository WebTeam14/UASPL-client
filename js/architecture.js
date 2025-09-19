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

function openModal(imgSrc) {
  const modal = document.getElementById("planModal");
  const modalImg = document.getElementById("planImage");
  modalImg.src = imgSrc;
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("planModal");
  modal.classList.add("hidden");
}