//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

//convert ascii text to hex
export function a2hex(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i ++) {
      var hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    return "0x" + arr.join('');
}

//convert ascii text to 32byte
export function aTo32bytehex(str, length=32) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i ++) {
      var hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    if(length != 0){
    for (var i = arr.length; i < length; i ++) {
        var hex = "00";
        arr.push(hex);
        }
    }
    return "0x" + arr.join('');
}

//convert hex to ascii
export function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

export function Time2a(timestamp){
    var s = new Date(timestamp*1000).toLocaleDateString("en-GB");
    return s;
}

export function Time2HMS(timestamp){
    var date = new Date(timestamp*1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

//function used to get the type of a post
export function TextType(content){
    var type = "Text"
    if(content.includes("base64") && content.includes("img")){
        type = "Image";
    }
    return type;
}