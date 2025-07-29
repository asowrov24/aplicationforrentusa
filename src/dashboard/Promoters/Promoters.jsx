import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';

const Promoters = () => {
  const [promoters, setPromoters] = useState([]);

  useEffect(() => {
    const fetchPromoters = async () => {
      try {
        const res = await axios.get('https://rentforusanesus-server.vercel.app/promoters');
        setPromoters(res.data);
      } catch (error) {
        console.error("Failed to fetch promoters:", error);
      }
    };
    fetchPromoters();
  }, []);

  const handleCopy = (link) => {
    if (!link) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No referral link available to copy!',
      });
    }

    navigator.clipboard.writeText(link)
      .then(() => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Referral link copied!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to copy the link!',
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the promoter permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://rentforusanesus-server.vercel.app/promoters/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setPromoters((prev) => prev.filter((p) => p._id !== id));
              Swal.fire("Deleted!", "Promoter has been deleted.", "success");
            }
          });
      }
    });
  };

  const reversedPromoters = [...promoters].reverse();

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">All Promoters</h1>
          <Link to="/dashboard/add-new-promoters">
            <button className="btn btn-primary">Add New Promoters</button>
          </Link>
        </div>

        <div className="overflow-x-auto bg-base-100 rounded-md shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300 text-base-content text-sm">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Tracking Code</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reversedPromoters.length > 0 ? (
                reversedPromoters.map((promoter, index) => (
                  <tr key={promoter._id} className="hover">
                    <td>{index + 1}</td>
                    <td className="font-semibold">{promoter.name}</td>
                    <td>{promoter.email}</td>
                    <td>{promoter.trackingCode || '—'}</td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleCopy(promoter.referralLink)}
                          aria-label={`Copy referral link for ${promoter.name}`}
                        >
                          Copy Link
                        </button>
                        <button
                          className="btn btn-sm btn-error text-white"
                          onClick={() => handleDelete(promoter._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No promoters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Promoters;
