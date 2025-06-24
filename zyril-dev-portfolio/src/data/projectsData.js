export const projectsData = [
    {
        slug: "fleet-maintenance-app",
        title: "FGV Central",
        desc: "Request and track vehicle repairs via SharePoint backend.",
        coverImage: "/fgv_logo.png",
        screenshots: [
            {
                src: "/screenshots/fgv_sc1.png",
                alt: "FGV App Login Screen",
            },
            {
                src: "/screenshots/fgv_sc2.png",
                alt: "FGV App Dashboard",
            },
            {
                src: "/screenshots/fgv_sc3.png",
                alt: "FGV App Request Form",
            },
        ],
        longDesc:
            "This application was developed to streamline the process of requesting and tracking vehicle repairs for a large fleet. It integrates with a SharePoint backend for data storage and workflow management, providing real-time updates to users and administrators. The goal was to reduce paperwork, improve response times, and provide a clear overview of maintenance statuses.",
        technologies: [
            "Flutter",
            "Dart",
            "SharePoint API",
            "GetX State Management",
            "MSAL Auththentication",
        ],
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
                alt: "Assign Screen",
            },
            {
                src: "/screenshots/splitup_sc3.png",
                alt: "Share Bill Screen",
            },
        ],
        longDesc:
            "A mobile app designed to simplify splitting bills among friends and contacts. I made this for a final capstone project for my internship and it helps users keep track of shared expenses and manage informal debts, ensuring everyone pays their fair share. Features include contact integration, expense categorization, and payment tracking.",
        technologies: ["Flutter", "Dart", "Shared Preferences"],
        repoLink: "https://github.com/sadgezy/SplitUp-Bill-splitting-app",
    },
    {
        slug: "elbeds",
        title: "ELBeds",
        desc: "Lightweight app for finding accommodations in Los Baños, Laguna.",
        coverImage: "/elbeds_logo.png",
        screenshots: [
            {
                src: "/screenshots/elbeds1.png",
                alt: "ELBeds Welcome Page",
            },
            {
                src: "/screenshots/elbeds2.png",
                alt: "ELBeds Login Page",
            },
            {
                src: "/screenshots/elbeds3.png",
                alt: "ELBeds SignUp Page",
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
        liveLink: "https://elbeds.vercel.app",
        repoLink: "https://github.com/sadgezy/CMSC-128-STALS",
    },
];

export const getProjectBySlug = async (slug) => {
    return Promise.resolve(
        projectsData.find((project) => project.slug === slug)
    );
};
