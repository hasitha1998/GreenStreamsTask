import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Change the port according to your server configuration

class TeacherAPI {
  // Teacher login
  static login(values) {
    return axios.post(`${BASE_URL}/api/teachers/login`, values);
  }

  // Teacher Register
  static register(values) {
    return axios.post(`${BASE_URL}/api/teachers/register`, values);
  }

  // Get all Teachers
  static getTeachers() {
    return axios.get(`${BASE_URL}/api/teachers`);
  }

  // Get one Teacher
  static getOneTeacher(id) {
    return axios.get(`${BASE_URL}/api/teachers/${id}`);
  }

  // Edit Teacher
  static editTeacher(id, newTeacher) {
    return axios.put(`${BASE_URL}/api/teachers/update/${id}`, newTeacher);
  }

  // Delete Teacher
  static deleteTeacher(id) {
    return axios.delete(`${BASE_URL}/api/teachers/delete/${id}`);
  }
}

export default TeacherAPI;
