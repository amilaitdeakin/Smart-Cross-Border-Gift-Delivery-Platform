"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/utils/categories";
import {
  Gift,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type KeyboardEvent } from "react";
import { LoginModal } from "./model/login-modal";
import { SignupModal } from "./model/signup-model";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Gifts", href: "/gifts" },
  { label: "Occasions", href: "/occasions" },
  { label: "Ai Suggestion", href: "/gifts/ai-suggestions" },
  { label: "Track Order", href: "/track-public" },
];

type SearchSuggestion = {
  label: string;
  href: string;
  group: string;
  description: string;
  keywords: string[];
};

const SEARCH_SUGGESTIONS: SearchSuggestion[] = categories.reduce<
  SearchSuggestion[]
>(
  (suggestions, category) => {
    category.items.forEach((item) => {
      suggestions.push({
        label: item.name,
        href: item.href,
        group: category.title,
        description: `${category.title} · ${item.name}`,
        keywords: [category.title, item.name],
      });
    });

    return suggestions;
  },
  [
    {
      label: "Chocolate Cake",
      href: "/gifts?q=Chocolate%20Cake",
      group: "Trending",
      description: "Rich cakes and sweet treats",
      keywords: ["chocolate", "cake", "sweet", "dessert"],
    },
    {
      label: "Belgian Chocolates",
      href: "/gifts?q=Belgian%20Chocolates",
      group: "Trending",
      description: "Premium chocolate gift ideas",
      keywords: ["chocolate", "gift", "sweet"],
    },
    {
      label: "Birthday Gifts",
      href: "/gifts?q=Birthday%20Gifts",
      group: "Occasions",
      description: "Popular gifts for birthdays",
      keywords: ["birthday", "gift", "celebration"],
    },
    {
      label: "Anniversary Gifts",
      href: "/gifts?q=Anniversary%20Gifts",
      group: "Occasions",
      description: "Romantic gift ideas",
      keywords: ["anniversary", "gift", "romantic"],
    },
  ],
);

const normalizeSearch = (value: string) => value.trim().toLowerCase();

