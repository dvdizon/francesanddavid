#!/usr/bin/env bash
set -euo pipefail

marker="no-memory-update-needed"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Memory check: not a git repository. Skipping."
  exit 0
fi

base_ref=""
if [[ -n "${GITHUB_BASE_REF:-}" ]]; then
  if git rev-parse --verify -q "origin/${GITHUB_BASE_REF}" >/dev/null; then
    base_ref="origin/${GITHUB_BASE_REF}"
  elif git rev-parse --verify -q "${GITHUB_BASE_REF}" >/dev/null; then
    base_ref="${GITHUB_BASE_REF}"
  fi
fi

if [[ -z "$base_ref" ]]; then
  for candidate in "origin/main" "main" "origin/master" "master"; do
    if git rev-parse --verify -q "$candidate" >/dev/null; then
      base_ref="$candidate"
      break
    fi
  done
fi

if [[ -z "$base_ref" ]]; then
  echo "Memory check: no base ref found. Skipping."
  exit 0
fi

if ! git merge-base "$base_ref" HEAD >/dev/null 2>&1; then
  echo "Memory check: no merge base with $base_ref. Skipping."
  exit 0
fi

changed_files=$(git diff --name-only "$base_ref"...HEAD)
if [[ -z "$changed_files" ]]; then
  echo "Memory check: no changed files."
  exit 0
fi

pr_body=""
if [[ -n "${GITHUB_EVENT_PATH:-}" && -f "${GITHUB_EVENT_PATH:-}" ]]; then
  pr_body=$(python - <<'PY' 2>/dev/null || true
import json
import os
path = os.environ.get("GITHUB_EVENT_PATH")
if not path or not os.path.exists(path):
    raise SystemExit(1)
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)
pr = data.get("pull_request") or {}
body = pr.get("body") or ""
print(body)
PY
  )
fi

if [[ -n "$pr_body" ]] && echo "$pr_body" | grep -qi "$marker"; then
  echo "Memory check: bypass marker found in PR description."
  exit 0
fi

has_memory_update=0
if echo "$changed_files" | grep -E -q '^(docs/(log|adr|tasks)/)'; then
  has_memory_update=1
fi

requires_memory=0
code_paths=(
  "src/"
  "app/"
  "server/"
  "packages/"
  "infra/"
  "deploy/"
  "migrations/"
  "services/"
  "lib/"
  "api/"
  "config/"
  "views/"
)

while IFS= read -r file; do
  for path in "${code_paths[@]}"; do
    if [[ "$file" == "$path"* ]]; then
      requires_memory=1
      break
    fi
  done
  if [[ "$requires_memory" -eq 1 ]]; then
    break
  fi
done <<< "$changed_files"

if [[ "$requires_memory" -eq 0 ]]; then
  auto_dirs=$(printf '%s\n' "$changed_files" | awk -F/ 'NF>1 {count[$1]++} END {for (d in count) if (count[d]>=3) print d}')
  while IFS= read -r dir; do
    case "$dir" in
      docs|.github|.codex|scripts|tests|assets|node_modules|.worktrees)
        continue
        ;;
    esac
    if echo "$changed_files" | grep -E -q "^${dir}/"; then
      requires_memory=1
      break
    fi
  done <<< "$auto_dirs"
fi

if [[ "$requires_memory" -eq 1 && "$has_memory_update" -eq 0 ]]; then
  echo "Memory check: significant code changes detected without context updates."
  echo "Please update docs/log/, docs/adr/, or docs/tasks/, or add '$marker' to the PR body."
  exit 1
fi

echo "Memory check: passed."
