"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface LoginModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSwitchToSignup: () => void;
}

export const LoginModal = ({
  open,
  setOpen,
  onSwitchToSignup,
}: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setLoginForm({ email: "", password: "", rememberMe: false });
      setErrors({});
      setShowPassword(false);
    }
  }, [open]);

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!loginForm.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email))
      newErrors.email = "Email is invalid";
    if (!loginForm.password) newErrors.password = "Password is required";
    else if (loginForm.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsLoading(true);
    setErrors({});

    await authClient.signIn.email({
      email: loginForm.email,
      password: loginForm.password,
      rememberMe: loginForm.rememberMe,
      fetchOptions: {
        onSuccess: () => {
          setIsLoading(false);
          setOpen(false);
        },
        onError: (ctx) => {
          setIsLoading(false);
          setErrors({ form: ctx.error.message || "Invalid credentials" });
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md w-[95vw] rounded-2xl p-0 overflow-hidden">
        <div className="bg-linear-to-r from-[#c8622a] to-[#b5531e] p-6 text-white">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-serif text-white">
              Welcome Back!
            </DialogTitle>
            <DialogDescription className="text-orange-100">
              Sign in to continue sending love across borders
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {errors.form && (
            <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.form}
            </div>
          )}
          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={`pl-10 border ${
                  errors.email ? "border-red-500" : "border-orange-200"
                } focus:border-[#c8622a] focus:ring-[#c8622a]`}
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`pl-10 pr-10 border ${
                  errors.password ? "border-red-500" : "border-orange-200"
                } focus:border-[#c8622a] focus:ring-[#c8622a]`}
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c8622a]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={loginForm.rememberMe}
                onCheckedChange={(checked) =>
                  setLoginForm({
                    ...loginForm,
                    rememberMe: checked as boolean,
                  })
                }
              />
              <Label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#c8622a] hover:underline"
              onClick={() => setOpen(false)}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#c8622a] hover:bg-[#b5531e] text-white h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            {`Don't have an account?`}{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-[#c8622a] font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
