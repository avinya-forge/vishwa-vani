---
name: python-performance-optimization
description: Profile and optimize Python scripts for speed and memory — focusing on data pipeline scripts in the Vishwa-Vani Bronze→Silver→Gold ingestion pipeline.
---

# Python Performance Optimization

**Goal:** Make data pipeline scripts fast, memory-efficient, and production-safe.

## Primary Context: Vishwa-Vani Data Pipeline
Scripts live in `scripts/` and process scripture data through Bronze→Silver→Gold tiers:
- `scripts/scraping/` — web scraping with `scrapling`
- `scripts/parse_scholar_bhasya.js` — NVF parser (Node.js, streaming)
- `scripts/audit_standards.js` — gold data auditor
- Python scripts for OCR cleaning, transliteration, Silver validation

## Optimization Triggers
- "This script is slow"
- "Memory usage is too high"
- "Optimize this pipeline"
- "Profile this"

## Profiling Workflow
1. **Profile first:** Use `cProfile` + `pstats` or `memory_profiler` before making changes
2. **Identify bottleneck:** Report the top 5 slowest functions
3. **Propose fix:** Show before/after with expected speedup
4. **Verify:** Confirm logic is unchanged via test assertions

## Key Optimization Patterns

### File I/O (Critical for scripture JSON files)
\`\`\`python
# BAD: read entire file into memory
data = json.loads(open(file).read())

# GOOD: streaming with ijson for large files
import ijson
with open(file, 'rb') as f:
    for item in ijson.items(f, 'item'):
        process(item)
\`\`\`

### String Processing (Sanskrit text)
\`\`\`python
# BAD: repeated string concatenation
result = ""
for verse in verses:
    result += verse["original"] + "\n"

# GOOD: join
result = "\n".join(v["original"] for v in verses)
\`\`\`

### Batch Processing
- Use `concurrent.futures.ThreadPoolExecutor` for I/O-bound scraping
- Use `multiprocessing.Pool` for CPU-bound text processing
- Chunk large files: process 100 verses at a time, not all 18 chapters at once

## Quality Gates
- All optimized scripts must still pass existing tests
- Never sacrifice correctness for speed in NVF validation
