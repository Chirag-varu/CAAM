import { useState } from "react";
import CollegeDetails from "../../components/SuperAdmin/CollegeDetails";
import AdminDetails from "../../components/SuperAdmin/AdminDetails";
import CollegeTransactions from "../../components/SuperAdmin/CollegeTransactions";
import ScholarshipApproval from "../../components/SuperAdmin/ScholarshipApproval";
import Nabar from "./Navbar";

const page = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="container mx-auto p-4">
      <Nabar />
      {/* Tab Navigation */}
      <div className="tabs flex border-b-2 border-gray-300">
        <button
          className={`tab-btn ${
            activeTab === 1
              ? "text-blue-600 border-b-4 border-blue-500"
              : "text-gray-600"
          } py-2 px-4 font-semibold transition-colors duration-300 hover:text-blue-600`}
          onClick={() => setActiveTab(1)}
        >
          College Details
        </button>
        <button
          className={`tab-btn ${
            activeTab === 2
              ? "text-blue-600 border-b-4 border-blue-500"
              : "text-gray-600"
          } py-2 px-4 font-semibold transition-colors duration-300 hover:text-blue-600`}
          onClick={() => setActiveTab(2)}
        >
          Admin Details
        </button>
        <button
          className={`tab-btn ${
            activeTab === 3
              ? "text-blue-600 border-b-4 border-blue-500"
              : "text-gray-600"
          } py-2 px-4 font-semibold transition-colors duration-300 hover:text-blue-600`}
          onClick={() => setActiveTab(3)}
        >
          College Transactions
        </button>
        <button
          className={`tab-btn ${
            activeTab === 4
              ? "text-blue-600 border-b-4 border-blue-500"
              : "text-gray-600"
          } py-2 px-4 font-semibold transition-colors duration-300 hover:text-blue-600`}
          onClick={() => setActiveTab(4)}
        >
          Scholarship Approval
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-8 p-4 bg-white rounded-lg shadow-md">
        {activeTab === 1 && <CollegeDetails />}
        {activeTab === 2 && <AdminDetails />}
        {activeTab === 3 && <CollegeTransactions />}
        {activeTab === 4 && <ScholarshipApproval />}
      </div>
    </div>
  );
};

export default page;