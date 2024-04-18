import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

// Components
// import Header from "../components/Header";
// import Footer from "../components/Footer";
import Header from './../components/Header';

//pages
import{


Home,
Teacher,
TeacherSignUp,
CourseCreate,
ViewAllCourse,
PaymentPage,
EnrolledCourses,
StudentLogin,
StudentSignUp,
StudentDashboard,
StudentProfileCard,
TeacherDashboard,
TeacherViewAllCourse,
ViewOneCourse,
ViewAllHomework


}from "../pages"



const AppRoutes=() =>{
  return (
    <>
        <Router>
<Header/>
            <Routes>
                {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/teacher-login" element={<Teacher />} />
            <Route path="/teacher-signup" element={<TeacherSignUp />} />
            <Route path="/create-course" element={<CourseCreate />} />
            <Route path="/view-all-course" element={<ViewAllCourse />} />
            <Route path="/teacher-view-all-course" element={<TeacherViewAllCourse />} />
            <Route path="/enroll-course" element={<ViewAllCourse />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/student-login" element={<StudentLogin/>} />
            <Route path="/student-signup" element={<StudentSignUp/>} />
            <Route path="/student-dashboard" element={<StudentDashboard/>} />
            <Route path="/student-profile-card" element={<StudentProfileCard/>} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard/>} />
            <Route path="/view-one-course" element={<ViewOneCourse/>} />
            <Route path="/view-all-homework" element={<ViewAllHomework/>} />
            </Routes>
            </Router>
    </>
  )
}
export default AppRoutes;