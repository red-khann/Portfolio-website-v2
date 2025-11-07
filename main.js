const navLinks = document.querySelectorAll('.ul-list li a, .footer-links li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  // Only removes active class from the floating menu list items
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    // Default scroll offset (for all sections other than Home)
    let scrollPosition = targetSection.offsetTop - 120;
    
    // If target is Home, scroll to absolute top (0)
    if (targetId === 'home') {
        scrollPosition = 0;
    }
    
    window.scrollTo({
      top: scrollPosition, 
      behavior: 'smooth'
    });

    // Only apply highlight logic if the link is part of the floating menu (.ul-list)
    if (link.closest('.ul-list')) {
        removeActive();
        link.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('scroll', () => {
  let foundActive = false;
  
  // Determine base offset based on screen size
  let baseOffset;
  if (window.innerWidth > 1024) {
      // Desktop: General offset for highlighting below fixed header
      baseOffset = 160; 
  } else {
      // Mobile/Tablet: General default offset
      baseOffset = 190;
  }
  
  sections.forEach(section => {
    let offset = baseOffset; 

    // Apply specific overrides
    if (section.id === 'about') {
        if (window.innerWidth <= 1024) {
            // Custom offset for 'about' on mobile
            offset = 120; 
        }
    }
    
    // NEW ADJUSTMENT: Reduced offset for 'contact' on all devices
    if (section.id === 'contact') {
        if (window.innerWidth > 1024) {
            // Desktop: Smaller offset for the final section
            offset = 120; 
        } else {
            // Mobile/Tablet: Reduced offset (from 250 to 180) to prevent early highlight
            offset = 180; 
        }
    }
    
    let scrollPos = window.scrollY + offset;

    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      // Ensure only floating menu links are targeted for highlighting
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) {
          activeLink.parentElement.classList.add('active');
          foundActive = true;
      }
    }
  });

  // Check if the user is at the very bottom of the page (fixes Contact section highlight)
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!foundActive) {
          removeActive();
          const contactLink = document.querySelector(`.ul-list li a[href="#contact"]`);
          if (contactLink) {
              contactLink.parentElement.classList.add('active');
          }
      }
  }

  // NOTE: backToTop code (assuming 'backToTop' is defined globally or defined later as in your original file)
  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
// Replaced with your titles
const words = ["Aspiring AI/ML Engineer", "BCA Student", "Python Developer", "Data Analyst"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);