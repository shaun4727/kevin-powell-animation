```jsx
import React, { useState, useEffect, useRef } from 'react';

// --- Icon Components (Replacing lucide-react for zero-dependency runnability) ---
const ChevronDown = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<path d="m6 9 6 6 6-6" />
	</svg>
);

const MenuIcon = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<line x1="4" x2="20" y1="12" y2="12" />
		<line x1="4" x2="20" y1="6" y2="6" />
		<line x1="4" x2="20" y1="18" y2="18" />
	</svg>
);

const XIcon = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
);

const FileTextIcon = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
		<polyline points="14 2 14 8 20 8" />
	</svg>
);

const CodeIcon = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<polyline points="16 18 22 12 16 6" />
		<polyline points="8 6 2 12 8 18" />
	</svg>
);

const LogoIcon = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<polygon points="12 2 2 22 22 22" />
	</svg>
);

export default function Navigation() {
	// State Management
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null); // 'products', 'resources', or null

	const navRef = useRef(null);

	// --- Effects ---

	// 1. Scroll tracking for sticky header shadow/blur
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// 2. Click outside handler to close dropdowns
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setActiveDropdown(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// 3. Escape key handler for accessibility
	useEffect(() => {
		const handleEscKey = (event) => {
			if (event.key === 'Escape') {
				setActiveDropdown(null);
				setMobileMenuOpen(false);
			}
		};
		document.addEventListener('keydown', handleEscKey);
		return () => document.removeEventListener('keydown', handleEscKey);
	}, []);

	// 4. Lock body scroll when mobile menu is open
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [mobileMenuOpen]);

	// --- Handlers ---
	const toggleDropdown = (menuName) => {
		setActiveDropdown((prev) => (prev === menuName ? null : menuName));
	};

	return (
		<header
			ref={navRef}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out ${
				isScrolled || mobileMenuOpen
					? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
					: 'bg-transparent border-b border-transparent'
			}`}
		>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<a href="/" className="flex items-center gap-2 font-bold text-foreground text-lg tracking-tight z-50">
					<LogoIcon className="h-6 w-6" />
					<span>AcmeCorp</span>
				</a>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center h-full gap-1">
					<a
						href="/about"
						className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
					>
						About
					</a>

					{/* Standard Dropdown: Products */}
					<div className="relative h-full flex items-center">
						<button
							onClick={() => toggleDropdown('products')}
							aria-expanded={activeDropdown === 'products'}
							className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
								activeDropdown === 'products'
									? 'text-foreground bg-accent'
									: 'text-muted-foreground hover:text-foreground hover:bg-accent'
							}`}
						>
							Products
							<ChevronDown
								className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`}
							/>
						</button>

						{/* Dropdown Content */}
						<div
							className={`absolute top-[calc(100%-0.5rem)] left-1/2 -translate-x-1/2 w-56 p-2 bg-popover border border-border rounded-md shadow-md transition-all duration-200 ease-out origin-top ${
								activeDropdown === 'products'
									? 'opacity-100 scale-100 pointer-events-auto'
									: 'opacity-0 scale-95 pointer-events-none'
							}`}
						>
							<div className="flex flex-col">
								<a
									href="/payments"
									className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors"
								>
									Payments
								</a>
								<a
									href="/billing"
									className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors"
								>
									Billing
								</a>
								<a
									href="/connect"
									className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors"
								>
									Connect
								</a>
								<div className="my-1 h-px bg-border" />
								<a
									href="/pricing"
									className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors"
								>
									Pricing Overview
								</a>
							</div>
						</div>
					</div>

					{/* Mega Menu: Resources */}
					<div className="relative h-full flex items-center">
						<button
							onClick={() => toggleDropdown('resources')}
							aria-expanded={activeDropdown === 'resources'}
							className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
								activeDropdown === 'resources'
									? 'text-foreground bg-accent'
									: 'text-muted-foreground hover:text-foreground hover:bg-accent'
							}`}
						>
							Resources
							<ChevronDown
								className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`}
							/>
						</button>

						{/* Mega Menu Content */}
						<div
							className={`absolute top-[calc(100%-0.5rem)] left-1/2 -translate-x-1/2 w-max max-w-[48rem] p-6 bg-popover border border-border rounded-xl shadow-lg transition-all duration-200 ease-out origin-top ${
								activeDropdown === 'resources'
									? 'opacity-100 scale-100 pointer-events-auto'
									: 'opacity-0 scale-95 pointer-events-none'
							}`}
						>
							<div className="grid grid-cols-3 gap-8">
								{/* Column 1 */}
								<div className="flex flex-col gap-4">
									<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
										Developers
									</h3>
									<div className="flex flex-col gap-2">
										<a
											href="/docs"
											className="flex items-start gap-3 p-2 rounded-md hover:bg-accent transition-colors group"
										>
											<FileTextIcon className="h-5 w-5 text-foreground mt-0.5" />
											<div className="flex flex-col">
												<span className="text-sm font-medium text-foreground">
													Documentation
												</span>
												<span className="text-xs text-muted-foreground">
													API references and guides
												</span>
											</div>
										</a>
										<a
											href="/api"
											className="flex items-start gap-3 p-2 rounded-md hover:bg-accent transition-colors group"
										>
											<CodeIcon className="h-5 w-5 text-foreground mt-0.5" />
											<div className="flex flex-col">
												<span className="text-sm font-medium text-foreground">
													API Reference
												</span>
												<span className="text-xs text-muted-foreground">
													Endpoints and libraries
												</span>
											</div>
										</a>
									</div>
								</div>

								{/* Column 2 */}
								<div className="flex flex-col gap-4">
									<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
										Company
									</h3>
									<div className="flex flex-col gap-1">
										<a
											href="/blog"
											className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
										>
											Blog
										</a>
										<a
											href="/customers"
											className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
										>
											Customers
										</a>
										<a
											href="/careers"
											className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
										>
											Careers
										</a>
									</div>
								</div>

								{/* Column 3 (Featured Card) */}
								<div className="flex flex-col items-start bg-muted/50 border border-border p-5 rounded-lg">
									<span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 mb-3">
										New
									</span>
									<h4 className="text-sm font-medium text-foreground mb-1">Global Payments Report</h4>
									<p className="text-xs text-muted-foreground mb-4 leading-relaxed">
										Discover the latest trends in global digital transactions for 2026.
									</p>
									<a
										href="/report"
										className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
									>
										Read Report
									</a>
								</div>
							</div>
						</div>
					</div>

					<a
						href="/enterprise"
						className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
					>
						Enterprise
					</a>
				</nav>

				{/* Right Actions */}
				<div className="flex items-center gap-4 z-50">
					<a
						href="/login"
						className="hidden lg:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Sign in
					</a>
					<a
						href="/contact"
						className="hidden lg:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
					>
						Contact Sales
					</a>

					{/* Mobile Menu Toggle */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="lg:hidden p-2 -mr-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
						aria-label="Toggle navigation menu"
						aria-expanded={mobileMenuOpen}
					>
						{mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation Overlay */}
			<div
				className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-background border-t border-border lg:hidden transition-all duration-300 ease-in-out overflow-y-auto ${
					mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
				}`}
			>
				<div className="flex flex-col p-4 gap-4">
					<a href="/about" className="p-3 text-base font-medium border-b border-border text-foreground">
						About
					</a>

					{/* Mobile Products Accordion */}
					<div className="flex flex-col border-b border-border">
						<button
							onClick={() => toggleDropdown('mobile-products')}
							className="flex items-center justify-between p-3 text-base font-medium text-foreground w-full text-left"
						>
							Products
							<ChevronDown
								className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-products' ? 'rotate-180' : ''}`}
							/>
						</button>
						<div
							className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out pl-4 ${activeDropdown === 'mobile-products' ? 'max-h-48 opacity-100 mb-3' : 'max-h-0 opacity-0'}`}
						>
							<a href="/payments" className="py-2 text-sm text-muted-foreground">
								Payments
							</a>
							<a href="/billing" className="py-2 text-sm text-muted-foreground">
								Billing
							</a>
							<a href="/connect" className="py-2 text-sm text-muted-foreground">
								Connect
							</a>
							<a href="/pricing" className="py-2 text-sm text-muted-foreground">
								Pricing Overview
							</a>
						</div>
					</div>

					{/* Mobile Resources Accordion */}
					<div className="flex flex-col border-b border-border">
						<button
							onClick={() => toggleDropdown('mobile-resources')}
							className="flex items-center justify-between p-3 text-base font-medium text-foreground w-full text-left"
						>
							Resources
							<ChevronDown
								className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`}
							/>
						</button>
						<div
							className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out pl-4 ${activeDropdown === 'mobile-resources' ? 'max-h-64 opacity-100 mb-3' : 'max-h-0 opacity-0'}`}
						>
							<a href="/docs" className="py-2 text-sm text-muted-foreground">
								Documentation
							</a>
							<a href="/api" className="py-2 text-sm text-muted-foreground">
								API Reference
							</a>
							<a href="/blog" className="py-2 text-sm text-muted-foreground">
								Blog
							</a>
							<a href="/customers" className="py-2 text-sm text-muted-foreground">
								Customers
							</a>
						</div>
					</div>

					<a href="/enterprise" className="p-3 text-base font-medium border-b border-border text-foreground">
						Enterprise
					</a>

					<div className="flex flex-col gap-3 mt-4">
						<a
							href="/login"
							className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
						>
							Sign in
						</a>
						<a
							href="/contact"
							className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
						>
							Contact Sales
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}
```
