import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import EnquiryForm from "./EnquiryForm";

// Set the root element for the modal
Modal.setAppElement("#root");

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/b/66d87ebaad19ca34f89ff415") // Replace with your actual URL
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching courses. Please try again.");
        setLoading(false);
      });
  }, []);
  
  

  const handleEnquire = (course) => {
    setSelectedCourse(course);
    setModalIsOpen(true);
  };

  const handleCloseForm = () => {
    setModalIsOpen(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="course-list">
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <button onClick={() => handleEnquire(course)}>Enquire</button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseForm}
        contentLabel="Enquiry Form"
        className="enquiry-modal"
        overlayClassName="enquiry-overlay"
      >
        {selectedCourse && (
          <EnquiryForm course={selectedCourse} onCloseForm={handleCloseForm} />
        )}
      </Modal>
    </div>
  );
};

export default CourseList;
