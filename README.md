# Interparcel API Client

A TypeScript-based Node.js client for interacting with the [Interparcel API](https://au.interparcel.com/docs/api).  
Supports quoting, shipment creation, and parcel tracking.

---

## ✨ Features

- 📦 Get shipping quotes (API v3)
- 🚚 Create shipments (API v3)
- 📍 Track parcels (API v1)
- 🔐 Built-in API key authentication
- 🧪 Unit tests with Jest
- 💡 Written in TypeScript with full type safety

---

## 📁 Project Structure

```
interparcel-api-client/
├── src/
│   ├── index.ts                  # Entry point exports all modules
│   ├── quote/
│   │   ├── getQuote.ts           # Quote API logic (v3)
│   │   ├── types.ts              # Quote request/response types
│   │   ├── index.ts              # Index
│   │   └── __tests__/            # Unit tests for quotes
│   ├── shipment/
│   │   ├── createShipment.ts     # Shipment creation logic (v3)
│   │   ├── types.ts              # Shipment request/response types
│   │   ├── index.ts              # Index
│   │   └── __tests__/            # Unit tests for shipment
│   └── tracking/
│       ├── trackShipment.ts      # Tracking endpoint logic (v1)
│       ├── types.ts              # Tracking request/response types
│       └── __tests__/            # Unit tests for tracking
├── dist/                         # Compiled output
├── test/                         # Global test setup/utils
├── .github/workflows/ci.yml     # GitHub Actions CI workflow
├── .npmignore
├── .gitignore
├── tsconfig.json
├── jest.config.js
├── package.json
└── README.md
```

---

## 🚀 Installation

```
npm install @buun_group/interparcel-api-sdk
```

> **See the full usage guide:** [docs/getting-started.md](./docs/getting-started.md)

> **Optional:** You can use the included `Makefile` to run all checks and commands with simple `make` commands (requires GNU Make, standard on Linux/macOS, available for Windows via WSL or MinGW). For example:
>
> - `make install` — install dependencies
> - `make build` — build the project
> - `make test` — run tests
> - `make lint` — lint code
> - `make format` — format code
> - `make check` — run lint, format check, build, and test in sequence

---

## 🛠 Git Hooks with Husky

This project uses [Husky](https://typicode.github.io/husky/how-to.html) to enforce code quality via Git hooks.

After installing dependencies, **run the following command to enable Git hooks**:

```
npx husky
```

This will set up the following hooks:

- **pre-commit:** Runs lint and format check
  ```
  npm run lint && npm run format-check
  ```
- **pre-push:** Runs tests
  ```
  npm test
  ```

If you skip this step, code quality checks will not run automatically before commits or pushes.

For more details, see the [Husky documentation](https://typicode.github.io/husky/how-to.html).

---

## 📦 Usage

```
import {
  getQuote,
  trackParcel,
  addShipment,
  QuoteRequest,
} from 'interparcel-api-sdk';

const apiKey = process.env.INTERPARCEL_API_KEY;

const quoteRequest: QuoteRequest = {
  collection: {
    city: 'Sydney',
    postcode: '2000',
    country: 'AU',
  },
  delivery: {
    city: 'Melbourne',
    postcode: '3000',
    country: 'AU',
  },
  parcels: [
    {
      weight: 2,
      length: 10,
      width: 20,
      height: 15,
    },
  ],
};

const quote = await getQuote(apiKey, quoteRequest);
console.log(quote);
```

---

## 📄 Documentation Links

- 📘 [Get a Quote API](https://au.interparcel.com/docs/api/quote/get-a-quote)
- 📘 [Track Parcel API](https://au.interparcel.com/docs/api/tracking/track)
- 📘 [Add Shipment API](https://au.interparcel.com/docs/api/shipments/add)
- 📘 [Full Interparcel API Docs](https://au.interparcel.com/docs/api)

---

## 🔐 Environment Variables

Set your Interparcel API key in a `.env.local` file or export it in your environment:

```
INTERPARCEL_API_KEY=your_api_key_here
```

---

## 🧪 Running Tests

```
npm test
```

Test files are colocated in `__tests__/` folders inside each module (quote, shipment, tracking).  
Uses [jest](https://jestjs.io) with axios mocking for API behavior simulation.

---

## 🛠 Build

```
npm run build
```

Compiles TypeScript code into the `dist/` directory.

---

## 🧹 Code Formatting & Linting

This project uses **Prettier** for code formatting and **ESLint** for linting. All code must be properly formatted and linted before submitting a PR.

- To check and fix linting issues:
  ```
  npm run lint
  ```
- To format code with Prettier:
  ```
  npm run format
  ```
- To check formatting without writing changes:
  ```
  npm run format -- --check
  ```

The CI pipeline will fail if code is not properly linted or formatted.

---

## 🤖 CI/CD

This project includes a GitHub Actions workflow in `.github/workflows/ci.yml` that runs:

- Linting (`npm run lint`)
- Build (`npm run build`)
- Unit tests (`npm test`)
- Security audit (`npm audit --omit dev`)

All workflows run on PRs and pushes to `main`.


---

## 📚 Dependencies

| Package         | Purpose                           |
|-----------------|-----------------------------------|
| axios           | HTTP client for API requests      |
| typescript      | Type-safe development             |
| jest            | Testing framework                 |
| axios-mock-adapter | Mocking axios for unit tests  |
| @types/node     | Node.js type definitions          |
| ts-jest         | TypeScript support for Jest       |


---

## 🤝 Contributing

1. Fork the repository  
2. Create a branch (`git checkout -b feature/foo`)  
3. Commit changes (`git commit -am 'Add foo feature'`)  
4. Push to GitHub (`git push origin feature/foo`)  
5. Create a Pull Request  

Please lint and format TypeScript code before submitting a PR.

---

## 👤 Authors

Created by [**Buun Group**](https://buungroup.com) <br>
Lead Developer: [**Sacha Roussakis-Notter**](https://www.linkedin.com/in/sacha-roussakis-notter-b6903095/)

---

## ⚠️ Disclaimer

This package is an **unofficial community-developed** client for the Interparcel API.  
We are **not affiliated, associated, authorized, endorsed by, or in any way officially connected** with Interparcel.  
All product and company names are trademarks™ or registered® trademarks of their respective holders.