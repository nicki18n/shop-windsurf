document.addEventListener('DOMContentLoaded', function() {
  // 筛选选项点击事件
  const filterOptions = document.querySelectorAll('.filter-option');
  filterOptions.forEach(option => {
    option.addEventListener('click', function() {
      const parent = this.parentElement;
      parent.querySelectorAll('.filter-option').forEach(opt => {
        opt.classList.remove('active');
      });
      this.classList.add('active');
      
      // 如果选择了自定义日期，显示日期选择器
      if (this.dataset.time === 'custom') {
        document.querySelector('.date-range').style.display = 'flex';
      } else if (this.parentElement.querySelector('[data-time]')) {
        document.querySelector('.date-range').style.display = 'none';
      }
      
      // 刷新评价列表（模拟）
      refreshReviewsList();
    });
  });
  
  // 排序选项点击事件
  const sortOptions = document.querySelectorAll('.sort-option');
  sortOptions.forEach(option => {
    option.addEventListener('click', function() {
      sortOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      // 刷新评价列表（模拟）
      refreshReviewsList();
    });
  });
  
  // 搜索框输入事件
  const searchInput = document.querySelector('.search-input');
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      // 刷新评价列表（模拟）
      refreshReviewsList();
    }, 500);
  });
  
  // 回复按钮点击事件
  const replyBtns = document.querySelectorAll('.reply-btn');
  replyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const reviewItem = this.closest('.review-item');
      const reviewContent = reviewItem.querySelector('.review-content').textContent.trim();
      const userName = reviewItem.querySelector('.user-name').textContent.trim();
      const reviewTime = reviewItem.querySelector('.review-time').textContent.trim();
      const userAvatar = reviewItem.querySelector('.user-avatar').src;
      
      // 填充回复弹窗内容
      document.querySelector('.quoted-review').textContent = reviewContent;
      document.querySelector('.user-name-small').textContent = userName;
      document.querySelector('.review-time-small').textContent = reviewTime;
      document.querySelector('.user-avatar-small').src = userAvatar;
      
      // 显示回复弹窗
      document.getElementById('replyModal').classList.add('active');
    });
  });
  
  // 隐藏评价按钮点击事件
  const hideBtns = document.querySelectorAll('.hide-btn');
  hideBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('确定要隐藏该评价吗？隐藏后将不会在商城前台显示。')) {
        const reviewItem = this.closest('.review-item');
        reviewItem.style.opacity = '0.5';
        
        // 模拟API请求
        setTimeout(() => {
          reviewItem.style.display = 'none';
          showToast('评价已隐藏');
        }, 500);
      }
    });
  });
  
  // 删除评价按钮点击事件
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('确定要删除该评价吗？删除后将无法恢复。')) {
        const reviewItem = this.closest('.review-item');
        reviewItem.style.opacity = '0.5';
        
        // 模拟API请求
        setTimeout(() => {
          reviewItem.style.display = 'none';
          showToast('评价已删除');
        }, 500);
      }
    });
  });
  
  // 关闭回复弹窗
  document.getElementById('closeReplyModal').addEventListener('click', function() {
    document.getElementById('replyModal').classList.remove('active');
  });
  
  document.getElementById('cancelReply').addEventListener('click', function() {
    document.getElementById('replyModal').classList.remove('active');
  });
  
  // 提交回复
  document.getElementById('submitReply').addEventListener('click', function() {
    const replyContent = document.getElementById('replyContent').value.trim();
    if (!replyContent) {
      showToast('请输入回复内容');
      return;
    }
    
    // 模拟API请求
    document.getElementById('submitReply').textContent = '提交中...';
    setTimeout(() => {
      document.getElementById('replyModal').classList.remove('active');
      document.getElementById('submitReply').textContent = '提交回复';
      document.getElementById('replyContent').value = '';
      showToast('回复成功');
      
      // 如果勾选了保存为模板
      if (document.getElementById('saveAsTemplate').checked) {
        addReplyTemplate(replyContent);
      }
    }, 800);
  });
  
  // 点击回复模板填充内容
  const templateItems = document.querySelectorAll('.template-item');
  templateItems.forEach(item => {
    item.addEventListener('click', function() {
      document.getElementById('replyContent').value = this.textContent.trim();
    });
  });
  
  // 分页点击事件
  const pageItems = document.querySelectorAll('.page-item:not(.disabled)');
  pageItems.forEach(item => {
    item.addEventListener('click', function() {
      if (!this.classList.contains('active')) {
        document.querySelector('.page-item.active').classList.remove('active');
        this.classList.add('active');
        
        // 刷新评价列表（模拟）
        window.scrollTo(0, 0);
        refreshReviewsList();
      }
    });
  });
  
  // 日期确认按钮点击事件
  document.querySelector('.date-confirm-btn').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!startDate || !endDate) {
      showToast('请选择完整的日期范围');
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      showToast('开始日期不能大于结束日期');
      return;
    }
    
    // 刷新评价列表（模拟）
    refreshReviewsList();
  });
});

// 刷新评价列表（模拟）
function refreshReviewsList() {
  const reviewsList = document.querySelector('.reviews-list');
  reviewsList.style.opacity = '0.5';
  
  // 模拟加载
  setTimeout(() => {
    reviewsList.style.opacity = '1';
  }, 500);
}

// 添加回复模板
function addReplyTemplate(content) {
  const templateList = document.querySelector('.template-list');
  const newTemplate = document.createElement('div');
  newTemplate.className = 'template-item';
  newTemplate.textContent = content;
  
  // 添加点击事件
  newTemplate.addEventListener('click', function() {
    document.getElementById('replyContent').value = this.textContent.trim();
  });
  
  templateList.prepend(newTemplate);
}

// 显示提示信息
function showToast(message) {
  // 检查是否已存在toast元素
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
    
    // 添加样式
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '2000';
    toast.style.transition = 'opacity 0.3s';
  }
  
  toast.textContent = message;
  toast.style.opacity = '1';
  
  // 3秒后隐藏
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3000);
}
