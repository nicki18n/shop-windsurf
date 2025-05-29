document.addEventListener('DOMContentLoaded', function() {
  // 角色项点击事件
  const roleItems = document.querySelectorAll('.role-item');
  roleItems.forEach(item => {
    item.addEventListener('click', function() {
      // 移除所有角色项的活动状态
      roleItems.forEach(role => role.classList.remove('active'));
      // 添加当前角色项的活动状态
      this.classList.add('active');
      
      // 更新权限配置区域的角色标题
      const roleName = this.querySelector('.role-name').textContent;
      document.querySelector('.role-title').textContent = roleName;
      
      // 模拟加载该角色的权限配置
      loadRolePermissions(roleName);
    });
  });
  
  // 权限组全选切换
  const groupToggles = document.querySelectorAll('.group-toggle input');
  groupToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      const permissionGroup = this.closest('.permission-group');
      const permissionSwitches = permissionGroup.querySelectorAll('.permission-switch input');
      
      permissionSwitches.forEach(switchInput => {
        switchInput.checked = this.checked;
      });
    });
  });
  
  // 权限项开关变化时检查组全选状态
  const permissionSwitches = document.querySelectorAll('.permission-switch input');
  permissionSwitches.forEach(switchInput => {
    switchInput.addEventListener('change', function() {
      updateGroupToggle(this);
    });
  });
  
  // 添加角色按钮点击事件
  const addRoleBtn = document.querySelector('.action-btn');
  addRoleBtn.addEventListener('click', function() {
    document.getElementById('addRoleModal').classList.add('active');
  });
  
  // 关闭添加角色弹窗
  document.getElementById('closeAddRoleModal').addEventListener('click', function() {
    document.getElementById('addRoleModal').classList.remove('active');
  });
  
  // 添加角色弹窗取消按钮
  const cancelAddRoleBtn = document.querySelector('#addRoleModal .cancel-btn');
  cancelAddRoleBtn.addEventListener('click', function() {
    document.getElementById('addRoleModal').classList.remove('active');
  });
  
  // 添加角色弹窗确定按钮
  const confirmAddRoleBtn = document.querySelector('#addRoleModal .confirm-btn');
  confirmAddRoleBtn.addEventListener('click', function() {
    const roleName = document.querySelector('#addRoleModal .form-input').value.trim();
    const roleDesc = document.querySelector('#addRoleModal .form-textarea').value.trim();
    
    if (!roleName) {
      showToast('请输入角色名称');
      return;
    }
    
    // 模拟添加角色
    addNewRole(roleName);
    
    // 关闭弹窗
    document.getElementById('addRoleModal').classList.remove('active');
    
    // 清空输入
    document.querySelector('#addRoleModal .form-input').value = '';
    document.querySelector('#addRoleModal .form-textarea').value = '';
  });
  
  // 编辑角色按钮点击事件
  const editRoleBtn = document.querySelector('.role-actions .text-btn:not(.danger)');
  editRoleBtn.addEventListener('click', function() {
    const roleName = document.querySelector('.role-title').textContent;
    
    // 打开添加角色弹窗并填充当前角色信息
    document.querySelector('#addRoleModal .modal-title').textContent = '编辑角色';
    document.querySelector('#addRoleModal .form-input').value = roleName;
    document.querySelector('#addRoleModal .form-textarea').value = '负责商品的添加、编辑、删除和库存管理等工作。';
    
    document.getElementById('addRoleModal').classList.add('active');
  });
  
  // 删除角色按钮点击事件
  const deleteRoleBtn = document.querySelector('.role-actions .text-btn.danger');
  deleteRoleBtn.addEventListener('click', function() {
    const roleName = document.querySelector('.role-title').textContent;
    
    if (confirm(`确定要删除角色"${roleName}"吗？删除后将无法恢复。`)) {
      // 模拟删除角色
      deleteRole(roleName);
    }
  });
  
  // 保存设置按钮点击事件
  const saveBtn = document.querySelector('.save-btn');
  saveBtn.addEventListener('click', function() {
    // 显示保存中状态
    this.textContent = '保存中...';
    this.disabled = true;
    
    // 模拟保存过程
    setTimeout(() => {
      // 恢复按钮状态
      this.textContent = '保存设置';
      this.disabled = false;
      
      // 显示保存成功提示
      showToast('权限设置已保存');
    }, 1000);
  });
  
  // 角色用户管理弹窗（模拟）
  setTimeout(() => {
    // 为了演示，在页面加载后延迟显示角色用户管理弹窗
    // 实际应用中应该由用户点击某个按钮触发
    // document.getElementById('roleUsersModal').classList.add('active');
  }, 1000);
  
  // 关闭角色用户管理弹窗
  document.getElementById('closeRoleUsersModal').addEventListener('click', function() {
    document.getElementById('roleUsersModal').classList.remove('active');
  });
  
  // 角色用户管理弹窗关闭按钮
  const closeRoleUsersBtn = document.querySelector('#roleUsersModal .cancel-btn');
  closeRoleUsersBtn.addEventListener('click', function() {
    document.getElementById('roleUsersModal').classList.remove('active');
  });
});

