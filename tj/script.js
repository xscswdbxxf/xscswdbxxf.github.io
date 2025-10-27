// 兼容性检查
function isIE() {
    return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident') !== -1;
}

document.addEventListener('DOMContentLoaded', function() {
    const baguaItems = document.querySelectorAll('.bagua-item');
    const selectedBagua = document.getElementById('selected-bagua');
    const baguaDescription = document.getElementById('bagua-description');
    const taiji = document.getElementById('taiji');
    
    // 八卦描述信息
    const baguaInfo = {
        qian: {
            name: '乾卦',
            description: '乾为天，刚健中正，象征天道运行，自强不息。代表创造、领导、权威和父亲。'
        },
        dui: {
            name: '兑卦',
            description: '兑为泽，刚中而柔外，象征喜悦、沟通、交流。代表口舌、喜悦、少女。'
        },
        li: {
            name: '离卦',
            description: '离为火，柔中而刚内，象征光明、依附、文明。代表光明、文化、中女。'
        },
        zhen: {
            name: '震卦',
            description: '震为雷，刚中而动，象征行动、震动、激发。代表行动、长男、震动。'
        },
        xun: {
            name: '巽卦',
            description: '巽为风，柔中而顺，象征渗透、谦逊、顺从。代表风、长女、谦逊。'
        },
        kan: {
            name: '坎卦',
            description: '坎为水，刚中而险，象征险陷、流动、智慧。代表危险、中男、智慧。'
        },
        gen: {
            name: '艮卦',
            description: '艮为山，刚中而止，象征静止、稳定、阻碍。代表静止、少男、阻碍。'
        },
        kun: {
            name: '坤卦',
            description: '坤为地，柔顺包容，象征承载、顺从、厚德载物。代表大地、母亲、包容。'
        }
    };
    
    // 为每个八卦项添加点击事件
    baguaItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有选中状态
            baguaItems.forEach(i => i.classList.remove('selected'));
            
            // 添加当前选中状态
            this.classList.add('selected');
            
            // 获取选中的八卦
            const bagua = this.getAttribute('data-bagua');
            
            // 更新选中信息
            selectedBagua.textContent = baguaInfo[bagua].name;
            baguaDescription.textContent = baguaInfo[bagua].description;
            
            // 添加水波动画效果
            createRippleEffect();
            
            // 旋转太极图（兼容IE）
            if (taiji) {
                taiji.style.animation = 'none';
                setTimeout(() => {
                    taiji.style.animation = 'rotate 20s linear infinite';
                }, 10);
            }
        });
    });
    
    // 创建水波动画效果
    function createRippleEffect() {
        // 移除现有的ripple元素
        const container = document.querySelector('.bagua-container');
        if (!container) return;
        
        const existingRipples = container.querySelectorAll('.ripple');
        existingRipples.forEach(ripple => ripple.remove());
        
        // 创建多个ripple元素以增强效果
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const newRipple = document.createElement('div');
                newRipple.classList.add('ripple');
                container.appendChild(newRipple);
                
                // 2秒后移除ripple元素
                setTimeout(() => {
                    if (newRipple.parentNode) {
                        newRipple.remove();
                    }
                }, 2000);
            }, i * 300);
        }
    }
    
    // 初始化时选中乾卦
    const firstItem = document.querySelector('.bagua-item');
    if (firstItem) {
        // 稍微延迟执行以确保页面完全加载
        setTimeout(() => {
            firstItem.click();
        }, 100);
    }
});