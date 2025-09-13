
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