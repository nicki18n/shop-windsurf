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
    });
  });
  
  // 新增活动按钮点击事件
  const addActivityBtn = document.querySelector('.action-btn');
  const editActivityModal = document.getElementById('editActivityModal');
  const closeEditActivityModal = document.getElementById('closeEditActivityModal');
  const cancelEditActivity = document.getElementById('cancelEditActivity');
  const saveActivity = document.getElementById('saveActivity');
  
  if (addActivityBtn) {
    addActivityBtn.addEventListener('click', function() {
      // 清空表单
      document.getElementById('editActivityTitle').textContent = '新增活动';
      document.getElementById('activityName').value = '';
      document.getElementById('activityType').value = 'discount';
      document.querySelector('input[name="activityStatus"][value="upcoming"]').checked = true;
      document.getElementById('activityStartTime').value = '';
      document.getElementById('activityEndTime').value = '';
      document.getElementById('activityDescription').value = '';
      document.getElementById('activityRules').value = '';
      document.getElementById('productSelectType').value = 'all';
      document.getElementById('discountType').value = 'percent';
      document.getElementById('discountPercent').value = '';
      document.getElementById('activitySort').value = '';
      
      // 显示弹窗
      editActivityModal.classList.add('active');
    });
  }
  
  // 编辑活动按钮点击事件
  const editBtns = document.querySelectorAll('.edit-btn');
  editBtns.forEach(btn => {
    btn.addEventListener('click', handleEditActivity);
  });
  
  // 编辑活动处理函数
  function handleEditActivity() {
      const activityId = this.getAttribute('data-id');
      const activityCard = this.closest('.activity-card');
      const activityName = activityCard.querySelector('.activity-name').textContent;
      const activityType = activityCard.querySelector('.activity-type').textContent;
      const activityStatus = activityCard.querySelector('.activity-status');
      const activityTime = activityCard.querySelector('.activity-detail:first-child').textContent.trim();
      const activityDiscount = activityCard.querySelector('.activity-detail:nth-child(2)').textContent.trim();
      
      // 填充表单
      document.getElementById('editActivityTitle').textContent = '编辑活动';
      document.getElementById('activityName').value = activityName;
      
      // 根据活动类型设置选项
      if (activityType === '限时折扣') {
        document.getElementById('activityType').value = 'discount';
      } else if (activityType === '满减活动') {
        document.getElementById('activityType').value = 'minus';
      } else if (activityType === '新品首发') {
        document.getElementById('activityType').value = 'new';
      } else if (activityType === '秒杀活动') {
        document.getElementById('activityType').value = 'flash';
      } else if (activityType === '拼团活动') {
        document.getElementById('activityType').value = 'group';
      } else if (activityType === '会员专享') {
        document.getElementById('activityType').value = 'member';
      }
      
      // 设置活动状态
      if (activityStatus.classList.contains('active')) {
        document.querySelector('input[name="activityStatus"][value="active"]').checked = true;
      } else if (activityStatus.classList.contains('upcoming')) {
        document.querySelector('input[name="activityStatus"][value="upcoming"]').checked = true;
      } else if (activityStatus.classList.contains('ended')) {
        document.querySelector('input[name="activityStatus"][value="ended"]').checked = true;
      }
      
      // 解析活动时间
      const timeMatch = activityTime.match(/(\d{4}-\d{2}-\d{2}) 至 (\d{4}-\d{2}-\d{2})/);
      if (timeMatch) {
        document.getElementById('activityStartTime').value = `${timeMatch[1]}T00:00`;
        document.getElementById('activityEndTime').value = `${timeMatch[2]}T23:59`;
      }
      
      // 解析优惠信息
      if (activityDiscount.includes('折')) {
        document.getElementById('discountType').value = 'percent';
        const percentMatch = activityDiscount.match(/(\d+)折/);
        if (percentMatch) {
          document.getElementById('discountPercent').value = percentMatch[1] * 10;
        }
      } else if (activityDiscount.includes('满') && activityDiscount.includes('减')) {
        document.getElementById('discountType').value = 'minus';
        // 显示满减输入框
        document.querySelector('.discount-percent').style.display = 'none';
        document.querySelector('.discount-minus').style.display = 'flex';
        document.querySelector('.discount-direct').style.display = 'none';
        document.querySelector('.discount-gift').style.display = 'none';
        
        const minusMatch = activityDiscount.match(/满(\d+)减(\d+)/);
        if (minusMatch) {
          document.getElementById('minusThreshold').value = minusMatch[1];
          document.getElementById('minusAmount').value = minusMatch[2];
        }
      }
      
      // 设置默认描述和规则
      document.getElementById('activityDescription').value = '夏日来临，花涧珠光水彩推出夏季特惠活动，全场水彩颜料8折起，更有精美赠品相送。';
      document.getElementById('activityRules').value = '1. 活动时间：2025年5月20日至2025年6月20日；\n2. 活动期间，全场水彩颜料8折起；\n3. 单笔订单满300元赠送精美水彩笔记本一本；\n4. 活动商品不与其他优惠同享；\n5. 本活动最终解释权归花涧珠光水彩所有。';
      
      // 设置排序权重
      document.getElementById('activitySort').value = '100';
      
      // 显示弹窗
      editActivityModal.classList.add('active');
    }
  
  // 关闭编辑弹窗
  if (closeEditActivityModal) {
    closeEditActivityModal.addEventListener('click', function() {
      editActivityModal.classList.remove('active');
    });
  }
  
  if (cancelEditActivity) {
    cancelEditActivity.addEventListener('click', function() {
      editActivityModal.classList.remove('active');
    });
  }
  
  // 保存活动
  if (saveActivity) {
    saveActivity.addEventListener('click', function() {
      const activityName = document.getElementById('activityName').value.trim();
      
      if (!activityName) {
        showToast('请输入活动名称', 'error');
        document.getElementById('activityName').focus();
        return;
      }
      
      const startTime = document.getElementById('activityStartTime').value;
      const endTime = document.getElementById('activityEndTime').value;
      
      if (!startTime || !endTime) {
        showToast('请设置活动时间', 'error');
        if (!startTime) document.getElementById('activityStartTime').focus();
        else document.getElementById('activityEndTime').focus();
        return;
      }
      
      if (new Date(startTime) >= new Date(endTime)) {
        showToast('结束时间必须晚于开始时间', 'error');
        document.getElementById('activityEndTime').focus();
        return;
      }
      
      // 添加加载效果
      saveActivity.innerHTML = '<span class="loading-spinner"></span> 保存中...';
      saveActivity.style.pointerEvents = 'none';
      
      // 模拟异步保存
      setTimeout(() => {
        // 模拟保存成功
        showToast('活动保存成功！', 'success');
        
        // 如果是新增活动，则添加到列表中
        if (document.getElementById('editActivityTitle').textContent === '新增活动') {
          addNewActivityToList();
        }
        
        // 恢复按钮状态
        saveActivity.innerHTML = '保存';
        saveActivity.style.pointerEvents = 'auto';
        
        // 关闭弹窗
        editActivityModal.classList.remove('active');
      }, 1500);
    });
  }
  
  // 添加新活动到列表中
  function addNewActivityToList() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const activityName = document.getElementById('activityName').value.trim();
    const activityType = document.getElementById('activityType');
    const activityTypeText = activityType.options[activityType.selectedIndex].text;
    const activityStatus = document.querySelector('input[name="activityStatus"]:checked').value;
    const startTime = document.getElementById('activityStartTime').value;
    const endTime = document.getElementById('activityEndTime').value;
    
    // 格式化时间
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    // 创建新活动卡片
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-card';
    newActivity.innerHTML = `
      <div class="activity-content">
        <div class="activity-header">
          <div class="activity-info">
            <div class="activity-name">${activityName}</div>
            <div class="activity-meta">
              <div class="activity-type">${activityTypeText}</div>
              <div class="activity-status ${activityStatus}">${activityStatus === 'active' ? '进行中' : activityStatus === 'upcoming' ? '即将开始' : '已结束'}</div>
            </div>
          </div>
        </div>
        <div class="activity-details">
          <div class="activity-detail">
            <img src="../images/icons/calendar.svg" alt="时间" class="activity-detail-icon">
            ${formatDate(startTime)} 至 ${formatDate(endTime)}
          </div>
          <div class="activity-detail">
            <img src="../images/icons/tag.svg" alt="折扣" class="activity-detail-icon">
            全场水彩颜料8折起
          </div>
          <div class="activity-detail">
            <img src="../images/icons/user.svg" alt="参与" class="activity-detail-icon">
            已有0人参与
          </div>
        </div>
        <div class="activity-actions">
          <div class="edit-btn" data-id="new-${Date.now()}">编辑</div>
          <div class="view-btn" data-id="new-${Date.now()}">查看</div>
          <div class="delete-btn" data-id="new-${Date.now()}">删除</div>
        </div>
      </div>
    `;
    
    // 添加到列表开头
    if (activityList.firstChild) {
      activityList.insertBefore(newActivity, activityList.firstChild);
    } else {
      activityList.appendChild(newActivity);
    }
    
    // 添加动画效果
    newActivity.style.opacity = '0';
    newActivity.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      newActivity.style.transition = 'opacity 0.5s, transform 0.5s';
      newActivity.style.opacity = '1';
      newActivity.style.transform = 'translateY(0)';
    }, 10);
    
    // 为新活动添加事件监听
    const editBtn = newActivity.querySelector('.edit-btn');
    const viewBtn = newActivity.querySelector('.view-btn');
    const deleteBtn = newActivity.querySelector('.delete-btn');
    
    if (editBtn) {
      editBtn.addEventListener('click', handleEditActivity);
    }
    
    if (viewBtn) {
      viewBtn.addEventListener('click', handleViewActivity);
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', handleDeleteActivity);
    }
  }
  
  // 显示提示框
  function showToast(message, type = 'info') {
    // 移除现有的提示框
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // 自动消失
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
  
  // 优惠方式切换
  const discountType = document.getElementById('discountType');
  if (discountType) {
    discountType.addEventListener('change', function() {
      const value = this.value;
      const percentEl = document.querySelector('.discount-percent');
      const minusEl = document.querySelector('.discount-minus');
      const directEl = document.querySelector('.discount-direct');
      const giftEl = document.querySelector('.discount-gift');
      
      // 隐藏所有
      percentEl.style.display = 'none';
      minusEl.style.display = 'none';
      directEl.style.display = 'none';
      giftEl.style.display = 'none';
      
      // 显示对应的
      if (value === 'percent') {
        percentEl.style.display = 'flex';
      } else if (value === 'minus') {
        minusEl.style.display = 'flex';
      } else if (value === 'direct') {
        directEl.style.display = 'flex';
      } else if (value === 'gift') {
        giftEl.style.display = 'flex';
      }
    });
  }
  
  // 标签添加功能
  const tagInput = document.getElementById('tagInput');
  if (tagInput) {
    tagInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = this.value.trim();
        if (value) {
          const tagsContainer = document.getElementById('tagsContainer');
          const tag = document.createElement('div');
          tag.className = 'tag';
          tag.innerHTML = `${value}<span class="remove-tag">×</span>`;
          tagsContainer.appendChild(tag);
          this.value = '';
          
          // 添加删除标签事件
          const removeBtn = tag.querySelector('.remove-tag');
          removeBtn.addEventListener('click', function() {
            tag.remove();
          });
        }
      }
    });
  }
  
  // 已有标签的删除功能
  const removeTags = document.querySelectorAll('.remove-tag');
  removeTags.forEach(btn => {
    btn.addEventListener('click', function() {
      this.parentElement.remove();
    });
  });
  
  // 查看活动详情
  const viewBtns = document.querySelectorAll('.view-btn');
  const viewActivityModal = document.getElementById('viewActivityModal');
  const closeViewActivityModal = document.getElementById('closeViewActivityModal');
  const closeDetailBtn = document.getElementById('closeDetailBtn');
  
  viewBtns.forEach(btn => {
    btn.addEventListener('click', handleViewActivity);
  });
  
  // 查看活动详情处理函数
  function handleViewActivity() {
      const activityId = this.getAttribute('data-id');
      const activityCard = this.closest('.activity-card');
      const activityName = activityCard.querySelector('.activity-name').textContent;
      const activityType = activityCard.querySelector('.activity-type').textContent;
      const activityStatus = activityCard.querySelector('.activity-status');
      const activityImage = activityCard.querySelector('.activity-image').src;
      const activityTime = activityCard.querySelector('.activity-detail:first-child').textContent.trim();
      const activityDiscount = activityCard.querySelector('.activity-detail:nth-child(2)').textContent.trim();
      const activityParticipants = activityCard.querySelector('.activity-detail:nth-child(3)')?.textContent.trim();
      
      // 填充详情
      document.getElementById('detailCoverImage').src = activityImage;
      document.getElementById('detailName').textContent = activityName;
      document.getElementById('detailType').textContent = activityType;
      
      // 设置状态样式
      const detailStatus = document.getElementById('detailStatus');
      detailStatus.className = 'activity-detail-status';
      if (activityStatus.classList.contains('active')) {
        detailStatus.classList.add('active');
        detailStatus.textContent = '进行中';
      } else if (activityStatus.classList.contains('upcoming')) {
        detailStatus.classList.add('upcoming');
        detailStatus.textContent = '即将开始';
      } else if (activityStatus.classList.contains('ended')) {
        detailStatus.classList.add('ended');
        detailStatus.textContent = '已结束';
      }
      
      // 设置时间和折扣信息
      document.getElementById('detailTime').innerHTML = `
        <img src="../images/icons/calendar.svg" alt="日期" class="activity-detail-icon">
        ${activityTime}
      `;
      
      document.getElementById('detailDiscount').innerHTML = `
        <img src="../images/icons/tag.svg" alt="折扣" class="activity-detail-icon">
        ${activityDiscount}
      `;
      
      if (activityParticipants) {
        document.getElementById('detailParticipants').innerHTML = `
          <img src="../images/icons/user.svg" alt="参与" class="activity-detail-icon">
          ${activityParticipants}
        `;
        document.getElementById('detailParticipants').style.display = 'flex';
      } else {
        document.getElementById('detailParticipants').style.display = 'none';
      }
      
      // 显示弹窗
      viewActivityModal.classList.add('active');
    }
  
  // 关闭查看详情弹窗
  if (closeViewActivityModal) {
    closeViewActivityModal.addEventListener('click', function() {
      viewActivityModal.classList.remove('active');
    });
  }
  
  if (closeDetailBtn) {
    closeDetailBtn.addEventListener('click', function() {
      viewActivityModal.classList.remove('active');
    });
  }
  
  // 删除活动
  const deleteBtns = document.querySelectorAll('.delete-btn');
  const deleteConfirmModal = document.getElementById('deleteConfirmModal');
  const closeDeleteConfirmModal = document.getElementById('closeDeleteConfirmModal');
  const cancelDelete = document.getElementById('cancelDelete');
  const confirmDelete = document.getElementById('confirmDelete');
  let currentDeleteId = null;
  
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', handleDeleteActivity);
  });
  
  // 删除活动处理函数
  function handleDeleteActivity() {
      const activityId = this.getAttribute('data-id');
      currentDeleteId = activityId;
      const activityCard = this.closest('.activity-card');
      const activityName = activityCard.querySelector('.activity-name').textContent;
      
      document.getElementById('deleteActivityName').textContent = activityName;
      deleteConfirmModal.classList.add('active');
    }
  
  // 关闭删除确认弹窗
  if (closeDeleteConfirmModal) {
    closeDeleteConfirmModal.addEventListener('click', function() {
      deleteConfirmModal.classList.remove('active');
    });
  }
  
  if (cancelDelete) {
    cancelDelete.addEventListener('click', function() {
      deleteConfirmModal.classList.remove('active');
    });
  }
  
  // 确认删除
  if (confirmDelete) {
    confirmDelete.addEventListener('click', function() {
      if (currentDeleteId) {
        // 模拟删除成功
        const activityCard = document.querySelector(`.delete-btn[data-id="${currentDeleteId}"]`).closest('.activity-card');
        activityCard.remove();
        alert('活动删除成功！');
        deleteConfirmModal.classList.remove('active');
      }
    });
  }
  
  // 搜索框输入事件
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        const searchTerm = this.value.trim().toLowerCase();
        alert(`搜索：${searchTerm}`);
      }
    });
  }
  
  // 筛选按钮点击事件
  const filterBtn = document.querySelector('.filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener('click', function() {
      // 切换筛选区域的显示/隐藏
      const filterSection = document.querySelector('.filter-section');
      if (filterSection.style.display === 'none') {
        filterSection.style.display = 'block';
      } else {
        filterSection.style.display = 'none';
      }
    });
  }
  
  // 商品选择按钮点击事件
  const selectProductsBtn = document.getElementById('selectProductsBtn');
  if (selectProductsBtn) {
    selectProductsBtn.addEventListener('click', function() {
      // 模拟商品选择弹窗
      alert('打开商品选择弹窗（此处为原型演示，实际功能需要实现商品选择弹窗）');
    });
  }
  
  // 商品删除按钮点击事件
  const removeProductBtns = document.querySelectorAll('.remove-product');
  removeProductBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.selected-product').remove();
    });
  });
  
  // 上传图片按钮点击事件
  const uploadCoverBtn = document.getElementById('uploadCoverBtn');
  if (uploadCoverBtn) {
    uploadCoverBtn.addEventListener('click', function() {
      // 模拟上传图片
      const randomId = Math.floor(Math.random() * 1000);
      document.getElementById('coverImage').src = `https://picsum.photos/id/${randomId}/400/200`;
      alert('图片上传成功！');
    });
  }
  
  // 分页点击事件
  const pageItems = document.querySelectorAll('.page-item');
  pageItems.forEach(item => {
    item.addEventListener('click', function() {
      pageItems.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
