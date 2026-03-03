Repository bot instructions

Purpose
- A short checklist for automated bots (and humans) to follow after code changes.

Checklist (run on every PR / major change):
1. Install dependencies:
   - npm ci || npm install
2. Run formatting and linting:
   - npm run format --if-present
   - npm run lint --if-present
3. Run type checks (if TypeScript):
   - npm run typecheck --if-present
4. Run tests:
   - npm test --if-present
5. Build the app to verify it compiles:
   - npm run build --if-present
6. Sanity check in dev server (optional):
   - npm run dev
7. Add or update CHANGELOG.md or release notes.
8. Commit with a clear message (use Conventional Commits if possible) and push.

Repository remote
- Primary remote: https://github.com/clarktao-dev/immotwde_copilot.git

Bot rule: always push
- After making and committing changes, bots MUST push commits to the primary remote above using:
  - git remote add origin https://github.com/clarktao-dev/immotwde_copilot.git  # (only if not already set)
  - git push -u origin main

Rationale
- Recording the canonical remote here ensures all automated agents know where to push and can fail fast if they lack credentials.

Where to put these instructions
- Keep this file at the repo root as `BOT_INSTRUCTIONS.md`.
- CI workflows should be added under `.github/workflows/` to ensure GitHub Actions enforce checks on push/PR.

How other bots should follow
- Look for `BOT_INSTRUCTIONS.md` at the repo root and `.github/workflows/*` for guaranteed automated checks.
- If a bot modifies files, it should run the checklist commands before committing.
- Prefer running CI through GitHub Actions to make checks reproducible.

Optional improvements
- Add a GitHub Action that runs the checklist on push and pull_request (created in `.github/workflows/ci.yml`).
- Add Husky + lint-staged for local pre-commit checks (requires npm packages and scripts).
- Add a CONTRIBUTING.md describing branch, commit, and PR practices.

Contact
- If you want me to also set up pre-commit hooks (Husky) or a more strict CI matrix, tell me and I will add it.
