# ReactJS Hands-on 10

# Office Space Rental Application using React JSX

## Objective

Create a React application named **officespacerentalapp** to demonstrate React JSX concepts by displaying office space details, rendering lists using JSX, applying JavaScript expressions, and using inline CSS for conditional styling.

---

# Theory

## What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript that allows developers to write HTML-like code inside JavaScript.

Example:

```jsx
const element = <h1>Hello React</h1>;
```

Benefits:

- Easy to write UI
- Improves readability
- Combines HTML and JavaScript
- Makes React components more expressive

---

## ECMAScript (ES6)

ECMAScript 2015 (ES6) introduced several modern JavaScript features used extensively in React.

Important features include:

- Arrow Functions
- Classes
- Modules
- Template Literals
- Destructuring
- Spread Operator
- map()

---

## React.createElement()

Every JSX element is internally converted into a `React.createElement()` call.

Example:

JSX

```jsx
<h1>Hello</h1>
```

Equivalent JavaScript

```javascript
React.createElement("h1", null, "Hello");
```

---

## Rendering JSX to the DOM

React renders JSX into the browser using:

```javascript
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

---

## JavaScript Expressions in JSX

Expressions are written inside curly braces.

Example:

```jsx
<h2>{office.Name}</h2>
```

---

## Inline CSS in JSX

Inline styling is written using JavaScript objects.

Example:

```jsx
<h3 style={{ color: "red" }}>
    Rent: Rs. 50000
</h3>
```

---

## Conditional Styling

The rent color changes dynamically.

```jsx
style={{
    color: office.Rent <= 60000 ? "red" : "green"
}}
```

---

# Technologies Used

- ReactJS
- JSX
- JavaScript (ES6)
- HTML5
- CSS
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
officespacerentalapp
│
├── node_modules
├── public
├── src
│   ├── office.jpg
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Features Implemented

- JSX syntax
- React element rendering
- Office object creation
- Rendering office details
- Rendering multiple office spaces using map()
- Conditional styling using inline CSS
- JavaScript expressions inside JSX

---

# Steps Performed

1. Created a React project named `officespacerentalapp`.
2. Added an office image.
3. Created an office object containing Name, Rent, and Address.
4. Displayed office details using JSX.
5. Created a list of office objects.
6. Displayed the office list using `map()`.
7. Applied conditional inline CSS.
8. Displayed rent in red if below or equal to ₹60,000.
9. Displayed rent in green if above ₹60,000.
10. Executed the application using `npm start`.

---

# Execution

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm start
```

Open:

```
http://localhost:3000
```

---

# Output

The application displays:

- Office Space heading
- Office image
- Office Name
- Rent
- Address
- Multiple office spaces

Rent color changes dynamically:

- 🔴 Red → Rent ≤ ₹60,000
- 🟢 Green → Rent > ₹60,000

---

## Browser Output

![Browser Output](browser-output.png)

---

# Conclusion

Successfully implemented a React application using JSX. The application demonstrates rendering JSX elements, using JavaScript expressions, displaying lists with `map()`, and applying inline CSS for conditional styling based on office rent.

---
