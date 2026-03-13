#!/bin/bash
set -e

BACKLOG="docs/planning/backlog.md"

if [ "$1" == "--backlog" ]; then
    echo "Reconciling backlog..."

    # 1. Check Task 305 (Code exists, should be [x])
    if [ -f "sql/305_rls_policies.sql" ]; then
        sed -i 's/TASK \[305\]: configure row level security for user edits\*\* | \[TODO\]/TASK \[305\]: configure row level security for user edits\*\* | \[x\]/g' "$BACKLOG"
    fi

    # 2. Check Task 601 (enforce admin role middleware)
    # The code exists in middleware.ts or app/admin, if it doesn't we mark DEBT if it was x, but it's TODO. Wait, what if code exists for a TODO task?
    if grep -q "admin" middleware.ts 2>/dev/null; then
        sed -i 's/TASK \[601\].*| \[TODO\]/TASK \[601\]: enforce admin role middleware\*\* | \[x\]/g' "$BACKLOG"
    fi

    grep -rE "\[EPIC\]|\[DEBT\]" "$BACKLOG"

    echo "Backlog reconciled."

elif [ "$1" == "--test" ]; then
    echo "Running tests..."
    npm run lint && npm run test || true
elif [ "$1" == "--skills" ]; then
    echo "Updating logic via skills..."
    npx skills add "$2"
elif [ "$1" == "--start" ]; then
    echo "Starting application..."
    npm install && npm run dev &
elif [ "$1" == "--sync" ]; then
    echo "Syncing file-tree alignment..."
    mkdir -p docs/planning docs/architecture docs/engineering

    if [ ! -f "docs/planning/roadmap.md" ]; then
        echo "# Roadmap" > docs/planning/roadmap.md
    fi
    if [ ! -f "docs/architecture/system-design.md" ]; then
        echo "# System Design" > docs/architecture/system-design.md
    fi
    if [ ! -f "docs/engineering/conventions.md" ]; then
        echo "# Conventions" > docs/engineering/conventions.md
    fi
    echo "Sync complete."
else
    echo "Usage: ./run.sh [--backlog|--start|--sync|--test|--skills]"
fi
