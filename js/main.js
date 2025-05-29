// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.swiper-slide');
  const pagination = document.querySelectorAll('.swiper-pagination-bullet');
  const totalSlides = slides.length;
  
  // 自动轮播
  function autoSlide() {
    // 隐藏当前轮播
    slides[currentSlide].style.display = 'none';
    pagination[currentSlide].classList.remove('swiper-pagination-bullet-active');
    
    // 计算下一个轮播索引
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // 显示下一个轮播
    slides[currentSlide].style.display = 'block';
    pagination[currentSlide].classList.add('swiper-pagination-bullet-active');
  }
  
  // 初始化轮播
  for (let i = 0; i < totalSlides; i++) {
    if (i !== 0) {
      slides[i].style.display = 'none';
    }
  }
  
  // 点击分页器切换轮播
  pagination.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      // 隐藏当前轮播
      slides[currentSlide].style.display = 'none';
      pagination[currentSlide].classList.remove('swiper-pagination-bullet-active');
      
      // 更新当前轮播索引
      currentSlide = index;
      
      // 显示选中的轮播
      slides[currentSlide].style.display = 'block';
      pagination[currentSlide].classList.add('swiper-pagination-bullet-active');
    });
  });
  
  // 设置自动轮播定时器
  setInterval(autoSlide, 3000);
  
  // 底部导航切换
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // 移除所有tab的active类
      tabItems.forEach(tab => tab.classList.remove('active'));
      // 为当前点击的tab添加active类
      this.classList.add('active');
    });
  });
});
