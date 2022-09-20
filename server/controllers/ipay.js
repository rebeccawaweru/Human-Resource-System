const crypto = require("crypto"); //for generating  the key
const { URLSearchParams } = require("url");

const ipay = async(req,res,)=>{
const {username,email,phone,amount} = req.body;
    var live ="1";
    var oid = username; //should be unique
    var inv ="112020102292999";
    var ttl = amount;
    var tel = "254"+phone;
    var eml = email;
    var vid ="tasl";
    var curr = "KES";
    var p1 = email;
    var p2 = '';
    var p3 = '';
    var p4 = '';
    var cbk = "https://www.globalhr.agency/cbk"; //call back
    var cst = "1";
    var crl = "2";
    var hashkey ="W3g8EaV8cxc$hfv%z7Vqu$Cz%2*jFJTQ";
  
    //concatinating data-string
    data =
      live +
      oid +
      inv +
      ttl +
      tel +
      eml +
      vid +
      curr +
      p1 +
      p2 +
      p3 +
      p4 +
      cbk +
      cst +
      crl;
  
    console.log("dataString", data);
    //generating the key
    var hashstring = crypto
      .createHmac("sha1", hashkey)
      .update(data)
      .digest("hex");
    const param = new URLSearchParams({
      live:"1",
      oid:username,
      inv:"112020102292999",
      ttl:amount,
      tel:"254"+phone,
      eml: email,
      vid:"tasl",
      curr:"KES",
      p1: email,
      p2:"",
      p3:'',
      p4:'',
      cbk: "https://www.globalhr.agency/cbk",//call-back
      cst: "1",
      crl: "2",
      hsh: hashstring,
    }).toString();
  
    const url ="https://payments.ipayafrica.com/v3/ke" + "?" + param; //url generated append params
     //open this url on another tab
   res.send(url)
}

const callback = async(req,res)=>{
  const response = await req.body;
  res.send (response);
}

module.exports = {ipay}