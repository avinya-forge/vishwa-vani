#!/usr/bin/env bash
# ==============================================================================
# Vishwa-Vani Master Control Script
# Single unified entrypoint for all operations: audit, pipeline, demo, test, etc.
# ==============================================================================

set -e

SHOW_HELP() {
    echo "=========================================================="
    echo "📜 Vishwa-Vani Master Control CLI"
    echo "=========================================================="
    echo "Usage: ./scripts/vishwa.sh [command] [args]"
    echo ""
    echo "Available Commands:"
    echo "  demo      - Build & start local LAN demo server with strict UI gating"
    echo "  audit     - Run project status, standards, & multilang audits"
    echo "  pipeline  - Run data ingestion and validation pipeline"
    echo "  validate  - Validate silver tier NVF dataset compliance"
    echo "  promote   - Promote verified silver shards to gold tier"
    echo "  links     - Generate global semantic ontology (Tattva) links"
    echo "  test      - Run full verification suite (Jest, ESLint, TSC, Next Build)"
    echo "  help      - Display this help menu"
    echo "=========================================================="
}

CMD="${1:-menu}"

case "$CMD" in
    demo|lan)
        echo "🚀 Starting LAN Demo..."
        exec ./scripts/start-lan-demo.sh
        ;;
    audit)
        echo "🔍 Running Project Status & Standards Audit..."
        python3 scripts/project_status_audit.py
        node scripts/audit_standards.js --all
        ;;
    pipeline)
        echo "⚙️ Running Data Pipeline..."
        shift || true
        node scripts/run_pipeline.js "$@"
        ;;
    validate)
        echo "🛡️ Validating Silver NVF Dataset..."
        shift || true
        node scripts/validate_silver.js "$@"
        ;;
    promote)
        echo "🏆 Promoting Silver Shards to Gold..."
        shift || true
        node scripts/promote_to_gold.js "$@"
        ;;
    links)
        echo "🔗 Generating Semantic Links..."
        python3 scripts/generate_semantic_links.py
        ;;
    test)
        echo "🧪 Executing Full Quality Gates & Test Suite..."
        npm test
        npm run lint
        npx tsc --noEmit
        npm run build
        ;;
    help|--help|-h)
        SHOW_HELP
        ;;
    menu|"")
        echo "=========================================================="
        echo "📜 Vishwa-Vani Master Interactive CLI"
        echo "=========================================================="
        echo "1) Start LAN Demo Server"
        echo "2) Run Status & Standards Audit"
        echo "3) Run Data Pipeline"
        echo "4) Validate Silver NVF Datasets"
        echo "5) Promote Silver to Gold"
        echo "6) Generate Semantic Links"
        echo "7) Run Full Test & Build Suite"
        echo "8) Exit"
        echo "=========================================================="
        read -p "Select an option [1-8]: " CHOICE
        case "$CHOICE" in
            1) exec ./scripts/start-lan-demo.sh ;;
            2) python3 scripts/project_status_audit.py && node scripts/audit_standards.js --all ;;
            3) node scripts/run_pipeline.js ;;
            4) node scripts/validate_silver.js --all ;;
            5) node scripts/promote_to_gold.js ;;
            6) python3 scripts/generate_semantic_links.py ;;
            7) npm test && npm run lint && npx tsc --noEmit && npm run build ;;
            8) echo "Exiting."; exit 0 ;;
            *) echo "Invalid option."; exit 1 ;;
        esac
        ;;
    *)
        echo "Unknown command: $CMD"
        SHOW_HELP
        exit 1
        ;;
esac
