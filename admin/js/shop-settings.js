document.addEventListener('DOMContentLoaded', function() {
  // 选项卡切换
  const tabs = document.querySelectorAll('.tab');
  const settingsSections = document.querySelectorAll('.settings-section');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // 移除所有选项卡的活动状态
      tabs.forEach(t => t.classList.remove('active'));
      // 添加当前选项卡的活动状态
      this.classList.add('active');
      
      // 隐藏所有设置区域
      settingsSections.forEach(section => section.classList.remove('active'));
      
      // 显示当前选项卡对应的设置区域
      const tabId = this.getAttribute('data-tab');
      document.getElementById(`${tabId}-settings`).classList.add('active');
    });
  });
  
  // 支付方式开关
  const paymentSwitches = document.querySelectorAll('.method-switch .switch-input');
  paymentSwitches.forEach(switchInput => {
    switchInput.addEventListener('change', function() {
      const methodConfig = this.closest('.payment-method').querySelector('.method-config');
      if (this.checked) {
        methodConfig.style.display = 'block';
      } else {
        methodConfig.style.display = 'none';
      }
    });
  });
  
  // 初始化银行卡支付配置区域的显示状态
  const bankPaySwitch = document.getElementById('bankPay');
  if (bankPaySwitch && !bankPaySwitch.checked) {
    const bankMethodConfig = bankPaySwitch.closest('.payment-method').querySelector('.method-config');
    bankMethodConfig.style.display = 'none';
  }
  
  // 上传图片按钮点击事件
  const uploadBtn = document.querySelector('.upload-btn');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', function() {
      // 在实际应用中，这里会触发文件选择对话框
      // 这里仅作为演示，显示一个提示
      alert('选择图片功能将在实际应用中实现');
    });
  }
  
  // 保存设置按钮点击事件
  const saveBtn = document.querySelector('.save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      // 显示保存中状态
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 保存中...';
      this.disabled = true;
      
      // 模拟保存过程
      setTimeout(() => {
        // 恢复按钮状态
        this.innerHTML = originalText;
        this.disabled = false;
        
        // 显示保存成功提示
        showToast('设置已保存');
      }, 1500);
    });
  }
  
  // 创建物流配送和通知设置、安全设置的内容
  createShippingSettings();
  createNotificationSettings();
  createSecuritySettings();
});

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

