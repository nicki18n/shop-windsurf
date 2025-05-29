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
      
      // 刷新日志列表（模拟）
      refreshLogs();
    });
  });
  
  // 排序选项点击事件
  const sortOptions = document.querySelectorAll('.sort-option');
  sortOptions.forEach(option => {
    option.addEventListener('click', function() {
      sortOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      // 刷新日志列表（模拟）
      refreshLogs();
    });
  });
  
  // 搜索框输入事件
  const searchInput = document.querySelector('.search-input');
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      // 刷新日志列表（模拟）
      refreshLogs();
    }, 500);
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
    
    // 刷新日志列表（模拟）
    refreshLogs();
  });
  
  // 分页按钮点击事件
  const pageNumbers = document.querySelectorAll('.page-number:not(.more)');
  pageNumbers.forEach(page => {
    page.addEventListener('click', function() {
      if (!this.classList.contains('active')) {
        document.querySelector('.page-number.active').classList.remove('active');
        this.classList.add('active');
        
        // 刷新日志列表（模拟）
        refreshLogs();
      }
    });
  });
  
  // 上一页、下一页按钮点击事件
  const pageBtns = document.querySelectorAll('.page-btn:not(.disabled)');
  pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const currentPage = parseInt(document.querySelector('.page-number.active').textContent);
      let newPage;
      
      if (this.dataset.page === 'prev') {
        newPage = currentPage - 1;
      } else {
        newPage = currentPage + 1;
      }
      
      // 模拟页面切换
      if (newPage >= 1 && newPage <= 26) {
        // 刷新日志列表（模拟）
        refreshLogs();
        
        // 更新分页状态
        updatePagination(newPage);
      }
    });
  });
  
  // 查看日志详情按钮点击事件
  const viewLogBtns = document.querySelectorAll('.log-action-btn[data-action="view"]');
  viewLogBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const logRow = this.closest('tr');
      const logTime = logRow.querySelector('td:first-child').textContent;
      const logType = logRow.querySelector('.log-type').textContent;
      const logLevel = logRow.querySelector('.log-level').textContent;
      const logUser = logRow.querySelector('td:nth-child(4)').textContent;
      const logIP = logRow.querySelector('td:nth-child(5)').textContent;
      const logContent = logRow.querySelector('td:nth-child(6)').textContent;
      
      // 填充日志详情弹窗
      document.querySelector('#logDetailModal .detail-value:nth-of-type(2)').textContent = logTime;
      document.querySelector('#logDetailModal .detail-value:nth-of-type(3)').innerHTML = `<span class="log-type ${logType.toLowerCase().replace('日志', '')}">${logType}</span>`;
      document.querySelector('#logDetailModal .detail-value:nth-of-type(4)').innerHTML = `<span class="log-level ${logLevel.toLowerCase()}">${logLevel}</span>`;
      document.querySelector('#logDetailModal .detail-value:nth-of-type(5)').textContent = logUser;
      document.querySelector('#logDetailModal .detail-value:nth-of-type(6)').textContent = logIP;
      document.querySelector('#logDetailModal .detail-value:nth-of-type(8)').textContent = logContent;
      
      // 显示日志详情弹窗
      document.getElementById('logDetailModal').classList.add('active');
    });
  });
  
  // 关闭日志详情弹窗
  document.getElementById('closeLogDetailModal').addEventListener('click', function() {
    document.getElementById('logDetailModal').classList.remove('active');
  });
  
  document.getElementById('closeDetailBtn').addEventListener('click', function() {
    document.getElementById('logDetailModal').classList.remove('active');
  });
  
  // 导出日志按钮点击事件
  const exportLogBtn = document.querySelector('.action-btn.secondary');
  exportLogBtn.addEventListener('click', function() {
    // 模拟导出过程
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 导出中...';
    this.disabled = true;
    
    setTimeout(() => {
      this.innerHTML = originalText;
      this.disabled = false;
      showToast('日志已导出到 system_logs_2025-05-29.csv');
    }, 1500);
  });
  
  // 清空日志按钮点击事件
  const clearLogBtn = document.querySelector('.action-btn.danger');
  clearLogBtn.addEventListener('click', function() {
    document.getElementById('clearLogsModal').classList.add('active');
  });
  
  // 关闭清空日志确认弹窗
  document.getElementById('closeClearLogsModal').addEventListener('click', function() {
    document.getElementById('clearLogsModal').classList.remove('active');
  });
  
  // 取消清空日志
  document.getElementById('cancelClearBtn').addEventListener('click', function() {
    document.getElementById('clearLogsModal').classList.remove('active');
  });
  
  // 确认清空日志
  document.getElementById('confirmClearBtn').addEventListener('click', function() {
    const keepErrorLogs = document.getElementById('keepErrorLogs').checked;
    const backupBeforeClear = document.getElementById('backupBeforeClear').checked;
    
    // 显示处理中状态
    this.textContent = '处理中...';
    this.disabled = true;
    
    // 模拟清空过程
    setTimeout(() => {
      document.getElementById('clearLogsModal').classList.remove('active');
      
      // 如果选择了备份，显示备份成功提示
      if (backupBeforeClear) {
        showToast('日志已备份到 logs_backup_2025-05-29.zip');
      }
      
      // 显示清空成功提示
      if (keepErrorLogs) {
        showToast('已清空普通日志，保留错误和严重级别的日志');
      } else {
        showToast('所有日志已清空');
      }
      
      // 恢复按钮状态
      this.textContent = '确认清空';
      this.disabled = false;
      
      // 刷新日志列表（模拟）
      refreshLogs();
    }, 2000);
  });
});

// 刷新日志列表（模拟）
function refreshLogs() {
  const logsTable = document.querySelector('.logs-table tbody');
  logsTable.style.opacity = '0.5';
  
  // 模拟加载
  setTimeout(() => {
    logsTable.style.opacity = '1';
  }, 500);
}

// 更新分页状态
function updatePagination(page) {
  const pageNumbers = document.querySelectorAll('.page-number:not(.more)');
  const prevBtn = document.querySelector('.page-btn[data-page="prev"]');
  const nextBtn = document.querySelector('.page-btn[data-page="next"]');
  
  // 更新页码状态
  document.querySelector('.page-number.active').classList.remove('active');
  
  // 简单处理，仅支持1-5页和最后一页的切换
  if (page >= 1 && page <= 5) {
    pageNumbers[page - 1].classList.add('active');
  } else if (page === 26) {
    pageNumbers[6].classList.add('active');
  }
  
  // 更新上一页、下一页按钮状态
  if (page === 1) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }
  
  if (page === 26) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
  
  // 更新显示信息
  const startItem = (page - 1) * 10 + 1;
  const endItem = page * 10;
  document.querySelector('.page-info').textContent = `显示 ${startItem} 至 ${endItem} 条，共 256 条日志`;
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
