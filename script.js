// 导航栏滚动效果 - 支持深色/浅色主题
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (window.scrollY > 100) {
        navbar.style.backgroundColor = isLightTheme ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = isLightTheme ? '0 5px 30px rgba(0, 0, 0, 0.1)' : '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = isLightTheme ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// 滚动时的动画 - 双向响应
const fadeInOnScroll = () => {
    // 原始的淡入区域 - 双向响应
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible && elementBottom > elementVisible) {
            element.classList.add('is-visible');
        } else {
            element.classList.remove('is-visible');
        }
    });

    // 技能卡片动画 - 双向响应
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardBottom = card.getBoundingClientRect().bottom;
        const cardVisible = 100;
        if (cardTop < window.innerHeight - cardVisible && cardBottom > cardVisible) {
            card.classList.add('is-visible');
        } else {
            card.classList.remove('is-visible');
        }
    });

    // 作品项目动画 - 双向响应
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        const itemVisible = 100;
        if (itemTop < window.innerHeight - itemVisible && itemBottom > itemVisible) {
            item.classList.add('is-visible');
        } else {
            item.classList.remove('is-visible');
        }
    });

    // 统计数字动画 - 双向响应
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        const itemVisible = 100;
        if (itemTop < window.innerHeight - itemVisible && itemBottom > itemVisible) {
            item.classList.add('is-visible');
        } else {
            item.classList.remove('is-visible');
        }
    });

    // 个人资料卡片动画 - 双向响应
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        const cardTop = profileCard.getBoundingClientRect().top;
        const cardBottom = profileCard.getBoundingClientRect().bottom;
        const cardVisible = 100;
        if (cardTop < window.innerHeight - cardVisible && cardBottom > cardVisible) {
            profileCard.classList.add('is-visible');
        } else {
            profileCard.classList.remove('is-visible');
        }
    }
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

// 图片加载失败处理函数
function handleImageError(img) {
    // 创建纯黑色的SVG占位图片 (360x200 像素)
    const placeholderSvg = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDM2MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNjAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDAwMDAwIi8+CjxwYXRoIGQ9Ik0xODAgMTAwTDE4MCAxMDBaIiBmaWxsPSIjMjIyMjIyIiBvcGFjaXR5PSIwLjUiLz4KPHN2ZyB4PSIxMDAiIHk9IjgwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgo8cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjgwIiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRiI+5Zu+54mH5Lqn5pyN5L+hPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+`;
    img.src = placeholderSvg;
    img.style.objectFit = 'cover';
    img.width = 360;
    img.height = 200;
}

// 为所有图片添加错误处理
function addImageErrorHandlers() {
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        // 确保所有图片都有正确的尺寸
        if (!img.width || img.width !== 360) {
            img.width = 360;
        }
        if (!img.height || img.height !== 200) {
            img.height = 200;
        }

        // 如果图片没有src或者src为空，直接设置占位图
        if (!img.src || img.src === '' || img.src === window.location.href) {
            const placeholderSvg = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDM2MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNjAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDAwMDAwIi8+CjxwYXRoIGQ9Ik0xODAgMTAwTDE4MCAxMDBaIiBmaWxsPSIjMjIyMjIyIiBvcGFjaXR5PSIwLjUiLz4KPHN2ZyB4PSIxMDAiIHk9IjgwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgo8cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjgwIiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRiI+5Zu+54mH5Lqn5pyN5L+hPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+`;
            img.src = placeholderSvg;
        }
        // 添加错误事件监听器
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
}

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // 检查用户是否有手动设置的主题
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    // 初始化主题
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
        document.documentElement.classList.remove('light-theme');
    } else {
        // 跟随系统设置
        if (prefersLight) {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }
    }

    // 监听主题切换按钮点击
    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.classList.contains('light-theme');
        if (isLight) {
            document.documentElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // 监听系统颜色方案变化
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        // 只有在用户未手动设置主题时才跟随系统变化
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('light-theme');
            } else {
                document.documentElement.classList.remove('light-theme');
            }
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    addFadeInClasses();
    fadeInOnScroll();
    addImageErrorHandlers();
    initThemeToggle(); // 初始化主题切换
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

