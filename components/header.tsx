/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categories } from "@/utils/categories";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Eye,
  EyeOff,
  Gift,
  Heart,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Gifts", href: "/gifts" },
  { label: "Occasions", href: "/occasions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Track Order", href: "/track-public" },
];

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
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

  const pathname = usePathname();
  const isLoggedIn = false; // Replace with real auth state

  // Mock cart count - replace with real cart context
  useEffect(() => {
    setCartCount(3);
  }, []);

  // Reset forms when modals close
  useEffect(() => {
    if (!loginModalOpen) {
      setLoginForm({ email: "", password: "", rememberMe: false });
      setErrors({});
      setShowPassword(false);
    }
  }, [loginModalOpen]);

  useEffect(() => {
    if (!signupModalOpen) {
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
  }, [signupModalOpen]);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLoginModalOpen(false);
      // Handle successful login
      console.log("Login successful", loginForm);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSignupModalOpen(false);
      setActiveTab("login");
      // Handle successful signup
      console.log("Signup successful", signupForm);
    }, 1500);
  };

  const openLoginModal = () => {
    setActiveTab("login");
    setLoginModalOpen(true);
  };

  const openSignupModal = () => {
    setActiveTab("signup");
    setSignupModalOpen(true);
  };

  const switchToSignup = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  const switchToLogin = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .lta-header {
          font-family: 'DM Sans', sans-serif;
        }
        .lta-logo-font {
          font-family: 'Playfair Display', serif;
        }
        .lta-topbar {
          background: #1a0a00;
          color: #f5e6d0;
          font-size: 12px;
          letter-spacing: 0.05em;
        }
        .lta-topbar a:hover { color: #e8a45a; }

        .lta-main-bar {
          background: #fff9f4;
          border-bottom: 1px solid #f0dece;
        }

        .lta-search-input {
          background: #fff3ea;
          border: 1.5px solid #e8c9a8;
          border-radius: 999px;
          padding: 8px 20px 8px 44px;
          font-size: 14px;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s;
          color: #3d1f00;
          font-family: 'DM Sans', sans-serif;
        }
        .lta-search-input::placeholder { color: #b8977a; }
        .lta-search-input:focus {
          border-color: #c8622a;
          box-shadow: 0 0 0 3px rgba(200,98,42,0.12);
        }

        .lta-nav-link {
          font-size: 13.5px;
          font-weight: 500;
          color: #4a2800;
          padding: 6px 14px;
          border-radius: 6px;
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .lta-nav-link:hover {
          background: #fde8d4;
          color: #c8622a;
        }
        .lta-nav-link.active {
          background: #fde8d4;
          color: #c8622a;
          font-weight: 600;
        }

        .lta-icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 10px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5c3010;
          transition: background 0.15s, color 0.15s;
          position: relative;
        }
        .lta-icon-btn:hover { background: #fde8d4; color: #c8622a; }

        .lta-cart-badge {
          position: absolute;
          top: 2px; right: 2px;
          background: #c8622a;
          color: white;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          min-width: 17px; height: 17px;
          display: flex; align-items: center; justify-content: center;
          line-height: 1;
          border: 2px solid #fff9f4;
        }

        .lta-btn-login {
          background: transparent;
          border: 1.5px solid #c8622a;
          color: #c8622a;
          border-radius: 8px;
          padding: 7px 18px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .lta-btn-login:hover { background: #fde8d4; }

        .lta-btn-signup {
          background: #c8622a;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 7px 18px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 2px 8px rgba(200,98,42,0.25);
        }
        .lta-btn-signup:hover {
          background: #b5531e;
          box-shadow: 0 4px 14px rgba(200,98,42,0.35);
          transform: translateY(-1px);
        }

        .lta-route-strip {
          background: linear-gradient(90deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%);
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          font-size: 13px;
          color: #f5e6d0;
        }
        .lta-route-city {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 6px;
          padding: 3px 10px;
          font-size: 12px;
          color: #e8c9a8;
          letter-spacing: 0.04em;
        }
        .lta-route-arrow {
          color: #e8a45a;
          font-size: 18px;
        }
        .lta-flag { font-size: 18px; }

        .lta-search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26,10,0,0.5);
          z-index: 100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 80px;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.15s ease;
        }
        .lta-search-panel {
          background: #fff9f4;
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          max-width: 560px;
          margin: 0 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          animation: slideDown 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideDown { from { transform: translateY(-10px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

        .lta-nav-dropdown {
          background: #fff9f4;
          border: 1px solid #f0dece;
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(100,40,0,0.12);
          padding: 20px;
        }
        .lta-cat-title {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #c8622a;
          margin-bottom: 8px;
        }
        .lta-cat-item {
          display: block;
          font-size: 13px;
          color: #5c3010;
          padding: 4px 0;
          transition: color 0.15s;
        }
        .lta-cat-item:hover { color: #c8622a; }

        .lta-mobile-drawer {
          position: fixed;
          inset: 0;
          z-index: 200;
        }
        .lta-mobile-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(26,10,0,0.5);
          backdrop-filter: blur(3px);
        }
        .lta-mobile-panel {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 300px;
          background: #fff9f4;
          padding: 24px;
          overflow-y: auto;
          box-shadow: -8px 0 40px rgba(0,0,0,0.2);
          animation: slideLeft 0.25s ease;
        }
        @keyframes slideLeft { from { transform: translateX(100%) } to { transform: translateX(0) } }

        .lta-divider {
          height: 1px;
          background: #f0dece;
          margin: 12px 0;
        }

        .lta-icon-btn:focus-visible,
        .lta-nav-link:focus-visible,
        .lta-btn-login:focus-visible,
        .lta-btn-signup:focus-visible {
          outline: 2px solid #c8622a;
          outline-offset: 2px;
        }
      `}</style>

      <header className="lta-header sticky top-0 z-50">
        {/* Top utility bar */}
        <div className="lta-topbar">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <span>
              🇦🇺 Fast delivery across Australia · 🇱🇰 Sourced from Sri Lanka
            </span>
            <div className="flex items-center gap-4">
              <a
                href="/help"
                className="hover:text-amber-300 transition-colors"
                aria-label="Help center"
              >
                Help
              </a>
              <a
                href="/track-public"
                className="hover:text-amber-300 transition-colors"
                aria-label="Track your order"
              >
                Track Order
              </a>
            </div>
          </div>
        </div>

        {/* Main header bar */}
        <div className="lta-main-bar">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 py-3">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 shrink-0 group"
                aria-label="Home"
              >
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1
                    className="lta-logo-font text-xl leading-tight"
                    style={{ color: "#1a0a00" }}
                  >
                    Lanka<span style={{ color: "#c8622a" }}>To</span>Aus
                  </h1>
                  <p
                    className="text-xs"
                    style={{ color: "#b8977a", letterSpacing: "0.03em" }}
                  >
                    Send Love Across Borders
                  </p>
                </div>
              </Link>

              {/* Desktop Search */}
              <div className="hidden md:flex flex-1 mx-4 relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "#b8977a" }}
                  aria-hidden="true"
                />
                <input
                  className="lta-search-input"
                  placeholder="Search gifts, occasions, or recipients..."
                  aria-label="Search gifts"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 ml-auto">
                {/* Mobile search toggle */}
                <button
                  className="lta-icon-btn md:hidden"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  aria-expanded={searchOpen}
                >
                  <Search className="h-5 w-5" />
                </button>

                {/* Favorites */}
                <Link
                  href="/favorites"
                  className="lta-icon-btn"
                  aria-label="Favorites"
                >
                  <Heart className="h-5 w-5" />
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="lta-icon-btn"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span
                      className="lta-cart-badge"
                      aria-label={`${cartCount} items in cart`}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Auth section - conditional based on login state */}
                {!isLoggedIn ? (
                  <div className="hidden md:flex items-center gap-2 ml-2">
                    <button
                      className="lta-btn-login"
                      onClick={openLoginModal}
                      aria-label="Login to your account"
                    >
                      Login
                    </button>
                    <button
                      className="lta-btn-signup"
                      onClick={openSignupModal}
                      aria-label="Create new account"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="lta-icon-btn hidden md:flex"
                        aria-label="User menu"
                      >
                        <Avatar className="h-8 w-8 ring-2 ring-orange-200">
                          <AvatarImage
                            src="/avatars/default.png"
                            alt="User avatar"
                          />
                          <AvatarFallback
                            style={{
                              background: "#fde8d4",
                              color: "#c8622a",
                              fontSize: "13px",
                              fontWeight: 600,
                            }}
                          >
                            U
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-52 rounded-xl border-orange-100 shadow-xl"
                    >
                      <DropdownMenuLabel className="text-xs text-muted-foreground">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {[
                        {
                          icon: LayoutDashboard,
                          label: "Dashboard",
                          href: "/dashboard",
                        },
                        {
                          icon: Package,
                          label: "My Orders",
                          href: "/my-orders",
                        },
                        { icon: Star, label: "Favorites", href: "/favorites" },
                        {
                          icon: MapPin,
                          label: "Addresses",
                          href: "/addresses",
                        },
                        { icon: User, label: "Profile", href: "/profile" },
                      ].map(({ icon: Icon, label, href }) => (
                        <DropdownMenuItem key={label} asChild>
                          <Link
                            href={href}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            {label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 text-red-500 cursor-pointer">
                        <LogOut className="h-4 w-4" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Mobile menu toggle */}
                <button
                  className="lta-icon-btn md:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={mobileOpen}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1 pb-2 border-t border-orange-100 pt-2"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`lta-nav-link ${pathname === href ? "active" : ""}`}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}

              {/* Categories mega-menu */}
              <div className="relative group">
                <button
                  className="lta-nav-link flex items-center gap-1"
                  aria-label="Categories menu"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categories{" "}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="lta-nav-dropdown grid grid-cols-3 gap-6 w-130">
                    {categories.map((cat) => (
                      <div key={cat.title}>
                        <p className="lta-cat-title">{cat.title}</p>
                        <ul>
                          {cat.items.map((item) => (
                            <li key={item.name}>
                              <Link href={item.href} className="lta-cat-item">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Route strip */}
        <div
          className="lta-route-strip"
          aria-label="Delivery route information"
        >
          <span className="lta-flag" aria-hidden="true">
            🇱🇰
          </span>
          <span style={{ fontWeight: 500 }}>Sri Lanka</span>
          <span className="lta-route-arrow" aria-hidden="true">
            →
          </span>
          <span style={{ fontWeight: 500 }}>Australia</span>
          <span className="lta-flag" aria-hidden="true">
            🇦🇺
          </span>
          <div
            className="flex gap-2 ml-2"
            aria-label="Available cities in Australia"
          >
            {["Sydney", "Melbourne", "Brisbane", "Perth"].map((city) => (
              <span key={city} className="lta-route-city">
                {city}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div
          className="lta-search-overlay"
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search overlay"
        >
          <div
            className="lta-search-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className="lta-logo-font text-lg"
                style={{ color: "#1a0a00" }}
                id="search-title"
              >
                Search
              </h2>
              <button
                className="lta-icon-btn"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "#b8977a" }}
                aria-hidden="true"
              />
              <input
                autoFocus
                className="lta-search-input"
                placeholder="Search gifts, occasions, or recipients..."
                aria-label="Search"
                aria-describedby="search-examples"
              />
            </div>
            <p
              id="search-examples"
              className="text-xs mt-3"
              style={{ color: "#b8977a" }}
            >
              {`Try searching for "Birthday Gifts", "Gifts for Mom", or "Chocolate
              Cakes"`}
            </p>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lta-mobile-drawer">
          <div
            className="lta-mobile-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <div
            className="lta-mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-500 to-orange-700 flex items-center justify-center">
                  <Gift className="h-4 w-4 text-white" />
                </div>
                <span
                  className="lta-logo-font font-semibold"
                  style={{ color: "#1a0a00" }}
                >
                  LankaToAus
                </span>
              </div>
              <button
                className="lta-icon-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex gap-2 mb-5">
              <button
                className="lta-btn-login w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openLoginModal();
                }}
              >
                Login
              </button>
              <button
                className="lta-btn-signup w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openSignupModal();
                }}
              >
                Sign Up
              </button>
            </div>

            <div className="lta-divider" />

            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`lta-nav-link block ${pathname === href ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="lta-divider" />

            <p className="lta-cat-title">Categories</p>
            <div className="flex flex-col gap-4">
              {categories.map((cat) => (
                <div key={cat.title}>
                  <p className="text-xs font-semibold text-orange-700 mb-2">
                    {cat.title}
                  </p>
                  <div className="flex flex-col gap-1">
                    {cat.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="lta-cat-item pl-2"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
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
                  className={`pl-10 border ${errors.email ? "border-red-500" : "border-orange-200"} focus:border-[#c8622a] focus:ring-[#c8622a]`}
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
                  className={`pl-10 pr-10 border ${errors.password ? "border-red-500" : "border-orange-200"} focus:border-[#c8622a] focus:ring-[#c8622a]`}
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
                onClick={() => setLoginModalOpen(false)}
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
                onClick={switchToSignup}
                className="text-[#c8622a] font-semibold hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* SIGNUP MODAL */}
      <Dialog open={signupModalOpen} onOpenChange={setSignupModalOpen}>
        <DialogContent className="sm:max-w-md w-[95vw] rounded-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="bg-linear-to-r from-[#c8622a] to-[#b5531e] p-6 text-white sticky top-0 z-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-serif text-white">
                Create Account
              </DialogTitle>
              <DialogDescription className="text-orange-100">
                Join LankaToAus to start sending gifts
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleSignup} className="p-6 space-y-4">
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
                  className={`border ${errors.firstName ? "border-red-500" : "border-orange-200"}`}
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
                  className={`border ${errors.lastName ? "border-red-500" : "border-orange-200"}`}
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
                  className={`pl-10 border ${errors.email ? "border-red-500" : "border-orange-200"}`}
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
                  className={`pl-10 border ${errors.phone ? "border-red-500" : "border-orange-200"}`}
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
                  className={`pl-10 pr-10 border ${errors.password ? "border-red-500" : "border-orange-200"}`}
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
                  className={`pl-10 pr-10 border ${errors.confirmPassword ? "border-red-500" : "border-orange-200"}`}
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
                <Link
                  href="/privacy"
                  className="text-[#c8622a] hover:underline"
                >
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
                onClick={switchToLogin}
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
    </>
  );
};

export default Header;
