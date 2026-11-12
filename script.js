// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#0a0a0a';
        nav.style.padding = '10px 0';
        nav.style.transition = 'all 0.3s';
    } else {
        nav.style.background = 'transparent';
        nav.style.padding = '20px 0';
    }
});

// Fade-in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Render and Filter Projects from projects.js
const projectsContainer = document.getElementById('projects-container');
const filterButtons = document.querySelectorAll('.filter-btn');

function displayProjects(filter = 'all') {
    projectsContainer.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? myProjects 
        : myProjects.filter(project => project.category === filter);

    filtered.forEach(project => {
        const linkHtml = project.link && project.link !== "#" 
            ? `<a href="${project.link}" target="_blank" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>` 
            : '';

        const card = `
            <div class="project-card">
                <i class="${project.icon} project-icon"></i>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${linkHtml}
            </div>
        `;
        projectsContainer.innerHTML += card;
    });
}

// Event listeners for filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        displayProjects(btn.getAttribute('data-filter'));
    });
});

// Initial load
if (typeof myProjects !== 'undefined') {
    displayProjects('all');
}
