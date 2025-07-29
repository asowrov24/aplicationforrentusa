import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await logIn(data.email, data.password);
      console.log("User:", result.user);
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        confirmButtonColor: "#10B981",
      });
      navigate("/dashboard/apply");
    } catch (err) {
      Swal.fire({
        title: "Login Failed",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#10B981",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-300 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-2xl rounded-3xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-emerald-600 mb-6">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
              )}
            </div>

            {/* Login Button */}
            <div className="form-control">
              <button
                type="submit"
                className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full font-semibold"
              >
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/admin/register" className="text-emerald-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
