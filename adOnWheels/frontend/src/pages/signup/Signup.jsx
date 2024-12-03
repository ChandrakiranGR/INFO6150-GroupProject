import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    type: '',
    companyName: '',
    address: '',
    vehicleDetails: [{ make: '', model: '', licensePlate: '', type: '' }],
    workshopAddress: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const USER_TYPES = ['Admin', 'Advertiser', 'Publisher', 'BodyShop'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('vehicleDetails')) {
      const index = parseInt(name.split('-')[1]);
      const fieldName = name.split('-')[0].replace('vehicleDetails', '').toLowerCase();
      setFormData((prev) => {
        const newVehicleDetails = [...prev.vehicleDetails];
        newVehicleDetails[index] = { ...newVehicleDetails[index], [fieldName]: value };
        return { ...prev, vehicleDetails: newVehicleDetails };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddVehicleDetail = () => {
    setFormData(prev => ({
      ...prev,
      vehicleDetails: [...prev.vehicleDetails, { make: '', model: '', licensePlate: '', type: '' }]
    }));
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

      if (formData.type === 'Advertiser') {
        payload.companyName = formData.companyName.trim();
        payload.address = formData.address.trim();
      } else if (formData.type === 'Publisher') {
        payload.vehicleDetails = formData.vehicleDetails;
      } else if (formData.type === 'BodyShop') {
        payload.workshopAddress = formData.workshopAddress.trim();
      }

      // Send API request to register the user
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store authentication details
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', data.type);

      // Redirect based on user type
      const redirectMap = {
        'Admin': '/admin-dashboard',
        'Advertiser': '/advertiser-dashboard',
        'Publisher': '/publisher-dashboard',
        'BodyShop': '/bodyshop-dashboard'
      };

      window.location.href = redirectMap[data.type] || '/dashboard';

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case 'Advertiser':
        return (
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
                placeholder="Enter company name"
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
                placeholder="Enter address"
              />
            </div>
          </>
        );
      case 'Publisher':
        return (
          <>
            {formData.vehicleDetails.map((vehicle, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={`make-${index}`} className="block mb-2 text-sm font-medium">
                  Vehicle Make
                </label>
                <input
                  type="text"
                  id={`make-${index}`}
                  name={`vehicleDetails-${index}-make`}
                  value={vehicle.make}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle make"
                />
                <label htmlFor={`model-${index}`} className="block mb-2 text-sm font-medium">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  id={`model-${index}`}
                  name={`vehicleDetails-${index}-model`}
                  value={vehicle.model}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle model"
                />
                <label htmlFor={`licensePlate-${index}`} className="block mb-2 text-sm font-medium">
                  Vehicle License Plate
                </label>
                <input
                  type="text"
                  id={`licensePlate-${index}`}
                  name={`vehicleDetails-${index}-licensePlate`}
                  value={vehicle.licensePlate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle license plate"
                />
                <label htmlFor={`type-${index}`} className="block mb-2 text-sm font-medium">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  id={`type-${index}`}
                  name={`vehicleDetails-${index}-type`}
                  value={vehicle.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle type"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddVehicleDetail}
              className="mb-4 text-blue-500"
            >
              Add Vehicle
            </button>
          </>
        );
      case 'BodyShop':
        return (
          <div className="mb-4">
            <label htmlFor="workshopAddress" className="block mb-2 text-sm font-medium">
              Workshop Address
            </label>
            <input
              type="text"
              id="workshopAddress"
              name="workshopAddress"
              value={formData.workshopAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter workshop address"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact number"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block mb-2 text-sm font-medium">User Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User Type</option>
              {USER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {renderTypeSpecificFields()}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
