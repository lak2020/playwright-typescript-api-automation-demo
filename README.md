# 🎭 Playwright TypeScript API Automation Demo

A modern API test automation framework built with **Playwright for TypeScript**, demonstrating best practices for API testing.

Converted from the [C# version](https://github.com/lak2020/playwright-csharp-api-automation-demo) — same architecture and test coverage, idiomatic TypeScript.

---

### 🔗 Quick Links

| Resource | Link |
|----------|------|
| 📊 **Test Report** | [Allure Report on GitHub Pages](https://lak2020.github.io/playwright-typescript-api-automation-demo) |
| ⚙️ **CI/CD Pipeline** | [GitHub Actions Runs](https://github.com/lak2020/playwright-typescript-api-automation-demo/actions) |
| 💻 **Source Code** | [GitHub Repository](https://github.com/lak2020/playwright-typescript-api-automation-demo) |

---

## 🏗️ Project Structure

```
├── src/
│   ├── base/                       # Base classes & logger
│   │   ├── api-client-factory.ts   # Playwright API context wrapper
│   │   └── logger.ts               # Winston structured logging
│   ├── config/                     # Configuration management
│   │   └── test-configuration.ts   # Centralized config via appsettings.json
│   ├── models/                     # Request/Response type definitions
│   │   ├── request.models.ts       # CreatePostRequest, UpdatePostRequest, etc.
│   │   └── response.models.ts      # PostResponse, UserResponse, etc.
│   ├── services/                   # Service Object Pattern (API abstraction)
│   │   ├── post-api.service.ts     # Post CRUD operations
│   │   ├── user-api.service.ts     # User read operations
│   │   └── todo-api.service.ts     # Todo read operations
│   ├── utils/                      # Helpers & extensions
│   │   ├── assertion-extensions.ts # Custom assertion helpers
│   │   └── test-data-generator.ts  # Random test data via @faker-js/faker
│   └── test-data/                  # Static test data files
│       └── posts.json
├── tests/                          # Test specs organized by feature
│   ├── post-tests/                 # GET, POST, PUT, PATCH, DELETE posts
│   │   ├── get-post.spec.ts
│   │   ├── create-post.spec.ts
│   │   ├── update-post.spec.ts
│   │   └── delete-post.spec.ts
│   ├── todo-tests/                 # GET todos
│   │   └── get-todo.spec.ts
│   └── user-tests/                 # GET users
│       └── get-user.spec.ts
├── playwright.config.ts            # Playwright configuration
├── appsettings.json                # Test configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & scripts
```

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js 20+** | Runtime |
| **TypeScript 5** | Type-safe test code |
| **Playwright** | HTTP client for API testing |
| **@faker-js/faker** | Fake test data generation |
| **Winston** | Structured logging (console + file) |
| **Allure** | Test reporting |

## 📋 Prerequisites

- [Node.js 20+](https://nodejs.org/)
- npm (bundled with Node.js)

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/lak2020/playwright-typescript-api-automation-demo.git
cd playwright-typescript-api-automation-demo

# 2. Install dependencies
npm install

# 3. Install Playwright
npx playwright install

# 4. Run all tests
npx playwright test

# 5. Run tests with UI mode
npx playwright test --ui
```

## 🧪 Running Tests

```bash
# Run all tests
npx playwright test

# Run specific tag
npx playwright test --grep @smoke
npx playwright test --grep @posts
npx playwright test --grep @users
npx playwright test --grep @todos
npx playwright test --grep @negative

# Run a specific test file
npx playwright test tests/post-tests/create-post.spec.ts

# Run with verbose output
npx playwright test --reporter=list

# Run with HTML report
npx playwright test --reporter=html
npx playwright show-report
```

## 📊 Test API (JSONPlaceholder)

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a free, no-auth-required fake REST API:

| Endpoint | Method | Description |
|---|---|---|
| `/posts` | GET | List all posts (100 items) |
| `/posts/{id}` | GET | Single post |
| `/posts?userId={id}` | GET | Posts by user |
| `/posts/{id}/comments` | GET | Comments for a post |
| `/posts` | POST | Create post |
| `/posts/{id}` | PUT | Update post (full) |
| `/posts/{id}` | PATCH | Update post (partial) |
| `/posts/{id}` | DELETE | Delete post |
| `/users` | GET | List all users (10 items) |
| `/users/{id}` | GET | Single user |
| `/todos` | GET | List all todos (200 items) |
| `/todos/{id}` | GET | Single todo |

## 🔧 Configuration

Edit `appsettings.json` to customize:

```json
{
  "ApiSettings": {
    "BaseUrl": "https://jsonplaceholder.typicode.com",
    "Timeout": 30000,
    "RetryCount": 2
  }
}
```

Override via environment variables: `BASE_URL=https://your-api.com npx playwright test`

## 📝 Key Design Patterns

- **Service Object Pattern** — API operations encapsulated in service classes
- **Factory Pattern** — `ApiClientFactory` wraps Playwright request context
- **Configuration Pattern** — Environment-aware config via `appsettings.json` + env vars
- **Data-Driven Testing** — Parameterized tests + @faker-js/faker random data
- **Structured Logging** — Winston console + file logging

## 📊 Allure Reporting

```bash
# After running tests, generate and view the report:
npx allure serve allure-results
```

## 🔄 CI/CD

GitHub Actions workflow runs on push to `main`/`develop` and on PRs. See `.github/workflows/api-tests.yml`.

## 📜 License

MIT
