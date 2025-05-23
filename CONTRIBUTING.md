# Contributing to `interparcel-api-sdk`

Thank you for considering contributing to `interparcel-api-sdk`! 

This guide will help you set up your development environment, follow the project's standards, and make high-quality contributions.

---

## 🛠 Development Setup

1. **Fork the repository** and clone your fork:

   ```
   git clone https://github.com/BuunGroup-Packages/npm-interparcel-api-client.git
   cd npm-interparcel-api-client
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Build the project:**

   ```
   npm run build
   ```

4. **Run tests:**

   ```
   npm test
   ```

5. **Check code formatting and linting:**

   ```
   npm run lint
   npm run format -- --check
   ```

> Tip: Use Node.js v22+ (or the version specified in `.nvmrc`, if available).

---

## 📚 Usage Documentation

For detailed usage instructions and examples, see [docs/getting-started.md](./docs/getting-started.md).

---

## ✨ Contribution Guidelines

### ✅ Before You Start

- Ensure your change is related to a GitHub issue or opens a new one with context.
- Open a discussion if you're unsure whether your contribution would be accepted.
- Make sure you pull the latest `main` branch before branching.

### 🌿 Branching Strategy

- Create a new branch from `main`:

  ```
  git checkout -b feat/your-feature-name
  ```

  Use these prefixes:
  - `feat/` for new features
  - `fix/` for bug fixes
  - `chore/` for maintenance or tooling
  - `docs/` for documentation updates
  - `test/` for test-related changes

---

## 📦 Code Standards

- TypeScript strict mode is enforced.
- Use meaningful variable and function names.
- Follow existing code style (run `npm run lint`).
- Format code with Prettier (run `npm run format`).
- **All code must be linted and formatted before submitting a PR.**
- The CI will fail if code is not properly linted or formatted.

---

## 📝 Commit Message Linting

All commit messages are automatically checked for [Conventional Commit](https://www.conventionalcommits.org/) compliance using Husky and commitlint. If your commit message does not follow the required format, the commit will be rejected.

**Format examples:**
- `feat: add createShipment method`
- `fix: correct quote API endpoint`
- `chore: update dependencies`
- `docs: improve README usage example`

This check runs automatically on every commit. For more details, see the [Conventional Commits documentation](https://www.conventionalcommits.org/).

---

## 📥 Submitting a Pull Request

1. Push your branch:

   ```
   git push origin feat/your-feature-name
   ```

2. Open a Pull Request against `main`.

3. Ensure your PR:

   - Has a clear description.
   - Links to relevant issues (e.g., "Closes #123").
   - Passes all CI tests and checks.
   - Includes unit tests if adding/modifying functionality.
   - **Is linted and formatted using Prettier and ESLint.**

---

## 🚀 Automated Release & Publishing Workflow

This project uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for fully automated versioning, changelog, GitHub releases, and npm publishing. **You do not need to manually update the version, changelog, or publish to npm.**

### How it works
- On every push/merge to `main`:
  1. CI runs and must pass.
  2. semantic-release analyzes commit messages (using [Conventional Commits](https://www.conventionalcommits.org/)).
  3. Determines the next [SemVer 2.0](https://semver.org/) version.
  4. Updates `CHANGELOG.md` and `package.json`.
  5. Creates a git tag and GitHub release with release notes.
  6. Publishes the new version to npm automatically.

### What you need to do
- **Use Conventional Commits** for all PRs and merges (e.g., `feat: add X`, `fix: correct Y`).
- **Do not manually update** the version, changelog, or publish to npm.
- Complete the [PR checklist](./.github/workflows/PULL_REQUEST_TEMPLATE.md) to ensure your contribution is ready for review and release.

### Example commit messages
- `feat: add createShipment method`
- `fix: correct quote API endpoint`
- `chore: update dependencies`
- `docs: improve README usage example`

For more details, see the [semantic-release documentation](https://semantic-release.gitbook.io/semantic-release/) and [Conventional Commits](https://www.conventionalcommits.org/).

---

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](https://opensource.guide/code-of-conduct/).

Thank you for helping improve `interparcel-api-sdk`!