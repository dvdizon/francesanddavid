---
name: gh-pr-description-formatting
description: Ensure GitHub PR descriptions created or edited via `gh pr create`/`gh pr edit` use real newlines (no literal \\n) and render correctly. Use when composing or updating PR descriptions from the CLI.
---

# PR Description Formatting (GitHub CLI)

## Write the PR body with real newlines

- Use a literal multi-line string (PowerShell here-string or a file) and pass it to `--body` or `--body-file`.
- Do not embed `\n` escape sequences inside a single-line string; they will render literally.

### PowerShell patterns (Windows)

Use a here-string:

```powershell
$body = @'
## Summary
- First point
- Second point

## Testing
- Not run (docs-only change)
'@
gh pr create --title "..." --body $body
```

Or write a temp file and pass `--body-file`:

```powershell
$bodyPath = Join-Path $env:TEMP "pr-body.md"
@'
## Summary
- First point
- Second point
'@ | Set-Content $bodyPath
gh pr edit 123 --body-file $bodyPath
```

### Bash patterns (Linux/macOS)

Use a here-doc and `--body-file`:

```bash
cat <<'EOF' > /tmp/pr-body.md
## Summary
- First point
- Second point

## Testing
- Not run (docs-only change)
EOF
gh pr edit 123 --body-file /tmp/pr-body.md
```

Or use ANSI-C quoting with real newlines:

```bash
body=$'## Summary\n- First point\n- Second point\n\n## Testing\n- Not run (docs-only change)\n'
gh pr create --title "..." --body "$body"
```

## Verify formatting when needed

- If unsure, confirm with `gh pr view <number> --json body --jq .body`.
