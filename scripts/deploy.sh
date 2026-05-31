#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> 构建并启动服务（PostgreSQL + API + Nginx）"
docker compose up -d --build

echo ""
echo "==> 等待 API 就绪..."
sleep 5
curl -sf "http://localhost/api/health" && echo "" || echo "（若 hosts 未配置，请用 http://localhost）"

echo ""
echo "==> 重新插入模拟数据（强制）"
curl -sf -X POST "http://localhost/api/admin/seed?secret=mengzhao-seed&force=true" | head -c 500
echo ""
echo ""
echo "访问: http://mengzhao.pet  （需先运行 ./scripts/setup-hosts.sh）"
echo "或:   http://localhost"
