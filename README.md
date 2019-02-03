# NoFilter tron dApp (aka !Filter) 

## MainNet Deployed Address - TGX6LGnhFgSUyG4oR7iU4bVTWUnMY9B7mP
## Shasta Deploymed Address - TEQebZr8wuhyYMLXCdWi6LQA7z2gN1fEfY

###### Note: Work on v2 is on another (Currently Private) Repository

###### NOTE: The first time you load the app you must refresh atleast once for the events populated from the TVM to be visible by the app. The Latest content is grabbed by nofilter during the intitial startup/load of the dApp

## dApp is currently not live while v2 is being worked on
## Made for the Tron Accelerator Hackathon
## Creator - Harnick Khera

##### [VIDEO of Accelerator submission of dApp](https://youtu.be/q_VSDe_ThM8)
##### (note a backend error when posting a magnet link occured and is present on the corrosponding dApp post, this is unresolved)

## What is NoFilter
NoFilter is a dApp media platform. The platform allows users to share content with other users, akin to platforms such as medium or reddit. It leverages the TronVM event system as a means of storing content in an immutable fashion. The platform allows users to reward the content they like with donations (in trx). The dApp also makes use of Tron SmartContracts to keep track of statistics such as Votes and Donations. There is no fee model for this dApp, other than the Gas cost for functions. it is freely useable in it current form. 

The dApp essentially uses tron nodes as a server, and tron as a database, whilst the frontend acts as the client. The is dApp allows the user to tap directly into a TVM fullhost/api of their choice (via tronLink settings). Due to the fact that no data is stored offchain it is near impossible to censor.

## Why is it needed

Being Censorship Resistant is a very important concept for the modern internet, which is under constant assault by government censorship and manipulation by shadowy organisations and private interests. Another area where this concept is important is in the realm of content policing, modern social platforms often alienate fringe communities with broad rules that can often push users to darker platforms. This is evident in many cases, with the recent tumblr blanket ban on female nuditity being once such case.  Another need for this dApp is the case of data harvesting. The dApp only records bare bone facts about a user to the blockchain and does not track users in any form. This is appealing in the post camebridge-analytica social domain.

## Development and Deployment

### Tech Stack and Dependencies

NodeJS
TronWeb
TronBox
react-quill
react-tabs
material-ui/core
ReactJS
Bootstrap
jQuery
yarn

### Deploying the smart contract

with /solidity/ as the current directory first compile all contracts by using 

``` 
tronbox compile --compile all
```

followed by deploying to the blockchain via:

``` 
tronbox migrate --reset
```

### Frontend 

this section assumes /react/ is the current directory

#### Development mode

You can launch nofilter in react development mode by running

```
yarn start
```

#### Compiling

the frontend can be compiled using 

```
yarn dev
```

#### Hosting

We can host the compiled files using pm2 and serve (
```
npm install -i -g pm2
npm install -i -g serve
```

and then we can deploy on our server using the following command with the compiled files in the same current directory

```
pm2 serve build
```

this deploys the frontend to port 8080


