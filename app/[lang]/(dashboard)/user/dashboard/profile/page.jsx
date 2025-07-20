'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        placeOfResidence: '',
        passportNumber: '',
        phone:''
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/user/profile', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                if (!data?.data) {
                    throw new Error('Invalid user data structure');
                }

                setUserData(data.data);
                setFormData({
                    firstName: data.data.firstName || '',
                    lastName: data.data.lastName || '',
                    email: data.data.email || '',
                    dateOfBirth: data.data.dateOfBirth ? new Date(data.data.dateOfBirth).toISOString().split('T')[0] : '',
                    placeOfResidence: data.data.placeOfResidence || '',
                    passportNumber: data.data.passportNumber || '',
                    phone: data.data.phone || ''
                });
                setError(null);

            } catch (err) {
                console.error('Failed to load user data:', err);
                setError(err.message);

                if (err.message.includes('401') || err.message.includes('403')) {
                    toast.error("Session expired. Please sign in again.");
                    router.push('/signin');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validatePassportNumber = (number) => {
        return /^[A-Za-z0-9]{6,20}$/.test(number);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        } else if (new Date(formData.dateOfBirth) >= new Date()) {
            newErrors.dateOfBirth = 'Date of birth must be in the past';
        }

        if (!formData.placeOfResidence.trim()) {
            newErrors.placeOfResidence = 'Place of residence is required';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }

        if (!formData.passportNumber.trim()) {
            newErrors.passportNumber = 'Passport number is required';
        } else if (!validatePassportNumber(formData.passportNumber)) {
            newErrors.passportNumber = 'Passport number must be 6-20 alphanumeric characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ success: null, message: '' });

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            setSubmitStatus({ success: false, message: 'Please fix the errors in the form' });
            return;
        }

        try {
            setUpdating(true);
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    dateOfBirth: new Date(formData.dateOfBirth).toISOString()
                })
            });

            if (res.status === 200) {
                const data = await res.json();
                toast.success("Profile updated successfully!");
                setSubmitStatus({ success: true, message: 'Profile updated successfully!' });
                setUserData(data.data);
                return;
            } else {
                const errorData = await res.json();
                const errorMsg = errorData.error || "Failed to update profile";
                toast.error(errorMsg);
                setSubmitStatus({ success: false, message: errorMsg });
                return;
            }

        } catch (err) {
            console.error('Update failed:', err);
            const errorMsg = err.message || 'An unexpected error occurred';
            toast.error(errorMsg);
            setSubmitStatus({ success: false, message: errorMsg });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-5 w-1/4" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                    <Skeleton className="h-10 w-1/4 mt-4" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="p-6 bg-red-50 rounded-xl shadow-sm">
                    <h3 className="text-lg font-medium text-red-800">Error Loading Profile</h3>
                    <p className="mt-1 text-red-600">{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-red-100 text-red-800 hover:bg-red-200"
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="p-6 bg-yellow-50 rounded-xl shadow-sm">
                    <h3 className="text-lg font-medium text-yellow-800">No User Data</h3>
                    <p className="mt-1 text-yellow-600">Unable to load your profile information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground">Update your personal information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={updating}
                        />
                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name*</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={updating}
                        />
                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Phone*</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.phone}
                        onChange={(e) => {
                            const onlyNumbers = e.target.value.replace(/\D/g, ""); // Remove non-digits
                            handleChange({ target: { name: "phone", value: onlyNumbers } });
                        }}
                        disabled={updating}
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth*</Label>
                    <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        disabled={updating}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="placeOfResidence">Place of Residence*</Label>
                    <Input
                        id="placeOfResidence"
                        name="placeOfResidence"
                        value={formData.placeOfResidence}
                        onChange={handleChange}
                        disabled={updating}
                    />
                    {errors.placeOfResidence && <p className="text-sm text-red-500">{errors.placeOfResidence}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="passportNumber">Passport Number*</Label>
                    <Input
                        id="passportNumber"
                        name="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleChange}
                        disabled={updating}
                        placeholder="6-20 alphanumeric characters"
                    />
                    {errors.passportNumber && <p className="text-sm text-red-500">{errors.passportNumber}</p>}
                </div>
               


                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        disabled={true}
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={updating}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={updating}>
                        {updating ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : "Save Changes"}
                    </Button>
                </div>

                {submitStatus.message && (
                    <div className={`mt-2 p-3 rounded-md ${submitStatus.success
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                        }`}>
                        {submitStatus.message}
                    </div>
                )}
            </form>
        </div>
    );
}