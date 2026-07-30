# Launch Fable 5 in first-party Claude Code

Claude Code was verified locally at version `2.1.220`. Its own CLI help exposes both the `fable` alias and full model name `claude-fable-5`.

## Recommended interactive launch

Run this in Git Bash:

```bash
cd /c/Users/abarr/.openclaw/workspace/newstarcleaning-site
claude --model claude-fable-5 --effort max --name new-star-site-fable5 \
  --add-dir 'C:/Users/abarr/Desktop/New-Star-Brand-Order-Master-v2.0' \
  'C:/Users/abarr/new-star-growth-audits/2026-07-30-live-site-fable5-audit'
```

Why this command:

- uses Fable 5 directly through first-party Claude Code;
- runs interactively so Angel can keep chatting with the same worker;
- uses max effort for the full-site mission;
- auto-loads root `CLAUDE.md`;
- grants the two relevant external evidence directories;
- does not grant unrelated private folders or the Apex repository;
- does not bypass permission checks, create a branch, or create a worktree.

Treat both added directories as read-only. The website repository is the only writable workspace.

If Claude in Chrome is already configured, add `--chrome`. If it is not configured, do not block the mission on that integration; use the existing read-only audit evidence and local browser/runtime verification.

## Paste this as the first message

```text
Read CLAUDE.md, AGENTS.md, .opencode/skills/new-star-site/SKILL.md, .opencode/agents/new-star-site-build.md, .opencode/agents/new-star-site-reviewer.md, and every file under docs/agent-handoffs/new-star-website-fable5-2026-07-30 before changing code. This is the full New Star Cleaning website mission, not a homepage reskin.

Work directly in this existing working tree. First run git status --short --branch and inspect every existing diff. src/app/book-now/page.tsx already contains owner work from before this handoff; preserve it. Do not clone, branch, worktree, reset, stash, run /init, commit, push, deploy, submit live forms, edit paid accounts, or modify Apex/BookingKoala. Do not print secrets. The two --add-dir folders are read-only evidence.

Primary business goal: increase qualified organic leads, quote-form completion, closing support, and completed online bookings in Fresno, Clovis, Madera, and the approved Fresno neighborhoods. Keep Request a quote dominant. Make BookingKoala online booking clearly discoverable but visually secondary. BookingKoala owns pricing/calendar/bookings/providers; Apex owns lead intake and follow-up.

Trace the actual source contracts before editing. Resolve or test the paid-field-loss, SMS-consent, BookingKoala fallback, idempotency, analytics, and service-scope contradictions before a broad form/template rewrite. Preserve ranked URLs and all truthful service/area boundaries. Use the approved Route A brand masters exactly and distribute real New Star work according to PHOTO-AND-BRAND-MAP.md. Never fill missing owner/team, local, commercial, or post-construction proof with generic stock or invented job claims.

Maintain FABLE-PROGRESS.md throughout. Do not stop at an audit, plan, wireframe, or partial homepage. Continue through every unblocked phase in EXECUTION-PLAN.md, exercise the code, fix failures, and rerun the gates until the implementation is genuinely complete. If an owner decision blocks one path, document the exact recommendation and affected files, then continue all unrelated work. Before ending any session, leave the progress file with the exact diff, tests, blockers, and first next command.

Start Phase 0 now, then move directly into the first unblocked implementation workstream.
```

## Resume after a recoverable interruption

Run from the same directory:

```bash
cd /c/Users/abarr/.openclaw/workspace/newstarcleaning-site
claude --continue --model claude-fable-5 --effort max \
  --add-dir 'C:/Users/abarr/Desktop/New-Star-Brand-Order-Master-v2.0' \
  'C:/Users/abarr/new-star-growth-audits/2026-07-30-live-site-fable5-audit'
```

Then send:

```text
Read docs/agent-handoffs/new-star-website-fable5-2026-07-30/FABLE-PROGRESS.md, reconcile it with git status and the actual diff, rerun the last failed or pending verification, and continue the next unblocked workstream. Do not restart the audit or discard existing work.
```

## Useful session controls

- `/context`: check context use before quality degrades.
- `/compact focus on the New Star website handoff, current diff, verified contracts, open owner decisions, and next workstream`: preserve the mission when context gets high.
- `/review`: run a diff review after implementation.
- `/security-review`: use on form/API/analytics changes.
- `claude --continue`: resume this exact project conversation.

Do not use `/batch`, `--worktree`, or `--dangerously-skip-permissions` for this mission.

## What Angel should expect from Fable

Fable should ask only for real business decisions, not basic repository facts already supplied. The first meaningful checkpoint should contain:

- current working-tree ownership;
- validated contract findings;
- the exact unblocked workstream started;
- any narrow owner decision with a recommendation and affected files;
- actual code/test evidence, not a redesigned-homepage pitch.
