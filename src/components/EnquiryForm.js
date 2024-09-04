import React, { useState } from "react";
import axios from "axios";

const EnquiryForm = ({ course, onCloseForm }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    axios
      .post("http://localhost:5000/enquiries", { ...formData, courseId: course.id })
      .then(() => {
        setMessage("Enquiry submitted successfully!");
        setLoading(false);
        setFormData({ name: "", email: "" });
        setTimeout(onCloseForm, 2000); // Close form after 2 seconds
      })
      .catch(() => {
        setMessage("Error submitting enquiry. Please try again.");
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enquire about {course.name}</h3>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button type="button" onClick={onCloseForm}>
        Cancel
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EnquiryForm;
