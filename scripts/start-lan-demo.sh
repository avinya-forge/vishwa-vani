#!/usr/bin/env bash
# ==============================================================================
# Vishwa-Vani: Local Area Network (LAN) Demo Launch Script
# DEMO-LOC-002 Execution Script
# ==============================================================================

set -e

echo "🚀 Launching Vishwa-Vani LAN Demo..."

# 1. Environment Verification
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Error: Node.js is not installed."
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "❌ Error: npm is not installed."
    exit 1
fi

# 2. Network IP Detection
LOCAL_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || ip route get 1 2>/dev/null | awk '{print $7}' || echo "127.0.0.1")

echo "🌐 Local Network IP Detected: $LOCAL_IP"
echo "🔒 Enabling Strict UI Gating (Exposing only 100% completed scriptures)..."

export STRICT_DEMO_GATING=true
export NEXT_PUBLIC_STRICT_DEMO=true

# 3. Production Build
echo "📦 Building Vishwa-Vani production bundle..."
npm run build

echo "--------------------------------------------------------"
echo "✅ Vishwa-Vani LAN Demo Ready!"
echo "📍 Access on local network: http://${LOCAL_IP}:3000"
echo "--------------------------------------------------------"

# 4. Start Server on 0.0.0.0
exec npm run start:lan
