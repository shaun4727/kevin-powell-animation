যেহেতু তুমি সরাসরি ফুল সলিউশন (Full Solution) চেয়েছ, তাই মেন্টরিং রুল অনুযায়ী আমি তোমাকে সম্পূর্ণ প্রোডাকশন-রেডি কোডটি দিচ্ছি।

একজন সিনিয়র ইঞ্জিনিয়ার হিসেবে আমি এই কোডটিতে শুধুমাত্র লেআউটই ঠিক করিনি, বরং **অ্যাক্সেসিবিলিটি (Accessibility - a11y)** এর উপর বিশেষ জোর দিয়েছি, যাতে স্ক্রিন রিডার (যেমন: NVDA, JAWS, বা VoiceOver) এবং কীবোর্ড ইউজাররা কোনো সমস্যা ছাড়াই ওয়েবসাইটটি ব্যবহার করতে পারে।

নিচে সম্পূর্ণ HTML এবং CSS দেওয়া হলো। কোডটি কপি করার পর আমি এর গুরুত্বপূর্ণ আর্কিটেকচারাল পরিবর্তনগুলো ব্যাখ্যা করব।

### `index.html`

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CloudSync - Modern SaaS Landing Page</title>

        <!-- Styles & Fonts -->
        <link rel="stylesheet" href="./css/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
        />
    </head>
    <body>
        <!-- Header Area -->
        <header class="header">
            <!-- Container is INSIDE the header -->
            <div class="container header-container">
                <!-- Screen readers will read this as a link to the homepage -->
                <a href="/" class="logo" aria-label="CloudSync Home"
                    >CloudSync</a
                >

                <nav aria-label="Main Navigation">
                    <ul class="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                    </ul>
                </nav>
                <button class="button primary-button">Get Started</button>
            </div>
        </header>

        <main>
            <!-- Hero Section -->
            <section id="home" class="hero-section">
                <div class="container hero-container">
                    <div class="hero-content">
                        <h1 class="font-inter">
                            Manage your cloud syncing seamlessly
                        </h1>
                        <p class="font-roboto">
                            CloudSync provides the fastest, most reliable cloud
                            data synchronization for teams and individuals.
                            Start simplifying your workflow today.
                        </p>
                        <div class="button-group">
                            <button class="button primary-button">
                                Start Free Trial
                            </button>
                            <button class="button outline-button">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div class="hero-image-wrapper">
                        <!-- aria-hidden="true" tells screen readers to ignore this decorative placeholder -->
                        <div class="image-placeholder" aria-hidden="true">
                            <span>Dashboard Preview</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section id="features" class="feature-section">
                <div class="container">
                    <h2 class="font-inter">Why Choose CloudSync?</h2>

                    <div class="cards">
                        <!-- <article> tag is great for self-contained cards -->
                        <article class="feature-card">
                            <div class="icon-wrapper" aria-hidden="true">
                                🚀
                            </div>
                            <h3 class="font-inter">Lightning Fast</h3>
                            <p class="font-roboto">
                                Experience unparalleled sync speeds across all
                                your devices without compromising on security.
                            </p>
                        </article>

                        <article class="feature-card">
                            <div class="icon-wrapper" aria-hidden="true">
                                🔒
                            </div>
                            <h3 class="font-inter">Bank-Level Security</h3>
                            <p class="font-roboto">
                                Your data is encrypted end-to-end. Only you have
                                access to your most important files.
                            </p>
                        </article>

                        <article class="feature-card">
                            <div class="icon-wrapper" aria-hidden="true">
                                📱
                            </div>
                            <h3 class="font-inter">Cross-Platform</h3>
                            <p class="font-roboto">
                                Available on Windows, macOS, iOS, and Android.
                                Sync anywhere, anytime.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <p class="font-roboto">
                    &copy; 2026 CloudSync. All rights reserved.
                </p>
            </div>
        </footer>
    </body>
