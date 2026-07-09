# ReactJS Hands-on 5

# Styling React Components using CSS Modules and Inline Styling

## Objective

To style React components using **CSS Modules** and **Inline CSS**. The application displays cohort details in styled cards with different heading colors based on the cohort status.

---

# Theory

## Styling in React

React provides multiple ways to style components.

1. External CSS
2. Inline CSS
3. CSS Modules
4. Styled Components
5. CSS-in-JS Libraries

---

## CSS Modules

CSS Modules provide locally scoped CSS classes.

Benefits:

- Prevents naming conflicts
- Reusable styles
- Better maintainability
- Component-specific styling

Example:

```jsx
import styles from "./CohortDetails.module.css";

<div className={styles.box}></div>
```

---

## Inline Styling

Inline styles are written using JavaScript objects.

Example:

```jsx
const headingStyle = {
    color: "green"
};

<h3 style={headingStyle}>Heading</h3>
```

Advantages:

- Dynamic styling
- Easy conditional formatting
- Component-specific

---

## Conditional Styling

React allows styles to change dynamically.

Example:

```jsx
const headingStyle = {
    color: cohort.currentStatus === "Ongoing"
        ? "green"
        : "blue"
};
```

---

# Technologies Used

- ReactJS
- JavaScript (ES6)
- HTML5
- CSS Modules
- Inline CSS
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
cohorttracker
│
├── node_modules
├── public
├── src
│   ├── App.js
│   ├── Cohort.js
│   ├── CohortDetails.js
│   ├── CohortDetails.module.css
│   ├── index.js
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Implementation

## CohortDetails.module.css

```css
.box{
    width:300px;
    display:inline-block;
    margin:10px;
    padding:10px 20px;
    border:1px solid black;
    border-radius:10px;
}

dt{
    font-weight:500;
}
```

---

## Inline Styling

```jsx
const headingStyle = {
    color: cohort.currentStatus === "Ongoing"
        ? "green"
        : "blue"
};
```

---

## Applying CSS Module

```jsx
<div className={styles.box}>
```

---

# Steps Performed

1. Downloaded the Cohort Tracker React project.
2. Installed project dependencies using `npm install`.
3. Created `CohortDetails.module.css`.
4. Added the `.box` class for styling.
5. Imported the CSS Module into `CohortDetails.js`.
6. Applied CSS Module using `className={styles.box}`.
7. Added inline styling for cohort headings.
8. Displayed **green** headings for **Ongoing** cohorts.
9. Displayed **blue** headings for **Scheduled** cohorts.
10. Executed the application using `npm start`.

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

The application displays:

- Cohort cards
- Technology
- Start Date
- Current Status
- Coach
- Trainer

The heading color changes dynamically:

- Green → Ongoing
- Blue → Scheduled

---

## Browser Output

![Browser Output](browser-output.png)

---

# Conclusion

Successfully implemented styling in React using **CSS Modules** and **Inline Styling**. The application dynamically changes the heading color based on the cohort status while applying reusable component-specific styles using CSS Modules.

---
