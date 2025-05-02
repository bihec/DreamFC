// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient'; // Import Supabase client
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh

    setLoading(true);
    setError(null); // Clear previous errors

    // Call Supabase sign-in function
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (loginError) {
      setError(loginError.message); // Display error message from Supabase
    } else {
      // Login successful, navigate to home page or dashboard
      navigate('/'); // Example: navigate to home page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pastel-orange"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Required field
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pastel-orange"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Required field
              />
            </div>
            {/* Display error message if any */}
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className={`px-6 py-2 mt-4 text-white bg-pastel-orange rounded-lg hover:bg-pastel-orange-dark transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {/* Link to the Sign Up page */}
              <Link to="/signup" className="text-sm text-pastel-orange hover:underline">
                Don't have an account? Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

// Explanation:
// - useState: Manages form input, loading state, and error messages.
// - supabase: Supabase client imported from your services file.
// - useNavigate: Hook from react-router-dom for programmatic navigation.
// - Link: Component from react-router-dom for declarative navigation links.
// - handleLogin: Async function to handle form submission and Supabase sign-in.
// - e.preventDefault(): Prevents default form submission behavior (page reload).
// - supabase.auth.signInWithPassword: Supabase function for signing in with email and password.
// - error state: Handles and displays error messages from Supabase.
// - navigate('/'): Redirects the user after successful login.
// - Link to="/signup": Creates a navigation link to the /signup route.
// - Tailwind CSS classes: Used for styling the form.
// - loading state: Disables the login button while the request is in progress.