</html>
```

---

### `css/style.css`

```css
/* =========================================
   1. CSS Variables (Design System)
========================================= */
:root {
    --primary-brand-color: #4f46e5;
    --primary-brand-hover: #4338ca;
    --primary-background: #ffffff;
    --section-background: #f9fafb;
    --text-color-dark: #111827;
    --text-color-muted: #6b7280;
    --border-radius: 8px; /* Standardized to a modern SaaS look */
    --focus-ring-color: #facc15; /* High contrast yellow for a11y */
}

/* =========================================
   2. Reset & Base Styles
========================================= */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    color: var(--text-color-dark);
    background-color: var(--primary-background);
    line-height: 1.6;
}

h1,
h2,
h3,
.logo,
.font-inter {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
}

/* =========================================
   3. Container Architecture
========================================= */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

/* =========================================
   4. Accessibility & UI Components (Buttons/Links)
========================================= */
a {
    text-decoration: none;
    color: inherit;
}

/* Keboard Navigation Focus States (Crucial for a11y) */
a:focus-visible,
button:focus-visible {
    outline: 3px solid var(--focus-ring-color);
    outline-offset: 3px;
    border-radius: 4px;
}

.button {
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
}

.primary-button {
    background-color: var(--primary-brand-color);
    color: #ffffff;
    border: 2px solid var(--primary-brand-color);
}

.primary-button:hover {
    background-color: var(--primary-brand-hover);
    border-color: var(--primary-brand-hover);
}

.outline-button {
    background-color: transparent;
    color: var(--primary-brand-color);
    border: 2px solid var(--primary-brand-color);
}

.outline-button:hover {
    background-color: #e0e7ff;
}

/* =========================================
   5. Mobile-First Layouts (Default Styles)
========================================= */

