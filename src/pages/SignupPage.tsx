// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient'; // Import Supabase client
import { useNavigate, Link } from 'react-router-dom'; // For navigation and linking to login

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook for navigation

  // Handler for email/password signup
  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh

    setLoading(true);
    setError(null); // Clear previous errors

    // Call Supabase sign-up function with email and password
    const { error: signupError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    if (signupError) {
      setError(signupError.message); // Display error message from Supabase
    } else {
      // Signup successful, you might want to show a confirmation message
      // and/or redirect the user. Supabase typically sends a confirmation email.
      // For now, let's just navigate to the login page.
      alert('Check your email for the confirmation link!'); // Inform user to check email
      navigate('/login'); // Redirect to login page after signup
    }
  };

  // Handler for Google sign-in
  const handleGoogleSignup = async () => {
    setError(null); // Clear previous errors

    // Call Supabase signInWithOAuth with 'google' provider
    // This will redirect the user to Google's login page for OAuth flow
    const { data, error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      // Optional: specify a redirect URL after successful signup
      // If not specified, it defaults to your Supabase project's Site URL/Callback URL
      // Make sure this URL is added to your Supabase Auth Redirect URLs and Google Authorized redirect URIs
      // options: {
      //   redirectTo: 'http://localhost:5173/' // Example redirect to home page after Google signup
      // }
    });

    if (googleError) {
      setError(googleError.message); // Display error message
    }
    // Note: signInWithOAuth redirects the user, so code execution stops here on success.
    // The callback route (e.g., https://bendtxrgfdveohgfaood.supabase.co/auth/v1/callback)
    // will handle the session exchange and redirect back to your app.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Sign Up</h3> {/* Title */}

        {/* Email/Password Signup Form */}
        <form onSubmit={handleEmailSignup}>
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
                {loading ? 'Signing Up...' : 'Sign Up'} {/* Button text */}
              </button>
              {/* Link to the Login page */}
              <Link to="/login" className="text-sm text-pastel-orange hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </form>

        {/* Separator or text */}
        <div className="mt-6 text-center text-gray-600">
          Or
        </div>

        {/* Google Sign-in Button */}
        {/* Styled to look more like a standard Google button */}
        <button
          onClick={handleGoogleSignup} // Call the Google signup handler
          className="w-full flex items-center justify-center px-4 py-2 mt-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-orange"
        >
          {/* Corrected Google icon SVG path */}
          <svg className="w-5 h-5 mr-2" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.54-2.24 3.32v2.75h3.58c2.09-1.93 3.31-4.59 3.31-7.9z" fill="#4285F4"/>
            <path d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.58-2.75c-.98.66-2.23 1.06-4.35 1.06-3.31 0-6.12-2.15-7.1-5.05H2.69v2.85C4.6 20.9 8.03 23 12 23z" fill="#34A853"/>
            <path d="M4.92 14.1H7.8c-.19-.66-.28-1.35-.28-2.04s.09-1.38.28-2.04H4.92V7.18C3.03 8.91 2 11.34 2 14s1.03 5.09 2.92 6.82V14.1z" fill="#FBBC05"/>
            <path d="M12 6.16c1.71 0 3.21.6 4.42 1.79l3.15-3.15C17.95 2.91 15.24 2 12 2 8.03 2 4.6 4.1 2.69 7.18L7.8 10.03C8.77 7.14 11.58 5 14.92 5c1.31 0 2.5.23 3.47.66z" fill="#EA4335"/>
            <path d="M12 6.16c1.71 0 3.21.6 4.42 1.79l3.15-3.15C17.95 2.91 15.24 2 12 2 8.03 2 4.6 4.1 2.69 7.18L7.8 10.03C8.77 7.14 11.58 5 14.92 5c1.31 0 2.5.23 3.47.66z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
