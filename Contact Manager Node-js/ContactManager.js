const http=require('http');
const path=require('path');
const fs=require('fs');
const { constants } = require('buffer');
const express=require('express');
const app=express();

const filepath=path.join(__dirname,'contactHtmlFile.html');
//fs.writeFileSync(filepath,'Welcome to the contact manager web appliation');  //used once


//welcome msg by contacts app..........................................
app.get('/',(req,res)=>{
    res.sendFile(filepath);
})


//setting sql connection..............................................
const mysql=require('mysql2');
const { doesNotMatch } = require('assert');

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Mysql@8',
    database:'contactsproject'
})

conn.connect((err)=>{
    if(err)
    console.warn(err);
    else
    console.warn('sql database connected')
})


//adding contacts.......................................................................
app.use(express.json());

app.get('/addContact',(req,res)=>{
    
    const data={SLNo:req.query.SLNo,Name:req.query.Name,MobNo:req.query.Mob};
    //res.send(data);
    conn.query('Insert into contacts set?',data,(err,result,fields)=>{
         if(err)
         console.warn('error is',err);
        else
        {console.warn(result);res.send(result);
        }
       })
    })


//updating contacts...................................................................
app.get('/updateContact',(req,res)=>{
    var OldName=req.query.OldName,NewName=req.query.NewName,NewNo=req.query.NewNo;
     console.warn(OldName, NewName, NewNo);
conn.query('SELECT Name FROM contacts Where Name='+ mysql.escape(OldName),(err,result)=>{
   if(err)
   res.send(`<h2>Name not found. Enter correct name<h2>`);

   else if(result[0].Name==OldName)
   {
       console.warn('Name Found');
       let data=[NewName,NewNo,OldName];
       let sql=`Update contacts SET Name=?,MobNo=? WHERE Name=?`;

       conn.query(sql,data,(err,result,fields)=>{
           if(err)  
           { res.send(`<h2>err in updating contact<h2>`);
           console.warn(err);}
            else
           { res.send(`<h2>Updated successfully</h2> \n <h2>Contacts Affected: ${result.affectedRows}</h2>`);
            
            console.warn(result);}
       })
   }
})
    
})


//showing contacts.....................................................................
let filepath2=path.join(__dirname,'TableNodejs.html');
app.get('/showContacts',(req,res)=>{
    conn.query('SELECT * FROM contacts',(err,result)=>{
      if(err)
      res.send(err);
  else
    { let contacts=JSON.stringify(result);
        let ArrObj=result;
        let a=`<!DOCTYPE html>
        <html>
        <head>
            <style>
        table,th,td{
            border:2px solid;
            border-collapse: collapse;
            text-align:center;
            padding:10px;
            margin-left:550px;
            background-color: blanchedalmond;
        }

            </style>
    
        </head>
        <body>
        <table>
        <tr>
        <th>SLNo</th>
        <th>Name</th>
        <th>MobNo</th>
        </tr>`;
        console.warn(ArrObj);
        console.warn(ArrObj.length);
        
        for(i=0;i<ArrObj.length;i++)
        {
            a+=`<tr><td>${ArrObj[i].SLNo}</td>`;
            a+=`<td>${ArrObj[i].Name}</td>`;
            a+=`<td>${ArrObj[i].MobNo}</td></tr>`;
        }
        a+='</table></body></html>';
        
        fs.writeFileSync(filepath2,a,(err)=>{
            if(!err)
            console.log('file appended great');
        });
        res.sendFile(filepath2);}
      })

})


//deleting contacts......................................................................
app.get('/deleteContacts',(req,res)=>{
    conn.query('DELETE FROM contacts WHERE Name='+ mysql.escape(req.query.Name),(err,result)=>{
        if(err)
       { res.send(`error occured: ${err}`);
       console.warn(err);}
    else
    {res.send(`<h2>Deleted successfully and contacts affected: ${result.affectedRows} </h2>`);
    console.warn(result);}
    })
})


//searching contacts.......................................................................
app.get('/search',(req,res)=>{
    conn.query('SELECT * FROM contacts WHERE Name='+ mysql.escape(req.query.Name),(err,result)=>{
        if(result[0]==undefined)
        {res.send('<h2>Name doesnt exist/match! Enter correct Name..</h2>'); 
        console.warn('name does not match or exists');
    }
    
       else
   {   res.send(`<h2>SLNo:${result[0].SLNo} || Name:${result[0].Name} || MobNo:${result[0].MobNo}<h2>`);
   console.warn(result);
}
    })
})

app.listen(5000);