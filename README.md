# Enterprise Project - Order & Checkout System

A React application built with **Vite**, **React 19**, and **React Router v6** for managing multi-step product purchasing and checkout flows.

---

## 📋 Prerequisites

Make sure you have **Node.js** (v18.0.0 or higher recommended, e.g., v20+ LTS) and **npm** installed on your system.

To check your versions:
```bash
node -v
npm -v
```

> **Note**: If Node.js is not yet installed:
> - Using **mise**: `mise use --global node@20`
> - Using **nvm**: `nvm install --lts && nvm use --lts`
> - Using system package manager (e.g., Arch Linux / Omarchy): `sudo pacman -S nodejs npm`

---

## 🚀 Getting Started

### 1. Install Dependencies

In the root directory of the project, install the required packages:

```bash
npm install
```
# Enterprise Project - Order & Checkout System

A React application built with **Vite**, **React 19**, and **React Router v6** for managing multi-step product purchasing and checkout flows.

---

## 📋 Prerequisites

Make sure you have **Node.js** (v18.0.0 or higher recommended, e.g., v20+ LTS) and **npm** installed on your system.

To check your versions:

```bash
node -v
npm -v

```

> **Note**: If Node.js is not yet installed:
> * Using **mise**: `mise use --global node@20`
> * Using **nvm**: `nvm install --lts && nvm use --lts`
> * Using system package manager (e.g., Arch Linux / Omarchy): `sudo pacman -S nodejs npm`
> 
> 

---

## 🚀 Getting Started

### 1. Install Dependencies

In the root directory of the project, install the required packages:

```bash
npm install

```

### 2. Environment Variables Setup

Before running the application, you must create a `.env` file in the root directory to connect the frontend to the AWS Lambda microservices (Inventory and Order Processing).

Add the following line to your `.env` file:

```env
VITE_AWS_API_URL=https://0idxgsmohh.execute-api.us-east-1.amazonaws.com/dev

```

### 3. Start the Development Server

Launch the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev

```

By default, the application runs at:

```
http://localhost:5173

```

Open this URL in your browser. It will automatically redirect to `/purchase`.

---

## 🛠 Available Scripts

In the project directory, you can run:

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local dev server at `http://localhost:5173` |
| `npm run build` | Compiles and bundles production assets into `dist/` |
| `npm run preview` | Locally serves the production build for verification |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |

---

## 🗺 Application Architecture & Flow

### Global State Management

* **[`OrderContext`](https://www.google.com/search?q=src/OrderContext.jsx)**: Wraps the entire application, tracking:
* `cart`: List of chosen catalog items and quantities.
* `paymentInfo`: Customer payment credentials.
* `shippingInfo`: Customer shipping address and details.



### Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Navigate` | Redirects directly to `/purchase` |
| `/purchase` | [`Purchase.jsx`](https://www.google.com/search?q=src/components/Purchase.jsx) | Product catalog with item selection and quantity inputs |
| `/purchase/paymentEntry` | [`PaymentEntry.jsx`](https://www.google.com/search?q=src/components/PaymentEntry.jsx) | Payment information entry step |
| `/purchase/shippingEntry` | [`ShippingEntry.jsx`](https://www.google.com/search?q=src/components/ShippingEntry.jsx) | Shipping address and delivery details step |
| `/purchase/viewOrder` | [`ViewOrder.jsx`](https://www.google.com/search?q=src/components/ViewOrder.jsx) | Summary review before final submission |
| `/purchase/confirmation` | [`Confirmation.jsx`](https://www.google.com/search?q=src/components/Confirmation.jsx) | Post-purchase confirmation screen |

---

## 📦 Tech Stack

* **React 19**: Modern UI component library
* **Vite 8**: Next-generation frontend build tooling
* **React Router DOM 6**: Client-side routing and navigation
* **React Icons**: Icon library
* **ESLint 10**: Code linting and style enforcement

Are you ready to commit this final text and merge the branch to wrap up the project?
### 2. Start the Development Server

Launch the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

By default, the application runs at:
```
http://localhost:5173
```

Open this URL in your browser. It will automatically redirect to `/purchase`.

---

## 🛠 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local dev server at `http://localhost:5173` |
| `npm run build` | Compiles and bundles production assets into `dist/` |
| `npm run preview` | Locally serves the production build for verification |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |

---

## 🗺 Application Architecture & Flow

### Global State Management
- **[`OrderContext`](src/OrderContext.jsx)**: Wraps the entire application, tracking:
  - `cart`: List of chosen catalog items and quantities.
  - `paymentInfo`: Customer payment credentials.
  - `shippingInfo`: Customer shipping address and details.

### Routes

| Route | Component | Purpose |
| :--- | :--- | :--- |
| `/` | `Navigate` | Redirects directly to `/purchase` |
| `/purchase` | [`Purchase.jsx`](src/components/Purchase.jsx) | Product catalog with item selection and quantity inputs |
| `/purchase/paymentEntry` | [`PaymentEntry.jsx`](src/components/PaymentEntry.jsx) | Payment information entry step |
| `/purchase/shippingEntry` | [`ShippingEntry.jsx`](src/components/ShippingEntry.jsx) | Shipping address and delivery details step |
| `/purchase/viewOrder` | [`ViewOrder.jsx`](src/components/ViewOrder.jsx) | Summary review before final submission |
| `/purchase/confirmation` | [`Confirmation.jsx`](src/components/Confirmation.jsx) | Post-purchase confirmation screen |

---

## 📦 Tech Stack

- **React 19**: Modern UI component library
- **Vite 8**: Next-generation frontend build tooling
- **React Router DOM 6**: Client-side routing and navigation
- **React Icons**: Icon library
- **ESLint 10**: Code linting and style enforcement
