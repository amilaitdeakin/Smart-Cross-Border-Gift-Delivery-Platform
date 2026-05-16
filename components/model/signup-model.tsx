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
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface SignupModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export const SignupModal = ({
  open,
  setOpen,
  onSwitchToLogin,
}: SignupModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setSignupForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      setErrors({});
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [open]);

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    if (!signupForm.firstName) newErrors.firstName = "First name is required";
    if (!signupForm.lastName) newErrors.lastName = "Last name is required";
    if (!signupForm.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupForm.email))
      newErrors.email = "Email is invalid";
    if (!signupForm.phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9+\-\s]+$/.test(signupForm.phone))
      newErrors.phone = "Phone number is invalid";
    if (!signupForm.password) newErrors.password = "Password is required";
    else if (signupForm.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!signupForm.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (signupForm.password !== signupForm.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!signupForm.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setIsLoading(true);
    setErrors({});

    await authClient.signUp.email({
      email: signupForm.email,
      password: signupForm.password,
      name: `${signupForm.firstName} ${signupForm.lastName}`,
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      phone: signupForm.phone,
      fetchOptions: {
        onSuccess: () => {
          setIsLoading(false);
          setOpen(false);
        },
        onError: (ctx: any) => {
          setIsLoading(false);
          setErrors({ form: ctx.error.message || "Something went wrong" });
        },
      },
    } as any);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md w-[95vw] rounded-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-linear-to-r from-[#c8622a] to-[#b5531e] p-6 text-white sticky top-0 z-10">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-serif text-white">
              Create Account
            </DialogTitle>
            <DialogDescription className="text-orange-100">
              Join WorldWish to start sending gifts
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSignup} className="p-6 space-y-4">
          {errors.form && (
            <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.form}
            </div>
          )}
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                className={`border ${
                  errors.firstName ? "border-red-500" : "border-orange-200"
                }`}
                value={signupForm.firstName}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, firstName: e.target.value })
                }
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                className={`border ${
                  errors.lastName ? "border-red-500" : "border-orange-200"
                }`}
                value={signupForm.lastName}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, lastName: e.target.value })
                }
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="signup-email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="signup-email"
                type="email"
                placeholder="john@example.com"
                className={`pl-10 border ${
                  errors.email ? "border-red-500" : "border-orange-200"
                }`}
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+94 77 123 4567"
                className={`pl-10 border ${
                  errors.phone ? "border-red-500" : "border-orange-200"
                }`}
                value={signupForm.phone}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, phone: e.target.value })
                }
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.phone}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="signup-password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`pl-10 pr-10 border ${
                  errors.password ? "border-red-500" : "border-orange-200"
                }`}
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
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
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`pl-10 pr-10 border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-orange-200"
                }`}
                value={signupForm.confirmPassword}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c8622a]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={signupForm.agreeTerms}
              onCheckedChange={(checked) =>
                setSignupForm({
                  ...signupForm,
                  agreeTerms: checked as boolean,
                })
              }
              className="mt-1"
            />
            <Label
              htmlFor="terms"
              className="text-sm text-gray-600 cursor-pointer"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-[#c8622a] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#c8622a] hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.agreeTerms}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#c8622a] hover:bg-[#b5531e] text-white h-11 mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#c8622a] font-semibold hover:underline"
            >
              Sign in
            </button>
          </div>

          {/* Demo Accounts Note */}
          <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-gray-600 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Demo accounts: user@demo.com / password123
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
