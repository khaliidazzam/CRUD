# CRUD — Product Manager

A browser based product manager built with HTML, CSS, and vanilla JavaScript. It needs no build tools, backend, or database.

## Features

- Create products with a name, category, price, and optional description.
- View the product list in a table.
- Update an existing product and delete individual products.
- Search product names as you type.
- Save records in browser localStorage so they remain available in the same browser.
- Validate required product fields and reject negative prices.

## Team section

I created the team card section, which presents the project members and their roles.

## Run locally

Open index.html in a modern browser.

## GitHub Pages

This repository includes a GitHub Actions workflow at .github/workflows/pages.yml that deploys the static site on pushes to main. In the repository, open Settings → Pages and choose GitHub Actions as the build and deployment source. After the workflow succeeds, use the site URL shown on the Pages settings screen.

Product data is stored in each visitor's own browser and is not shared between visitors.
