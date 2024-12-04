import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    type: '',
    address: '',
    vehicleDetails: {
      vehicleType: '',
      vehicleNumber: '',
      location: '',
    },
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const USER_TYPES = ['Admin', 'Advertiser', 'Publisher', 'BodyShop'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('vehicleDetails')) {
      const fieldName = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        vehicleDetails: {
          ...prev.vehicleDetails,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!phoneRegex.test(formData.contactNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!formData.type) {
      setError('Please select a user type');
      return false;
    }

    // Validate vehicle details for Publisher
    if (formData.type === 'Publisher') {
      if (!formData.vehicleDetails.vehicleType) {
        setError('Vehicle Type is required for Publisher');
        return false;
      }

      if (!formData.vehicleDetails.vehicleNumber) {
        setError('Vehicle Number is required for Publisher');
        return false;
      }

      if (!formData.vehicleDetails.location) {
        setError('Vehicle Location is required for Publisher');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        contactNumber: formData.contactNumber,
        type: formData.type,
      };

      //Include Company details if user is a Advertiser

      if (formData.type === 'Advertiser') {
        if (!formData.companyName.trim()) {
          setError('Company Name is required for Advertiser');
          setIsLoading(false);
          return;
        }
  
        if (!formData.address.trim()) {
          setError('Address is required for Advertiser');
          setIsLoading(false);
          return;
        }
  
        payload.companyName = formData.companyName.trim();
        payload.address = formData.address.trim();
      }

      // Include vehicle details if user is a Publisher
      if (formData.type === 'Publisher') {
        payload.vehicleDetails = formData.vehicleDetails;
      }

      // For BodyShop, ensure address is provided
      if (formData.type === 'BodyShop') {
        if (!formData.address.trim()) {
          setError('Address is required for BodyShop');
          setIsLoading(false);
          return;
        }
        payload.address = formData.address.trim();
      }

      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', data.type);

      const redirectMap = {
        Admin: '/admin-dashboard',
        Advertiser: '/advertiser-dashboard',
        Publisher: '/publisher-dashboard',
        BodyShop: '/bodyshop-dashboard',
      };

      window.location.href = redirectMap[data.type] || '/dashboard';
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your contact number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block mb-2 text-sm font-medium">
              User Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User Type</option>
              {USER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Advertiser specific fields */}
  {formData.type === 'Advertiser' && (
  <>
    <div className="mb-4">
      <label htmlFor="companyName" className="block mb-2 text-sm font-medium">
        Company Name
      </label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your company name"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="address" className="block mb-2 text-sm font-medium">
        Address
      </label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your address"
      />
    </div>
  </>
)}


          {/* Publisher specific vehicle details */}
          {formData.type === 'Publisher' && (
            <>
              <div className="mb-4">
                <label htmlFor="vehicleDetails.vehicleType" className="block mb-2 text-sm font-medium">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  id="vehicleDetails.vehicleType"
                  name="vehicleDetails.vehicleType"
                  value={formData.vehicleDetails.vehicleType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle type"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="vehicleDetails.vehicleNumber" className="block mb-2 text-sm font-medium">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicleDetails.vehicleNumber"
                  name="vehicleDetails.vehicleNumber"
                  value={formData.vehicleDetails.vehicleNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle number"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="vehicleDetails.location" className="block mb-2 text-sm font-medium">
                  Vehicle Location
                </label>
                <input
                  type="text"
                  id="vehicleDetails.location"
                  name="vehicleDetails.location"
                  value={formData.vehicleDetails.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle location"
                />
              </div>
            </>
          )}

          {/* BodyShop address field */}
          {formData.type === 'BodyShop' && (
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 text-sm font-medium">
                BodyShop Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter workshop address"
              />
            </div>
          )}

          <div className="mb-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
