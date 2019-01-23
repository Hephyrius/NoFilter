//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

import Swal from 'sweetalert2'

import {a2hex, hex2a, Time2a, aTo32bytehex, Time2HMS, TextType} from "./parser"

const TronWeb = require('tronweb')
var tronWeb;

//connecting tronweb to the local docker node
const tronWebDefault = new TronWeb(
    "https://api.shasta.trongrid.io",
    "https://api.shasta.trongrid.io",
    "https://api.shasta.trongrid.io",
    'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0', //default testnet pkey
)

//address of the contract
// const contractAddress = "TGX6LGnhFgSUyG4oR7iU4bVTWUnMY9B7mP"; MAINNET
//const contractAddress = "TEQebZr8wuhyYMLXCdWi6LQA7z2gN1fEfY" //Shasta
const contractAddress = "TM2sSVEvbSGYjR5d6oS8cv529vqWZLF2h3"; // Quickstart


function dynamicTronlink(){
    var tron = tronWebDefault

    if (!!window.tronWeb){
        tron = window.tronWeb;
    }

    return tron;
}

export async function createNewPost(title, content, tags) {

    //notify the user that the post has been submitted
    Swal({title:'Post Transaction Submitted',
            type: 'info'
        });

    //load the contract 
    const contract = await window.tronWeb.contract().at(contractAddress);

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

//get data from contract events and convert it into a readable/useable state
export async function getPosts() {
    tronWeb = dynamicTronlink()
    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "PostContent", 0,  200, 1);

    var posts = []
    var TagList = []
    for(var i=0; i<events.length; i++){

        let address = events[i]['result']['author'];
        let tronaddress = address.substring(2, address.length);
        tronaddress = "41" + tronaddress;
        tronaddress = tronWeb.address.fromHex(tronaddress)

        //format data so it can be used and stored better
        var post = {
            title: hex2a(events[i]['result']['title']),
            timestamp: Time2a(events[i]['result']['postTimestamp']),
            tags: hex2a(events[i]['result']['tags']),
            postid: events[i]['result']['id'],
            author: address,
            tronaddress: tronaddress,
            content: hex2a(events[i]['result']['text']),
            hms: Time2HMS(events[i]['result']['postTimestamp']),
            type: TextType(hex2a(events[i]['result']['text']))
          }
          TagList = TagList.concat(post['tags']);

        posts = posts.concat(post);
    }

    localStorage.setItem("Posts", JSON.stringify(posts));
    localStorage.setItem("TagList", JSON.stringify(TagList));

    return posts;
}