/* Header */
.header {
    border-bottom: 1px solid #e5e7eb;
    background-color: var(--primary-background);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

.logo {
    font-size: 1.5rem;
    color: var(--primary-brand-color);
}

/* Hide links on mobile to prevent overflow (simplest approach for Level 1) */
.nav-links {
    display: none;
    list-style: none;
    gap: 2rem;
}

.nav-links a:hover {
    color: var(--primary-brand-color);
}

/* Hero Section */
.hero-section {
    padding: 4rem 0;
}

.hero-container {
    display: flex;
    flex-direction: column; /* Stack vertically on mobile */
    gap: 3rem;
    text-align: center;
    align-items: center;
}

.hero-content h1 {
    font-size: 2.25rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
}

.hero-content p {
    color: var(--text-color-muted);
    font-size: 1.125rem;
    margin-bottom: 2rem;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

/* Placeholder instead of broken image */
.image-placeholder {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 4/3;
    background-color: #e0e7ff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-brand-color);
    font-weight: 700;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Feature Section */
.feature-section {
    background-color: var(--section-background);
    padding: 5rem 0;
}

.feature-section h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}

.cards {
    display: grid;
    grid-template-columns: 1fr; /* 1 Column on Mobile */
    gap: 2rem;
}

.feature-card {
    background: var(--primary-background);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    text-align: center;
}

.feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    margin-bottom: 1rem;
}

.feature-card p {
    color: var(--text-color-muted);
}

/* Footer */
.footer {
    background-color: var(--primary-brand-color);
    color: #ffffff;
    padding: 2rem 0;
    text-align: center;
}

/* =========================================
   6. Breakpoints (Min-Width)
========================================= */

/* Tablet Breakpoint */
@media (min-width: 768px) {
    .hero-content h1 {
        font-size: 3rem;
    }

    .button-group {
        flex-direction: row;
        justify-content: center;
    }

    .cards {
        grid-template-columns: repeat(2, 1fr); /* 2 Columns Grid */
    }
}

/* Desktop Breakpoint */
@media (min-width: 1024px) {
    .nav-links {
        display: flex; /* Show Navigation Links */
    }

    .hero-container {
        flex-direction: row; /* Side by side */
        text-align: left;
    }

    .hero-content {
        flex: 1; /* Takes exactly 50% space */
    }

    .hero-image-wrapper {
        flex: 1; /* Takes exactly 50% space */
        display: flex;
        justify-content: flex-end;
    }

    .button-group {
        justify-content: flex-start;
    }

    .cards {
        grid-template-columns: repeat(3, 1fr); /* 3 Columns Grid */
    }
}
```

---

### সিনিয়র ইঞ্জিনিয়ারের ব্যাখ্যা (কেন এই কোডটি প্রোডাকশন-রেডি):

১. **Accessibility (a11y) Fixes:**

- **Focus States:** `a:focus-visible` এবং `button:focus-visible` যোগ করা হয়েছে। এর ফলে কেউ যখন `Tab` কীবোর্ড চেপে সাইট ভিজিট করবে, তখন হলুদ রঙের একটি সুন্দর আউটলাইন দেখা যাবে। এটি ব্লাইন্ড বা মোটর ডিজেবিলিটি থাকা ইউজারদের জন্য অত্যন্ত জরুরি।
- **Semantic Links:** আমি `<li>` এর ভেতরে `<a>` ট্যাগ ব্যবহার করেছি। নেভিগেশনে শুধু টেক্সট থাকলে স্ক্রিন রিডার বুঝতে পারে না যে এগুলোতে ক্লিক করা যাবে।
- **Aria-Hidden:** ডেকোরেটিভ ইলিমেন্ট (যেমন ইমোজি বা প্লেসহোল্ডার ইমেজ) এর মধ্যে `aria-hidden="true"` দিয়েছি। স্ক্রিন রিডার এগুলো ইগনোর করবে, ফলে অযথাই "Image of placeholder" পড়ে ইউজারকে বিরক্ত করবে না।
- **Landmarks:** আমি প্রতিটি সেকশনকে অর্থপূর্ণ ট্যাগ (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) দিয়ে মুড়িয়েছি।

২. **Container Architecture:**
লক্ষ্য করো, আমি `<div class="container">` ট্যাগটিকে `<header>`, `<section>` এবং `<footer>`-এর _ভেতরে_ রেখেছি। এর ফলে ফুটারের নীল ব্যাকগ্রাউন্ড এবং ফিচারের ছাইরঙা ব্যাকগ্রাউন্ড স্ক্রিনের এক মাথা থেকে অন্য মাথা পর্যন্ত পৌঁছাবে, কিন্তু কন্টেন্টগুলো ঠিকই ১২০০ পিক্সেলে সুন্দরভাবে আটকে থাকবে।

৩. **Responsive Grid (`1fr` vs `auto`):**
ডেস্কটপে `grid-template-columns: repeat(3, 1fr);` ব্যবহার করেছি। `auto` ব্যবহার করলে কন্টেন্ট অনুযায়ী কলাম ছোট-বড় হয়। কিন্তু `1fr` ব্যবহার করলে গ্রিডের জায়গা সমান ৩ ভাগে ভাগ হয়ে যায়, যা দেখতে অনেক সুন্দর ও প্রফেশনাল লাগে।

৪. **Mobile Navigation Override:**
মোবাইলে স্পেস না থাকায় `display: none;` ব্যবহার করে লিংকগুলো হাইড করে দিয়েছি। (পরবর্তীতে যখন আমরা জাভাস্ক্রিপ্ট শিখব, তখন এখানে একটি হ্যামবার্গার মেনু যোগ করব)।

---

### তোমার জন্য ইন্টারভিউ প্রশ্ন (Level 1 সমাপ্তি):

যেহেতু আমরা লেভেল ১ শেষ করছি, তুমি নিচের প্রশ্নগুলোর উত্তর দেওয়ার চেষ্টা করো। এগুলো ফ্রন্টএন্ড ইন্টারভিউতে প্রায়ই জিজ্ঞেস করা হয়:

1. `max-width: 1200px` এবং `width: 100%` একসাথে ব্যবহার করার সুবিধা কী?
2. CSS-এ `:focus` এবং `:focus-visible` এর মধ্যে মূল পার্থক্য কী?
3. স্ক্রিন রিডার অপটিমাইজেশনের জন্য `alt=""` (ফাঁকা অল্ট ট্যাগ) এবং `aria-hidden="true"` কখন ব্যবহার করা উচিত?

এই প্রশ্নগুলোর উত্তর দাও। এরপর তুমি প্রস্তুত হলে আমরা **Level 2: Modern Agency Website** শুরু করব!
