#!/usr/bin/env bash
# 将本地域名 mengzhao.pet 指向 127.0.0.1（需 sudo）
set -euo pipefail

DOMAIN="mengzhao.pet"
ENTRY="127.0.0.1 ${DOMAIN} www.${DOMAIN}"

if grep -q "${DOMAIN}" /etc/hosts 2>/dev/null; then
  echo "✓ /etc/hosts 已包含 ${DOMAIN}"
else
  echo "正在添加 hosts 记录（需要输入密码）..."
  echo "${ENTRY}" | sudo tee -a /etc/hosts
  echo "✓ 已添加: ${ENTRY}"
fi

echo ""
echo "启动项目: docker compose up -d --build"
echo "访问网站: http://${DOMAIN}"
