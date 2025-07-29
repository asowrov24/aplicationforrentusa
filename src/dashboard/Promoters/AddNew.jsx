import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddNew = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        trackingCode: '',
        referralLink: '',
    });

    // Dynamically update referral link when name changes
    useEffect(() => {
        const baseURL = "https://aplicationforrentusa.vercel.app/";
        const cleanName = formData.name.trim().toLowerCase().replace(/\s+/g, '-');
        const referralLink = `${baseURL}/?ref=${cleanName}`;
        setFormData(prev => ({ ...prev, referralLink }));
    }, [formData.name]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("https://rentforusanesus-server.vercel.app/promoters", formData);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Promoter added successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/promoters');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    timer: 1500
                });
            }
        } catch (err) {
            console.error("Submission error:", err);
            Swal.fire({
                icon: "error",
                title: "Server error!",
                text: "Please try again later.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-base-100 rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Add New Promoter</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="label font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    {/* Tracking Code */}
                    <div>
                        <label className="label font-medium">Tracking Code</label>
                        <input
                            type="text"
                            name="trackingCode"
                            value={formData.trackingCode}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Optional"
                        />
                    </div>

                    {/* Referral Link (Readonly) */}
                    <div>
                        <label className="label font-medium">Referral Link</label>
                        <input
                            type="text"
                            name="referralLink"
                            value={formData.referralLink}
                            readOnly
                            className="input input-bordered w-full bg-base-200 text-sm text-gray-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 text-center">
                        <button type="submit" className="btn btn-primary w-full">
                            Save Promoter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNew;
