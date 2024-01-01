## E-commerce Website Documentation
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Introduction
This documentation provides information on how to use and understand the features of the E-commerce website data from the https://fakeapi.platzi.com/ API endpoints. The website is designed to showcase products, allow users to browse, add items to their cart, and perform various actions such as registration, login, and profile management.

## Table of Contents
- [Getting Started](#1-Getting-Started)
- [Dev Technics](#2-Dev-Technics)
- [Document Structure](#3-Document-Structure) 
- [Pages](#4-Pages)
- [Redux Store](#5-Redux-Store)
- [Private Routes](#6-Private-Routes)
- [Unit Testing](#7-Unit-Testing)
- [Deployment](#8-Deployment-link)

### 1. Getting Started
Before using the E-commerce website, ensure that you have the following:
- Node.js installed on your machine    
- Installation
To set up the project on your local machine, follow these steps:
Clone the repository from GitHub: git clone [https://github.com/VeraCodes2023/fs16_6-frontend-project.git]
Navigate to the project directory: 
- npx create-react-app e-commerce --template redux-typescript
Install dependencies: npm install:
- @types/react-dom
- @types/react
- axios
- react-router-dom 
- reduxtoolkit 
- material UI
Start the development server: npm start
The website should now be accessible at http://localhost:3000 in your web browser.

### 2. Dev Technics
- TypeScript
- React.js 
- Redux Toolkit 
- React-router-dom 
- SASS Styling
- Material-UI 


### 3. Document Structure
<img width="274" alt="image" src="https://github.com/VeraCodes2023/fs16_6-frontend-project/assets/130740510/39d5d972-6680-4ff4-859e-e505f77cc455">     

### 4. Pages 📄
Overview
The E-commerce website consists of several pages, each serving a specific purpose. Here are the main pages:
#### All Products Page(Homepage) 📄
- URL: / <br>
- Description: Displays all available products from the API.
- Features:
- Browse products.
- Filter products by categories.
- Sort products by price.
#### Single Product Page 📄
- URL: /products/:id.<br>
- Description: Displays detailed information about a single product.
- Features:View product details.
#### User's Profile Page 📄
- URL: /profile.<br>
- Description: User profile page (only available if the user is logged in).
- Features:View and update user profile information.
#### Cart Page 📄
- URL: /cart <br>
- Description: Shopping cart page.
- Features:
- Add products to the cart.
- Remove products from the cart.
- Update the quantity of products in the cart.

### 5. Redux Store <img src="https://github.com/VeraCodes2023/fs16_6-frontend-project/assets/130740510/4e2c9c75-20a5-486b-94fe-17798a0f0b82" width="25" height="25"> 
The application uses Redux for state management and has three main reducers:

#### Product Reducer Features:
- Get all products.
- Find a single product.
- Filter products by categories.
- Sort products by price.
- Create, update, and delete a product (only accessible to admin users).
  
#### User Reducer Features:
- Register as a new user.
- Log in as an existing user.

#### Cart Reducer Features:
- Add products to the cart.
- Remove products from the cart.
- Update the quantity of products in the cart.

### 6. Private Routes

Certain routes within the application are protected and require user authentication. For example:The route to the user profile page (/profile) and admin dashboard (/admin) is only accessible if the user is logged in. Authentication and authorization are implemented using Redux and are enforced on the client side.

<img width="570" alt="image" src="https://github.com/VeraCodes2023/fs16_6-frontend-project/assets/130740510/89bff96a-d753-49aa-a6c2-aff581339b1b">

### 7. Unit Testing
Unit tests have been implemented for the reducers to ensure their functionality. You can run these tests using the following command:npm test

### 8. Deployment link 
https://652aab6e603f7a41c40d1d18--scintillating-crepe-55caa4.netlify.app

