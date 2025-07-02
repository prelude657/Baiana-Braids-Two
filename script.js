// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header transparente ao scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Filtros do Portfólio
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active class ao botão clicado
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Slider de Depoimentos
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Esconder todos os depoimentos
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remover active de todos os dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Mostrar depoimento atual
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

// Event listeners para os dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play do slider de depoimentos
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Formulário de contato
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, usando fetch para enviar para um servidor
    
    // Por enquanto, vamos apenas mostrar uma mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar o formulário
    contactForm.reset();
});

// Animações ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .portfolio-item, .about-text, .contact-info').forEach(el => {
    observer.observe(el);
});

// Contador animado para estatísticas
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 20);
}

// Iniciar contadores quando a seção about estiver visível
const aboutSection = document.querySelector('.about');
let countersAnimated = false;

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            countersAnimated = true;
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Validação do formulário
function validateForm() {
    const inputs = document.querySelectorAll('.contact-form input[required], .contact-form select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = '#D2B48C';
        }
    });
    
    return isValid;
}

// Adicionar validação em tempo real
document.querySelectorAll('.contact-form input, .contact-form select').forEach(input => {
    input.addEventListener('blur', validateForm);
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.style.borderColor = '#FFD700';
        }
    });
});

// Efeito de hover nos cards de serviço
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation para o formulário
function showLoading(button) {
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Adicionar ao submit do formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        const submitBtn = document.querySelector('.submit-btn');
        showLoading(submitBtn);
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        }, 2000);
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar primeiro depoimento
    showTestimonial(0);
    
    // Adicionar classe fade-in-up aos elementos visíveis
    const visibleElements = document.querySelectorAll('.hero-content, .logo');
    visibleElements.forEach(el => {
        el.classList.add('fade-in-up');
    });
});

