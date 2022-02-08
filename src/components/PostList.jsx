import React from 'react';
import TemplateCourse from './TemplateCourse';

const PostList = ({posts}) => {
    return (
        <div>
        <h1>Курс валют</h1>
         {posts.map(post => 
         <TemplateCourse money={post} key={post.r030} ></TemplateCourse>
        )}
        </div>
    );
};

export default PostList;