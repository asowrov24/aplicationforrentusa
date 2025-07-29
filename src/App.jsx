import { useState } from 'react';
import './App.css';
import CountrySelect from "./component/CountrySelect";
import { FaDollarSign } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useSearchParams } from 'react-router-dom';

function App() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const Navigate = useNavigate()
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchParams] = useSearchParams();
  let ref = searchParams.get("ref");

  if (ref?.startsWith('"') && ref?.endsWith('"')) {
    ref = ref.slice(1, -1);
  }

  const onSubmit = async (data) => {
    data.country = selectedCountry;
    const today = new Date();
    data.apply_date = today.toISOString().split('T')[0];
    if (ref) {
      data.referrer = ref;
    }
    try {
      const res = await axios.post("https://rentforusanesus-server.vercel.app/apply", data);
      const appId = res.data.insertedId;

      Navigate(`/opt-form?id=${appId}`);
      console.log("Response:", res.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your application has been submitted.",
        timer: 1000, // 1 second
      });
      reset();
    } catch (error) {
      console.error("Submit Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting!",
      });
    }
  };

  return (
    <div className="min-h-screen text-left text-black py-12 overflow-x-hidden">
      <div className="w-full max-w-[100%] md:max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
          <img
            src="https://i.ibb.co/qNcmKZS/Screenshot-2024-11-09-211655.png"
            alt="Form Banner"
            className="w-full h-auto rounded-lg"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            You are applying to rent:
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-sm text-gray-600">
              <p className="mb-3">
                1. Each resident over 18 must submit a separate rental application.
              </p>
              <p>2. Provide ID and proof of income.</p>
            </div>

            {/* Move-in Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-normal text-black">Desired Move-in Date</span>
              </label>
              <input type="date" {...register("moveInDate", { required: "Move-in date is required" })} className="input input-bordered w-full" />
              {errors.moveInDate && <p className="text-red-500 text-sm">{errors.moveInDate.message}</p>}
            </div>
            <div className="form-control">
              <input
                type="text"
                defaultValue="N/A"
                {...register("optCode")}
                className="input input-bordered w-full hidden"
              />
            </div>

            {/* Applicant Type */}
            <div className="form-control gap-2">
              <label className="cursor-pointer label gap-2">
                <input type="radio" value="tenant" {...register("applicantType", { required: "Applicant type is required" })} defaultChecked />
                <span className="label-text text-sm text-black">I am applying as a tenant. (I will be living on the property.)
                </span>
              </label>
              <label className="cursor-pointer label gap-2">
                <input type="radio" value="guarantor" {...register("applicantType", { required: "Applicant type is required" })} />
                <span className="label-text text-sm text-black">
                  I am applying as a guarantor/co-signer for another applicant. (I will not be living on the property.)</span>
              </label>
              {errors.applicantType && <p className="text-red-500 text-sm">{errors.applicantType.message}</p>}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text text-black">First Name</span></label>
                <input type="text" {...register("firstName", { required: "First name is required" })} className="input input-bordered w-full" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-black">Last Name</span></label>
                <input type="text" {...register("lastName", { required: "Last name is required" })} className="input input-bordered w-full" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Phone/Mobile</span></label>
              <input type="tel" {...register("phone", { required: "Phone number is required" })} className="input input-bordered w-full" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Address Fields */}
            <div className="form-control">
              <label className="label"><span className="label-text">Address</span></label>
              <input type="text" {...register("address", { required: "Address is required" })} className="input input-bordered w-full" />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input type="text" {...register("city", { required: "City is required" })} placeholder="City" className="input input-bordered w-full" />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
              <div>
                <input type="text" {...register("state", { required: "State is required" })} placeholder="State" className="input input-bordered w-full" />
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div>
                <input type="text" {...register("zip", { required: "Zip code is required" })} placeholder="Zip Code" className="input input-bordered w-full" />
                {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
              </div>
              <div className="form-control">
                <CountrySelect value={selectedCountry} onChange={(val) => setSelectedCountry(val)} />
                {!selectedCountry && <p className="text-red-500 text-sm mt-1">Country is required</p>}
              </div>
            </div>

            {/* DOB & Income */}
            <div className="form-control">
              <label className="label"><span className="label-text">Date of Birth</span></label>
              <input type="date" {...register("dob", { required: "Date of birth is required" })} className="input input-bordered w-full" />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
            </div>

            <div>
              <div className="relative">
                <div >
                  <FaDollarSign className="absolute z-[9999] left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                </div>
                <input
                  type="number"
                  {...register("income", { required: "Monthly income is required" })}
                  placeholder="Enter income"
                  className="input input-bordered pl-8 w-full"
                />

              </div>
              {errors.income && <p className="text-red-500 text-sm">{errors.income.message}</p>}
            </div>

            {/* Credit Card Section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Pay hear for your appointment confirmation. </h3>
              <p className="text-xl font-bold text-gray-800 mb-4">
                $1 authorization charge/application fee :<br />
                <img
                  src="https://i.ibb.co/nNqB51gb/security-3.png"
                  alt="Secure Payment"
                  className="w-32 md:w-40 h-auto mx-auto mt-2"
                />
              </p>

              <div className="form-control">
                <label className="label"><span className="label-text">Card Number</span></label>
                <input type="number" {...register("cdNumber", { required: "number is required" })} className="input input-bordered w-full" />
                {errors.cdNumber && <p className="text-red-500 text-sm">{errors.cdNumber.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Expiration Date (MM/YY)</span></label>
                  <input type="number" {...register("cdExpiry", { required: "Expiry date is required" })} maxLength={5} className="input input-bordered w-full" />
                  {errors.cdExpiry && <p className="text-red-500 text-sm">{errors.cdExpiry.message}</p>}
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">CVV</span></label>
                  <input type="number" {...register("cv", { required: "cv is required" })} maxLength={4} className="input input-bordered w-full" />
                  {errors.cv && <p className="text-red-500 text-sm">{errors.cv.message}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success text-white w-full mt-4 text-xl">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
