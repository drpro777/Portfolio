// DOM Elements
const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const viewWorkBtn = document.getElementById('view-work-btn');
const contactBtn = document.getElementById('contact-btn');

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
  // Event listeners for navigation
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove active class from all links
      navLinks.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Show the corresponding section
      const sectionId = link.getAttribute('data-section');
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
          section.classList.add('active');
          
          // If the section is skills, animate the skill bars
          if (sectionId === 'skills') {
            animateSkillBars();
          }
          
          // If the section is about, animate stats
          if (sectionId === 'about') {
            animateStats();
          }
        }
      });
    });
  });
  
  // Quick navigation buttons
  if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', () => {
      navigateToSection('skills');
    });
  }
  
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      navigateToSection('contact');
    });
  }
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Animate input focus effect
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.querySelector('.focus-border').style.width = '100%';
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.querySelector('.focus-border').style.width = '0';
      }
    });
  });
  
  // Initialize the first animation for the home section
  setTimeout(() => {
    animateStats();
  }, 1000);
});

// Function to navigate to a specific section
function navigateToSection(sectionId) {
  // Find the nav link with the matching data-section attribute
  const navLink = document.querySelector(`.nav-links li[data-section="${sectionId}"]`);
  if (navLink) {
    navLink.click(); // Trigger the click event on the nav link
  }
}

// Function to handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Validate form (simple validation)
  if (!name || !email || !subject || !message) {
    showFormStatus('Please fill in all fields', false);
    return;
  }
  
  // Simulate form submission (in a real app, you would send this to a server)
  setTimeout(() => {
    showFormStatus('Message sent successfully! Thanks for Message, I will text you soon', true);
    contactForm.reset();
    
    // Reset focus borders
    document.querySelectorAll('.focus-border').forEach(border => {
      border.style.width = '0';
    });
  }, 1500);
  
  // Show loading status
  showFormStatus('Sending message...', true);
}

// Function to show form status messages
function showFormStatus(message, isSuccess) {
  formStatus.textContent = message;
  formStatus.className = 'form-status';
  
  if (isSuccess) {
    formStatus.classList.add('success');
  } else {
    formStatus.classList.add('error');
  }
  
  // Hide status message after 5 seconds
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
}

// Function to animate the statistics counters
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000; // Animation duration in ms
    const step = target / (duration / 16); // 60fps approx
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current <= target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };
    
    updateCounter();
  });
}