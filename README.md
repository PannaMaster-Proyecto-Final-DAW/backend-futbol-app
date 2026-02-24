# Collaboration and Code Style Guide
To ensure the maintainability and scalability of this project, all contributors must adhere to the following development standards.

---

## 1. Language and Documentation
Everything within the codebase must be written in **English**.

* **Code:** Variable names, classes, functions, and database schemas must be in English.
* **Comments:** All comments must be in English.
* **Special Tags:**
    * `@TODO`: Use this for tasks or features that need to be implemented in the future.
    * `@QUESTION`: Use this to mark code blocks that require discussion or clarification from the team.

> **Example:**
> ```javascript
> // @QUESTION: Should we move this logic to a dedicated microservice?
> // @TODO: Add error handling for edge cases
> const calculateTax = (amount) => { ... }
> ```
---

## 2. Naming Conventions
We use semantic naming to ensure the code is "self-explanatory":

| Element | Format | Example |
| :--- | :--- | :--- |
| **Classes** | PascalCase | `UserProcessor` |
| **Variables / Functions** | camelCase | `calculateTotalAmount()` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |
| **Files** | kebab-case | `auth-service.js` |

---

## 3. Methods and Functions Rules
* **Action Verbs:** Method names must start with a verb indicating their purpose:
    * `get...`: Retrieve data (should not modify state).
    * `set...`: Update or change a value.
    * `is...` / `has...`: Functions returning a boolean.
    * `handle...`: Event handlers or callbacks.
* **Single Responsibility Principle (SRP):** Each method must perform **one** task. If a method exceeds 25 lines, consider refactoring.
* **Arguments:** Avoid functions with more than 3 arguments. If more are needed, pass a single configuration object.

---

## 4. Git Workflow & Commits
We follow a strict branching and commit policy to keep the history clean.

### Branching Strategy
* Never push directly to `main`.
* Create a branch for every task: `feature/task-name` or `fix/bug-name`.

### Conventional Commits
Commits must follow this format:
* `feat:` A new feature.
* `fix:` A bug fix.
* `docs:` Documentation only changes.
* `refactor:` Code changes that neither fix a bug nor add a feature.
* `test:` Adding missing tests or correcting existing tests.

---