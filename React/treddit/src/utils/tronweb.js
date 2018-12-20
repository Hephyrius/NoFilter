import Swal from 'sweetalert2'

import {dataTohex} from "./parser"

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
    let byteTitle = dataTohex(title);
    let byteContent = dataTohex(content);
    let byteTags = dataTohex(tags);

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