export function dataTohex(data){

    let str = Buffer.from(data, 'utf8').toString('hex');
    str = "0x" + str;
    return str;

}

export function hexToData(data){

    let str = Buffer.from(data, 'hex').toString();
    return str;

}

export function a2hex(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i ++) {
      var hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    return "0x" + arr.join('');
}

export function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}