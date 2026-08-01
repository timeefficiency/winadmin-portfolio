The next step is to create a reusable project.css that every project page (all 10 projects) can share. This keeps your portfolio consistent and makes future maintenance much easier.

Instead of having separate CSS for each project, I recommend this structure:

assets/
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── pages/
│       ├── projects.css          ← Projects listing page
│       ├── project.css           ← Individual project pages
│       ├── homelab.css
│       ├── lab-notes.css
│       ├── article.css
│       ├── about.css
│       └── contact.css

Every project page would then simply include:

<link rel="stylesheet" href="../assets/css/pages/project.css">
