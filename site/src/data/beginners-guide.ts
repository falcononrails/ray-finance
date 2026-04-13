export interface BeginnersGuideStep {
  title: string;
  body: string;
  link?: string;
}

export interface BeginnersGuideSection {
  id: string;
  title: string;
  description?: string;
  steps: BeginnersGuideStep[];
}

export const beginnersGuide = {
  title: "Beginner's guide to Ray",
  subtitle:
    "Never used a terminal before? No problem. This guide walks you through every step — from opening your terminal to talking to your money. Takes about 15 minutes.",
  metaTitle: "Beginner's Guide to Ray | Ray Finance",
  metaDescription:
    "A complete step-by-step guide for non-technical users. Learn how to install Ray, connect your bank, and start getting AI-powered financial advice.",
  sections: [
    {
      id: "terminal",
      title: "What is a terminal?",
      description:
        "A terminal is a text-based app on your computer where you type commands instead of clicking buttons. Ray runs in the terminal. Don't worry — you only need to learn a few commands.",
      steps: [
        {
          title: "Think of it like texting your computer",
          body: "Instead of clicking icons and menus, you type short commands and press Enter. The computer responds with text. That's it. Ray works this way — you type a command like `ray status` and it shows you your finances.",
        },
        {
          title: "Open Terminal on macOS",
          body: "Press Command + Space to open Spotlight search. Type `Terminal` and press Enter. A window with a blinking cursor will appear — that's your terminal. You can also find it in Applications → Utilities → Terminal.",
        },
        {
          title: "Open a terminal on Windows or Linux",
          body: "On Windows, click the Start menu and search for `PowerShell` or `Windows Terminal`. On Linux, press Ctrl + Alt + T or search for \"Terminal\" in your app launcher. Any of these will work for running Ray.",
        },
      ],
    },
    {
      id: "install",
      title: "Install the prerequisites",
      description:
        "Ray needs one thing installed first: Node.js. This is a free tool that lets your computer run apps like Ray.",
      steps: [
        {
          title: "Install Node.js",
          body: "Go to the Node.js website and download the LTS (Long Term Support) version — it's the big green button. Run the installer and follow the prompts. When it's done, open your terminal and type `node --version` then press Enter. If you see a version number like v20.x.x, you're good.",
          link: "https://nodejs.org/",
        },
        {
          title: "Install Ray",
          body: "In your terminal, type `npm install -g ray-finance` and press Enter. This downloads and installs Ray on your computer. It may take a minute. When it's done, type `ray --version` and press Enter to confirm it worked. You should see a version number.",
        },
      ],
    },
    {
      id: "demo",
      title: "Try the demo first",
      description:
        "Before connecting your real bank accounts, try Ray with fake data to see how it works. No setup needed.",
      steps: [
        {
          title: "Create a demo database",
          body: "Type `ray demo` and press Enter. Ray will create a fake portfolio with realistic transactions, accounts, and balances. This is completely separate from any real data — it's just for trying things out.",
        },
        {
          title: "Explore the demo commands",
          body: "Try these commands one at a time (type each one and press Enter):\n\n`ray --demo status` — see a financial overview\n`ray --demo spending` — spending breakdown by category\n`ray --demo accounts` — linked accounts and balances\n`ray --demo budgets` — budget tracking\n`ray --demo goals` — financial goal progress\n`ray --demo score` — your daily score and streaks\n\nPlay around and get comfortable. When you're ready to use your real data, move on to the next section.",
        },
      ],
    },
    {
      id: "setup",
      title: "Set up Ray",
      description:
        "Now it's time to configure Ray with your real accounts. There are two paths — pick whichever feels right for you.",
      steps: [
        {
          title: "Choose your path: Pro or Bring Your Own Keys",
          body: "Ray Pro ($10/month) is the fastest way to get started — you don't need to create accounts with Anthropic or Plaid. Everything is handled for you. Your data still stays on your machine.\n\nBring Your Own Keys is completely free, but requires creating accounts with Anthropic (for AI) and Plaid (for bank connections). It takes a bit more setup, and Plaid production access can take 1–2 weeks to approve.\n\nPick one and follow the matching steps below.",
        },
        {
          title: "Path A: Ray Pro (quick setup)",
          body: "Type `ray setup` and press Enter. When asked to choose a mode, select \"Ray Pro\". Enter your name, then Ray will open a Stripe checkout page in your browser. Complete the $10/month payment and you'll get a Ray API key automatically. Paste it into the terminal when prompted. That's it — skip ahead to \"Connect your bank.\"",
        },
        {
          title: "Path B: Bring Your Own Keys (free)",
          body: "You need two things before running setup:\n\n1. An Anthropic API key — this powers the AI. Create a free account at console.anthropic.com, add a payment method, then generate an API key. Detailed steps are in our Anthropic API key guide.\n\n2. Plaid production credentials — this connects to your bank. Create a free account at dashboard.plaid.com, then apply for production access (takes 1–2 weeks). Important: Ray requires production credentials — sandbox or development keys will not work. Detailed steps are in our Plaid credentials guide.\n\nOnce you have both, type `ray setup` and press Enter. Select \"Bring your own keys\" and paste in your credentials when prompted.",
          link: "https://console.anthropic.com/",
        },
      ],
    },
    {
      id: "connect",
      title: "Connect your bank",
      description:
        "Link your real bank accounts so Ray can see your transactions and balances.",
      steps: [
        {
          title: "Start the bank connection",
          body: "Type `ray link` and press Enter. Ray will open a secure Plaid Link window in your web browser. This is the same technology used by Venmo, Robinhood, and thousands of other finance apps.",
        },
        {
          title: "Select your bank and log in",
          body: "Search for your bank in the Plaid window. Log in with your bank credentials (these go directly to your bank through Plaid — Ray never sees your bank password). Select the accounts you want to track — checking, savings, credit cards, investments, loans. Click \"Continue\" and you're connected. You can run `ray link` again anytime to add more accounts.",
        },
      ],
    },
    {
      id: "use",
      title: "Start using Ray",
      description:
        "You're all set. Here's how to use Ray day-to-day.",
      steps: [
        {
          title: "Ask Ray anything",
          body: "Type `ray` and press Enter. This opens an interactive chat where you can ask questions in plain English. Try asking things like \"How much did I spend on food this month?\" or \"Am I on track for my savings goal?\" or \"What's my biggest expense?\" Type your question and press Enter. Type `exit` when you're done.",
        },
        {
          title: "Use the dashboard commands",
          body: "You don't always need the AI chat. These quick commands give you instant answers:\n\n`ray status` — your full financial overview\n`ray spending` — spending breakdown by category\n`ray spending week` — just this week's spending\n`ray budgets` — how you're tracking against budgets\n`ray goals` — progress toward your financial goals\n`ray score` — your daily financial score and streaks\n`ray alerts` — any important notifications\n`ray transactions` — recent transactions",
        },
        {
          title: "Set up automatic daily sync",
          body: "Ray can automatically pull your latest transactions every morning. Type `ray sync --schedule` and press Enter. On macOS this creates a background job that runs at 6am daily. On Linux it sets up a cron job. You don't need to do anything after this — your data will stay up to date automatically.",
        },
      ],
    },
    {
      id: "help",
      title: "Troubleshooting and help",
      description:
        "Something not working? Here are the most common issues and how to fix them.",
      steps: [
        {
          title: "Common issues",
          body: "\"command not found: ray\" — Node.js or Ray isn't installed correctly. Try closing your terminal, opening a new one, and running `npm install -g ray-finance` again.\n\n\"command not found: node\" or \"command not found: npm\" — Node.js isn't installed. Go back to the \"Install Node.js\" step and download it from nodejs.org.\n\n\"Permission denied\" — On macOS/Linux, try `sudo npm install -g ray-finance` (you'll need to enter your computer password).\n\n\"Bank won't connect\" — Some banks require extra verification. Try again, or check if your bank is supported at plaid.com/institutions.\n\n\"API key invalid\" — Run `ray setup` again and re-enter your keys. Make sure you copied the full key with no extra spaces.",
        },
        {
          title: "Where to get help",
          body: "Run `ray doctor` to check if everything is configured correctly — it will flag any problems.\n\nIf you're stuck, open an issue on GitHub and describe what happened. Include the error message if you see one. The community is friendly and usually responds quickly.",
          link: "https://github.com/cdinnison/ray-finance/issues",
        },
      ],
    },
  ] as BeginnersGuideSection[],
};
