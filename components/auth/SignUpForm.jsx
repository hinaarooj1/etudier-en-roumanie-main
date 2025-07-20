'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfResidence: '',
    passportNumber: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassportNumber = (number) => {
    // Basic validation - adjust according to your requirements
    return /^[A-Za-z0-9]{6,20}$/.test(number);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Trim all fields
    const trimmedData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      dateOfBirth: formData.dateOfBirth,
      placeOfResidence: formData.placeOfResidence.trim(),
      passportNumber: formData.passportNumber.trim(),
      phone: formData.phone.trim()
    };

    // === Client-side validation ===
    if (!trimmedData.firstName) {
      setError('First name is required');
      return;
    }
    if (!trimmedData.phone) {
      setError('Phone is required');
      return;
    }

    if (!trimmedData.lastName) {
      setError('Last name is required');
      return;
    }

    if (!trimmedData.dateOfBirth) {
      setError('Date of birth is required');
      return;
    }

    // Check if date is in the past
    if (new Date(trimmedData.dateOfBirth) >= new Date()) {
      setError('Date of birth must be in the past');
      return;
    }

    if (!trimmedData.placeOfResidence) {
      setError('Place of residence is required');
      return;
    }

    if (!trimmedData.passportNumber) {
      setError('Passport number is required');
      return;
    }
    if (!trimmedData.phone) {
      setError('Phone number is required');
      return;
    }

    if (!validatePassportNumber(trimmedData.passportNumber)) {
      setError('Passport number must be 6-20 alphanumeric characters');
      return;
    }

    if (!trimmedData.email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(trimmedData.email)) {
      setError('Invalid email format');
      return;
    }

    if (!trimmedData.password) {
      setError('Password is required');
      return;
    }

    if (trimmedData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (trimmedData.password !== trimmedData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...trimmedData,
          dateOfBirth: new Date(trimmedData.dateOfBirth).toISOString()
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Sign up failed');
      }

      if (data.success) {
        toast.success(data.message || 'Sign up successful! Please check your email to verify your account.');
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          placeOfResidence: '',
          passportNumber: '',
          phone: ""
        });
        router.push('/signin');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
      </div>
      <div>
        <label className="block mb-1">Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Phone*</label>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Date of Birth*</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          max={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Place of Residence*</label>
        <input
          type="text"
          name="placeOfResidence"
          value={formData.placeOfResidence}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Passport Number*</label>
        <input
          type="text"
          name="passportNumber"
          value={formData.passportNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
          pattern="[A-Za-z0-9]{6,20}"
          title="6-20 alphanumeric characters"
        />
      </div>


      <div>
        <label className="block mb-1">Password*</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1 pr-10"
            minLength={6}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block mb-1">Confirm Password*</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          minLength={6}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}