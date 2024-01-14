const express=require('express');
const app=express();
const cors=require('cors'); //used while connecting frontend and backend
const http=require('http');
const path=require('path');
const fs=require('fs');
const { constants } = require('buffer');
const mysql=require('mysql2');

//setting sql connection.............................................................
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


app.use(cors());       //for connecting frontend and backend

app.get('/',(req,res)=>{
 
   res.send('hello from backend server');
})

app.get('/api',(req,res)=>{
  
  res.send('hello from backend............ faddfadfadjljljljljdfjajldjfljaudifiiadiukjjjjjjjjjjjjjjjjjjjjjjkdkfkakjdslfkjlajljdflkjljdfjlkjlkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjdkasjfjalkjljfdlajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjkjfadsssssssssssssssssssssssssssssssssjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjddddddddddddddddddddddddddddddddddddddddddddddd');

})

//showing contacts..........................................................
app.get('/showContacts',(req,res)=>{
  conn.query('SELECT * FROM contacts',(err,result)=>{
    if(err)
    res.send(err);
else
{res.send(result);
console.warn(result);
}
  })
})


//adding contacts:.....................................................................
app.get('/addContact',(req,res)=>{
    
  const data={SLNo:req.query.SLNo,Name:req.query.Name,MobNo:req.query.Mob};
  //res.send(data);
  conn.query('Insert into contacts set?',data,(err,result,fields)=>{
       if(err)
       console.warn('error is',err);
      else
      {console.warn(result);res.send(`<h2>Contact Added:${result.affectedRows}</h2>`);
      }
     })
  })


  //updating contacts...................................................................
app.get('/updateContact',(req,res)=>{
  var OldName=req.query.OldName, NewName=req.query.NewName, NewNo=req.query.NewNo;
  // var OldName=req.formdata.OldName;
  // var NewName=req.formdata.NewName;
  // var NewNo=req.formdata.NewNo;
  //  console.warn(OldName, NewName, NewNo);
   //res.send('I m update contact');
   //res.send(req.body);
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


app.listen(1000);