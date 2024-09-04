import React, { useState, useEffect } from "react";
import axios from "axios";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/enquiries")
      .then((response) => {
        setEnquiries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching enquiries. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading enquiries...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="enquiry-list">
      <h1>User Enquiries</h1>
      <ul>
        {enquiries.map((enquiry) => (
          <li key={enquiry.id}>
            <p>
              <strong>Course ID:</strong> {enquiry.courseId}
            </p>
            <p>
              <strong>Name:</strong> {enquiry.name}
            </p>
            <p>
              <strong>Email:</strong> {enquiry.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnquiryList;
