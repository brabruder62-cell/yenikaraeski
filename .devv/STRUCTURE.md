# This file is only for editing file nodes, do not break the structure
## Project Description
Karaeski App - A Telegram Mini App casino/betting platform with coin rewards, task system, and interactive games. Features a modern green gradient design with smooth animations, haptic feedback, and complete game management.

## Key Features
- ✅ **Telegram Web App SDK** - Haptic feedback, real-time user data integration
- ✅ **Animated Welcome Screen** - Channel membership verification with floating mascot
- ✅ **Channel Gate System** - Required Telegram channel join with "Katıl" & "Kontrol Et" buttons
- ✅ **Email OTP Authentication** - Devv Auth SDK with automatic user registration
- ✅ **Referral System** - Auto-generated codes (KAR+6 digits), +500 coin bonus for both parties
- ✅ **Coin & Reward System** - Real-time balance updates, daily bonuses, task rewards
- ✅ **Playable Casino Games:**
  * Limbo - Multiplier prediction game (playable)
  * Dice - Number guessing with over/under betting (playable)
  * Mines - Minesweeper-style risk game (playable)
  * Tower Legend, Crash, Roulette (Coming Soon)
- ✅ **User Store Page** - Purchase items with coins, stock management, transaction history
- ✅ **Real-time Sponsor Showcase** - Dynamic database integration with image uploads
- ✅ **Image Upload System** - Devv File Upload for sponsors and store items
- ✅ **User Profile** - Telegram data, join date, referral code sharing, statistics
- ✅ **Admin Panel** - Full CRUD operations for all features, real-time data management
- ✅ **Task System** - Real-time submission, proof URL upload, admin approval workflow
- ✅ **Animated UI** - Confetti celebrations, loading states, smooth transitions
- ✅ **🚀 PRODUCTION READY** - All features connected to database, real-time updates
- ✅ **Build Optimized** - TypeScript errors fixed, production build successful

## Data Storage
**Database Tables (8 tables):**
- users (f41liqhtnp4w) - User data with Telegram info, coin balance, referral code
- sponsors (f41liqhw5rsw) - Sponsor showcase data with images [PUBLIC READ]
- store_items (f41liqhtnvgg) - Store items for purchase with coins [PUBLIC READ]
- tasks (f41liqhw5lhd) - Task definitions with rewards [PUBLIC READ]
- task_completions (f41liqs5qqyo) - Task completion submissions and approvals
- notifications (f41liqhjo3r4) - Admin notifications broadcast history
- game_settings (f41liqhw5lhc) - Game configuration settings [PUBLIC READ]
- app_settings (f41liquxmigw) - App-wide config (bot token, channel, bonuses) [PUBLIC READ]

**Local Storage:**
- User session (auth-storage) - Zustand persist with user data
- Channel membership status
- Last daily claim timestamp
- Temporary game state

## Devv SDK Integration
**Built-in Services (FREE):**
- ✅ Authentication - Email OTP verification
- ✅ Database - 8 tables with real-time CRUD operations
- ✅ File Upload - Image upload for sponsors and store items

**External Services:** None currently

## Special Requirements
- Must work as Telegram Mini App
- Green gradient casino theme design
- Extensive animations and visual effects
- Configurable redirections for sponsor links
- Multi-language support (Turkish primary)

/src
├── assets/          # Static resources directory
│
├── components/      # Components directory
│   ├── ui/         # Pre-installed shadcn/ui components
│   ├── AdminSidebar.tsx # Admin panel navigation sidebar
│   ├── AdminLayout.tsx  # Admin panel layout wrapper with auth protection
│   └── BottomNav.tsx    # User-facing bottom navigation
│
├── hooks/          # Custom Hooks directory
│   ├── use-mobile.ts # Mobile detection Hook
│   └── use-toast.ts  # Toast notification system Hook
│
├── lib/            # Utility library directory
│   └── utils.ts    # Utility functions, including cn function for merging Tailwind classes
│
├── pages/          # Page components directory (React Router structure)
│   ├── WelcomePage.tsx # Animated welcome screen with channel gate and mascot
│   ├── HomePage.tsx # Home page with daily bonus and sponsors
│   ├── GamesPage.tsx # All games listing with popular section
│   ├── TasksPage.tsx # Daily and special tasks with progress tracking
│   ├── ProfilePage.tsx # User profile with Telegram data and stats
│   ├── NotFoundPage.tsx # 404 error page
│   ├── games/      # Playable game pages
│   │   ├── LimboGame.tsx # Multiplier prediction game
│   │   ├── DiceGame.tsx  # Dice rolling game
│   │   └── MinesGame.tsx # Minesweeper-style game
│   └── admin/      # Admin panel pages
│       ├── AdminLoginPage.tsx # Admin authentication page
│       ├── DashboardPage.tsx  # Overview with stats and charts
│       ├── UsersPage.tsx      # User management table
│       ├── NotificationsPage.tsx # Notification broadcast system
│       ├── TasksPage.tsx      # Task creation and management
│       ├── TaskApprovalsPage.tsx # Task approval with proof review
│       ├── GameSettingsPage.tsx  # Game configuration panel
│       ├── StorePage.tsx      # Store item management
│       ├── SponsorsPage.tsx   # Sponsor CRUD operations
│       └── SettingsPage.tsx   # App-wide settings control
│
├── store/          # State management directory (Zustand)
│   ├── auth-store.ts # User authentication, channel verification, welcome flow
│   └── admin-store.ts # Admin authentication and session state
│
├── features/       # Feature modules directory (if any)
│   └── [feature-name]/
│       ├── components/
│       ├── hooks/
│       └── types.ts
│
├── App.tsx         # Root component with React Router configuration
│                   # Includes welcome gate, protected routes, admin routes, and 404 handling
│                   # All user routes require channel membership verification
│
├── main.tsx        # Entry file, renders root component and mounts to DOM
│
├── index.css       # Global styles file with Tailwind config and design system
│                   # Green gradient casino theme with emerald/teal colors
│
└── tailwind.config.js  # Tailwind CSS v3 configuration file