# Geo-Favs

Created with CodeSandbox

## Overview

Geo-Favs is a web application with a frontend and backend that allows users to explore and manage favorite geographic locations.

---

## Tech Stack

- React (Create React App)
- Node.js / npm
- JavaScript
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
