import React from 'react';
import firebase from 'firebase/app';
import { Button } from 'rbx';
import { timeParts, hasConflict, terms } from './times.js'

const firebaseConfig = {
    apiKey: "AIzaSyBBofV2uz4unG7JWrvTnCLjb3J8SJjGqgA",
    authDomain: "quick-react-data-ad8b2.firebaseapp.com",
    databaseURL: "https://quick-react-data-ad8b2.firebaseio.com",
    projectId: "quick-react-data-ad8b2",
    storageBucket: "quick-react-data-ad8b2.appspot.com",
    messagingSenderId: "515621798921",
    appId: "1:515621798921:web:b9cd67fa8fa4db018464d8",
    measurementId: "G-V4ZLF0DLVG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const buttonColor = selected => (
    selected ? 'success' : null
)

const saveCourse = (course, meets) => {
    db.child('courses').child(course.id).update({ meets })
        .catch(error => alert(error));
};

const moveCourse = course => {
    const meets = prompt('Enter new meeting data, in this format:', course.meets);
    if (!meets) return;
    const { days } = timeParts(meets);
    if (days) saveCourse(course, meets);
    else moveCourse(course);
};

const getCourseNumber = course => (
    course.id.slice(1, 4)
)

const getCourseTerm = course => (
    terms[course.id.charAt(0)]
);

const Course = ({ course, state, user }) => (
    <Button color={buttonColor(state.selected.includes(course))}
        onClick={() => state.toggle(course)}
        onDoubleClick={user ? () => moveCourse(course) : null}
        disabled={hasConflict(course, state.selected)}
    >
        {getCourseTerm(course)} CS {getCourseNumber(course)}: {course.title}
    </Button>
);

export { db, buttonColor, getCourseTerm };
export default Course;