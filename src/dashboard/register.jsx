import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            Swal.fire({
                title: "Passwords do not match",
                icon: "warning",
                confirmButtonColor: "#10B981",
            });
            return;
        }

        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    title: "Registration Successful!",
                    icon: "success",
                    confirmButtonColor: "#10B981",
                });
                navigate("/dashboard/apply");
            })
            .catch((err) => {
                Swal.fire({
                    title: "Registration Failed",
                    text: err.message,
                    icon: "error",
                    confirmButtonColor: "#10B981",
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-[#10B981] mb-6">
                    Admin Registration
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="admin@example.com"
                            className="input input-bordered w-full border-gray-300 focus:border-[#10B981] focus:outline-none"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full border-gray-300 focus:border-[#10B981] focus:outline-none"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-medium">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            className="input input-bordered w-full border-gray-300 focus:border-[#10B981] focus:outline-none"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <button
                            type="submit"
                            className="btn bg-[#10B981] hover:bg-emerald-600 text-white border-none w-full"
                        >
                            Register
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/admin/login"
                            className="text-[#10B981] font-medium hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
