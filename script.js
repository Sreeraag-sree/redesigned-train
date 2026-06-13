/* ========================================================= 
   FOLIO — INTERACTIVE FUNCTIONAL LOGIC WORKERS
   ========================================================= */ 

/* ---------- 1. THEME MODE STORAGE TOGGLE ---------- */ 
const themeToggle = document.querySelector('#theme-toggle'); 

// Check local storage setting for persistent user preference loops
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => { 
  document.body.classList.toggle('dark'); 
  const isDark = document.body.classList.contains('dark'); 
  themeToggle.textContent = isDark ? '☀️' : '🌙'; 
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}); 


/* ---------- 2. DYNAMIC SMOOTH FILTER ENGINE (TASK 3) ---------- */ 
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects-container .card');
const projectCounter = document.querySelector('#project-counter');

function updateProjectCount() {
  const visibleCount = document.querySelectorAll('#projects-container .card:not([style*="display: none"])').length;
  const totalCount = projectCards.length;
  projectCounter.textContent = `Showing ${visibleCount} of ${totalCount} projects`;
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button state styling triggers
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const targetFilter = button.getAttribute('data-filter');
    
    // Fade containment view grid container out slightly for transition look feel
    const container = document.querySelector('#projects-container');
    container.style.opacity = '0.3';
    
    setTimeout(() => {
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (targetFilter === 'all' || category === targetFilter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Bring back view layout opacity and update visible live counters
      container.style.opacity = '1';
      updateProjectCount();
    }, 200);
  });
});

// Run calculation immediately on dynamic lifecycle initialization setup
updateProjectCount();


/* ---------- 3. TO-TOP SCROLL ANCHORS ---------- */ 
const toTop = document.querySelector('#to-top'); 

window.addEventListener('scroll', () => { 
  if (window.scrollY > 400) { 
    toTop.classList.add('show'); 
  } else { 
    toTop.classList.remove('show'); 
  } 
}); 

toTop.addEventListener('click', () => { 
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
}); 


/* ---------- 4. SCROLL INTERSECTION PERFORMANCE DETECTORS ---------- */ 
const revealItems = document.querySelectorAll('.reveal'); 

const observer = new IntersectionObserver((entries) => { 
  entries.forEach((entry) => { 
    if (entry.isIntersecting) { 
      entry.target.classList.add('is-visible'); 
      observer.unobserve(entry.target); 
    } 
  }); 
}, { 
  threshold: 0.1 
}); 

revealItems.forEach((item) => observer.observe(item));
document.addEventListener("DOMContentLoaded", function() {
  const grid = document.getElementById("projects-container");

  // Grab the JSON file created by the Python script
  fetch("projects.json")
    .then(res => res.json())
    .then(projects => {
      // Clear out any placeholder HTML design cards first
      grid.innerHTML = ""; 
      
      // Generate standard design cards for each project
      projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-category", project.category);
        
        card.innerHTML = `
          <span class="tag">${project.category} Category</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="chips">
            <span class="chip">${project.tech}</span>
          </div>
          <a href="${project.link}" target="_blank" class="card-link">View Project ↗</a>
        `;
        
        grid.appendChild(card);
      });
    })
    .catch(err => console.log("Run the Python script locally first to generate the file:", err));
});