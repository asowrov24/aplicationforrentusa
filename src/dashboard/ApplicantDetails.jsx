import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://rentforusanesus-server.vercel.app/apply")
      .then((res) => {
        setForms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching form data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary">Application Table</h1>
          <p className="text-sm text-gray-500 mt-2">
            List of all applicants and their information
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg bg-base-100">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300 text-base-content text-sm">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
                <th>Promoters</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {[...forms].reverse().map((form, index) => (
                <tr key={form._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-semibold">
                    {form.firstName} {form.lastName}
                  </td>
                  <td>{form.phone}</td>
                  <td>{form.email}</td>
                  <td>{form.apply_date}</td>
                  <td>{form.referrer}</td>
                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        to={`/dashboard/view/${form._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "This will delete the user permanently.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              axios
                                .delete(`https://rentforusanesus-server.vercel.app/apply/${form._id}`)
                                .then((res) => {
                                  if (res.data.deletedCount > 0) {
                                    setForms((prev) =>
                                      prev.filter((f) => f._id !== form._id)
                                    );
                                    Swal.fire(
                                      "Deleted!",
                                      "Info has been deleted.",
                                      "success"
                                    );
                                  }
                                });
                            }
                          });
                        }}
                        className="btn btn-sm btn-error text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {forms.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No applications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormList;
