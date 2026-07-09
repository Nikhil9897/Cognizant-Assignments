import React from "react";
import { blogs } from "./Blogs";

function BlogDetails() {

    return (

        <div>

            <h1>Blog Details</h1>

            {

                blogs.map((blog) => (

                    <div key={blog.id}>

                        <h3>{blog.title}</h3>

                        <h5>{blog.author}</h5>

                        <p>{blog.content}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default BlogDetails;