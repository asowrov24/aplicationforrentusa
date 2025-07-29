import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const OtpForm = () => {
  const [optCode, setOptCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // Status check on page load
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `https://rentforusanesus-server.vercel.app/apply/${id}`
        );

        if (res.data?.status === "approved") {
          setDisabled(true);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!optCode) {
      Swal.fire("Error", "Please enter OTP", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        `https://rentforusanesus-server.vercel.app/apply/status/${id}`,
        { optCode }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Application approved successfully!", "success");
        setDisabled(true); // Disable permanently
      } else {
        Swal.fire("Error", "No record updated!", "error");
      }

      setLoading(false);
    } catch (error) {
      console.error("OTP Submit Error:", error);
      Swal.fire("Error", "Something went wrong while submitting OTP", "error");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-4">OTP Submission</h2>
        <p className="text-gray-600 mb-2">Enter the OTP sent to your phone/email</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            maxLength={6}
            value={optCode}
            onChange={(e) => setOptCode(e.target.value)}
            placeholder="Enter OTP"
            className="input input-bordered w-full text-center tracking-widest"
            required
            disabled={disabled}
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading || disabled}
          >
            {disabled
              ? "Already Submitted"
              : loading
                ? "Submitting..."
                : "Submit OTP"}
          </button>
        </form>

        {/* Add your text here */}
        <p className="mt-4 text-sm font-bold text-gray-500">
          Enter the appointment confirmation code here which will be sent to your email or&nbsp;number&nbsp;shortly.
        </p>
      </div>
    </div>
  );

};

export default OtpForm;
