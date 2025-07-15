# 珠光水彩微信小程序商城原型

这是一个珠光水彩销售的微信小程序商城原型，使用HTML、CSS和JavaScript实现。

## 图片资源

由于原型中需要使用图片，您可以使用以下网络图片链接替换HTML文件中的图片路径：

### 轮播图

- 轮播图1: https://img.alicdn.com/imgextra/i3/2201504856228/O1CN01vZcmGF1x6a2Uo8Vwn_!!2201504856228.jpg
- 轮播图2: https://img.alicdn.com/imgextra/i1/2201504856228/O1CN01Ys4Yvn1x6a2UVNGQf_!!2201504856228.jpg
- 轮播图3: https://img.alicdn.com/imgextra/i2/2201504856228/O1CN01ygVgFB1x6a2TuQFqJ_!!2201504856228.jpg

### 分类图标

- 珠光水彩图标: https://img.alicdn.com/imgextra/i1/2201504856228/O1CN01LUlkLo1x6a2Uo8Uo3_!!2201504856228.png
- 画笔图标: https://img.alicdn.com/imgextra/i2/2201504856228/O1CN01aWJnBL1x6a2TuQDPX_!!2201504856228.png
- 水彩纸图标: https://img.alicdn.com/imgextra/i4/2201504856228/O1CN01nQDVUB1x6a2Uo8Vgd_!!2201504856228.png
- 套装图标: https://img.alicdn.com/imgextra/i3/2201504856228/O1CN01kcTRBJ1x6a2TuQEWN_!!2201504856228.png

### 产品图片

- 产品1: https://img.alicdn.com/imgextra/i1/2201504856228/O1CN01Ys4Yvn1x6a2UVNGQf_!!2201504856228.jpg
- 产品2: https://img.alicdn.com/imgextra/i2/2201504856228/O1CN01ygVgFB1x6a2TuQFqJ_!!2201504856228.jpg
- 产品3: https://img.alicdn.com/imgextra/i3/2201504856228/O1CN01vZcmGF1x6a2Uo8Vwn_!!2201504856228.jpg
- 产品4: https://img.alicdn.com/imgextra/i4/2201504856228/O1CN01nQDVUB1x6a2Uo8Vgd_!!2201504856228.png

### 水彩卡片图片

- 卡片1: https://img.alicdn.com/imgextra/i2/2201504856228/O1CN01aWJnBL1x6a2TuQDPX_!!2201504856228.png
- 卡片2: https://img.alicdn.com/imgextra/i1/2201504856228/O1CN01LUlkLo1x6a2Uo8Uo3_!!2201504856228.png
- 卡片3: https://img.alicdn.com/imgextra/i3/2201504856228/O1CN01kcTRBJ1x6a2TuQEWN_!!2201504856228.png
- 卡片4: https://img.alicdn.com/imgextra/i4/2201504856228/O1CN01nQDVUB1x6a2Uo8Vgd_!!2201504856228.png

### 底部导航图标

- 首页图标: https://img.alicdn.com/imgextra/i1/2201504856228/O1CN01LUlkLo1x6a2Uo8Uo3_!!2201504856228.png
- 分类图标: https://img.alicdn.com/imgextra/i2/2201504856228/O1CN01aWJnBL1x6a2TuQDPX_!!2201504856228.png
- 购物车图标: https://img.alicdn.com/imgextra/i3/2201504856228/O1CN01kcTRBJ1x6a2TuQEWN_!!2201504856228.png
- 我的图标: https://img.alicdn.com/imgextra/i4/2201504856228/O1CN01nQDVUB1x6a2Uo8Vgd_!!2201504856228.png

## 使用方法

1. 打开 `index.html` 文件查看首页原型
2. 您可以点击底部导航栏切换不同的页面（目前仅实现了首页）
3. 轮播图会自动切换，也可以点击底部的分页器手动切换

## 后续开发计划

1. 实现分类页面
2. 实现产品详情页面
3. 实现购物车页面
4. 实现个人中心页面
5. 实现订单页面
6. 实现支付页面
7. 实现地址管理页面

## 如何启动服务（让手机可访问）

要启动本地服务器并使手机能够访问网站，请按照以下步骤操作：

### 方法一：使用http-server（推荐）

1. 确保已安装Node.js
2. 在项目根目录下运行以下命令：
   ```
   npx http-server -a 0.0.0.0 -p 8000
   ```
3. 服务器启动后，终端会显示可访问的URL，例如：
   ```
   Available on:
     http://127.0.0.1:8000
     http://192.168.1.12:8000  (这是您电脑在局域网中的IP地址)
   ```
4. 确保手机与电脑连接到同一个WiFi网络
5. 在手机浏览器中输入电脑的局域网IP地址加端口号（如：`http://192.168.1.12:8000`）

### 方法二：使用Python内置HTTP服务器

如果您的电脑已安装Python，也可以使用Python自带的HTTP服务器：

- Python 3:
  ```
  python -m http.server 8000
  ```
- Python 2:
  ```
  python -m SimpleHTTPServer 8000
  ```

然后按照方法一中的步骤4-5访问网站。

### 注意事项

- 如果8000端口被占用，可以尝试其他端口号，如8080、3000等
- 某些防火墙设置可能会阻止外部设备访问，请确保您的防火墙允许该端口的访问
- 如果使用公司网络，可能需要额外的网络配置才能让其他设备访问您的电脑
