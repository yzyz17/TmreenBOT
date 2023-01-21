const qrcode = require('qrcode-terminal');
const { Client , LocalAuth , MessageMedia, Buttons } = require('whatsapp-web.js');
const fs = require('fs');

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
    },
    authStrategy: new LocalAuth({ clientId: "client" })
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});


let grbTMRN=' ';
let AdminCostmer=' ';
let menu = `الرمز الاصلي للقروب : AdminTMRN
الرمز الاصلي للادمن : AdminOne 

للتغير الرموز 

Pass "ثم كتابة الرمز الجديد"
Pass1 "ثم كتابة الرمز الجديد"`;

let kth;
let kth3=' حتى يتم اضافة سعر الملعب';
let tmrn = ' ';
let sts = 'off';
let PassWord = 'AdminTMRN';
let PassWord1 = 'AdminOne';
client.on('message', async (message) => {
    let adminGrb = [grbTMRN,AdminCostmer];
    let contact = await message.getContact();
    let names = JSON.parse(fs.readFileSync('names.json'));
    let ksmh = names.length+1;
    let kth2 = parseInt(kth, 10) / ksmh;
    kth3 = Math.ceil(kth2);
    let chat = await message.getChat();
    let msg = 'قم بالرد على هذه الرسالة بكتابة معلومات التمرين';
    let msg2 = ' قم بالرد على هذه الرسالة بالمعلومات الجديدة';
    const RD = await message.getQuotedMessage();
    if(message.body === PassWord){
        client.sendMessage(message.from,' تم تفعيل الخاصية');
        grbTMRN = chat.id._serialized;
        PassWord = "Yzyz17";
    }
    if(message.body === PassWord1){
        client.sendMessage(message.from,'لقد اصبحت مدير');
        AdminCostmer = contact.id._serialized;
        PassWord1 = "Yzyz17";
    }
    if(contact.number === '966531684687'){
        if (message.body.startsWith('Pass')){
            client.sendMessage(message.from,'تم تغيير رمز التفعيل');
            PassWord = message.body.slice(4);
        }else if(message.body.startsWith('Pass1')){
            client.sendMessage(message.from,'تم تغيير رمز التفعيل');
            PassWord1 = message.body.slice(5);
        }else if(message.body === 'Menu'){
            client.sendMessage(message.from,menu);
        }
    }
    if(message.from == adminGrb[0]){
        if(message.body === 'فرق'){
          let arr = JSON.parse(fs.readFileSync('names.json'));
          let shuffled = arr.sort(() => 0.5 - Math.random());
  
          let halfLength = Math.ceil(arr.length / 2);
          let firstHalf = shuffled.slice(0, halfLength);
          let secondHalf = shuffled.slice(halfLength);
  
          client.sendMessage(message.from ,"الفرق الاول : "+firstHalf);
          client.sendMessage(message.from,"الفرق الثاني : " +secondHalf);
        }
      }
    console.log(adminGrb[0]);
    function chkN(arr, str) {
        return arr.includes(str);
      }
    let IsTmren = chkN(adminGrb,chat.id._serialized);
    if(message.hasQuotedMsg){
        let tst = RD.body
        if(tst === msg){
            if(IsTmren){
            tmrn = message.body;
            fs.writeFileSync('names.json', '[]');
            kth3=' حتى يتم اضافة سعر الملعب';
                setTimeout(() => {
                let tmren = ` ${tmrn}\n القطة : ${kth3} \n --------------\n \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
                client.sendMessage(adminGrb[0] , tmren);

                }, 1500);
        }}else if( msg2 ===  tst ){
            if(IsTmren){
            let names = JSON.parse(fs.readFileSync('names.json'));
            tmrn=message.body;
            let nms = [];
            let n = 1;
            for(let i of names){
      
               nms.push('\n'+n+' - '+i)
               n++;
            }
            let tmren = ` ${tmrn}\n القطة : ${kth3} \n --------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
            client.sendMessage(adminGrb[0] , tmren);
        }}
        
    }
    if(message.body.startsWith('احسب')){
        kth = message.body.slice(5);

        client.sendMessage(message.from , ' تم اضافة الحسبة سيتم حساب القطة مع كل تسجيل جديد');
    
      }else if(IsTmren){
        if(message.body.startsWith('احذف')){
    
            let asm = message.body.slice(5);
            let names = JSON.parse(fs.readFileSync('names.json'));
        
            const index = names.indexOf(asm);
          
            if (index > -1) {
              names.splice(index, 1);
            }
            fs.writeFileSync('names.json', JSON.stringify(names));
            let nms = [];
            let n = 1;
            for(let i of names){
        
               nms.push('\n'+n+' - '+i)
               n++;
            }
          
            let tmren = ` ${tmrn}\n القطة : ${kth3} \n -------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
        
            client.sendMessage(adminGrb[0] , tmren);
        
        
          }

      }


   if(message.body.startsWith('تمرين')){
    if(IsTmren){
    let button = new Buttons(`وش تبي تسوي ؟\n\n اوامر اخرى للمدراء\n\n لاضافة القطة اكتب احسب ثم سعر الملعب\n\n  لحذف شخص اكتب احذف ثم اسم الشخص المراد حذفة`,[{ id: 'list', body: 'انشاء لستة جديدة' },{ id: 'sts', body: 'تعديل حالة التسجيل'},{ id: 'edit', body: 'تعديل معلومات اللستة' }]);
    await client.sendMessage(message.from , button);
   }}else {
    if (message.type == 'buttons_response') {
        const { selectedButtonId: buttonid } = message;
        if (buttonid == 'list') {
            try {

                client.sendMessage(message.from ,msg);

                  //list
            } catch {
                await message.react('❌');
            }
        } else if (buttonid == 'sts') {
                try {
                    let button2 = new Buttons(`تريد تفعيل التسجيل ام تعطيله ؟`,[{ id: 'f3l', body: 'تفعيل' },{ id: 'atl', body: 'تعطيل'}]);
                    await client.sendMessage(message.from , button2);

                    //sts

            } catch {
                await message.react('❌');
            }
        }else if (buttonid == 'edit') {
                try {
                    client.sendMessage(message.from , msg2);
            } catch {
                await message.react('❌');
            }
        }else if (buttonid == 'f3l') {
            try {
                //on
                sts = 'on';
                client.sendMessage(adminGrb[0] , 'تم تفعيل التسجيل في اللستة');
        } catch {
            await message.react('❌');
        }
    }else if (buttonid == 'atl') {
        try {
            //off
            sts = 'off';
            client.sendMessage(adminGrb[0] , 'تم تعطيل التسجيل في اللستة');
    } catch {
        await message.react('❌');
    }
    }
}
}
if(!chat.isGroup && sts === "on") {
    let names = JSON.parse(fs.readFileSync('names.json'));
    if(message.body.startsWith('سجل')){
      let asm = message.body.slice(4);
      let msgl = message.from.slice(0,12);
      console.log(asm);
      if (names.includes(asm)) {
        client.sendMessage(message.from,'موجود بالفعل');
      } else {
        names.push(asm);
        names.sort();
        fs.writeFileSync('names.json', JSON.stringify(names));
        let nms = [];
      let n = 1;
      for(let i of names){
         nms.push('\n'+n+' - '+i)
         n++;
      }
      let tmren = ` ${tmrn}\n القطة : ${kth3} \n --------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
      client.sendMessage(adminGrb[0] , tmren);
      client.sendMessage(adminGrb[0] , "تعديل : "+msgl);
      }}}
    });



client.initialize();