# 萌爪洗护 · 宠物洗护店官网

[carousel](https://github.com/KsongloveCv/carousel) 是「萌爪洗护」的全栈展示项目：前端单页 + **Node.js API** + **PostgreSQL**，支持域名访问、在线预约入库与模拟数据种子。

## 功能概览

- 响应式单页官网（服务、价格、轮播、预约）
- **PostgreSQL** 存储服务、套餐、评价、预约记录
- 启动时自动写入模拟数据（可强制重新 seed）
- **Nginx** 反向代理，本地域名 `mengzhao.pet`

## 架构

```
浏览器 → http://mengzhao.pet (Nginx:80)
              ├── /          → 静态 index.html + assets
              └── /api/*     → Express API (:3000)
                                    └── PostgreSQL (:5432)
```

## 项目结构

```
.
├── index.html              # 前端单页
├── assets/                 # 轮播图片
├── server/                 # Express 后端
│   ├── src/
│   │   ├── index.js        # API 路由
│   │   ├── db.js           # 数据库连接与 seed
│   │   ├── schema.sql      # 表结构
│   │   └── seed-data.js    # 模拟数据
│   └── Dockerfile
├── docker/
│   └── nginx.conf          # 域名与反向代理
├── docker-compose.yml
├── scripts/
│   ├── setup-hosts.sh      # 配置本地域名
│   └── deploy.sh           # 一键部署
└── .env.example
```

## 快速启动（推荐 Docker）

### 1. 配置本地域名

```bash
./scripts/setup-hosts.sh
```

将 `127.0.0.1 mengzhao.pet` 写入 `/etc/hosts`（需输入系统密码）。

### 2. 启动全部服务

```bash
docker compose up -d --build
# 或
./scripts/deploy.sh
```

### 3. 访问网站

- **域名访问：** http://mengzhao.pet
- **备用：** http://localhost

页脚会显示 API / 数据库连接状态；用户评价从数据库动态加载。

## 模拟数据

首次启动 `api` 容器时，`SEED_ON_START=true` 会自动插入：

| 表 | 数量 | 说明 |
|----|------|------|
| services | 4 | 洗浴、美容、SPA、口腔 |
| packages | 3 | 基础 / 精致 / 豪华套餐 |
| reviews | 5 | 用户评价 |
| bookings | 6 | 历史预约样例 |

**强制重新写入模拟数据：**

```bash
curl -X POST "http://mengzhao.pet/api/admin/seed?secret=mengzhao-seed&force=true"
```

或在项目根目录：

```bash
docker compose exec api node src/seed.js --force
```

（需在 `server` 中配置 `DATABASE_URL` 指向 `db` 容器）

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/stats` | 统计数据 |
| GET | `/api/services` | 服务列表 |
| GET | `/api/packages` | 套餐列表 |
| GET | `/api/reviews` | 评价列表 |
| GET | `/api/bookings` | 预约列表 |
| POST | `/api/bookings` | 提交预约 |
| POST | `/api/admin/seed` | 插入模拟数据（需 `secret`） |

预约提交示例：

```bash
curl -X POST http://mengzhao.pet/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"测试","phone":"13800138000","pet":"cat","service":"basic","note":"试预约"}'
```

## 本地开发（不用 Docker）

1. 安装 PostgreSQL，创建库与用户（见 `.env.example`）
2. 复制环境变量：`cp .env.example .env`
3. 启动 API：

```bash
cd server && npm install && npm run seed && npm run dev
```

4. 另开终端用任意静态服务器打开根目录，或将 API 代理到前端（生产用 Nginx 已配置）

## 环境变量

见 [.env.example](.env.example)：

- `APP_DOMAIN` — 本地域名，默认 `mengzhao.pet`
- `DATABASE_URL` — PostgreSQL 连接串
- `SEED_ON_START` — 启动时自动 seed
- `SEED_SECRET` — 手动 seed 接口密钥

## 生产域名说明

本项目默认使用 **`mengzhao.pet` 本地 hosts 域名** 演示。若你有真实域名：

1. 将 DNS A 记录指向服务器 IP
2. 修改 `docker/nginx.conf` 中 `server_name`
3. 配置 HTTPS（Let's Encrypt + certbot 或云厂商证书）

## 技术栈

- 前端：HTML / CSS / JavaScript（无框架）
- 后端：Node.js 20 + Express
- 数据库：PostgreSQL 16
- 部署：Docker Compose + Nginx

## 许可证

演示 / 学习用途，可自由 fork 与修改。
