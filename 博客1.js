// 1. 生成立体透明七彩泡泡（统一尺寸）
function createBubbles() {
    const container = document.getElementById('bubbleContainer');
    // 调整数量：统一80px尺寸，数量设为40个（避免拥挤）
    const bubbleCount = 40; 
    container.innerHTML = ''; // 清空旧泡泡

    // 七彩半透明泡泡颜色库（低饱和度+高透明，增强立体质感）
    const bubbleColors = [
        'rgba(255, 99, 71, 0.5)',    // 番茄红（透明）
        'rgba(255, 165, 0, 0.5)',    // 橙（透明）
        'rgba(255, 215, 0, 0.5)',    // 金黄（透明）
        'rgba(50, 205, 50, 0.5)',    // lime绿（透明）
        'rgba(30, 144, 255, 0.5)',   // 钢蓝（透明）
        'rgba(138, 43, 226, 0.5)',   // 紫罗兰（透明）
        'rgba(255, 192, 203, 0.5)',  // 粉红（透明）
        'rgba(0, 255, 255, 0.5)',    // 青（新增）
        'rgba(128, 0, 128, 0.5)'     // 紫（新增）
    ];

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // 1. 随机水平位置（0-100%）
        const left = Math.random() * 100;
        bubble.style.setProperty('--left', left);

        // 2. 随机下落时长（10-25秒，大尺寸泡泡下落稍慢更自然）
        const duration = Math.random() * 15 + 10;
        bubble.style.setProperty('--duration', duration);

        // 3. 随机动画延迟（0-20秒）
        const delay = Math.random() * 20;
        bubble.style.setProperty('--delay', delay);

        // 4. 随机透明度（0.6-0.9）
        const opacity = Math.random() * 0.3 + 0.6;
        bubble.style.setProperty('--opacity', opacity);

        // 5. 随机晃动偏移（-1到1 → 左右轻微晃动）
        const shake = Math.random() * 2 - 1;
        bubble.style.setProperty('--shake', shake);

        // 6. 随机选择七彩透明颜色
        const randomColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        bubble.style.setProperty('--bubble-color', randomColor);

        // 【删除】随机大小相关代码（已固定尺寸，无需size变量）

        container.appendChild(bubble);
    }
}

// 页面加载时生成第一批泡泡
window.addEventListener('load', createBubbles);
// 每隔30秒重新生成（匹配大尺寸泡泡的下落时长）
setInterval(createBubbles, 30000);

// 2. 移动端菜单切换
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    // 切换菜单图标
    mobileMenu.innerHTML = navLinks.classList.contains('show') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// 3. 平滑滚动（优化锚点跳转体验）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 偏移80px避开导航栏
                behavior: 'smooth' // 平滑滚动
            });
            // 移动端点击后关闭菜单
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});