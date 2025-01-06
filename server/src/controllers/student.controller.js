import StudentDetails from "../models/StudentDetail.model.js";
import Student from "../models/Student.model.js";
import cloudinary from "../lib/cloudinary.js";

export const fillDetails = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const studentId = req.user._id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const collegeId = student.collegeId;

    const {
      fullName,
      dob,
      gender,
      phone,
      parentName,
      parentPhone,
      address,
      lastInstitution,
      score,
      course,
      documents,
    } = req.body;

    if (
      !fullName ||
      !dob ||
      !gender ||
      !phone ||
      !parentName ||
      !parentPhone ||
      !address ||
      !lastInstitution ||
      !score ||
      !course ||
      documents.length != 4
    ) {
      return res.status(400).json({
        error: "Missing required fields. Please provide all the details.",
      });
    }

    const documentNames = documents.map((doc) => doc.name);
    console.log("doc: ", documentNames);

    const uploadedDocuments = [
      "https://imgs.search.brave.com/-6m42ynm58p0k-xryfu4fs92EBa3bjTKjBVkeNKfs30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN1bHRzLWV2YWx1/YXRlLXByb2dyZXNz/LW91dGNvbWUtcHJv/ZHVjdGl2aXR5LWNv/bmNlcHRfNTM4NzYt/MTIxMTMxLmpwZz9z/ZW10PWFpc19oeWJy/aWQ",
      "https://imgs.search.brave.com/-6m42ynm58p0k-xryfu4fs92EBa3bjTKjBVkeNKfs30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN1bHRzLWV2YWx1/YXRlLXByb2dyZXNz/LW91dGNvbWUtcHJv/ZHVjdGl2aXR5LWNv/bmNlcHRfNTM4NzYt/MTIxMTMxLmpwZz9z/ZW10PWFpc19oeWJy/aWQ",
      "https://imgs.search.brave.com/-6m42ynm58p0k-xryfu4fs92EBa3bjTKjBVkeNKfs30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN1bHRzLWV2YWx1/YXRlLXByb2dyZXNz/LW91dGNvbWUtcHJv/ZHVjdGl2aXR5LWNv/bmNlcHRfNTM4NzYt/MTIxMTMxLmpwZz9z/ZW10PWFpc19oeWJy/aWQ",
      "https://imgs.search.brave.com/-6m42ynm58p0k-xryfu4fs92EBa3bjTKjBVkeNKfs30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZXN1bHRzLWV2YWx1/YXRlLXByb2dyZXNz/LW91dGNvbWUtcHJv/ZHVjdGl2aXR5LWNv/bmNlcHRfNTM4NzYt/MTIxMTMxLmpwZz9z/ZW10PWFpc19oeWJy/aWQ",
    ];
    // for (const doc of documents) {
    //   const uploadResponse = await cloudinary.uploader.upload(doc.path, {
    //     folder: "student_documents",
    //   });
    //   uploadedDocuments.push(uploadResponse.secure_url);
    // };

    const studentDetails = new StudentDetails({
      studentId,
      fullName,
      dob,
      gender,
      phone,
      parentName,
      parentPhone,
      address,
      lastInstitution,
      score: parseFloat(score),
      collegeId: collegeId,
      course,
      documents: uploadedDocuments,
      walletBalance: 0,
    });

    console.log("hello: ", studentDetails);

    try {
      await studentDetails.save();
      console.log("Saved successfully!");
    } catch (error) {
      console.error("Error saving student details:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(201).json({ message: "Student details saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
