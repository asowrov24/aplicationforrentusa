import { useEffect, useState } from "react";

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isExpired, setIsExpired] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (timeLeft === 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isExpired) {
      alert("OTP expired. Please request a new one.");
      return;
    }

    // TODO: Submit OTP to server
    console.log("Submitted OTP:", otp);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-4">OTP Submission</h2>
        <p className="text-gray-600 mb-2">Enter the OTP sent to your phone/email</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="input input-bordered w-full text-center tracking-widest"
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isExpired}
          >
            {isExpired ? "OTP Expired" : "Submit OTP"}
          </button>

          <div className="text-sm text-gray-500 mt-3">
            Time remaining:{" "}
            <span className={`font-semibold ${isExpired ? "text-red-500" : ""}`}>
              {isExpired ? "Expired" : formatTime()}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
