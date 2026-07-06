import React from "react";
import { courses } from "./Courses";

function CourseDetails() {

    return (

        <div>

            <h1>Course Details</h1>

            {

                courses.map((course) => (

                    <div key={course.id}>

                        <h3>{course.cname}</h3>

                        <p>{course.date}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default CourseDetails;