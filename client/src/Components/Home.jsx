import { useState, useEffect } from "react";
import { EmployeeBaseUrl } from "../../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Home = () => {
  const [employeeForm, setEmployeeForm] = useState({
    EmployeeName: "",
    JobTitle: "",
    Sallary: "",
    Address: "",
    JoiningDate: "",
    ContactNo: "",
    Gender: "",
    Age: "",
  });



  const [employeeList, setEmployeeList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllemployeeList = async () => {
    try {
      const { data } = await EmployeeBaseUrl.get("/");
      setEmployeeList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllemployeeList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !employeeForm.EmployeeName ||
    !employeeForm.JobTitle ||
    !employeeForm.Sallary ||
    !employeeForm.Address ||
    !employeeForm.JoiningDate ||
    !employeeForm.ContactNo ||
    !employeeForm.Gender ||
    !employeeForm.Age
  ) {
    alert("All fields are required");
    return;
  }

  try {
    let response;

    if (isUpdating) {
      // UPDATE
      response = await EmployeeBaseUrl.put(
        "/updatedetail",
        employeeForm
      );
    } else {
      // CREATE
      response = await EmployeeBaseUrl.post(
        "/adddata",
        employeeForm
      );
    }

    if (response.data?.sucess) {
      alert(isUpdating ? "Employee updated" : "Employee added");

      setEmployeeForm({
        EmployeeName: "",
        JobTitle: "",
        Sallary: "",
        Address: "",
        JoiningDate: "",
        ContactNo: "",
        Gender: "",
        Age: "",
      });

      setIsUpdating(false);

      getAllemployeeList(); // ⭐ THIS LINE MAKES AUTO-REFRESH WORK
    }
  } catch (error) {
    console.log(error);
  }
};




  const handleDelete = async (id) => {
    try {
      const { data } = await EmployeeBaseUrl.post("/deletedata", {
        id: id,
      });
      if (data?.sucess) {
        alert("Employee Delete");
        getAllemployeeList();
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting employee");
    }
  };




const handleUpdate = (data) => {
  setEmployeeForm({
    _id: data._id, // ⭐ REQUIRED LINE
    EmployeeName: data.EmployeeName,
    JobTitle: data.JobTitle,
    Sallary: data.Sallary,
    Address: data.Address,
    JoiningDate: data.JoiningDate,
    ContactNo: data.ContactNo,
    Gender: data.Gender,
    Age: data.Age,
  });
  setIsUpdating(true);
};


  console.log("employeeForm", employeeForm);

  return (
    <div className="w-full px-6 py-6 bg-white">
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Employee Name
          </label>
          <input
            type="text"
            placeholder="Employee Name"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="EmployeeName"
            value={employeeForm.EmployeeName}
            onChange={handleFormChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Job Title"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="JobTitle"
            value={employeeForm.JobTitle}
            onChange={handleFormChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Salary ($)
          </label>
          <input
            type="number"
            placeholder="Salary"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            name="Sallary"
            value={employeeForm.Sallary}
            onChange={handleFormChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="Address"
            value={employeeForm.Address}
            onChange={handleFormChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Joining Date
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="JoiningDate"
            value={employeeForm.JoiningDate}
            onChange={handleFormChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Contact No.
          </label>
          <input
            type="number"
            placeholder="Mobile No."
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="ContactNo"
            value={employeeForm.ContactNo}
            onChange={handleFormChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="Gender"
            value={employeeForm.Gender}
            onChange={handleFormChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            placeholder="Age"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="Age"
            value={employeeForm.Age}
            onChange={handleFormChange}
          />
        </div>

        <div className="lg:col-span-6 flex justify-end">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-700 transition cursor-pointer "
          >
            Submit
          </button>
        </div>
      </form>

      <div className="w-full mt-10 overflow-x-auto">
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                Employee Name
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                Job Titel
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                Sallary
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                Address
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                Joining Date
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                Contact No.
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                Gender
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                Age
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700"></th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {employeeList?.map((Employee, index) => {
              return (
                <tr className="hover:bg-gray-50" key={index}>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap">
                    {Employee?.EmployeeName}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap">
                    {Employee?.JobTitle}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap">
                    {Employee?.Sallary}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap">
                    {Employee?.Address}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap">
                    {Employee?.JoiningDate}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap">
                    {Employee?.ContactNo}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap">
                    {Employee?.Gender}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap">
                    {Employee?.Age}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 whitespace-nowrap text-center">
                    <div className="flex gap-4 justify-center items-center">
                      <div
                        className="text-red-600 cursor-pointer bg-gray-50 hover:scale-110 transition"
                        onClick={() => handleDelete(Employee._id)}
                      >
                        <MdDelete title="Delete" />
                      </div>

                      <div
                        className="text-blue-600 cursor-pointer  hover:scale-110 transition"
                        onClick={() => {
                          handleUpdate(Employee);
                        }}
                      >
                        <FaPen title="Edit" />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;