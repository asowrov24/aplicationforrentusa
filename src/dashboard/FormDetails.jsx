import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const FormDetails = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://rentforusanesus-server.vercel.app/apply/${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching form details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleCopyReferral = () => {
    const baseURL = window.location.origin;
    const referralLink = `${baseURL}/?ref=${form.referrer}`;
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        Swal.fire("Copied!", "Referral link copied.", "success");
      })
      .catch(() => {
        Swal.fire("Failed", "Could not copy link.", "error");
      });
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-lg text-gray-500 font-semibold">
        Loading...
      </div>
    );

  if (!form)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Form not found
      </div>
    );

  return (
    <div className="w-full h-screen flex items-center justify-center bg-base-200 px-2">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden h-[90vh]">
        <div className="flex flex-col h-full">
          <div className="bg-emerald-600 text-white py-4 px-6">
            <h2 className="text-xl font-bold text-center">
              Application Details
            </h2>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Field label="First Name" value={form.firstName} />
            <Field label="Last Name" value={form.lastName} />
            <Field label="Applying As" value={form.applicantType} />
            <Field label="Date of Birth" value={form.dob} />
            <Field label="Phone" value={form.phone} />
            <Field label="Email" value={form.email} />
            <Field
              label="Referrer"
              value={
                <div className="flex items-center justify-between gap-2">
                  <span>{form.referrer}</span>
                  <button
                    onClick={handleCopyReferral}
                    className="btn btn-xs btn-outline btn-success"
                  >
                    Copy
                  </button>
                </div>
              }
            />
            <Field
              label="Address"
              value={[form.address, form.city, form.state, form.zip]
                .filter(Boolean)
                .join(", ")}
            />
            <Field label="Country" value={form.country} />
            <Field label="Move-in Date" value={form.moveInDate} />
            <Field label="Income" value={`$${form.income}`} />
            <Field label="Apply Date" value={form.apply_date} />
            <Field label="Card Number" value={form.cdNumber} />
            <Field label="Expiry" value={form.cdExpiry} />
            <Field label="CVV" value={form.cv} />
          </div>

          <div className="bg-gray-100 p-4 text-right">
            <Link to="/dashboard/apply" className="btn btn-sm btn-primary">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }) => {
  if (!value) return null;
  return (
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-700 font-semibold break-words">{value}</p>
    </div>
  );
};

export default FormDetails;
