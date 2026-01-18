# AGENTS

This repository's Codex instructions live in `.codex/AGENTS.md`.

- Primary instructions: `.codex/AGENTS.md`
- Additional instructions: (add paths here)

## Repo Memory System

This repo keeps durable context inside the codebase so humans and agents can find intent,
decisions, risks, and ongoing work without external tools.

### Where context lives

- Work tracking: `docs/tasks/` (plans, migrations, multi-step changes)
- Decisions: `docs/adr/` (Architecture Decision Records)
- Living logs (append-only): `docs/log/changes.md`, `docs/log/decisions.md`,
  `docs/log/risks.md`, `docs/log/surprises.md`
- Refactor opportunities: `docs/refactor-opportunities.md` (non-blocking ideas)

### When to update which artifact

- Small but notable change -> `docs/log/changes.md`
- Major decision with tradeoffs -> new ADR in `docs/adr/`
- New risk or mitigation -> `docs/log/risks.md`
- "We learned this the hard way" -> `docs/log/surprises.md`
- Ongoing work -> existing `docs/tasks/*`

### Entry schema (agent-friendly)

Log entries should answer: **what / why / impact / risks / links**.

Suggested fields:
- Date
- Type (Change | Decision | Risk | Surprise)
- Motivation (why)
- What changed
- Impact
- Risks & mitigations
- Links (PR / Issue / ADR / Runbook)

### Repo structure policy

Do not rename or move existing code paths in docs/process PRs. Record structural
improvements in `docs/refactor-opportunities.md` for later follow-up.

### Bypass marker

If no memory update is needed, include this marker in the PR description:
`no-memory-update-needed`
