# Changelog

## 0.4.0

- **Bring your own model** — use any AI provider: Anthropic (Claude), OpenAI (GPT), Ollama (local), or any OpenAI-compatible endpoint (DeepSeek, Groq, vLLM, etc.). Model list fetched from models.dev during setup.
- Setup flow improvements: provider picker, dynamic model list, masked key input, skip re-linking on reconfigure
- Max tool step guard (10 iterations) to prevent runaway loops
- Dashboard colors updated from red to amber

## 0.2.0

Initial open source release.

- CLI interface with 13 commands (`ray`, `setup`, `sync`, `link`, `status`, `transactions`, `spending`, `budgets`, `goals`, `score`, `alerts`, `export`, `import`)
- AI financial advisor powered by Claude with 13+ tools
- Plaid integration for bank sync (checking, savings, credit cards, investments, loans)
- Encrypted local SQLite database (AES-256)
- Daily financial scoring (0-100) with streaks and 14 achievements
- Budget tracking with overage alerts
- Financial goal tracking
- Transaction auto-recategorization via user-defined rules
- Conversation memory and persistent financial context
- Data export/import for backup and restore