const Header = () => {
  const { getTotalItems } = useCartStore();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemCount = getTotalItems();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session;

  const filteredSearchSuggestions = useMemo(() => {
    const query = normalizeSearch(searchQuery);

    if (!query) {
      return [];
    }

    return SEARCH_SUGGESTIONS.filter((item) => {
      const haystack = [
        item.label,
        item.group,
        item.description,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    }).slice(0, 6);
  }, [searchQuery]);

  const openLoginModal = () => setLoginModalOpen(true);
  const openSignupModal = () => setSignupModalOpen(true);

  const switchToSignup = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  const switchToLogin = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(true);
  };

  const handleSearch = (value: string) => {
    const query = value.trim();

    if (!query) {
      return;
    }

    router.push(`/gifts?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchQuery);
    }
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

        .lta-search-suggestions {
          position: absolute;
          left: 0;
          right: 0;
          top: calc(100% + 10px);
          z-index: 60;
          background: #fffdf9;
          border: 1px solid #f0dece;
          border-radius: 16px;
          box-shadow: 0 18px 45px rgba(100,40,0,0.12);
          overflow: hidden;
        }
        .lta-search-suggestion-header {
          padding: 12px 16px 8px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #c8622a;
        }
        .lta-search-suggestion-item {
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          border-top: 1px solid #f5e7db;
          transition: background 0.15s, color 0.15s;
        }
        .lta-search-suggestion-item:hover {
          background: #fff4ec;
        }
        .lta-search-suggestion-name {
          font-size: 14px;
          font-weight: 600;
          color: #4a2800;
        }
        .lta-search-suggestion-meta {
          font-size: 12px;
          color: #8d6c55;
          margin-top: 2px;
        }
        .lta-search-suggestion-cta {
          margin-top: 8px;
          border-top: 1px solid #f5e7db;
          padding: 12px 16px 14px;
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
        {/*         <div className="lta-topbar">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <span>
              🇦🇺 Fast delivery across Worldwide · 🇱🇰 Sourced from Sri Lanka
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
        </div> */}

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
                {/* <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <Gift className="h-5 w-5 text-white" />
                </div> */}
                <div>
                  <Image
                    src="/assets/imasge.png"
                    alt="Logo"
                    width={200}
                    height={200}
                    className="lta-logo-font"
                  />
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
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
                {filteredSearchSuggestions.length > 0 && (
                  <div className="lta-search-suggestions">
                    <div className="lta-search-suggestion-header">
                      Suggested gifts
                    </div>
                    {filteredSearchSuggestions.map((item) => (
                      <button
                        key={`${item.group}-${item.label}`}
                        type="button"
                        className="lta-search-suggestion-item"
                        onClick={() => {
                          setSearchQuery(item.label);
                          handleSearch(item.label);
                        }}
                      >
                        <div className="mt-1 h-2 w-2 rounded-full bg-[#c8622a]" />
                        <div>
                          <div className="lta-search-suggestion-name">
                            {item.label}
                          </div>
                          <div className="lta-search-suggestion-meta">
                            {item.description}
                          </div>
                        </div>
                      </button>
                    ))}
                    <div className="lta-search-suggestion-cta">
                      <button
                        type="button"
                        className="text-sm font-medium text-[#c8622a] hover:text-[#b5531e]"
                        onClick={() => handleSearch(searchQuery)}
                      >
                        Search for &quot;{searchQuery.trim()}&quot;
                      </button>
                    </div>
                  </div>
                )}
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
                  {cartItemCount > 0 && (
                    <span
                      className="lta-cart-badge"
                      aria-label={`${cartItemCount} items in cart`}
                    >
                      {cartItemCount}
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
                      <DropdownMenuItem
                        className="flex items-center gap-2 text-red-500 cursor-pointer"
                        onClick={async () => {
                          await authClient.signOut();
                        }}
                      >
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
              {/*       <div className="relative group">
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
              </div> */}
            </nav>
          </div>
        </div>

        {/* Route strip */}
        {/*        <div
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
          <span style={{ fontWeight: 500 }}>Worldwide</span>
          <span className="lta-flag" aria-hidden="true">
            🇦🇺
          </span>
          <div
            className="flex gap-2 ml-2"
            aria-label="Available cities in Worldwide"
          >
            {["Sydney", "Melbourne", "Brisbane", "Perth"].map((city) => (
              <span key={city} className="lta-route-city">
                {city}
              </span>
            ))}
          </div>
        </div> */}
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
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
              {filteredSearchSuggestions.length > 0 && (
                <div
                  className="lta-search-suggestions"
                  style={{ position: "static", marginTop: "14px" }}
                >
                  <div className="lta-search-suggestion-header">
                    Suggested gifts
                  </div>
                  {filteredSearchSuggestions.map((item) => (
                    <button
                      key={`${item.group}-${item.label}`}
                      type="button"
                      className="lta-search-suggestion-item"
                      onClick={() => {
                        setSearchQuery(item.label);
                        handleSearch(item.label);
                      }}
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-[#c8622a]" />
                      <div>
                        <div className="lta-search-suggestion-name">
                          {item.label}
                        </div>
                        <div className="lta-search-suggestion-meta">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  ))}
                  <div className="lta-search-suggestion-cta">
                    <button
                      type="button"
                      className="text-sm font-medium text-[#c8622a] hover:text-[#b5531e]"
                      onClick={() => handleSearch(searchQuery)}
                    >
                      Search for &quot;{searchQuery.trim()}&quot;
                    </button>
                  </div>
                </div>
              )}
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
              <div>
                <Image
                  src="/assets/imasge.png"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="lta-logo-font"
                />
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
              {!isLoggedIn ? (
                <>
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
                </>
              ) : (
                <button
                  className="lta-btn-login w-full flex items-center justify-center gap-2"
                  style={{ borderColor: "#ef4444", color: "#ef4444" }}
                  onClick={async () => {
                    setMobileOpen(false);
                    await authClient.signOut();
                  }}
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              )}
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

            {/*             <div className="lta-divider" />

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
            </div> */}
          </div>
        </div>
      )}

      {/* External Modals */}
      <LoginModal
        open={loginModalOpen}
        setOpen={setLoginModalOpen}
        onSwitchToSignup={switchToSignup}
      />
      <SignupModal
        open={signupModalOpen}
        setOpen={setSignupModalOpen}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default Header;
