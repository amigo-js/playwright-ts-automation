# Playwright Automated Testing for Ploom Shops

## Main Objective

The main objective of this project is to design automated tests for verifying functionalities on Ploom's country-specific websites. These tests are designed to be easily extendable to new markets by reusing test scripts and configurations.

### Supported Markets:

- [Ploom UK](https://www.ploom.co.uk/en)
- [Ploom PL](https://www.ploom.pl/pl)

## Test Cases

### Test Case 1: Verify Adding a Product to the Cart

**Test Steps:**

1. Visit the Ploom website (either UK or PL market).
2. Click on the "Shop" button.
3. Open the product page by SKU (`data-sku="ploom-x-advanced"`).
4. Add the product to the cart.
5. Verify the basket count is updated.
6. Open the basket.
7. Verify the product is displayed in the basket.

### Test Case 2: Verify Removing a Product from the Cart

**Precondition:** A product is already in the cart.

**Test Steps:**

1. Open the cart.
2. Remove the product from the cart.
3. Verify the product is no longer displayed in the cart.
4. Verify the basket count is updated correctly.

### Test Case 3: Verify Broken Links and Images on the Product Page

**Test Steps:**

1. Visit the Ploom website (either UK or PL market).
2. Click on the "Shop" button.
3. Open the product page by SKU (`data-sku="ploom-x-advanced"`).
4. Check all links on the product page to ensure they are not broken.
5. Verify all images on the product page load correctly.

---

## Installation and Setup

### Prerequisites:

1. Node.js (16.x or later)
2. Playwright installed globally
3. Java Runtime Environment (JRE) for generating Allure reports
4. Ensure `http-server` is installed for serving Allure reports locally

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/amigo-js/playwright-ts-automation.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add `.env` file with the following variable:
   ```bash
   BASE_URL=https://www.ploom.co.uk/en
   ```
   Update `BASE_URL` for the desired market (e.g., `https://www.ploom.pl/pl`).

---

## Running Tests

### Headless Test Execution

```bash
npm run test:headless
```

### Headed Test Execution

```bash
npm run test:headed
```

### Execute Tests and Generate Allure Report

````
1. Default mode (headless):
```bash
npm run report
OR
npm run test:report
````

---

## Generating Allure Reports

### Clean Previous Reports and Generate New Report

```bash
npm run clean:allure
```

### Open the Allure Report

```bash
npm run report
```

---

## Directory Structure

```
├── pages
│   ├── base.page.ts           # Base page class
│   ├── cart.page.ts           # Cart page-specific methods
│   ├── consent.page.ts        # Consent modal handling
│   ├── home.page.ts           # Home page-specific methods
│   └── shop.page.ts           # Shop page-specific methods
├── selectors
│   ├── cart.selectors.ts      # Selectors for cart-related elements
│   ├── consent.selectors.ts   # Selectors for consent modals
│   ├── home.selectors.ts      # Selectors for home page elements
│   └── shop.selectors.ts      # Selectors for shop page elements
├── tests
│   ├── cart.test.ts           # Tests for cart functionality
│   └── links.test.ts          # Tests for broken links and images
│
├── test-data
│   ├── pl.json                # JSON test data for PL markets
│   └── uk.json                # JSON test data for UK markets
├── utils
│   ├── test-data.ts           # Helper for loading test data dynamically
│   └── helpers.ts             # Miscellaneous utility functions
├── allure-results             # Allure results generated after tests
└── playwright.config.ts       # Playwright configuration for multiple markets
```

---

## Dynamic Test Data Loading

The tests dynamically load market-specific data (e.g., product SKU, product name) based on the market being tested. Test data is stored in JSON files under the `test-data` directory.

### Example Test Data (`test-data/pl.json`):

```json
{
  "productName": "Ploom X Advanced Rose Shimmer",
  "sku": "16199177"
}
```

### Example Test Data (`test-data/uk.json`):

```json
{
  "productName": "Ploom X Advance Rose Shimmer Limited Edition",
  "sku": "ploom-x-advanced"
}
```

---

## Key Features

1. **Dynamic Market Configuration**:

   - Markets are dynamically determined from the project name.
   - Easily extendable to new markets by adding configurations in `playwright.config.ts`.

2. **Reusable Page Objects**:

   - Modular design with reusable components for different pages (e.g., `home.page.ts`, `cart.page.ts`).

3. **Allure Report Integration**:

   - Automatically generates and serves Allure reports for test results.

4. **Support for Multiple Test Scenarios**:
   - Add/Remove products to/from the cart.
   - Validate links and images on product pages.

---

## Troubleshooting

1. **Java Runtime Not Found**:
   Ensure that Java is installed and added to your PATH. Verify using:

   ```bash
   java -version
   ```

2. **Allure Command Not Found**:
   Install Allure CLI globally:

   ```bash
   npm install -g allure-commandline --save-dev
   ```
