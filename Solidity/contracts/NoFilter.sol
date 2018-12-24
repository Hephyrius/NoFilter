pragma solidity >=0.4.23;

contract NoFilter {
    
    //post related variables
    uint postNumber; // keeps track of posts so that every one is unique
    mapping (uint => address) postOwners; //Keeps track of who owns a specific post
    mapping (uint => uint) upvotes; // keeps track of a posts vote counter
    mapping (uint => uint) downvotes; // keeps track of a posts vote counter
    mapping (address => mapping(uint => uint)) voters; //keeps track of a users voting history, helps to prevent vote spamming from a single account
    
    //comment related variables
    mapping (uint => uint) commentCounter; // keeps track of posts so that every one is unique
    mapping (uint => mapping(uint => address)) commentOwner; //Keeps track of who owns a specific post
    mapping (uint => mapping(uint => uint)) commentVotes; // keeps track of a posts vote counter
    mapping (address => mapping(uint => mapping(uint => uint))) commentVoters; //keeps track of a users voting history, helps to prevent vote spamming from a single account
    
    constructor () public {
        postNumber = 0;
    }
    
    //Invoked when the post has been created, so that the dApp can access the content
    event PostContent (
        address indexed author,
        uint indexed id,
        bytes tags,
        uint postTimestamp, //used to generate private post unique key
        bytes title,
        bytes text
    );
    
    //create a new post, done by storing data in the logs. data can be in any form as long as it is byte data. This means data can be compressed
    function CreatePost(bytes title, bytes text, bytes tags) public {
        
        //check that the data is correct
        require(title.length > 0, "Invalid title");
        require(text.length > 0, "Invalid text");
        require(tags.length > 0, "Invalid tags");
        
        uint postId = postNumber;
        //init the mapping and set the owner as the sender
        postOwners[postId] = msg.sender;
        
        //init votes so that the owner has upvoted by default.
        upvotes[postId] = 1;
        voters[msg.sender][postId] = 1;
        
        //posts are stored in logs, it allows to reduce post invocation cost
        emit PostContent(msg.sender, postId, tags, now, title, text);
        
        postNumber = postId + 1;
    }
    
    //get the owner of a post
    function getOwner(uint postId) public view returns (address) {
        return postOwners[postId];
    }

    //stores a log comment on the blockchain when commented
    event CommentCreated (
        address indexed commenter,
        uint indexed postId,
        bytes comment,
        uint parentComment,
		uint commentTimestamp,
		uint commentId
    );
    
    function PostComment(bytes text, uint postId, uint parentComment) public {
        require(postId >= 0, "comment is not for a valid post");
        require(postId <= postNumber, "comment is for a non existent post");
        require(text.length > 0, "comment comment is empty");
		
		//update comment related variables
        uint commentId = commentCounter[postId];
		
		//emit to the blockchain
        emit CommentCreated(msg.sender, postId, text, parentComment, now, commentId);
        

        commentOwner[postId][commentId] = msg.sender;
        
        //deal with upvote data
        commentVotes[postId][commentId] = 1;
        commentVoters[msg.sender][postId][commentId] = 1;
        
        //increment counter when done
        commentCounter[postId] = commentId + 1;
    }
    
    //upvote a post 
    function UpvotePost(uint postId) public {
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");
        
        uint knownType = voters[msg.sender][postId];
        require(knownType != 1, "Upvote already done");
        if (knownType == 2) {
            downvotes[postId] -= 1;
        }
        voters[msg.sender][postId] = 1;
        upvotes[postId] += 1;
    }
    
    //downvote a post 
    function DownvotePost(uint postId) public {
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");

        uint knownType = voters[msg.sender][postId];
        require(knownType != 2, "downvote already done");
        if (knownType == 1) {
            upvotes[postId] -= 1;
        }
        voters[msg.sender][postId] = 2;
        downvotes[postId] += 1;
    }
    
    //get the vote data
    function getUpVotes(uint postId) public view returns (uint) {
        return upvotes[postId];
    }

    //get the vote data
    function getDownVotes(uint postId) public view returns (uint) {
        return downvotes[postId];
    }
    
    //get the voter data
    function getVoterData(uint postId, address voter) public view returns (uint) {
        return voters[voter][postId];
    }
    
    //upvote a post 
    function UpvoteComment(uint postId, uint commendId) public {
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");
        
        require(commendId >= 0, "comment id is not valid");
        require(commendId <= commentCounter[postId], "comment id is non existent");
        require(commentVoters[msg.sender][postId][commendId] != 1, "Upvote already done");
        
        commentVoters[msg.sender][postId][commendId] = 1;
        commentVotes[postId][commendId] += 1;
    }
    
    //downvote a post 
    function DownvoteComment(uint postId, uint commendId) public {
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");
        
        require(commendId >= 0, "comment id is not valid");
        require(commendId <= commentCounter[postId], "comment id is non existent");
        require(commentVoters[msg.sender][postId][commendId] != 2, "Upvote already done");
        
        commentVoters[msg.sender][postId][commendId] = 2;
        commentVotes[postId][commendId] -= 1;
    }
    
    //get the comment vote data
    function getCommentVotes(uint postId, uint commendId) public view returns (uint) {
        return commentVotes[postId][commendId];
    }
    
    //get the comment voter data
    function getCommentVoterData(uint postId, uint commendId, address commenter) public view returns (uint) {
        return commentVoters[commenter][postId][commendId];
    } 

    // View Functions Used by Front End

    //get the total number of posts
    function getPostCounter() public view returns (uint) {
        return postNumber;
    }
}