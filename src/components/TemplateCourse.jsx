import React from 'react';


const TemplateCourse = (props) => {
    return (
      <div className="post">
        <div>
          <strong>{props.money.txt}</strong>
          <div>{props.money.rate} UAH</div>
        </div>
      </div> 
    );
};

export default TemplateCourse;