// 更新权限组全选状态
function updateGroupToggle(switchInput) {
  const permissionGroup = switchInput.closest('.permission-group');
  const groupToggle = permissionGroup.querySelector('.group-toggle input');
  const permissionSwitches = permissionGroup.querySelectorAll('.permission-switch input');
  
  // 检查是否所有权限项都被选中
  const allChecked = Array.from(permissionSwitches).every(input => input.checked);
  
  // 更新组全选状态
  groupToggle.checked = allChecked;
}

// 加载角色权限配置（模拟）
function loadRolePermissions(roleName) {
  // 在实际应用中，这里应该是从服务器加载该角色的权限配置
  // 这里仅作为演示，根据角色名称模拟不同的权限配置
  
  // 所有权限开关
  const allSwitches = document.querySelectorAll('.permission-switch input');
  
  if (roleName === '超级管理员') {
    // 超级管理员拥有所有权限
    allSwitches.forEach(switchInput => {
      switchInput.checked = true;
    });
  } else if (roleName === '商品管理员') {
    // 商品管理员只有商品管理权限
    allSwitches.forEach(switchInput => {
      switchInput.checked = false;
    });
    
    // 开启商品管理权限
    document.querySelectorAll('#viewProduct, #addProduct, #editProduct, #deleteProduct, #stockManage').forEach(input => {
      if (input) input.checked = true;
    });
  } else if (roleName === '订单管理员') {
    // 订单管理员只有订单管理权限
    allSwitches.forEach(switchInput => {
      switchInput.checked = false;
    });
    
    // 开启订单管理权限
    document.querySelectorAll('#viewOrder, #processOrder, #cancelOrder, #refundOrder').forEach(input => {
      if (input) input.checked = true;
    });
  } else if (roleName === '客服人员') {
    // 客服人员有查看权限，但没有编辑权限
    allSwitches.forEach(switchInput => {
      switchInput.checked = false;
    });
    
    // 开启查看权限
    document.querySelectorAll('#viewOrder, #viewProduct, #viewUser').forEach(input => {
      if (input) input.checked = true;
    });
  } else if (roleName === '营销专员') {
    // 营销专员有营销管理权限
    allSwitches.forEach(switchInput => {
      switchInput.checked = false;
    });
    
    // 开启营销管理权限
    document.querySelectorAll('#couponManage, #activityManage, #discountManage').forEach(input => {
      if (input) input.checked = true;
    });
  } else if (roleName === '数据分析师') {
    // 数据分析师只有查看权限
    allSwitches.forEach(switchInput => {
      switchInput.checked = false;
    });
    
    // 开启所有查看权限
    document.querySelectorAll('#viewOrder, #viewProduct, #viewUser').forEach(input => {
      if (input) input.checked = true;
    });
  }
  
  // 更新所有权限组的全选状态
  document.querySelectorAll('.permission-switch input').forEach(switchInput => {
    updateGroupToggle(switchInput);
  });
}

// 添加新角色（模拟）
function addNewRole(roleName) {
  // 创建新的角色项
  const roleItem = document.createElement('div');
  roleItem.className = 'role-item';
  roleItem.innerHTML = `
    <div class="role-name">${roleName}</div>
    <div class="role-count">0个用户</div>
  `;
  
  // 添加点击事件
  roleItem.addEventListener('click', function() {
    // 移除所有角色项的活动状态
    document.querySelectorAll('.role-item').forEach(role => role.classList.remove('active'));
    // 添加当前角色项的活动状态
    this.classList.add('active');
    
    // 更新权限配置区域的角色标题
    document.querySelector('.role-title').textContent = roleName;
    
    // 模拟加载该角色的权限配置
    loadRolePermissions(roleName);
  });
  
  // 添加到角色列表
  document.querySelector('.roles-list').appendChild(roleItem);
  
  // 显示添加成功提示
  showToast(`角色"${roleName}"添加成功`);
}

// 删除角色（模拟）
function deleteRole(roleName) {
  // 找到要删除的角色项
  const roleItems = document.querySelectorAll('.role-item');
  let deletedItem = null;
  
  roleItems.forEach(item => {
    if (item.querySelector('.role-name').textContent === roleName) {
      deletedItem = item;
    }
  });
  
  if (deletedItem) {
    // 删除角色项
    deletedItem.remove();
    
    // 如果还有其他角色，选中第一个
    const remainingRoles = document.querySelectorAll('.role-item');
    if (remainingRoles.length > 0) {
      remainingRoles[0].click();
    }
    
    // 显示删除成功提示
    showToast(`角色"${roleName}"已删除`);
  }
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
