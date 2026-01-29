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

// 多语言问候数据
const greetings = {
    morning: {
        zh: '早上好',
        en: 'Good Morning',
        ru: 'Доброе утро',
        ja: 'おはよう',
        ko: '좋은 아침',
        es: 'Buenos días',
        fr: 'Bonjour'
    },
    afternoon: {
        zh: '下午好',
        en: 'Good Afternoon',
        ru: 'Добрый день',
        ja: 'こんにちは',
        ko: '좋은 오후',
        es: 'Buenas tardes',
        fr: 'Bonjour'
    },
    evening: {
        zh: '晚上好',
        en: 'Good Evening',
        ru: 'Добрый вечер',
        ja: 'こんばんは',
        ko: '좋은 저녁',
        es: 'Buenas noches',
        fr: 'Bonsoir'
    },
    night: {
        zh: '夜深了',
        en: 'Good Night',
        ru: 'Спокойной ночи',
        ja: 'おやすみ',
        ko: '좋은 밤',
        es: 'Buenas noches',
        fr: 'Bonne nuit'
    }
};

// 欢迎语数据
const welcomeMessages = {
    zh: '欢迎来到Weatheraintbad的主页',
    en: 'Welcome to Weatheraintbad\'s Homepage',
    ru: 'Добро пожаловать на домашнюю страницу Weatheraintbad',
    ja: 'Weatheraintbadのホームページへようこそ',
    ko: 'Weatheraintbad의 홈페이지에 오신 것을 환영합니다',
    es: 'Bienvenido a la página de Weatheraintbad',
    fr: 'Bienvenue sur la page de Weatheraintbad'
};

// 获取当前时间段
function getTimePeriod() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 18) {
        return 'afternoon';
    } else if (hour >= 18 && hour < 22) {
        return 'evening';
    } else {
        return 'night';
    }
}

// 语言列表
const languages = ['zh', 'en', 'ru', 'ja', 'ko', 'es', 'fr'];
let currentLangIndex = 0;
let greetingInterval;

// 更新问候语和欢迎语
function updateGreeting() {
    const timePeriod = getTimePeriod();
    const greetingElement = document.getElementById('greeting');
    const welcomeElement = document.getElementById('welcome');

    // 添加淡出动画
    greetingElement.style.opacity = '0';
    welcomeElement.style.opacity = '0';

    setTimeout(() => {
        // 更新文本
        greetingElement.textContent = greetings[timePeriod][languages[currentLangIndex]];
        welcomeElement.textContent = welcomeMessages[languages[currentLangIndex]];

        // 添加淡入动画
        greetingElement.style.opacity = '1';
        welcomeElement.style.opacity = '1';

        // 更新语言索引
        currentLangIndex = (currentLangIndex + 1) % languages.length;
    }, 500);
}

// 初始化问候语
function initGreeting() {
    const timePeriod = getTimePeriod();
    const greetingElement = document.getElementById('greeting');
    const welcomeElement = document.getElementById('welcome');

    // 初始显示
    greetingElement.textContent = greetings[timePeriod][languages[0]];
    welcomeElement.textContent = welcomeMessages[languages[0]];
    greetingElement.style.opacity = '1';
    welcomeElement.style.opacity = '1';

    // 开始循环切换 - 减慢速度
    greetingInterval = setInterval(updateGreeting, 5000);
}

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
        // 初始化问候语
        initGreeting();
    }, 100);
});

// 添加问候语和欢迎语的过渡动画
const style = document.createElement('style');
style.textContent = `
    #greeting, #welcome {
        transition: opacity 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// 动态背景效果
const createParticles = () => {
    const heroDecoration = document.querySelector('.hero-decoration');
    if (!heroDecoration) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = 'rgba(255, 140, 0, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${10 + Math.random() * 10}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        heroDecoration.appendChild(particle);
    }
};

createParticles();