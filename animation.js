// DOM Elements for animations
const skillItems = document.querySelectorAll('.skill-item');

// Function to animate skill bars when the skills section is viewed
function animateSkillBars() {
  skillItems.forEach(item => {
    const percentage = item.getAttribute('data-percentage');
    const progressBar = item.querySelector('.progress-bar');
    
    // Set custom property for the animation
    progressBar.style.setProperty('--percentage', `${percentage}%`);
    
    // Reset the width first to ensure animation plays when re-entering the section
    progressBar.style.width = '0%';
    
    // Trigger animation after a small delay
    setTimeout(() => {
      progressBar.style.width = `${percentage}%`;
    }, 100);
  });
}

// Initialize the 3D cube rotation
document.addEventListener('DOMContentLoaded', () => {
  const cube = document.querySelector('.cube');
  
  if (cube) {
    // Enable mouse interaction with the cube
    document.addEventListener('mousemove', (e) => {
      const xRotation = -10 + (e.clientY / window.innerHeight) * 20; // -10 to 10 degrees
      const yRotation = -10 + (e.clientX / window.innerWidth) * 20; // -10 to 10 degrees
      
      // Apply the rotation with the base animation
      cube.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) rotate3d(1, 1, 1, ${Date.now() / 10000}rad)`;
    });
    
    // Return to normal animation when mouse leaves
    document.addEventListener('mouseleave', () => {
      cube.style.transform = '';
    });
  }
  
  // Education cards hover effect enhancement
  const educationCards = document.querySelectorAll('.education-card');
  
  educationCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add a subtle floating effect
      card.style.animation = 'float 3s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', () => {
      // Remove the floating effect
      card.style.animation = '';
    });
  });
  
  // Add rainbow border effect to navigation items on hover
  const navItems = document.querySelectorAll('.nav-links li');
  
  navItems.forEach(item => {
    if (!item.classList.contains('active')) {
      item.addEventListener('mouseenter', () => {
        item.style.background = 'linear-gradient(45deg, rgba(255, 51, 102, 0.1), rgba(102, 204, 255, 0.1), rgba(153, 102, 255, 0.1), rgba(255, 102, 204, 0.1))';
        item.style.backgroundSize = '400% 400%';
        item.style.animation = 'rainbow 3s linear infinite';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.background = '';
        item.style.animation = '';
      });
    }
  });
  
  // Animate timeline items on scroll
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const animateOnScroll = () => {
    timelineItems.forEach(item => {
      const itemPosition = item.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (itemPosition < screenPosition) {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
      }
    });
  };
  
  // Initialize timeline items
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Check for scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Initial check
  animateOnScroll();
  
  // Add particle background effect to the home section (light version)
  const homeSection = document.getElementById('home');
  
  if (homeSection) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    homeSection.appendChild(canvas);
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = homeSection.offsetWidth;
      canvas.height = homeSection.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Initialize particles
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 30;
    const colors = ['#FF3366', '#66CCFF', '#9966FF', '#FF66CC'];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animate particles
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
      requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
  }
});