// 多语言问候数据（包含中英文、俄语、韩语、日语、法语、德语、西班牙语）
const greetings = {
    morning: {
        zh: '早上好',
        en: 'Good Morning',
        ru: 'Доброе утро',
        ko: '좋은 아침',
        ja: 'おはようございます',
        fr: 'Bonjour',
        de: 'Guten Morgen',
        es: 'Buenos días'
    },
    afternoon: {
        zh: '下午好',
        en: 'Good Afternoon',
        ru: 'Добрый день',
        ko: '좋은 오후',
        ja: 'こんにちは',
        fr: 'Bon après-midi',
        de: 'Guten Tag',
        es: 'Buenas tardes'
    },
    evening: {
        zh: '晚上好',
        en: 'Good Evening',
        ru: 'Добрый вечер',
        ko: '좋은 저녁',
        ja: 'こんばんは',
        fr: 'Bonsoir',
        de: 'Guten Abend',
        es: 'Buenas noches'
    },
    night: {
        zh: '夜深了',
        en: 'Good Night',
        ru: 'Доброй ночи',
        ko: '안녕히 주무세요',
        ja: 'おやすみなさい',
        fr: 'Bonne nuit',
        de: 'Gute Nacht',
        es: 'Buenas noches'
    }
};

// 欢迎语数据（包含中英文、俄语、韩语、日语、法语、德语、西班牙语）
const welcomeMessages = {
    zh: '欢迎',
    en: 'Welcome',
    ru: 'Добро пожаловать',
    ko: '환영합니다',
    ja: 'ようこそ',
    fr: 'Bienvenue',
    de: 'Willkommen',
    es: 'Bienvenido'
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

// 语言列表 - 仅保留中文，用于奇数次切换
const chineseLang = ['zh'];

// 外语列表 - 用于偶数次切换
const foreignLanguages = ['en', 'ru', 'ko', 'ja', 'fr', 'de', 'es'];
let switchCount = 0; // 切换次数计数器
let foreignLangIndex = 0; // 外语索引
let greetingInterval;

// 更新问候语和欢迎语 - 修复动画卡顿问题
function updateGreeting() {
    const timePeriod = getTimePeriod();
    const greetingElement = document.getElementById('greeting');
    const welcomeElement = document.getElementById('welcome');

    // 设置过渡样式
    greetingElement.style.transition = 'opacity 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    welcomeElement.style.transition = 'opacity 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s, transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s';

    // 淡出动画
    greetingElement.style.opacity = '0';
    greetingElement.style.transform = 'translateY(30px) scale(0.9)';
    welcomeElement.style.opacity = '0';
    welcomeElement.style.transform = 'translateY(30px) scale(0.9)';

    // 确保上一个标题完全淡出后再更新文字
    setTimeout(() => {
        let currentLang;
        
        // 增加切换次数
        switchCount++;
        
        // 判断当前是奇数次还是偶数次切换
        if (switchCount % 2 === 1) {
            // 奇数次切换显示中文
            currentLang = chineseLang[0];
        } else {
            // 偶数次切换在外国语中循环
            currentLang = foreignLanguages[foreignLangIndex];
            // 更新外语索引
            foreignLangIndex = (foreignLangIndex + 1) % foreignLanguages.length;
        }
        
        // 更新文本
        greetingElement.textContent = greetings[timePeriod][currentLang];
        welcomeElement.textContent = welcomeMessages[currentLang];

        // 强制浏览器重排，确保文字更新后再执行淡入动画
        const dummy = greetingElement.offsetHeight;

        // 淡入动画
        greetingElement.style.opacity = '1';
        greetingElement.style.transform = 'translateY(0) scale(1)';
        welcomeElement.style.opacity = '1';
        welcomeElement.style.transform = 'translateY(0) scale(1)';
        
    }, 1500);
}

// 初始化问候语 - 更华丽的动画
function initGreeting() {
    const timePeriod = getTimePeriod();
    const greetingElement = document.getElementById('greeting');
    const welcomeElement = document.getElementById('welcome');
// 更华丽的过渡样式
    greetingElement.style.transition = 'opacity 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    welcomeElement.style.transition = 'opacity 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s, transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s';

    // 初始显示（奇数次，显示中文）
    const initialLang = chineseLang[0];
    greetingElement.textContent = greetings[timePeriod][initialLang];
    welcomeElement.textContent = welcomeMessages[initialLang];
    greetingElement.style.opacity = '1';
    welcomeElement.style.opacity = '1';
    greetingElement.style.transform = 'translateY(0) scale(1)';
    welcomeElement.style.transform = 'translateY(0) scale(1)';

    // 设置初始切换次数和外语索引
    switchCount = 1; // 初始显示中文算第一次切换
    foreignLangIndex = 0;

    // 延长切换间隔到8秒
    greetingInterval = setInterval(updateGreeting, 8000);
}

// 页面加载动画
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    // 确保页面内容加载完成后再隐藏加载动画
    setTimeout(() => {
        loader.classList.add('hidden');
        // 初始化问候语
        initGreeting();

        // 加载动画完全消失后再触发页面内容的显示
        setTimeout(() => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in';

            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        }, 800); // 等待加载动画完全消失（0.8秒）
    }, 1500); // 1.5秒后隐藏加载动画，确保标题和其他资源加载完成
});