export async function createNewComment(commentText, postid,  parentComment) {

    //notify the user that the comment has been submitted
    Swal({title:'Comment Transaction Submitted',
            type: 'info'
        });

    //load the contract 
    const contract = await window.tronWeb.contract().at(contractAddress);

    //convert the data to an appropriate format for the blockchain to handle
    //let byteTitle = a2hex(title);
    let bytecommentText = a2hex(commentText);
    let id = "0x" + Number(postid).toString(16);

    //submit the data to the blockchain
    contract.PostComment(bytecommentText, id, "0x00").send({
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
export async function getComments() {
    tronWeb = dynamicTronlink()

    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "CommentCreated", 0,  200, 1);

    var comments = []
    for(var i=0; i<events.length; i++){

        let address = events[i]['result']['commenter'];
        let tronaddress = address.substring(2, address.length);
        tronaddress = "41" + tronaddress;
        tronaddress = tronWeb.address.fromHex(tronaddress)

        var comment = {
            parentComment: hex2a(events[i]['result']['parentComment']),
            postid: events[i]['result']['postId'],
            author: address,
            tronaddress: tronaddress,
            content: hex2a(events[i]['result']['comment']),
            timestamp: Time2a(events[i]['result']['commentTimestamp']),
            commentid: events[i]['result']['commentId'],
            hms: Time2HMS(events[i]['result']['commentTimestamp'])
          }

          comments = comments.concat(comment);
    }

    localStorage.setItem("Comments", JSON.stringify(comments));

    return comments;
}

//get the vote counters from the blockchain
export async function getVoteCounters() {

    tronWeb = dynamicTronlink()

    const contract = await tronWeb.contract().at(contractAddress);

    let posts = JSON.parse(localStorage.getItem("Posts"));
    let votes = [];

    if (!posts){
        posts = [];
    }

    for(var i=0; i<posts.length; i++){
        let pid = posts[i]['postid'];
        let id = "0x" + Number(pid).toString(16);

        //grab vote data from the blockchain
        let upvotecall = await contract.getUpVotes(id).call();
        let up = tronWeb.toBigNumber(upvotecall['_hex']).toNumber();

        let downvotecall = await contract.getDownVotes(id).call();
        let down = tronWeb.toBigNumber(downvotecall['_hex']).toNumber();

        let postVote = {
            postid : pid,
            upvotes : up,
            downvotes: down,
            total: (up-down)
        }
        votes = votes.concat(postVote);
    } 

    localStorage.setItem("PostVotes", JSON.stringify(votes));

}

export async function VoteOnPost(postid, votetype) {



    //load the contract 
    const contract = await window.tronWeb.contract().at(contractAddress);

    //convert the postid into a useable form
    let id = "0x" + Number(postid).toString(16);

    if (votetype == 0){
        //notify the user that the vote has been submitted
        Swal({title:'Post Up Voted',
        type: 'info'
        });
        //submit the data to the blockchain
        contract.UpvotePost(postid).send({
            shouldPollResponse:true,
            callValue:0

        }).then(res => Swal({
            title:'Up Voted Successfully',
            type: 'success'

        })).catch(err => Swal(
            {
                title:'Up Vote Failed',
                type: 'error'
            }
        ));
    }else if (votetype == 1){

        //notify the user that the vote has been submitted
        Swal({title:'Post Down Voted',
        type: 'info'
        });

        //submit the data to the blockchain
        contract.DownvotePost(postid).send({
            shouldPollResponse:true,
            callValue:0

        }).then(res => Swal({
            title:'Down Voted Successfully',
            type: 'success'

        })).catch(err => Swal(
            {
                title:'Down Vote Failed',
                type: 'error'
            }
        ));
    }

}

//// Comment Related Functions

//get the vote counters from the blockchain
export async function getCommentVoteCounters() {
    tronWeb = dynamicTronlink()
    const contract = await tronWeb.contract().at(contractAddress);

    let comments = JSON.parse(localStorage.getItem("Comments"));
    let CommentVotes = [];

    if (!comments){
        comments = [];
    }

    for(var i=0; i<comments.length; i++){
        let pid = comments[i]['postid'];
        let cid = comments[i]['commentid'];

        let id = "0x" + Number(pid).toString(16);
        let comid = "0x" + Number(cid).toString(16);

        //grab vote data from the blockchain
        let upvotecall = await contract.getCommentUpVotes(id, comid).call();
        let up = tronWeb.toBigNumber(upvotecall['_hex']).toNumber();

        let downvotecall = await contract.getCommentDownVotes(id, comid).call();
        let down = tronWeb.toBigNumber(downvotecall['_hex']).toNumber();

        let commentVote = {
            postid : pid,
            commentid: cid,
            upvotes : up,
            downvotes: down,
            total: (up-down)
        }
        CommentVotes = CommentVotes.concat(commentVote);
    } 

    localStorage.setItem("CommentVotes", JSON.stringify(CommentVotes));

}

export async function VoteOnComment(postid, commentid, votetype) {

    //load the contract 
    const contract = await window.tronWeb.contract().at(contractAddress);

    //convert the postid into a useable form
    let id = "0x" + Number(postid).toString(16);
    let cid = "0x" + Number(commentid).toString(16);

    if (votetype == 0){
        //notify the user that the vote has been submitted
        Swal({title:'Comment Up Voted',
        type: 'info'
        });
        //submit the data to the blockchain
        contract.UpvoteComment(postid, cid).send({
            shouldPollResponse:true,
            callValue:0

        }).then(res => Swal({
            title:'Up Voted Comment Successfully',
            type: 'success'

        })).catch(err => Swal(
            {
                title:'Comment Vote Failed',
                type: 'error'
            }
        ));
    }else if (votetype == 1){

        //notify the user that the vote has been submitted
        Swal({title:'Comment Down Voted',
        type: 'info'
        });

        //submit the data to the blockchain
        contract.DownvoteComment(postid, cid).send({
            shouldPollResponse:true,
            callValue:0

        }).then(res => Swal({
            title:'Comment Down Voted Successfully',
            type: 'success'

        })).catch(err => Swal(
            {
                title:'Comment Vote Failed',
                type: 'error'
            }
        ));
    }

}

//DONATION SYSTEM

export async function DonateTrx(postid, trxAmount) {

    //load the contract 
    const contract = await window.tronWeb.contract().at(contractAddress);

    //convert the postid into a useable form
    let sunAmount = Number(trxAmount * 1000000) // 1 trx is 1 million sun, call value is in sun.
    let sunHexValue = "0x" + Number(sunAmount).toString(16);
    let id = "0x" + Number(postid).toString(16);


    Swal({title:'Transaction to Donate ' + trxAmount.toString() + "trx sent",
    type: 'info'
    });


    //submit the data to the blockchain
    contract.makeDonation(id).send({
        shouldPollResponse:true,
        callValue: sunAmount

    }).then(res => Swal({
        title:'Donation Successful',
        type: 'success'

    })).catch(err => Swal(
        {
            title:'Donation Failed',
            type: 'error'
        }
    ));
}

//get the vote counters from the blockchain
export async function getDonations() {
    tronWeb = dynamicTronlink()
    const contract = await tronWeb.contract().at(contractAddress);

    let posts = JSON.parse(localStorage.getItem("Posts"));
    let Donations = [];

    if (!posts){
        posts = [];
    }

    for(var i=0; i<posts.length; i++){
        let pid = posts[i]['postid'];
        let id = "0x" + Number(pid).toString(16);

        //grab vote data from the blockchain
        let ContractPostDonation = await contract.getPostDonations(id).call();
        let Sun = tronWeb.toBigNumber(ContractPostDonation['_hex']).toNumber();

        let Donation = {
            postid : pid,
            SunDonations : Sun,
            TrxDonation: (Sun/1000000)
        }

        Donations = Donations.concat(Donation);
    } 

    localStorage.setItem("Donations", JSON.stringify(Donations));

}

//USERNAME SYSTEM

export async function ChangeUsername(UsernameString) {

    //load the contract 
    const contract = await window.tronWeb.contract().at(contractAddress);

    //convert tron amount into a sun value as sun is used as the call value
    let user = aTo32bytehex(UsernameString)

    //notify the user that the deposit has been attempted
    Swal({title:'Changing Username to : ' + UsernameString,
    type: 'info'
    });

    //submit the data to the blockchain
    contract.SetUsername(user).send({
        shouldPollResponse:true,
        callValue: 0

    }).then(res => Swal({
        title:'Username Changed Successfully',
        type: 'success'

    })).catch(err => Swal(
        {
            title:'Username Change Failed',
            type: 'error'
        }
    ));
}

//get the current users data
export async function getUserData() {
    tronWeb = dynamicTronlink()
    const contract = await tronWeb.contract().at(contractAddress);

    let user = JSON.parse(localStorage.getItem("User"));

    if (!user){
        user = [];
    }

    //grab the sender address from the blockchain
    let senderAddress = await contract.getSenderAddress().call();
    let hexAdd = senderAddress;
    let add = tronWeb.address.fromHex(hexAdd);
    
    let ContractUsername = await contract.getUsername(hexAdd).call();
    let username = hex2a(ContractUsername);

    let balance = await tronWeb.trx.getBalance(add);

    user = {
        TronAddress : add,
        HexAddress : "0x" + hexAdd,
        UserName : username,
        SunBalance : balance
    }

    localStorage.setItem("User", JSON.stringify(user));
}


export async function getUsers() {
    tronWeb = dynamicTronlink()
    const contract = await tronWeb.contract().at(contractAddress);
    let posts = JSON.parse(localStorage.getItem("Posts"));
    let comments = JSON.parse(localStorage.getItem("Comments"));

    let unique = []

    if(posts){
        for(var i = 0; i<posts.length; i++){
            var author = posts[i]['author']
            if(unique.includes(author ) == false) {
                unique = unique.concat(author)
            }
        }
    }

    if(comments){

        for(var i = 0; i<comments.length; i++){
            var author = comments[i]['author']
            if(unique.includes(author ) == false) {
                unique = unique.concat(author)
            }
        }
    }

    var UserNames = []

    let NoUsername = await contract.getUsername("0000000000000000000000000000000000000000").call();
    let nousernameascii = hex2a(NoUsername);

    for (var i = 0; i<unique.length; i++){
        var address = unique[i].substring(2, unique[i].length)
        let ContractUsername = await contract.getUsername(address).call();
        let username = hex2a(ContractUsername);

        if(username == nousernameascii){
            username = "anonymous"
        }
        
        
        var user = {
            HexAddress : unique[i],
            UserName : username
        }

        UserNames = UserNames.concat(user)
    }
    localStorage.setItem("KnownUsers", JSON.stringify(UserNames));
}