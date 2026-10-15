import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Heart,
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5196';

interface LoginResponse {
  token: string;
  expiresAtUtc?: string;
  expiresAt?: string;
  name: string;
  email: string;
}

export default function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const email = username.trim().toLowerCase();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data: Partial<LoginResponse> = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        setError(
          response.status === 401
            ? 'Invalid email or password.'
            : typeof data === 'object' && 'message' in data
              ? String(data.message)
              : 'Unable to sign in. Please try again.'
        );
        return;
      }

      if (!data.token) {
        setError('The server did not return an authentication token.');
        return;
      }

      // Keep the token for this browser tab/session.
      sessionStorage.setItem('adminToken', data.token);

      if (data.name) {
        sessionStorage.setItem('adminName', data.name);
      }

      if (data.email) {
        sessionStorage.setItem('adminEmail', data.email);
      }

      // Continue to the admin page.
      navigate('/admin/news-events', { replace: true });
    } catch (err) {
      console.error('Admin login error:', err);
      setError(
        'Cannot connect to the server. Make sure the .NET API is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-forest-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Physiotherapy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-900/90 to-forest-700/80" />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-16 text-white">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-forest-900" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold">Madha College</p>
              <p className="text-xs text-gold-400 font-medium tracking-wide">
                OF PHYSIOTHERAPY
              </p>
            </div>
          </Link>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Admin Portal
          </h1>

          <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
            Secure access for authorized administrative personnel to manage
            website content, announcements, admissions enquiries, and academic
            information.
          </p>

          <div className="space-y-4 max-w-md">
            {[
              { icon: ShieldCheck, text: 'Manage news, events, and announcements' },
              { icon: ShieldCheck, text: 'Review admission enquiries and applications' },
              { icon: ShieldCheck, text: 'Update course and department information' },
              { icon: ShieldCheck, text: 'Oversee gallery and media content' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-forest-800 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-sm text-gray-200">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-12">
            © {new Date().getFullYear()} Madha College of Physiotherapy. All
            rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-forest-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            to="/"
            className="flex items-center justify-center gap-3 mb-8 lg:hidden"
          >
            <div className="w-12 h-12 rounded-full bg-forest-700 flex items-center justify-center">
              <Heart className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-forest-800">
                Madha College
              </p>
              <p className="text-xs text-gold-600 font-medium tracking-wide">
                OF PHYSIOTHERAPY
              </p>
            </div>
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-forest-700 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-gold-500" />
              </div>

              <h2 className="text-2xl font-bold text-forest-800">
                Admin Login
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Sign in to access the management dashboard
              </p>
            </div>

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Admin Email
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors disabled:opacity-60"
                    placeholder="Enter your admin email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors disabled:opacity-60"
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-forest-700 focus:ring-forest-700"
                  />
                  Remember me
                </label>

                <Link
                  to="/admin/forgot-password"
                  className="text-forest-700 font-medium hover:text-gold-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-forest-700 transition-colors"
              >
                ← Back to Website
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Authorized personnel only. All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
