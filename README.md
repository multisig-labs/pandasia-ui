## Pandasia UI

This is the UI for the Pandasia backend, the backend is in three parts:

1. A Go server that stores validator's P-Chain addresses as leafs in a merkle tree. The full trees 
are quite large and therefore cannot be stored directly on the Avax Network, they are instead stored
in a SQLite database that the Go server accesses.
2. A `pandasia.sol` contract deployed to the Avalanche Network that contains only the merkle root(s) 
of the trees in the SQLite DB.
3. A Supabase database for authorization to create airdrops as well as add and withdraw funds from 
airdrops.

More information and the code for the Go server and `pandasia.sol` can be found at the [pandasia repository](https://github.com/multisig-labs/pandasia).

__Quick Summary:__  
Pandasia is an attempt to give airdrops to validators by connecting their P-Chain address 
(used to deploy validator nodes) to their C-Chain address. The merkle trees allow us to verify validators
on the Avax network, and can deposit airdrop rewards to their respective wallet. 

## Important Libraries Used

#### __Next JS__
Project built using [NextJS](https://nextjs.org/docs), we use `src/` folder format instead of next 13's `app/` router method. 
Easier to make Supabase work and server side rendering is kinda confusing since we use the `window.ethereum` 
object client side because of how connected wallet clients inject `window.ethereum` onto the window object. 

#### __Supabase__
[Supabase](https://supabase.com/docs) is our backend connection for airdrop info. Supabase is a 
postgreSQL wrapper, includes some nice auth client automatically. 

#### __Wagmi and Rainbowkit__  
[Rainbowkit](https://www.rainbowkit.com/docs/introduction) is the wallet connection black box of the website, it makes it easy to connect your wallet 
and gives a nice UI, at the expense of dark magic making it happen. [Wagmi](https://wagmi.sh/) is the React hook libary that 
Rainbowkit uses, so it must be included as a dependency. Wagmi uses [Tanstack Query](https://tanstack.com/query/latest) under the hood. 

#### __Viem__  
[Viem](https://viem.sh/docs/introduction.html) is a way to make direct calls to the blockchain, it uses native `bigint` from ES2020.
It also allows for finer grained control of calls. This is our preferred method for calling contracts 
whenever possible.

#### __Axios__
[Axios](https://axios-http.com/docs/intro) is a nice way to make HTTP requests. 

#### __Tailwind__ 
Only [tailwind](https://v2.tailwindcss.com/docs) for styling, no React CSS library solutions. 

#### __Lottie__ 
[Lottie](https://lottiereact.com/) is an animation library, takes json. 

## Getting Started

To run the development server:

`yarn dev`

