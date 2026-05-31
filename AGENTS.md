# Agent instructions

## Project overview

**tre-sksksks** is currently a stub repository (initial commit only). It contains `README.md`, `LICENSE` (Apache 2.0), and `.gitignore`. There is no application source, dependency manifest, build system, or automated test suite yet.

The `.gitignore` ignores `*.agdai` and `**/MAlonzo/**`, which are typical for [Agda](https://agda.readthedocs.io/) projects. When Agda sources are added, install the Agda toolchain and document build/check commands here.

## Cursor Cloud specific instructions

### Services

There are **no services** to start. No dev server, database, or Docker Compose stack is defined in this repository.

### Dependency refresh

The VM update script is a no-op (`true`) because this repo has no package manager lockfiles or install scripts. When you add dependencies (for example `package.json`, `pyproject.toml`, or `cabal.project`), update the VM update script accordingly and document install commands in this section.

### Lint, test, build, run

| Task | Status | Notes |
|------|--------|--------|
| Lint | N/A | No linter config |
| Test | N/A | No test runner |
| Build | N/A | No build target |
| Run | N/A | No runnable application |

Until code is added, verifying the environment means confirming the workspace is on the expected branch, `git status` is clean after clone, and any new toolchain you introduce (e.g. Agda) runs successfully.

### Git

Standard git workflow applies. Push with `git push -u origin <branch-name>`.
