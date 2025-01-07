import { useState } from "react";

const CollegeCourses = () => {
  const [courses, setCourses] = useState<string[]>([]);
  const [newCourse, setNewCourse] = useState<string>("");

  const handleAddCourse = () => {
    if (newCourse.trim()) {
      setCourses([...courses, newCourse.trim()]);
      setNewCourse("");
    }
  };

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Manage Courses</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Enter new course"
          className="border p-2 mr-2 rounded w-full"
        />
        <button
          onClick={handleAddCourse}
          className="bg-[#9c231b] text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
      </div>
      <ul className="list-disc pl-5">
        {courses.map((course, index) => (
          <li key={index} className="flex justify-between items-center">
            {course}
            <button
              onClick={() => handleRemoveCourse(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollegeCourses;
