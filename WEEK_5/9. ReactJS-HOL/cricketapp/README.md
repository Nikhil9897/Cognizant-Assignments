# ReactJS Hands-on 9

# ES6 Features in React

## Objective

To implement various ES6 features in React including:

- Arrow Functions
- map()
- filter()
- Destructuring
- Spread (Merge) Operator

The application displays cricket player details and demonstrates the use of ES6 features in React components.

---

# Theory

## What is ES6?

ECMAScript 2015 (ES6) introduced several modern JavaScript features that simplify coding and improve readability.

Some commonly used ES6 features are:

- Arrow Functions
- map()
- filter()
- Destructuring
- Spread Operator
- Template Literals
- Classes
- Modules

---

# Arrow Functions

Arrow functions provide a shorter syntax for writing functions.

Example:

```javascript
const add = (a, b) => a + b;
```

Advantages:

- Short syntax
- Lexical `this`
- Easy to use with React

---

# map()

The `map()` function iterates through an array and returns a new array.

Example:

```javascript
players.map(player => (
    <li>{player.name}</li>
));
```

Uses:

- Rendering lists
- Transforming data
- JSX rendering

---

# filter()

The `filter()` function creates a new array containing only elements that satisfy a condition.

Example:

```javascript
players.filter(player => player.score <= 70);
```

---

# Destructuring

Destructuring extracts values from arrays or objects.

Example:

```javascript
const [first, second, third] = players;
```

Benefits:

- Cleaner code
- Easy access to elements
- Less repetitive syntax

---

# Spread Operator

The spread operator (`...`) merges arrays or objects.

Example:

```javascript
const mergedPlayers = [
    ...T20Players,
    ...RanjiPlayers
];
```

Benefits:

- Array merging
- Object copying
- Immutable updates

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
cricketapp
│
├── node_modules
├── public
├── src
│   ├── App.js
│   ├── ListofPlayers.js
│   ├── IndianPlayers.js
│   ├── index.js
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Features Implemented

- Displayed list of cricket players.
- Filtered players scoring less than or equal to 70.
- Used Arrow Functions.
- Used map() for rendering.
- Used filter() for filtering players.
- Used Destructuring to separate odd and even players.
- Used Spread Operator to merge two arrays.
- Switched between two views using a flag variable.

---

# Steps Performed

1. Created a React project named `cricketapp`.
2. Created `ListofPlayers.js`.
3. Displayed all cricket players using `map()`.
4. Filtered players with scores less than or equal to 70 using `filter()`.
5. Created `IndianPlayers.js`.
6. Used destructuring to display odd and even players.
7. Merged two player arrays using the spread operator.
8. Updated `App.js` to switch between outputs using a flag.
9. Executed the project using `npm start`.

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

### Output 1 (flag = true)

Displays:

- List of Players
- Players with scores less than or equal to 70

---

### Output 2 (flag = false)

Displays:

- Odd Players
- Even Players
- Merged Indian Players List

---

## Output 1

![Players Output](players-output.png)

---

## Output 2

![Indian Players Output](indian-players-output.png)

---

# Conclusion

Successfully implemented React components using modern ES6 features such as Arrow Functions, `map()`, `filter()`, Destructuring, and the Spread Operator. The application demonstrates efficient rendering, filtering, and manipulation of array data in React.

---