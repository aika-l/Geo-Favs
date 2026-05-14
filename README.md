# Geo-Favs

Created with CodeSandbox

## Overview

Geo-Favs is a full-stack web application that allows users to search for countries and manage a personalized favorites list.

The frontend is built with React and communicates with a FastAPI backend through REST API calls. Favorite countries are persisted in a MySQL database, allowing data to remain available across sessions.

The application integrates with the public REST Countries API to retrieve country information such as flags, capitals, regions, population, and currencies. Users can add or remove countries from their favorites list through an interactive UI, with changes reflected in the backend database in real time.

## Features

- Search countries using public API
- View country details
- Save favorite countries
- Remove favorites
- Persistent MySQL storage
- React + FastAPI architecture

## Architecture

Frontend:

- React
- JavaScript
- REST API calls

Backend:

- FastAPI
- Python
- MySQL

Database:

- MySQL Workbench

---

## NOTE Frontend uses two env variables:

- PORT: the listening PORT
- REACT_APP_API_HOST: the url to call the API app

These two variables need to be set

## NOTE Backend uses below env variables:

- PORT: Backend API listening port
- DB_HOST: MySQL database host
- DB_PORT: MySQL database listening port
- DB_USER: Database username
- DB_PASSWORD: Database password
- DB_NAME: Database name
- FRONTEND_ORIGIN: Allowed frontend origin for CORS communication (http://localhost:PORT_from_frontend)

## Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

## Backend Setup

```bash
cd backend
python main.py
```

or

```bash
uvicorn backend:app --reload --port 8000
```

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
3. Improve frontend UI/UX and responsive design
