/**
 * Standing Shield - Main JavaScript
 * 普通架构版本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有模块
    initNavbar();
    initMobileMenu();
    initCarousel();
    initCartDrawer();
    initFactoryScroll();
    initFAQ();
    initProductCards();
    initNewsletter();
});

/**
 * 导航栏滚动效果
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查
}

/**
 * 轮播图功能
 */
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const bullets = document.querySelectorAll('.pagination-bullet');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    let autoplayInterval;
    const autoplayDelay = 5000;
    
    function showSlide(index) {
        // 移除所有活动状态
        slides.forEach(slide => slide.classList.remove('active'));
        bullets.forEach(bullet => bullet.classList.remove('active'));
        
        // 设置当前幻灯片
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        bullets[currentIndex].classList.add('active');
        
        // 重置动画
        resetSlideAnimations(slides[currentIndex]);
    }
    
    function resetSlideAnimations(slide) {
        const elements = slide.querySelectorAll('.slide-subtitle, .slide-title, .slide-description, .btn-primary');
        elements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // 触发重排
            el.style.animation = '';
        });
    }
    
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // 分页按钮点击事件
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });
    
    // 箭头导航
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });
    }
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            stopAutoplay();
            if (diff > 0) {
                // 向左滑动 - 下一张
                nextSlide();
            } else {
                // 向右滑动 - 上一张
                prevSlide();
            }
            startAutoplay();
        }
    }
    
    // 启动自动播放
    startAutoplay();
    
    // 鼠标悬停暂停
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoplay);
        heroSection.addEventListener('mouseleave', startAutoplay);
    }
}

/**
 * 购物车抽屉
 */
function initCartDrawer() {
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const colorBtns = document.querySelectorAll('.color-btn:not(.disabled)');
    const productImage = document.getElementById('productImage');
    const colorName = document.getElementById('colorName');
    
    if (!cartBtn || !cartDrawer) return;
    
    function openCart() {
        cartDrawer.classList.add('open');
        cartBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeCartDrawer() {
        cartDrawer.classList.remove('open');
        cartBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 打开购物车
    cartBtn.addEventListener('click', openCart);
    
    // 关闭购物车
    if (closeCart) {
        closeCart.addEventListener('click', closeCartDrawer);
    }
    
    if (cartBackdrop) {
        cartBackdrop.addEventListener('click', closeCartDrawer);
    }
    
    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartDrawer.classList.contains('open')) {
            closeCartDrawer();
        }
    });
    
    // 颜色选择
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            colorBtns.forEach(b => b.classList.remove('active'));
            
            // 设置当前选中
            btn.classList.add('active');
            
            // 更新图片和名称
            const newImage = btn.dataset.image;
            const newName = btn.dataset.name;
            
            if (productImage && newImage) {
                productImage.style.opacity = '0';
                productImage.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    productImage.src = newImage;
                    productImage.style.opacity = '1';
                    productImage.style.transform = 'scale(1)';
                }, 200);
            }
            
            if (colorName && newName) {
                colorName.textContent = newName;
            }
        });
    });
}

/**
 * 工厂流程水平滚动
 */
function initFactoryScroll() {
    const factorySection = document.getElementById('factory');
    const factoryTrack = document.querySelector('.factory-track');
    const progressBar = document.querySelector('.factory-progress-bar');
    
    if (!factorySection || !factoryTrack) return;
    
    // 拖拽滚动
    let isDown = false;
    let startX;
    let scrollLeft;
    
    factoryTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        factoryTrack.style.cursor = 'grabbing';
        startX = e.pageX - factoryTrack.offsetLeft;
        scrollLeft = factoryTrack.parentElement.scrollLeft;
    });
    
    factoryTrack.addEventListener('mouseleave', () => {
        isDown = false;
        factoryTrack.style.cursor = 'grab';
    });
    
    factoryTrack.addEventListener('mouseup', () => {
        isDown = false;
        factoryTrack.style.cursor = 'grab';
    });
    
    factoryTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - factoryTrack.offsetLeft;
        const walk = (x - startX) * 2;
        factoryTrack.parentElement.scrollLeft = scrollLeft - walk;
    });
    
    // 更新进度条（如果存在）
    if (progressBar) {
        const container = factoryTrack.parentElement;
        
        container.addEventListener('scroll', () => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            const progress = container.scrollLeft / maxScroll;
            progressBar.style.transform = `scaleX(${progress})`;
        });
    }
    
    // 触摸滚动已由原生支持
}

/**
 * 平滑滚动到指定元素
 * @param {string} elementId - 元素ID
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制（毫秒）
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Logo 图片加载失败处理
 */
document.addEventListener('DOMContentLoaded', function() {
    const partnerLogos = document.querySelectorAll('.partner-logo img');
    
    partnerLogos.forEach(img => {
        img.addEventListener('error', function() {
            const alt = this.alt || 'Partner';
            const parent = this.parentElement;
            
            // 隐藏图片
            this.style.display = 'none';
            
            // 添加 fallback 类和文字
            parent.classList.add('fallback');
            parent.textContent = alt;
        });
    });
});

/**
 * 移动端菜单
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const menuDrawer = document.getElementById('menuDrawer');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    if (!menuBtn || !menuDrawer) return;
    
    function openMenu() {
        menuDrawer.classList.add('open');
        menuBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenuDrawer() {
        menuDrawer.classList.remove('open');
        menuBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 打开菜单
    menuBtn.addEventListener('click', openMenu);
    
    // 关闭菜单
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMenuDrawer);
    }
    
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', closeMenuDrawer);
    }
    
    // 点击菜单链接后关闭菜单
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenuDrawer);
    });
    
    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuDrawer.classList.contains('open')) {
            closeMenuDrawer();
        }
    });
}

/**
 * FAQ 手风琴
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // 关闭其他打开的项
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // 切换当前项
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * 产品卡片交互
 */
function initProductCards() {
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const colorBtns = document.querySelectorAll('.color-btn:not(.disabled)');
    const productImage = document.getElementById('productImage');
    const colorName = document.getElementById('colorName');
    
    // Quick View 按钮点击打开购物车
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productColor = btn.dataset.product;
            
            // 打开购物车
            if (cartDrawer) {
                cartDrawer.classList.add('open');
                cartBackdrop.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // 选择对应颜色
            if (productColor) {
                const targetColorBtn = document.querySelector(`.color-btn[data-color="${productColor}"]`);
                if (targetColorBtn && !targetColorBtn.classList.contains('disabled')) {
                    // 移除所有活动状态
                    colorBtns.forEach(b => b.classList.remove('active'));
                    targetColorBtn.classList.add('active');
                    
                    // 更新图片和名称
                    const newImage = targetColorBtn.dataset.image;
                    const newName = targetColorBtn.dataset.name;
                    
                    if (productImage && newImage) {
                        productImage.src = newImage;
                    }
                    
                    if (colorName && newName) {
                        colorName.textContent = newName;
                    }
                }
            }
        });
    });
}

/**
 * Newsletter 表单
 */
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const submitBtn = form.querySelector('.btn-subscribe');
        const originalText = submitBtn.innerHTML;
        
        // 模拟提交
        submitBtn.innerHTML = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Subscribed!';
            submitBtn.style.background = '#22c55e';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1000);
    });
}
