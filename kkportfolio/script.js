// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll Spy & Active Link Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Trigger earlier for better UX
        if (pageYOffset >= sectionTop - 250) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Construct Gmail Compose URL
        // to: kirenkumar.dev424@gmail.com
        // su: Subject
        // body: Message body
        const subject = `Portfolio Contact from ${name}`;
        const body = `${message}\n\nFrom: ${name} (${email})`;

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=kirenkumar.dev424@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open in new tab
        window.open(gmailUrl, '_blank');

        // Optional: Reset form
        contactForm.reset();
    });
}
