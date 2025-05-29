/**
 * 花涧珠光水彩商城后台管理系统通用JS
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
  
  // 加载侧边栏HTML
  fetch('components/sidebar.html')
    .then(response => response.text())
    .then(html => {
      // 插入侧边栏HTML
      sidebarContainer.innerHTML = html;
      
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
    })
    .catch(error => {
      console.error('加载侧边栏组件失败:', error);
    });
}