// 创建物流配送设置内容
function createShippingSettings() {
  const shippingSettings = document.getElementById('shipping-settings');
  if (!shippingSettings) return;
  
  shippingSettings.innerHTML = `
    <div class="section-title">物流配送设置</div>
    
    <div class="form-group">
      <label class="form-label">默认配送方式</label>
      <select class="form-select">
        <option value="express">快递配送</option>
        <option value="self">到店自提</option>
        <option value="both">两种方式都支持</option>
      </select>
    </div>
    
    <div class="form-group">
      <label class="form-label">运费设置</label>
      <div class="shipping-fee-settings">
        <div class="fee-option">
          <input type="radio" name="feeType" id="fixedFee" checked>
          <label for="fixedFee">固定运费</label>
          <input type="text" class="form-input small-input" value="12" style="width: 80px; margin-left: 10px;"> 元
        </div>
        
        <div class="fee-option">
          <input type="radio" name="feeType" id="freeFeeThreshold">
          <label for="freeFeeThreshold">满额包邮</label>
          <span style="margin-left: 10px;">订单满</span>
          <input type="text" class="form-input small-input" value="99" style="width: 80px; margin: 0 5px;"> 元包邮
        </div>
        
        <div class="fee-option">
          <input type="radio" name="feeType" id="customFee">
          <label for="customFee">自定义运费规则</label>
          <button class="text-btn" style="margin-left: 10px;">设置规则</button>
        </div>
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label">支持的快递公司</label>
      <div class="express-companies">
        <div class="express-company">
          <input type="checkbox" id="sf" checked>
          <label for="sf">顺丰速运</label>
        </div>
        <div class="express-company">
          <input type="checkbox" id="sto" checked>
          <label for="sto">申通快递</label>
        </div>
        <div class="express-company">
          <input type="checkbox" id="yto" checked>
          <label for="yto">圆通速递</label>
        </div>
        <div class="express-company">
          <input type="checkbox" id="zto" checked>
          <label for="zto">中通快递</label>
        </div>
        <div class="express-company">
          <input type="checkbox" id="yd">
          <label for="yd">韵达快递</label>
        </div>
        <div class="express-company">
          <input type="checkbox" id="jd">
          <label for="jd">京东物流</label>
        </div>
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label">发货地址</label>
      <div class="address-fields">
        <div class="form-row">
          <select class="form-select" style="flex: 1; margin-right: 10px;">
            <option>北京市</option>
            <option>上海市</option>
            <option selected>广州市</option>
            <option>深圳市</option>
          </select>
          <select class="form-select" style="flex: 1; margin-right: 10px;">
            <option>海珠区</option>
            <option selected>天河区</option>
            <option>越秀区</option>
            <option>白云区</option>
          </select>
          <select class="form-select" style="flex: 1;">
            <option>五山街道</option>
            <option selected>天河北街道</option>
            <option>石牌街道</option>
          </select>
        </div>
        <input type="text" class="form-input" value="天河路385号太古汇" placeholder="详细地址" style="margin-top: 10px;">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label">发货人信息</label>
      <div class="form-row" style="margin-bottom: 10px;">
        <input type="text" class="form-input" value="张经理" placeholder="联系人姓名" style="flex: 1; margin-right: 10px;">
        <input type="text" class="form-input" value="13812345678" placeholder="联系电话" style="flex: 1;">
      </div>
    </div>
  `;
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .shipping-fee-settings {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .fee-option {
      display: flex;
      align-items: center;
    }
    
    .express-companies {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    
    .express-company {
      display: flex;
      align-items: center;
    }
    
    .express-company input {
      margin-right: 8px;
    }
    
    .form-row {
      display: flex;
      gap: 10px;
    }
    
    .text-btn {
      background: none;
      border: none;
      color: #007AFF;
      cursor: pointer;
      font-size: 14px;
      padding: 0;
    }
    
    .text-btn:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);
}

// 创建通知设置内容
function createNotificationSettings() {
  const notificationSettings = document.getElementById('notification-settings');
  if (!notificationSettings) return;
  
  notificationSettings.innerHTML = `
    <div class="section-title">通知设置</div>
    
    <div class="notification-group">
      <div class="group-title">商家通知</div>
      
      <div class="notification-item">
        <div class="notification-info">
          <div class="notification-name">新订单通知</div>
          <div class="notification-desc">有新订单时通过微信、短信等方式通知商家</div>
        </div>
        <div class="notification-switch">
          <input type="checkbox" id="newOrderNotify" class="switch-input" checked>
          <label for="newOrderNotify" class="switch-label"></label>
        </div>
      </div>
      
      <div class="notification-item">
        <div class="notification-info">
          <div class="notification-name">订单支付通知</div>
          <div class="notification-desc">订单支付成功时通知商家</div>
        </div>
        <div class="notification-switch">
          <input type="checkbox" id="paymentNotify" class="switch-input" checked>
          <label for="paymentNotify" class="switch-label"></label>
        </div>
      </div>
      
      <div class="notification-item">
        <div class="notification-info">
          <div class="notification-name">退款申请通知</div>
          <div class="notification-desc">有退款申请时通知商家处理</div>
        </div>
        <div class="notification-switch">
          <input type="checkbox" id="refundNotify" class="switch-input" checked>
          <label for="refundNotify" class="switch-label"></label>
        </div>
      </div>
      
      <div class="notification-item">
        <div class="notification-info">
          <div class="notification-name">库存预警通知</div>
          <div class="notification-desc">商品库存低于预警值时通知商家</div>
        </div>
        <div class="notification-switch">
          <input type="checkbox" id="stockNotify" class="switch-input" checked>
          <label for="stockNotify" class="switch-label"></label>
        </div>
      </div>
    </div>
    
    <div class="notification-group">
      <div class="group-title">用户通知</div>
      
      <div class="notification-item">
        <div class="notification-info">
          <div class="notification-name">订单状态变更通知</div>
          <div class="notification-desc">订单状态变更时通知用户</div>
        </div>
        <div class="notification-switch">
          <input type="checkbox" id="orderStatusNotify" class="switch-input" checked>
          <label for="orderStatusNotify" class="switch-label"></label>
        </div>
      </div>
      
      <div class="notification-item">
        <div class="notification-info">
          <div class="notification-name">发货通知</div>
          <div class="notification-desc">订单发货时通知用户</div>
        </div>
        <div class="notification-switch">
          <input type="checkbox" id="shippingNotify" class="switch-input" checked>
          <label for="shippingNotify" class="switch-label"></label>
        </div>
      </div>
      
      <div class="notification-item">
        <div class="notification-info">
          <div class="notification-name">优惠活动通知</div>
          <div class="notification-desc">有新的优惠活动时通知用户</div>
        </div>
        <div class="notification-switch">
          <input type="checkbox" id="promotionNotify" class="switch-input">
          <label for="promotionNotify" class="switch-label"></label>
        </div>
      </div>
    </div>
    
    <div class="notification-group">
      <div class="group-title">通知方式设置</div>
      
      <div class="form-group">
        <label class="form-label">商家通知方式</label>
        <div class="checkbox-group">
          <div class="checkbox-item">
            <input type="checkbox" id="merchantWechat" checked>
            <label for="merchantWechat">微信</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="merchantSMS" checked>
            <label for="merchantSMS">短信</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="merchantEmail">
            <label for="merchantEmail">邮件</label>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">用户通知方式</label>
        <div class="checkbox-group">
          <div class="checkbox-item">
            <input type="checkbox" id="userWechat" checked>
            <label for="userWechat">微信</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="userSMS">
            <label for="userSMS">短信</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="userInApp" checked>
            <label for="userInApp">小程序内</label>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .notification-group {
      margin-bottom: 30px;
    }
    
    .group-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
      color: #1d1d1f;
    }
    
    .notification-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #e8e8ed;
    }
    
    .notification-item:last-child {
      border-bottom: none;
    }
    
    .notification-name {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .notification-desc {
      font-size: 13px;
      color: #86868b;
    }
    
    .checkbox-group {
      display: flex;
      gap: 20px;
    }
    
    .checkbox-item {
      display: flex;
      align-items: center;
    }
    
    .checkbox-item input {
      margin-right: 8px;
    }
  `;
  document.head.appendChild(style);
}

// 创建安全设置内容
function createSecuritySettings() {
  const securitySettings = document.getElementById('security-settings');
  if (!securitySettings) return;
  
  securitySettings.innerHTML = `
    <div class="section-title">安全设置</div>
    
    <div class="form-group">
      <label class="form-label">修改登录密码</label>
      <div class="password-fields">
        <input type="password" class="form-input" placeholder="当前密码" style="margin-bottom: 10px;">
        <input type="password" class="form-input" placeholder="新密码" style="margin-bottom: 10px;">
        <input type="password" class="form-input" placeholder="确认新密码">
        <div class="form-hint">密码长度为8-20位，必须包含字母和数字</div>
      </div>
      <button class="action-btn" style="margin-top: 16px;">修改密码</button>
    </div>
    
    <div class="form-group">
      <label class="form-label">两步验证</label>
      <div class="two-factor-auth">
        <div class="auth-status">
          <div class="status-text">
            <div class="status-title">当前状态：<span class="status-value">已开启</span></div>
            <div class="status-desc">登录时需要输入手机验证码</div>
          </div>
          <div class="auth-switch">
            <input type="checkbox" id="twoFactorAuth" class="switch-input" checked>
            <label for="twoFactorAuth" class="switch-label"></label>
          </div>
        </div>
        <div class="auth-phone">
          <div class="phone-label">已绑定手机：</div>
          <div class="phone-value">138****5678</div>
          <button class="text-btn">修改</button>
        </div>
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label">登录设备管理</label>
      <div class="devices-list">
        <div class="device-item">
          <div class="device-info">
            <div class="device-name">iPhone 13 Pro</div>
            <div class="device-meta">iOS 15.4 · 广州 · 当前设备</div>
          </div>
          <div class="device-time">最近登录：2025-05-29 22:45</div>
        </div>
        
        <div class="device-item">
          <div class="device-info">
            <div class="device-name">MacBook Pro</div>
            <div class="device-meta">macOS 12.3 · 广州</div>
          </div>
          <div class="device-time">最近登录：2025-05-28 14:30</div>
          <button class="text-btn red">退出登录</button>
        </div>
        
        <div class="device-item">
          <div class="device-info">
            <div class="device-name">Windows PC</div>
            <div class="device-meta">Windows 11 · 深圳</div>
          </div>
          <div class="device-time">最近登录：2025-05-25 09:15</div>
          <button class="text-btn red">退出登录</button>
        </div>
      </div>
      <button class="action-btn secondary" style="margin-top: 16px;">退出所有设备</button>
    </div>
    
    <div class="form-group">
      <label class="form-label">API访问密钥</label>
      <div class="api-key-info">
        <div class="key-status">
          <div class="key-label">API密钥：</div>
          <div class="key-value">••••••••••••••••••••••••••••••</div>
          <button class="text-btn">显示</button>
          <button class="text-btn">复制</button>
        </div>
        <div class="key-created">创建时间：2025-04-15 10:30</div>
      </div>
      <div class="key-actions">
        <button class="action-btn secondary">重新生成密钥</button>
      </div>
    </div>
  `;
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .password-fields {
      max-width: 400px;
    }
    
    .two-factor-auth {
      background-color: #f8f8fa;
      border-radius: 10px;
      padding: 16px;
    }
    
    .auth-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .status-title {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .status-value {
      color: #34c759;
      font-weight: 600;
    }
    
    .status-desc {
      font-size: 13px;
      color: #86868b;
    }
    
    .auth-phone {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    
    .phone-label {
      margin-right: 8px;
      color: #6e6e73;
    }
    
    .phone-value {
      font-weight: 500;
      margin-right: 12px;
    }
    
    .devices-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .device-item {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: #f8f8fa;
      border-radius: 10px;
    }
    
    .device-info {
      flex: 1;
    }
    
    .device-name {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .device-meta {
      font-size: 13px;
      color: #86868b;
    }
    
    .device-time {
      font-size: 13px;
      color: #6e6e73;
      margin-right: 16px;
    }
    
    .api-key-info {
      background-color: #f8f8fa;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .key-status {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .key-label {
      font-size: 14px;
      color: #6e6e73;
      margin-right: 8px;
    }
    
    .key-value {
      font-family: monospace;
      font-size: 14px;
      margin-right: 12px;
    }
    
    .key-created {
      font-size: 13px;
      color: #86868b;
    }
    
    .text-btn.red {
      color: #ff3b30;
    }
    
    .action-btn.secondary {
      background-color: #f5f5f7;
      color: #1d1d1f;
      border: 1px solid #d2d2d7;
    }
    
    .action-btn.secondary:hover {
      background-color: #e8e8ed;
    }
  `;
  document.head.appendChild(style);
}