// 添加问候语和欢迎语的过渡动画（包含位移）
const style = document.createElement('style');
style.textContent = `
    #greeting, #welcome {
        transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
    }
`;
document.head.appendChild(style);

// 动态背景效果
const createParticles = () => {
    const heroDecoration = document.querySelector('.hero-decoration');
    if (!heroDecoration) return;
    
    // 检测当前主题
    const isLightTheme = document.documentElement.classList.contains('light-theme');
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        const size = 15 + Math.random() * 30; // 稍大的模糊圆形
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 根据主题设置不同的透明度范围
        const opacityRange = isLightTheme ? 
            [0.05, 0.15] : // 浅色主题使用较低透明度
            [0.1, 0.3];   // 深色主题使用较高透明度
        const opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
        
        particle.style.backgroundColor = `rgba(250, 167, 85, ${opacity})`;
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.filter = 'blur(3px)'; // 模糊效果
        // 随机移动和闪烁动画
        const duration = 15 + Math.random() * 20;
        particle.style.animation = `particleFloat ${duration}s infinite ease-in-out, particleBlink ${2 + Math.random() * 3}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        heroDecoration.appendChild(particle);
    }
};

createParticles();

// 滚动到"关于我"部分的函数
function scrollToAboutSection() {
    smoothScrollTo('about');
}

// 自定义滚动函数，支持平滑缓动效果
function scrollToElement(element, duration = 1200) {
    const targetPosition = element.offsetTop - 80; // 减去导航栏高度
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // 缓动函数 - 使用easeInOutCubic提供更平滑的滚动体验
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// 单页滚动切换功能 - 仅从英雄区到关于我部分
let isScrolling = false;

function smoothScrollTo(targetId, callback) {
    if (isScrolling) return;
    isScrolling = true;
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        scrollToElement(targetElement, 1200); // 使用更长的时间和更平滑的缓动
        
        // 防止快速连续滚动
        setTimeout(() => {
            isScrolling = false;
            if (callback) callback();
        }, 1200); // 与动画时间匹配
    }
}

// 确保在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查URL哈希并滚动到相应部分
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                scrollToElement(targetElement, 1200);
            }, 100);
        }
    }
});

// 监听滚动事件以启用从英雄区到关于我部分的单向切换
let scrollTimer = null;
let hasScrolledToAbout = false; // 追踪是否已经从英雄区滚动到了关于我部分

// 添加一个函数来检测英雄区是否完整显示
function isHeroFullyVisible() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return false;

    const rect = homeSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 英雄区完整显示意味着它的高度小于或等于视窗高度
    // 并且它完全在视窗内
    return rect.top >= 0 && rect.bottom <= windowHeight && rect.height <= windowHeight;
}

// 监听滚动事件以启用从英雄区到关于我部分的单向切换
window.addEventListener('wheel', function(e) {
    if (isScrolling) {
        e.preventDefault();
        return;
    }

    const delta = e.deltaY;
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 清除之前的计时器
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }

    // 防止过度触发
    scrollTimer = setTimeout(() => {
        isScrolling = false;
    }, 1200); // 延迟时间与动画时间匹配

    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');

    if (!homeSection || !aboutSection) return;

    const homeRect = homeSection.getBoundingClientRect();

    // 判断当前是否在英雄区
    const isInHome = homeRect.top <= 0 && homeRect.bottom >= 0;

    // 检查英雄区是否完整显示
    const heroFullyVisible = isHeroFullyVisible();

    // 只有在英雄区且向下滚动时才触发切换
    if (delta > 0 && isInHome && !hasScrolledToAbout) {
        e.preventDefault();
        smoothScrollTo('about', () => {
            // 滚动完成后标记为已切换，允许自由滚动
            hasScrolledToAbout = true;
        });
    }
    // 其他情况允许正常滚动
}, { passive: false });

// 同样支持触摸设备上的滚动切换（仅从英雄区到关于我部分）
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
}, false);

function handleSwipeGesture() {
    const homeSection = document.getElementById('home');

    if (!homeSection) return;

    const homeRect = homeSection.getBoundingClientRect();

    // 判断当前是否在英雄区
    const isInHome = homeRect.top <= 0 && homeRect.bottom >= 0;

    // 检查英雄区是否完整显示
    const heroFullyVisible = isHeroFullyVisible();

    const deltaY = touchStartY - touchEndY;

    // 只有在英雄区且向下滑动时才触发切换
    if (deltaY > 50 && isInHome && !heroFullyVisible && !hasScrolledToAbout) { // 向上滑动（向下滚动）
        smoothScrollTo('about', () => {
            // 滚动完成后标记为已切换，允许自由滚动
            hasScrolledToAbout = true;
        });
    }
    // 其他情况允许正常滚动
}