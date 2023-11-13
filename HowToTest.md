## Pandasia UI (This Repo)
1. Change .env.local file to testing
2. Change `config/` wallets to forky chain
3. Clear Supabase

## Pandasia (Backend)
4. Latest pull on pandasia repo
5. Change .env of pandasia repo to localhost URLs
6. Start anvil-fork on pandasia http://localhost:9650
7. Start Go server on pandasia http://localhost:8000
8. Deploy contracts to anvil-fork
9. Put current merkle root(s) into pandasia contracts

(6 - 9 just follow along with `NOTES.md` in pandasia repo)
