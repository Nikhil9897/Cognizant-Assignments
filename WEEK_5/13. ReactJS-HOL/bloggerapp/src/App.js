import "./App.css";

import BookDetails from "./BookDetails";
import BlogDetails from "./BlogDetails";
import CourseDetails from "./CourseDetails";

function App() {

  const showBooks = true;
  const showBlogs = true;
  const showCourses = true;

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "40px"
      }}
    >

      {showCourses && <CourseDetails />}

      {showBooks && <BookDetails />}

      {showBlogs && <BlogDetails />}

    </div>

  );

}

export default App;