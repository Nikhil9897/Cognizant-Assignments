# ReactJS Hands-on 12

# Conditional Rendering in React – Ticket Booking Application

## Objective

To implement **Conditional Rendering** in React by displaying different pages for guest users and logged-in users using Login and Logout buttons.

---

# Theory

## What is Conditional Rendering?

Conditional Rendering is a technique in React that allows different UI elements or components to be displayed based on specific conditions.

It works similarly to JavaScript conditional statements like:

- if...else
- ternary operator (?:)
- logical AND (&&)

---

## Why Conditional Rendering?

Conditional rendering helps to:

- Display different content based on user actions.
- Improve user experience.
- Hide or show components dynamically.
- Build authentication-based applications.

---

## Element Variables

Element variables store JSX elements inside variables and render them conditionally.

Example:

```jsx
let button;

if(isLoggedIn){
    button = <LogoutButton />;
}
else{
    button = <LoginButton />;
}
```

---

## Preventing Component Rendering

A component can return `null` if it should not render.

Example:

```jsx
if(!show){
    return null;
}
```

---

## React Conditional Rendering Methods

- if...else
- Ternary Operator
- Logical &&
- Element Variables
- Returning null

---

# Technologies Used

- ReactJS
- JavaScript (ES6)
- HTML5
- CSS3
- Node.js
- npm
- Visual Studio Code

---

# Software Requirements

- Node.js
- npm
- Visual Studio Code
- Google Chrome / Microsoft Edge

---

# Project Structure

```
ticketbookingapp
│
├── node_modules
├── public
├── src
│   ├── App.js
│   ├── Greeting.js
│   ├── GuestPage.js
│   ├── UserPage.js
│   ├── LoginButton.js
│   ├── LogoutButton.js
│   ├── index.js
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Components

## GuestPage

Displays:

```
Please sign up.
```

---

## UserPage

Displays:

```
Welcome back
```

---

## Greeting

Displays either:

- GuestPage
- UserPage

based on login status.

---

## LoginButton

Changes login status to **true**.

---

## LogoutButton

Changes login status to **false**.

---

# Steps Performed

1. Created a React project named **ticketbookingapp**.
2. Created GuestPage component.
3. Created UserPage component.
4. Created Greeting component.
5. Implemented conditional rendering.
6. Created Login button.
7. Created Logout button.
8. Managed login state using `useState`.
9. Displayed Guest page initially.
10. Displayed User page after Login.
11. Displayed Guest page again after Logout.
12. Executed the application using `npm start`.

---

# Execution

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

Open:

```
http://localhost:3000
```

---

# Output

Initially:

```
Please sign up.

Login
```

After Login:

```
Welcome back

Logout
```

After Logout:

```
Please sign up.

Login
```

---

## Browser Output

![Browser Output](browser-output1.png)
![Browser Output](browser-output2.png)

---

# Conclusion

Successfully implemented **Conditional Rendering** in React using element variables and `useState`. The application dynamically switches between Guest and User pages based on the login status.

---
