import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { NavLink } from "react-router";

const AdminVideo = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get("/problem/allproblems");
      setProblems(data);
    } catch (err) {
      setError("Failed to fetch problems");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete video solution of this problem?")) return;

    try {
      await axiosClient.delete(`/video/delete/${id}`);

      // Show success popup
      setShowToast(true);

      // Refresh list
      fetchProblems();

      // Auto hide toast
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError("Failed to delete video");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">

      {/* ✅ SUCCESS TOAST POPUP */}
      {showToast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success">
            <span>Video deleted successfully 🎉</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-6 mb-10">
        <h1 className="text-3xl font-bold">Upload and Delete any Video Solution</h1>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
              <th>Upload</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem._id}>
                <th>{index + 1}</th>
                <td>{problem.title}</td>
                <td>
                  <span
                    className={`badge ${
                      problem.difficulty === "Easy"
                        ? "badge-success"
                        : problem.difficulty === "Medium"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td>
                  <span className="badge badge-outline">
                    {problem.tags}
                  </span>
                </td>

                <td>
                  {/* // Upload button par click karne par navigate to  */}

                  <NavLink
                    to={`/admin/upload/${problem._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Upload
                  </NavLink>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(problem._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVideo;
