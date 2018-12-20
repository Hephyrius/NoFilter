import Swal from 'sweetalert2'

import {dataTohex, hexToData, a2hex, hex2a} from "./parser"

const TronWeb = require('tronweb')


//connecting tronweb to the local docker node
const tronWeb = new TronWeb(
    "http://127.0.0.1:9090",
    "http://127.0.0.1:9090",
    "http://127.0.0.1:9090",
    'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
)

export async function getBalance() {

    const address = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';

    // The majority of the function calls are asynchronus,
    // meaning that they cannot return the result instantly.
    // These methods therefore return a promise, which you can await.
    const balance = await tronWeb.trx.getBalance(address);
    console.log({balance});

    // You can also bind a `then` and `catch` method.
    tronWeb.trx.getBalance(address).then(balance => {
        console.log({balance});
    }).catch(err => console.error(err));

    // If you'd like to use a similar API to Web3, provide a callback function.
    tronWeb.trx.getBalance(address, (err, balance) => {
        if (err)
            return console.error(err);

        console.log({balance});
    });
}

export async function createNewPost(title, content, tags) {
    Swal({title:'Post Transaction Submitted',
            type: 'info'
        });


    //address of the contract
    const contractAddress = 'TEe2yzp8MUqEWaarkC2K9zygmDQv7666Sf';

    //load the contract 
    const contract = await tronWeb.contract().at(contractAddress);

    //convert the data to an appropriate format for the blockchain to handle
    let byteTitle = hex2a(title);
    let byteContent = hex2a(content);
    let byteTags = hex2a(tags);

    //submit the data to the blockchain
    contract.CreatePost(byteTitle, byteContent, byteTags).send({
        shouldPollResponse:true,
        callValue:0

    }).then(res => Swal({
        title:'Post Created Successfully',
        type: 'success'

    })).catch(err => Swal(
        {
             title:'Post Creation Failed',
             type: 'error'
        }
    ));

}

//get data from contract events and convert it into a readable/useable state
export async function getPosts() {

    //address of the contract
    const contractAddress = 'TEe2yzp8MUqEWaarkC2K9zygmDQv7666Sf';

    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "PostContent", 0,  200, 1);

    var posts = []
    for(var i=0; i<events.length; i++){

        //format data so it can be used and stored better
        var post = {
            title: hex2a(events[i]['result']['title']),
            timestamp: events[i]['result']['postTimestamp'],
            tags: hex2a(events[i]['result']['tags']),
            postid: events[i]['result']['id'],
            author: events[i]['result']['author']
          }

        posts = posts.concat(post);
    }

    localStorage.setItem("Posts", JSON.stringify(posts));

    return posts;
}