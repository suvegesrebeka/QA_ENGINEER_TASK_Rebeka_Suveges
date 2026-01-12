# Architecture & Design Report  
**Playwright / Demo Application**  
Rebeka – Interview Submission  
January 2026 - Betsson

## Summary

This report outlines the design and implementation of the project using Playwright, covering both UI and API testing. It explains the framework structure, key architectural choices, test scenarios, and some trade-offs, giving a clear overview of the solution.

## Playwright – why it is a good choice

- Cross-browser out of the box: Playwright works on Chromium, Firefox, and WebKit without extra configuration, while Selenium often requires separate drivers and more setup.
- Auto-waiting: Playwright automatically waits for elements to be ready before performing actions, reducing flakiness in tests compared to Selenium, which often requires explicit waits.
- Modern API: Playwright offers a more modern and developer-friendly API compared to Selenium, making it easier to write and maintain tests.
- Codegeneration: Playwright's code generation feature allows for quick creation of test scripts by recording user interactions, speeding up the initial test development process.
- Modern and fast logging and reporting: Playwright provides built-in trace viewer, HTML reports, and an interactive UI mode, screenshoots and videos for debugging tests.
- up to-date technology: Playwright is actively maintained and frequently updated with new features: Playwright AGENT (https://playwright.dev/docs/test-agents)

## Overview of the Project Structure

```
QA_ENGINEER_TASK_Rebeka_Suveges/
├── pages/                # Page Objects for UI tests (Swag Labs pages)
├── tests/
│   ├── ui/               # UI test suites
│   └── api/              # API test suites
├── utils/                # Helpers, environment wrapper, test data utilities
├── reports/              # Test reports and screenshots/videos
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts  # Playwright configuration
```

## High-level Architecture

- Test Layer: Contains feature-specific test scripts for UI and API scenarios.
- Page/Object Layer (UI): Implements Page Object Model (POM) to encapsulate page interactions.
- Utils & Helpers: Includes reusable functions, interfaces, helpers.
- Centralized environment variables with a wrapper provides a clean way to reference environment variables, which are used frequently across the tests.


## UI Solutions

- Using a Page Object Model, enhancing maintainability and readability Each page interaction is encapsulated in dedicated page classes, allowing easy updates when UI elements change.
- Test scenarios include both positive and negative authentication cases to validate input handling and error messages.
- Reference locators together with their parent elements, as this makes the selection more stable, and I use the data-test attribute to follow the established convention.
- Initialize the parent locator in the class and reference the child elements within the respective function to avoid redundancy.
- Using test.describe and test.step to create a clear and well-structured test.

### Swag Labs - Login 
- The loginErrorMessage.ts file helps avoid redundancy within the function and also makes the test easier to scale, more isolated, and easier to read.

### Swag Labs - Shopping Cart Flow 
- Navigation to the shopping cart is performed via the cart icon rather than a direct URL, as this mirrors real user interactions and direct URLs are more prone to breakage.

## API Solutions
- Assertions on both HTTP status and response body for robust validation.
- Edge case/negative scenario testing (non-existent IDs, invalid statuses).
- Type safety with TypeScript types and enums for predictable data structures.(e.g. Pet)
- Validation of object properties and array types
- Separation of test data/constants from test logic for clarity and maintainability.

### GET-find-by-status
- Reminder: According to the documentation, the second test should return a 400 error, but this does not happen. I intentionally left the 200 status code to ensure the test runs without issues.
### POST-pet
- Dynamic test data generation (timestamps, random values) to avoid collisions.

## Trade-offs, Limitations & Future Improvements
- Chose Playwright for its modern features and ease of use, accepting a smaller community compared to Selenium. 
- The shopping cart item addition test is optimized for a single item. In a larger project, it should be extended to handle adding and removing multiple items to make the test less fragile and provide broader coverage. For a quick smoke-test type task, the current solution is perfect because it is fast and focuses on the core functionality.
- Not fully isolated functions. Since this was a small project, I did not enforce complete isolation everywhere, as doing so would have created unnecessary boilerplate for such a small scope.
- Normally, I would not push the .env file, but I included it here for the convenience of running the project.

Future Improvements: 
 - CI/CD Integration
 - Enhanced Reporting and Logging

## Conclusion
The framework demonstrates a high-level approach to QA automation using Playwright. It balances readability, maintainability, and scalability while covering both UI and API testing. The design choices made ensure that the tests are robust and can be easily extended for future requirements.