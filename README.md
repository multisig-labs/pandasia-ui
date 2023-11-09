## Getting Started

To run the development server:

`yarn dev`

## Pandasia UI
This is the UI for the Pandasia backend: This is in two parts:

1. A Go server that stores validator's P-Chain addresses in a merkle tree.  
2. A pandasia.sol contract deployed to the Avalanche Network that contains the merkle root(s) of 
the trees stored on a sqlite database that our Go server has access to. 

more information can be found at the [pandasia repository](https://github.com/multisig-labs/pandasia).

Quick Summary:  
Pandasia is an attempt to give airdrops to validators by connecting their P-Chain address 
(used to deploy validator nodes) to their C-Chain address. Allowing us to verify they have validated
on the Avax network, and can deposit airdrop rewards to their wallet. 

## Important Libraries Used

__Next JS__
Project built using NextJS, we use `src/` folder format instead of next 13's `app/` router method. 
Easier to make Supabase work and server side rendering is kinda confusing since we use the `window.ethereum` 
object client side because of how connected wallet clients inject `window.ethereum` onto the window object. 

__Supabase__
Our backend connection for airdrop info. Supabase is a postgreSQL wrapper, includes some nice auth
client automatically. 

__Wagmi and Rainbowkit__  
Rainbowkit is the wallet connection black box of the website, it makes it easy to connect your wallet 
and gives a nice UI, at the expense of dark magic making it happen. Wagmi is the React hook libary that 
Rainbowkit uses, so it must be included as a dependency. Wagmi uses Tanstack Query under the hood. 

__Viem__  
Viem is a way to make direct calls to the blockchain, it uses native `bigint` from ES2020, which is 
nice. It also allows for finer grained control of calls. I think of it as axios for blockchain. 

__Axios__
Axios is a nice way to make HTTP requests, it adds headers and some nicities around the javascript 
fetch api.

__Tailwind__ 
Only tailwind for styling, no React CSS library solutions. 
