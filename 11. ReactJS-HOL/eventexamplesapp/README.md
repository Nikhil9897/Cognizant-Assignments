# ReactJS Hands-on 11

# React Event Handling

## Objective

To understand and implement **Event Handling** in React applications using event handlers, Synthetic Events, and form handling by creating a Currency Converter.

---

# Theory

## What are React Events?

React events are actions triggered by users such as:

- Click
- Change
- Submit
- Key Press
- Mouse Hover

React handles these events using **event handlers**.

---

## Event Handlers

An event handler is a JavaScript function that executes when a specific event occurs.

Example:

```jsx
<button onClick={handleClick}>
    Click Me
</button>
```

---

## Synthetic Events

React wraps browser events into **Synthetic Events**.

Advantages:

- Cross-browser compatibility
- Better performance
- Same interface across all browsers

Example:

```jsx
<button onClick={handleClick}>
```

---

## React Event Naming Convention

React uses **camelCase** naming.

Examples:

- onClick
- onChange
- onSubmit
- onKeyPress
- onMouseOver

Unlike HTML:

```html
onclick
```

React uses:

```jsx
onClick
```

---

## Multiple Event Methods

A single button can invoke multiple functions.

Example:

```jsx
const increase = () => {
    increment();
    sayHello();
}
```

---

## Form Handling

React handles form submission using:

```jsx
onSubmit={handleSubmit}
```

The default browser refresh is prevented using:

```jsx
e.preventDefault();
```

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
eventexamplesapp
│
├── node_modules
├── public
├── src
│   ├── App.js
│   ├── EventExamples.js
│   ├── CurrencyConvertor.js
│   ├── index.js
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Implementation

## EventExamples Component

Features:

- Increment counter
- Decrement counter
- Display Hello message
- Display Welcome message
- Demonstrate Synthetic Event

---

## CurrencyConvertor Component

Features:

- Accept Amount
- Accept Currency
- Convert Rupees to Euro
- Display converted amount using Alert

---

# Steps Performed

1. Created a React project named **eventexamplesapp**.
2. Created the `EventExamples` component.
3. Implemented Increment functionality.
4. Implemented Decrement functionality.
5. Invoked multiple methods using a single button.
6. Displayed Welcome using parameterized function.
7. Demonstrated React Synthetic Event.
8. Created the `CurrencyConvertor` component.
9. Accepted Amount and Currency as user input.
10. Converted Rupees to Euro on Submit.
11. Displayed converted value using Alert.
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

The application demonstrates:

- Counter Increment
- Counter Decrement
- Hello Alert
- Welcome Alert
- Synthetic Event
- Currency Converter
- Rupees to Euro Conversion

---

## Currency Converter Output

![Browser Output](browser-output.png)

---

# Conclusion

Successfully implemented React Event Handling concepts including event handlers, Synthetic Events, multiple event invocation, parameter passing, and form submission by creating a Currency Converter application.

---
