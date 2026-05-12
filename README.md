# Geo-Favs

Created with CodeSandbox

## Overview

Geo-Favs is a web application with a frontend and backend that allows users to explore and manage favorite geographic locations.

---

It uses public API to search for a country. When the like button (heart) is pressed, it stores that country in the local database (MySQL), and if pressed the like button again (unlike), it removes it from the database.

## Tech Stack

- React (Create React App)
- Node.js / npm
- JavaScript
- Python
- MySQL

---

### ⚠️ Known Issue (Environment Compatibility)

### Error

When running the project with newer Node.js versions (17+), the following error may occur:

```bash
Error: error:0308010C:digital envelope routines::unsupported
code: ERR_OSSL_EVP_UNSUPPORTED
```

This is due to older build tooling, which is not compatible with newer version of Node.js.
Temporary workaround:

```bash
npm install --legacy-peer-deps
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

To run backend:

```bash
uvicorn main:app --reload --port 8000
```

---

## Future improvements:

1. Need to add delete db after a period of time, or have a limit of favorite countries
2. Update node.js to newer version
3. Work on UI to prettify
