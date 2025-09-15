"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, Lock, Mail, AlertTriangle, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { LoginFormData , loginSchema } from '@/lib/validation';
import { useAuthStore } from '@/stores/authStores';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const {login} = useAuthStore();
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    setApiError(null);
    
    try {
      // Validation avec Zod
      const formData = { email, password };
      const validatedData = loginSchema.parse(formData);

      const success = await login(validatedData);
      
      if (success) {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Erreurs de validation
        const fieldErrors: Partial<LoginFormData> = {};
        const errors = (error as z.ZodError<unknown>).issues ?? [];
        errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setApiError('Une erreur de connexion est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 relative">
          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl"></div>
          
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Administration
            </h1>
            <p className="text-gray-600 text-sm max-w-xs mx-auto">
              Accès restreint aux utilisateurs autorisés uniquement
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
            <div className="flex items-center space-x-2 text-amber-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs font-medium">
                Seuls les appareils autorisés peuvent se connecter
              </p>
            </div>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <p className="text-sm font-medium">{apiError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Adresse email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 transition-colors ${
                    errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'
                  }`} />
                </div>
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  className={`block w-full pl-10 pr-4 py-3 bg-gray-50/50 border rounded-xl text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                    hover:border-gray-300 ${
                      errors.email 
                        ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  placeholder="admin@exemple.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: undefined }));
                    }
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Mot de passe
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 transition-colors ${
                    errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'
                  }`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`block w-full pl-10 pr-12 py-3 bg-gray-50/50 border rounded-xl text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                    hover:border-gray-300 ${
                      errors.password 
                        ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (errors.password) {
                      setErrors(prev => ({ ...prev, password: undefined }));
                    }
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                text-white font-semibold py-3 px-6 rounded-xl 
                transition-all duration-200 shadow-lg hover:shadow-xl 
                transform hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-center text-xs text-gray-500">
                Connexion sécurisée SSL/TLS
              </p>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Floating Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 -left-8 w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
}