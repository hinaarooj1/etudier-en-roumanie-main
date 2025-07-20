'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordPage() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const router = useRouter();

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        setSubmitStatus({ success: false, message: '' });

        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus({ success: false, message: 'Please fix the errors in the form' });
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('/api/user/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update password');
            }

            setSubmitStatus({ success: true, message: 'Password updated successfully!' });
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setTimeout(() => {
                setSubmitStatus({ success: false, message: '' });
                router.refresh();
            }, 3000);
        } catch (err) {
            console.error('Update failed:', err);
            setSubmitStatus({ success: false, message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Change Password</h1>
                <p className="text-muted-foreground">Update your account password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            type={showPasswords.current ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={handleChange}
                            disabled={loading}
                            className="pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => togglePasswordVisibility('current')}
                        >
                            {showPasswords.current ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">Toggle password visibility</span>
                        </Button>
                    </div>
                    {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type={showPasswords.new ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={handleChange}
                            disabled={loading}
                            className="pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => togglePasswordVisibility('new')}
                        >
                            {showPasswords.new ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">Toggle password visibility</span>
                        </Button>
                    </div>
                    {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                            className="pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => togglePasswordVisibility('confirm')}
                        >
                            {showPasswords.confirm ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">Toggle password visibility</span>
                        </Button>
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    {submitStatus.message && (
                        <div className={`p-3 rounded-md ${
                            submitStatus.success 
                                ? 'bg-green-50 text-green-800' 
                                : 'bg-red-50 text-red-800'
                        }`}>
                            <p className="text-sm">{submitStatus.message}</p>
                        </div>
                    )}
                    
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}