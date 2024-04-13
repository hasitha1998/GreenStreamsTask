import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

// Components
// import Header from "../components/Header";
// import Footer from "../components/Footer";

//pages
import{
Home,
Teacher,
TeacherSignUp
    

}from "../pages"



const AppRoutes=() =>{
  return (
    <>
        <Router>
            <Routes>
                {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/teacher-login" element={<Teacher />} />
            <Route path="/teacher-signup" element={<TeacherSignUp />} />
            </Routes>
            </Router>
    </>
  )
}
export default AppRoutes;