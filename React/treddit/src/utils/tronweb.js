import Swal from 'sweetalert2'

import {a2hex, hex2a, Time2a} from "./parser"

const TronWeb = require('tronweb')


//connecting tronweb to the local docker node
const tronWeb = new TronWeb(
    "http://127.0.0.1:9090",
    "http://127.0.0.1:9090",
    "http://127.0.0.1:9090",
    'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
)

//address of the contract
const contractAddress = "TH4LFu5FkiBWTPWBdeSAFhxS4G2qQ3PnHB";

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

    //notify the user that the post has been submitted
    Swal({title:'Post Transaction Submitted',
            type: 'info'
        });

    //load the contract 
    const contract = await tronWeb.contract().at(contractAddress);

    //convert the data to an appropriate format for the blockchain to handle
    let byteTitle = a2hex(title);
    let byteContent = a2hex(content);
    let byteTags = a2hex(tags);

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

export async function createNewComment(commentText, postid,  parentComment) {

    //notify the user that the post has been submitted
    Swal({title:'Comment Transaction Submitted',
            type: 'info'
        });

    //load the contract 
    const contract = await tronWeb.contract().at(contractAddress);

    //convert the data to an appropriate format for the blockchain to handle
    //let byteTitle = a2hex(title);
    let bytecommentText = a2hex(commentText);
    //let byteTags = a2hex(tags);

    //submit the data to the blockchain
    contract.PostComment(bytecommentText, "0x00", "0x00").send({
        shouldPollResponse:true,
        callValue:0

    }).then(res => Swal({
        title:'Comment Posted Successfully',
        type: 'success'

    })).catch(err => Swal(
        {
             title:'Comment Post Failed',
             type: 'error'
        }
    ));

}

//get data from contract events and convert it into a readable/useable state
export async function getPosts() {

    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "PostContent", 0,  200, 1);

    var posts = []
    for(var i=0; i<events.length; i++){

        //format data so it can be used and stored better
        var post = {
            title: hex2a(events[i]['result']['title']),
            timestamp: Time2a(events[i]['result']['postTimestamp']),
            tags: hex2a(events[i]['result']['tags']),
            postid: events[i]['result']['id'],
            author: events[i]['result']['author'],
            content: hex2a(events[i]['result']['text'])
          }

        posts = posts.concat(post);
    }

    localStorage.setItem("Posts", JSON.stringify(posts));

    return posts;
}

//get data from contract events and convert it into a readable/useable state
export async function getComments() {

    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "CommentCreated", 0,  200, 1);
    console.log(events);
    var comments = []
    for(var i=0; i<events.length; i++){

        //format data so it can be used and stored better
        var comment = {
            parentComment: hex2a(events[i]['result']['parentComment']),
            postid: events[i]['result']['postId'],
            author: events[i]['result']['commenter'],
            content: hex2a(events[i]['result']['comment']),
            timestamp: Time2a(events[i]['result']['commentTimestamp'])
          }

          comments = comments.concat(comment);
    }

    localStorage.setItem("Comments", JSON.stringify(comments));

    return comments;
}