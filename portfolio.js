const projects = [
    {
        type: 'development',
        title: 'Grill & Kill',
        description: 'Resturant website template with backend.',
        image: './images/Burger.jpg',
        tags: ['HTML', 'CSS']
    },
    {
        type: 'design',
        title: 'Notes Zone',
        description: 'One stop solution for notes.',
        image: './images/NotesZone.jpg',
        tags: ['Branding', 'Logo Design']
    },
    {
        type: 'development',
        title: 'Cranberri',
        description: 'Sweet and simple solution for web development.',
        image: './images/Cranberri.jpg',
        tags: ['Branding', 'Logo Design']
    },
 
];

function createProjectCard(project) {
    return `
        <div class="project-card" data-type="${project.type}">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function initializeProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterProjects(filter);
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('visible'), 100);
        } else {
            card.style.display = 'none';
            card.classList.remove('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeProjects);

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Active navigation link highlighting
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Form handling
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Add your form submission logic here
    console.log('Form submitted:', Object.fromEntries(formData));
    form.reset();
}

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Event listeners
window.addEventListener('scroll', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add stagger effect for child elements
            const children = entry.target.querySelectorAll('.stagger');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
                child.classList.add('visible');
            });
            observer.unobserve(entry.target);
        }
    });
};

// Initialize animations
function initializeAnimations() {
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements with reveal class
    document.querySelectorAll('.reveal, .skill-card, .project-card').forEach(element => {
        observer.observe(element);
    });
}


// Parallax effect for hero section
function parallaxScroll() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${rate}px`;
    }
}

// Mouse move effect for hero section
function handleMouseMove(event) {
    const hero = document.querySelector('.hero-content');
    const { clientX, clientY } = event;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    
    if (hero) {
        hero.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Initialize animations
    initializeAnimations();

    // Add event listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        parallaxScroll();
    });

    document.querySelector('.hero')?.addEventListener('mousemove', handleMouseMove);
});

// Smooth reveal for project filters
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                if (filter === 'all' || project.dataset.type === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    project.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Add magnetic effect to buttons
document.querySelectorAll('.submit-btn, .filter-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});