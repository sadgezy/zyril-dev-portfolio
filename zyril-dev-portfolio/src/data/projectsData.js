export const projectsData = [
    {
        slug: "fleet-maintenance-app",
        title: "FGV Central",
        desc: "Request and track vehicle repairs via SharePoint backend.",
        coverImage: "/fgv_logo.png", // Used for project listing cards
        screenshots: [
            // For project detail page
            {
                // src: "/screenshots/fgv/screen1.jpg",
                alt: "FGV App Login Screen",
            },
            {
                // src: "/screenshots/fgv/screen2.jpg",
                alt: "FGV App Dashboard",
            },
            {
                // src: "/screenshots/fgv/screen3.jpg",
                alt: "FGV App Request Form",
            }, // 'none' for plain image
        ],
        longDesc:
            "This application was developed to streamline the process of requesting and tracking vehicle repairs for a large fleet. It integrates with a SharePoint backend for data storage and workflow management, providing real-time updates to users and administrators. The goal was to reduce paperwork, improve response times, and provide a clear overview of maintenance statuses.",
        technologies: [
            "Flutter",
            "Dart",
            "SharePoint API Integration",
            "Provider State Management",
        ],
        liveLink: null, // Example: "https://example.com/fleet-app-demo"
        repoLink: null, // Example: "https://github.com/your-repo/fleet-app"
    },
    {
        slug: "bill-splitter-app",
        title: "SplitUp!",
        desc: "Split bills with contacts and track money you're owed.",
        coverImage: "/splitup_logo.png",
        screenshots: [
            {
                src: "/screenshots/splitup_sc1.png",
                alt: "SplitUp Main Screen",
            },
            {
                src: "/screenshots/splitup_sc2.png",
                alt: "SplitUp Add Bill Screen",
            },
        ],
        longDesc:
            "A user-friendly mobile app designed to simplify splitting bills among friends and contacts. It helps users keep track of shared expenses and manage informal debts, ensuring everyone pays their fair share. Features include contact integration, expense categorization, and payment tracking.",
        technologies: ["Flutter", "Dart", "SQLite", "Shared Preferences"],
    },
    {
        slug: "elbeds",
        title: "ELBeds",
        desc: "Lightweight app for finding accommodations in Los Baños, Laguna.",
        coverImage: "/elbeds_logo.png",
        screenshots: [
            {
                // src: "/screenshots/elbeds/home.jpg",
                alt: "ELBeds Home Page",
            },
            {
                // src: "/screenshots/elbeds/listing.jpg",
                alt: "ELBeds Listing Page",
            },
        ],
        longDesc:
            "ELBeds is a focused application aimed at helping students and visitors find suitable accommodations in the area of Los Baños, Laguna. It features a simple interface for browsing listings, viewing details, and contacting landlords. The primary focus was on ease of use and quick access to information.",
        technologies: [
            "Flutter",
            "Dart",
            "Firebase Firestore",
            "Google Maps API (Basic Integration)",
        ],
    },
    // Add more projects as needed
];

// Helper function to get a project by its slug
export const getProjectBySlug = async (slug) => {
    // Simulate an async operation (like fetching from an API)
    return Promise.resolve(
        projectsData.find((project) => project.slug === slug)
    );
};
