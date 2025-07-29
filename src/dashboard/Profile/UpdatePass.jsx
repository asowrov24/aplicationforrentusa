
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import Swal from 'sweetalert2';

const UpdatePass = () => {
    const { user } = useAuth();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setError('');
        setSuccess('');
        const { currentPassword, newPassword, confirmPassword } = data;

        if (newPassword !== confirmPassword) {
            return setError('New passwords do not match');
        }

        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            // Reauthenticate user
            await reauthenticateWithCredential(user, credential);

            // Update password
            await updatePassword(user, newPassword);
            Swal.fire({
                title: "Password updated successfully!",
                icon: "success",
                confirmButtonColor: "#10B981",
            });
            setSuccess('Password updated successfully!');
            reset();
        } catch (err) {
            console.error(err);
            setError(err.message || 'Password update failed');
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    🔐 Change Password
                </h2>

                {error && (
                    <div className="alert alert-error text-sm mb-4 py-2 px-4">
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div className="alert alert-success text-sm mb-4 py-2 px-4">
                        <span>{success}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Current Password</span>
                        </label>
                        <input
                            type="password"
                            {...register('currentPassword', {
                                required: 'Current password is required',
                            })}
                            className="input input-bordered w-full"
                            placeholder="Enter current password"
                        />
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input
                            type="password"
                            {...register('newPassword', {
                                required: 'New password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Must be at least 6 characters',
                                },
                            })}
                            className="input input-bordered w-full"
                            placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Confirm New Password</span>
                        </label>
                        <input
                            type="password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your new password',
                                validate: (val) =>
                                    val === watch('newPassword') || 'Passwords do not match',
                            })}
                            className="input input-bordered w-full"
                            placeholder="Re-enter new password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-2">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}
export default UpdatePass;
