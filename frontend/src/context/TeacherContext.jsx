import React, { createContext, useContext, useState, useEffect } from 'react';
import TeacherAPI from './api/teacherApi';

const TeacherContext = createContext();

export const useTeacherContext = () => useContext(TeacherContext);

export const TeacherProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState({
    teacherName: "",
    teacherEmail: "",
    teacherPassword: "",
    profilePic: "",
  });

  const teacherLogin = async (teacherEmail, teacherPassword) => {
    try {
      const response = await TeacherAPI.login(teacherEmail, teacherPassword);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setTeachers(data.teachers);
        console.log('Login successful. Response:', data);
        console.log('Email:', teacherEmail);
      } else {
        console.error('Login failed. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token retrieved from local storage:', token);
    }
  }, []);

  const teacherRegister = async (teacherData) => {
    try {
      const response = await TeacherAPI.register(teacherData);
      setTeachers([...teachers, response.data]);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const getAllTeachers = async () => {
    try {
      const response = await TeacherAPI.getAll();
      setTeachers(response.data);
      console.log('Teachers fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const getOneTeacher = async (id) => {
    try {
      const response = await TeacherAPI.getOne(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher:', error);
      return null;
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await TeacherAPI.delete(id);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
      console.log('Teacher deleted successfully');
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <TeacherContext.Provider value={{ teachers, teacherLogin, getAllTeachers, getOneTeacher, deleteTeacher, teacher, setTeacher , teacherRegister}}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherContext;
