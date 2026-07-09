# ReactJS Hands-on 13

# Lists, Keys and Conditional Rendering

## Objective

To understand and implement **Lists**, **Keys**, **map()**, and **Conditional Rendering** in React by displaying Books, Blogs, and Courses.

---

# Theory

## Lists in React

Lists allow multiple items to be displayed dynamically using the `map()` function.

Example:

```jsx
const numbers = [1,2,3];

numbers.map(num => <li>{num}</li>);
```

---

## Keys in React

Keys uniquely identify list items and help React efficiently update the UI.

Example:

```jsx
books.map(book =>
    <div key={book.id}>
        {book.bname}
    </div>
)
```

---

## map() Function

The `map()` method iterates through an array and returns JSX for each element.

Example:

```jsx
books.map(book => (
    <div>{book.bname}</div>
))
```

---

## Conditional Rendering

Conditional rendering displays components based on conditions.

Example:

```jsx
{showBooks && <BookDetails />}
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
bloggerapp
│
├── node_modules
├── public
├── src
│   ├── App.js
│   ├── Books.js
│   ├── Blogs.js
│   ├── Courses.js
│   ├── BookDetails.js
│   ├── BlogDetails.js
│   ├── CourseDetails.js
│   ├── App.css
│   └── index.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Components

## Books

Stores the list of books.

---

## Blogs

Stores the list of blogs.

---

## Courses

Stores the list of courses.

---

## BookDetails

Displays book names and prices using `map()`.

---

## BlogDetails

Displays blog title, author, and content.

---

## CourseDetails

Displays course name and start date.

---

# Features

- Display Book Details
- Display Blog Details
- Display Course Details
- Use React Lists
- Use Keys
- Use map()
- Implement Conditional Rendering

---

# Steps Performed

1. Created React project **bloggerapp**.
2. Created Books data.
3. Created Blogs data.
4. Created Courses data.
5. Created BookDetails component.
6. Created BlogDetails component.
7. Created CourseDetails component.
8. Rendered all data using `map()`.
9. Added unique keys to every item.
10. Used conditional rendering in App.js.
11. Executed application using `npm start`.

---

# Execution

Install dependencies

```bash
npm install
```

Run application

```bash
npm start
```

Open

```
http://localhost:3000
```

---

# Output

The application displays:

- Course Details
- Book Details
- Blog Details

using Lists, Keys and Conditional Rendering.

---

## Browser Output

![Browser Output](browser-output.png)

---

# Conclusion

Successfully implemented Lists, Keys, `map()` function, and Conditional Rendering in React by displaying Books, Blogs, and Courses in separate sections.

