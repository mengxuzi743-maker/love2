ZTH & LYH 爱心备忘录 · PWA 手机 App
=====================================

【文件夹内容】
  memo.html       主页面（含 PWA 配置）
  manifest.json   App 清单
  sw.js           离线缓存 Service Worker
  icon-192.png    应用图标 192×192
  icon-512.png    应用图标 512×512

【安装到手机 - 方法一：局域网临时访问（最快）】
1. 在本机打开 PowerShell，进入本文件夹：
   cd "d:\桌面\love-memo"
2. 启动本地服务器（需已安装 Python 或 Node）：
   npx --yes serve -p 8080
   或：python -m http.server 8080
3. 查看电脑 IP（ipconfig），手机连同一 WiFi，浏览器访问：
   http://你的电脑IP:8080/memo.html
4. 安装：
   · iPhone Safari：分享 → 添加到主屏幕
   · Android Chrome：菜单 → 安装应用 / 添加到主屏幕

【安装到手机 - 方法二：正式部署（推荐长期使用）】
将本文件夹上传到支持 HTTPS 的空间，例如：
  · GitHub Pages  · Vercel  · Netlify  · 自己的服务器
PWA 必须通过 HTTPS（或 localhost）才能注册 Service Worker。

【新功能】
· 顶部实时天气 + 渐变背景（晴/云/阴/雨/雪 + 爱心气球）
· 搜索 + 语音搜索
· 备忘录可添加内容图片（非背景）
· 点击卡片全屏打开，可单独更换该条备忘录的全屏背景
· 节日提醒（当天或提前7天），点击可编辑节日简介

【注意】
· 天气需允许定位权限，并联网访问 open-meteo.com
· 语音需 Chrome / Edge / Safari，且允许麦克风
· 数据保存在 localStorage，清缓存会丢失
