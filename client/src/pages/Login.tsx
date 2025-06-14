import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('https://wizarding-media-ok6l.onrender.com/api/v1/auth/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          Login
        </button>

        <p className='text-center'>Don't have a account ? Create one  <span className='font-semibold'> 
        <Link to='/sign-up'>
        sign up
      </Link></span>  </p>
      </form>

    </div>
  );
};

export default Login;
