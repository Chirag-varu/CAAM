import { useState } from "react";
import axios from "axios";

interface SubjectMarks {
  [key: string]: { min: number; max: number };
}

const CollegeDetails = () => {
  const [collegeID, setCollegeID] = useState("C123");
  const [collegeName, setCollegeName] = useState("Sample College");
  const [collegeAddress, setCollegeAddress] = useState("123 College St, City");
  const [subjectList, setSubjectList] = useState(["Mathematics"]);
  const [newSubject, setNewSubject] = useState("");
  const [feeStructure, setFeeStructure] = useState<{ [key: string]: { [key: string]: number } }>({});
  const [newCourse, setNewCourse] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newFeeName, setNewFeeName] = useState("");
  const [subjectMarks, setSubjectMarks] = useState<SubjectMarks>({});
  const [newMinMarks, setNewMinMarks] = useState<number>(0);
  const [newMaxMarks, setNewMaxMarks] = useState<number>(100);

  const handleAddFee = () => {
    if (newCourse.trim() && newFeeName.trim() && newAmount.trim() && !isNaN(Number(newAmount))) {
      setFeeStructure((prev) => ({
        ...prev,
        [newCourse]: {
          ...(prev[newCourse] || {}),
          [newFeeName]: parseInt(newAmount),
        },
      }));
      setNewFeeName("");
      setNewAmount("");
    } else {
      alert("Please enter valid course name, fee name, and amount.");
    }
  };

  const handleSubjectMarksChange = (
    subject: string,
    type: "min" | "max",
    value: number
  ) => {
    const updatedMarks = { ...subjectMarks };
    updatedMarks[subject] = updatedMarks[subject] || { min: 0, max: 0 }; // Ensure subject exists
    updatedMarks[subject][type] = value;
    setSubjectMarks(updatedMarks);
  };

  const handleAddSubject = () => {
    if (newSubject && !subjectMarks[newSubject]) {
      setSubjectMarks({
        ...subjectMarks,
        [newSubject]: { min: 0, max: 100 }, // Set default marks for new subject
      });
      setSubjectList([...subjectList, newSubject]);
      setNewSubject(""); // Clear the new subject input
    }
  };

  const handleSaveCollege = async (e: any) => {
    e.preventDefault();

    const subjects = Object.entries(subjectMarks).map(([subjectName, marks]) => ({
      subjectName,
      marks: { min: marks.min, max: marks.max },
    }));

    const courses = Object.entries(feeStructure).map(([courseName, fees]) => ({
      courseName,
      subject: subjects,
      fees: Object.entries(fees).map(([title, amount]) => ({ title, amount })),
    }));

    const collegeData = {
      collegeID,
      collegeName,
      address: collegeAddress,
      courses,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/college/add", collegeData);
      console.log("College added successfully:", response.data);
      // alert("College saved successfully!");
    } catch (error: any) {
      console.error("Error saving college details:", error);
      alert("Error saving college details. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">College Details</h2>

      {/* College ID */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College ID:
        </label>
        <input
          type="text"
          value={collegeID}
          onChange={(e) => setCollegeID(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* College Name */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College Name:
        </label>
        <input
          type="text"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* College Address */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College Address:
        </label>
        <input
          type="text"
          value={collegeAddress}
          onChange={(e) => setCollegeAddress(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* Subject Marks (Min and Max) */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">Subject Marks (Min/Max):</label>

        {/* Course Name Input */}
        <div className="mt-4 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="text"
            placeholder="Subject Name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="number"
            placeholder="Min Marks"
            value={newMinMarks}
            onChange={(e) => setNewMinMarks(parseInt(e.target.value))}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="number"
            placeholder="Max Marks"
            value={newMaxMarks}
            onChange={(e) => setNewMaxMarks(parseInt(e.target.value))}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            onClick={handleAddSubject}
            className="p-3 bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Display Courses and Their Subjects */}
        <div className="mt-6">
          {Object.keys(subjectMarks).length > 0 ? (
            Object.entries(subjectMarks).map(([subject, marks]) => (
              <div key={subject} className="mt-4">
                <h3 className="text-xl font-medium text-gray-700 mb-2">{subject}</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Min Marks</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Max Marks</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={subject}>
                      <td className="border border-gray-300 px-4 py-2">{subject}</td>
                      <td className="border border-gray-300 px-4 py-2">{marks.min}</td>
                      <td className="border border-gray-300 px-4 py-2">{marks.max}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() =>
                            setSubjectMarks((prev) => {
                              const newMarks = { ...prev };
                              delete newMarks[subject];
                              return newMarks;
                            })
                          }
                          className="p-2 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>No subjects available</p>
          )}
        </div>
      </div>

      {/* Fee Structure */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Fee Structure (Add Fees):
        </label>

        <div className="mt-4 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="text"
            placeholder="Fee Name"
            value={newFeeName}
            onChange={(e) => setNewFeeName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            onClick={handleAddFee}
            className="p-3 bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="mt-6">
          {Object.keys(feeStructure).length > 0 ? (
            Object.entries(feeStructure).map(([course, fees]) => (
              <div key={course} className="mt-4">
                <h3 className="text-xl font-medium text-gray-700 mb-2">{course}</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Fee Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(fees).map(([feeName, amount]) => (
                      <tr key={feeName}>
                        <td className="border border-gray-300 px-4 py-2">{feeName}</td>
                        <td className="border border-gray-300 px-4 py-2">{amount}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={() =>
                              setFeeStructure((prev) => {
                                const newStructure = { ...prev };
                                delete newStructure[course][feeName];
                                if (Object.keys(newStructure[course]).length === 0) {
                                  delete newStructure[course];
                                }
                                return newStructure;
                              })
                            }
                            className="p-2 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No courses or fees added yet.</p>
          )}
        </div>
      </div>

      {/* Save College Button */}
      <div className="mt-8">
        <button
          onClick={handleSaveCollege}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Save College
        </button>
      </div>
    </div>
  );
};

export default CollegeDetails;
