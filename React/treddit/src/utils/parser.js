export function dataTohex(data){

    let str = Buffer.from(data, 'utf8').toString('hex');
    str = "0x" + str;
    return str;

}