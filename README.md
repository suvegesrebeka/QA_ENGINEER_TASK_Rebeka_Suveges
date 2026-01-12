**QA Engineer Task — Swag Labs**

This repository contains Playwright-based UI and API tests for the Swag Labs sample application used in the QA Engineer task.

**Prerequisites**:
- **Node**: Install Node.js (recommended v16+).
- **Git**: (optional) to clone the repository.

**Install**:
- **Install dependencies**: `npm install`
- **Install Playwright browsers**: `npx playwright install`

**Environment variables**:
- The project reads runtime values from environment variables (see [utils/envWrapper.ts])
- create a `.env` file in the repository **root** with values for the keys shown in `utils/envWrapper.ts` 

Example `.env` (adjust values as needed):
```
uiBaseUrl=https://www.saucedemo.com
homePageUrl=/inventory.html 
cartPageUrl=/cart.html
apiBaseUrl=https://petstore.swagger.io/v2/pet
findByStatusEndpoint=/findByStatus
firstName=Test
lastName=Elek
zipCode=6300
STANDARD_USER_USERNAME=standard_user
STANDARD_USER_PASSWORD=secret_sauce
LOCKED_USER_USERNAME=locked_out_user
LOCKED_USER_PASSWORD=secret_sauce
INVALID_USER_USERNAME=invalid_user
INVALID_USER_PASSWORD=invalid_secret_sauce
```

**Run tests**:
- Run all tests: `npx playwright test`
- Run only UI tests: `npx playwright test tests/ui`
- Run only API tests: `npx playwright test tests/api`

**Detailed Report about the project**:
- In the report folder, there is a comprehensive report of my work and an explanation of my solutions.
