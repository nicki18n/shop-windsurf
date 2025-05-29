/**
 * 花涛珠光水彩商城后台管理系统通用JS
 * 用于加载公共组件和处理通用功能
 */

// 加载侧边栏组件
document.addEventListener('DOMContentLoaded', function() {
  loadSidebar();
});

/**
 * 加载侧边栏组件
 */
function loadSidebar() {
  // 获取当前页面的文件名（不含扩展名）
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  
  // 获取侧边栏容器
  const sidebarContainer = document.querySelector('.sidebar-container');
  if (!sidebarContainer) return;
  
  // 直接在JS中定义侧边栏HTML内容，避免路径问题
  const sidebarHTML = `
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <img src="../images/logo-watercolor.svg" alt="珠光水彩商城">
        </div>
        <div class="sidebar-title">珠光水彩商城</div>
      </div>
      
      <div class="sidebar-menu">
        <div class="menu-category">主要功能</div>
        
        <div class="menu-item" data-page="index">
          <img class="menu-icon" src="../images/icons/dashboard.svg" alt="仪表盘">
          <span class="menu-text">仪表盘</span>
        </div>
        
        <div class="menu-item" data-page="orders">
          <img class="menu-icon" src="../images/icons/orders.svg" alt="订单管理">
          <span class="menu-text">订单管理</span>
        </div>
        
        <div class="menu-item" data-page="products">
          <img class="menu-icon" src="../images/icons/products.svg" alt="商品管理">
          <span class="menu-text">商品管理</span>
        </div>
        
        <div class="menu-item" data-page="categories">
          <img class="menu-icon" src="../images/icons/categories.svg" alt="分类管理">
          <span class="menu-text">分类管理</span>
        </div>
        
        <div class="menu-item" data-page="users">
          <img class="menu-icon" src="../images/icons/users.svg" alt="用户管理">
          <span class="menu-text">用户管理</span>
        </div>
        
        <div class="menu-category">营销工具</div>
        
        <div class="menu-item" data-page="coupons">
          <img class="menu-icon" src="../images/icons/coupons.svg" alt="优惠券">
          <span class="menu-text">优惠券</span>
        </div>
        
        <div class="menu-item" data-page="activities">
          <img class="menu-icon" src="../images/icons/settings.svg" alt="活动管理">
          <span class="menu-text">活动管理</span>
        </div>
        
        <div class="menu-item" data-page="reviews">
          <img class="menu-icon" src="../images/icons/settings.svg" alt="评价管理">
          <span class="menu-text">评价管理</span>
        </div>
        
        <div class="menu-category">系统设置</div>
        
        <div class="menu-item" data-page="shop-settings">
          <img class="menu-icon" src="../images/icons/settings.svg" alt="店铺设置">
          <span class="menu-text">店铺设置</span>
        </div>
        
        <div class="menu-item" data-page="permissions">
          <img class="menu-icon" src="../images/icons/settings.svg" alt="权限管理">
          <span class="menu-text">权限管理</span>
        </div>
        
        <div class="menu-item" data-page="system-logs">
          <img class="menu-icon" src="../images/icons/settings.svg" alt="系统日志">
          <span class="menu-text">系统日志</span>
        </div>
      </div>
    </div>
  `;
  
  // 插入侧边栏HTML
  sidebarContainer.innerHTML = sidebarHTML;
  
  // 设置当前页面对应的菜单项为激活状态
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    if (item.getAttribute('data-page') === currentPage) {
      item.classList.add('active');
    }
    
    // 添加菜单项点击事件
    item.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      if (page && page !== currentPage) {
        window.location.href = page + '.html';
      }
    });
  });

}
