---
description: How to deploy the Standing Shield Next.js app to an Alibaba Cloud ECS instance
---

# Standing Shield — ECS 云端部署工作流

## 前置准备

- 一台已购买的 ECS 实例（推荐 Ubuntu 22.04 / CentOS 8+）
- ECS 的**公网 IP 地址**
- ECS 的 **root 密码**或 SSH 密钥
- 本地已安装 SSH 客户端（Windows 自带 OpenSSH）
- 安全组已放行端口：**22 (SSH)**、**80 (HTTP)**、**443 (HTTPS)**、**3000 (Node 开发预览，可选)**

---

## 第一步：本地连接 ECS

```powershell
ssh root@<你的ECS公网IP>
```

首次连接会提示指纹确认，输入 `yes` 回车，然后输入你的 root 密码。

---

## 第二步：ECS 环境初始化

登录后依次执行以下命令：

### 2.1 更新系统包

```bash
# Ubuntu / Debian
apt update && apt upgrade -y

# CentOS / RHEL
# yum update -y
```

### 2.2 安装 Node.js 20.x (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 验证
node -v   # 应显示 v20.x.x
npm -v    # 应显示 10.x.x
```

### 2.3 安装 PM2（进程守护 & 开机自启）

```bash
npm install -g pm2
```

### 2.4 安装 Nginx（反向代理 & 域名绑定）

```bash
apt install -y nginx
systemctl enable nginx
systemctl start nginx
```

### 2.5 安装 Git

```bash
apt install -y git
```

---

## 第三步：上传项目代码到 ECS

有两种方式，推荐方式 A：

### 方式 A：Git 拉取（推荐）

先把项目推送到 GitHub / Gitee，然后在 ECS 上：

```bash
cd /var/www
git clone <你的仓库地址> standing-shield
cd standing-shield
```

### 方式 B：SCP 直接传文件

在你的**本地 Windows PowerShell** 中执行（不是在 ECS 上）：

```powershell
# 先在本地项目根目录下打包（排除 node_modules 和 .next）
tar --exclude='node_modules' --exclude='.next' -czf standing-shield.tar.gz -C "c:\Users\wenhe\my project\Kiro-CLI" "Standing shield"

# 上传到 ECS
scp standing-shield.tar.gz root@<你的ECS公网IP>:/var/www/

# 然后 SSH 到 ECS 解压
ssh root@<你的ECS公网IP>
cd /var/www
tar -xzf standing-shield.tar.gz
mv "Standing shield" standing-shield
```

---

## 第四步：构建生产版本

```bash
cd /var/www/standing-shield

# 安装依赖
npm install

# 构建生产版本
npm run build
```

> 如果 ECS 内存较小（< 2GB），构建时可能内存不足，可临时添加 swap：
> ```bash
> fallocate -l 2G /swapfile && chmod 600 /swapfile
> mkswap /swapfile && swapon /swapfile
> ```

---

## 第五步：用 PM2 启动 Node 服务

```bash
cd /var/www/standing-shield

# 启动生产服务（默认监听 3000 端口）
pm2 start npm --name "standing-shield" -- start

# 查看运行状态
pm2 status

# 保存进程列表 & 设置开机自启
pm2 save
pm2 startup
```

验证：
```bash
curl http://localhost:3000
# 应返回 HTML 内容
```

---

## 第六步：配置 Nginx 反向代理

```bash
nano /etc/nginx/sites-available/standing-shield
```

粘贴以下配置（将 `your-domain.com` 替换为你的域名，如果没有域名就用 ECS 的公网 IP）：

```nginx
server {
    listen 80;
    server_name your-domain.com;   # 或直接填 ECS 公网 IP

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    # 静态资源缓存
    location /_next/static/ {
        alias /var/www/standing-shield/.next/static/;
        expires 365d;
        access_log off;
    }

    location /images/ {
        alias /var/www/standing-shield/public/images/;
        expires 30d;
        access_log off;
    }

    # 反向代理到 Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：
```bash
ln -s /etc/nginx/sites-available/standing-shield /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default   # 删除默认站点
nginx -t                               # 测试配置语法
systemctl reload nginx                 # 重载 Nginx
```

---

## 第七步：验证部署

在你的本地浏览器中访问：

```
http://<你的ECS公网IP>
```

你应该能看到完整的 Standing Shield 官网！

---

## 第八步（可选）：绑定域名 & 开启 HTTPS

### 8.1 域名解析

去你的域名服务商（阿里云 / Cloudflare 等），添加一条 A 记录：
- 主机记录：`@` 或 `www`
- 记录值：你的 ECS 公网 IP

### 8.2 申请免费 SSL 证书（Let's Encrypt）

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

按提示操作，完成后 Nginx 会自动配置 HTTPS。证书会自动续期。

---

## 后续维护

### 更新代码后重新部署

```bash
cd /var/www/standing-shield
git pull                    # 拉取最新代码
npm install                 # 更新依赖（如果有变化）
npm run build               # 重新构建
pm2 restart standing-shield # 重启服务
```

### 查看日志

```bash
pm2 logs standing-shield    # 实时日志
pm2 logs standing-shield --lines 100   # 最近 100 行
```

### 监控

```bash
pm2 monit                   # 实时 CPU / 内存监控面板
```
