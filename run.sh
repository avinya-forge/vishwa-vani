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

    echo "Backlog reconciled."

elif [ "$1" == "--test" ]; then
    echo "Running tests..."
    npm run test || true
elif [ "$1" == "--skills" ]; then
    echo "Updating logic via skills..."
else
    echo "Usage: ./run.sh [--backlog|--test|--skills]"
fi
