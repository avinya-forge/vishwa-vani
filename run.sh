#!/bin/bash

function print_status() {
    echo "[PHASE: 1-Strategy] | [SCENARIO: $1] | [STATUS: $2]"
}

# Master Controller [Sync | Test | Backlog | Start]

if [ "$1" == "--backlog" ]; then
    # Grep [EPIC/DEBT] + recursive expansion
    print_status "S1" "Expanding backlog"
    grep -rE "\[EPIC|DEBT\]" docs/planning/ || true
elif [ "$1" == "--test" ]; then
    # Lint + Unit Coverage
    print_status "S2" "Running tests"
    npm run lint || true
    npm run test || true
elif [ "$1" == "--start" ]; then
    # Env initialization
    print_status "S3" "Starting env"
    if [ ! -f .env.local ]; then
        echo "Creating mock .env.local for local dev"
        echo "NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321" > .env.local
        echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=mock-key" >> .env.local
    fi
    npm run dev
elif [ "$1" == "--sync" ]; then
    # IDEMPOTENT file-tree alignment
    print_status "S4" "Syncing files"
    mkdir -p docs/planning docs/architecture docs/engineering
    touch docs/planning/backlog.md docs/planning/roadmap.md
    touch docs/architecture/system-design.md
    touch docs/engineering/conventions.md
elif [ "$1" == "--skills" ]; then
    print_status "S5" "Injecting skills"
    echo "Injecting skills from https://skills.sh/"
else
    echo "Usage: ./run.sh [--backlog|--test|--start|--sync|--skills]"
fi
