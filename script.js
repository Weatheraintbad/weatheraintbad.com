// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// 滚动时的淡入动画
const fadeInOnScroll = () => {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('is-visible');
        }
    });
};

// 为需要淡入动画的元素添加类
const addFadeInClasses = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.classList.add('fade-in-section');
        }
    });
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    addFadeInClasses();
    fadeInOnScroll();
});

// 滚动时触发动画
window.addEventListener('scroll', fadeInOnScroll);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 表单提交
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 简单的表单验证
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        if (name && email && message) {
            // 显示成功消息
            alert('消息发送成功！我会尽快回复你。');
            contactForm.reset();
        }
    });
}

// 作品项目悬停效果增强
const workItems = document.querySelectorAll('.work-item');
workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const image = item.querySelector('.work-image');
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    });

    item.addEventListener('mouseleave', () => {
        const image = item.querySelector('.work-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// 技能卡片动画
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// 统计数字动画
const animateNumbers = () => {
    const statItems = document.querySelectorAll('.stat-item h3');
    statItems.forEach(item => {
        const target = parseInt(item.textContent);
        let count = 0;
        const duration = 2000; // 动画持续时间
        const increment = target / (duration / 16); // 每帧增量

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                item.textContent = target + '+';
                clearInterval(timer);
            } else {
                item.textContent = Math.floor(count) + '+';
            }
        }, 16);
    });
};

// 当"关于我"部分可见时触发数字动画
const aboutSection = document.querySelector('#about');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (aboutSection) {
    observer.observe(aboutSection);
}

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 动态背景效果
const createParticles = () => {
    const heroDecoration = document.querySelector('.hero-decoration');
    if (!heroDecoration) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = 'rgba(0, 255, 209, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${10 + Math.random() * 10}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        heroDecoration.appendChild(particle);
    }
};

createParticles();