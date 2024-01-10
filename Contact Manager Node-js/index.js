const express=require('express');
const app=express();
const http=require('http');
const url=require('url');

// http.createServer((req,res)=>{
//     res.write('i m server');
//     res.end();
// }).listen(8000);


// const server=http.createServer((req,res)=>{
//     const path=url.parse(req.url);
//     if(path.pathname=='/server')
//     res.end(`<h1>Welcome to my server\n V r going to build a website<h1>`);
//     else if(path.pathname=='/contactManager')
//     {res.write('<h1>This is contact Manager web application</h1>');
// res.end();}
//     else
//     {res.end(`<h1>Page not found \nStatus-404<h1>`);
// //res.end();
// }
// })

//again:
// const server=http.createServer((req,res)=>{       //(req,res)-correct and not (res,req)-error
//     const path=url.parse(req.url);
//     if(path.pathname=='/')
//     res.end('hello');
// else if(path.pathname=='/welcome')
// res.end('welcome');
// else
// res.end('page doesnt exist');
// })

//server.listen(8000);


app.get('/server',(req,res)=>{
    console.warn('I am express server');
    res.send('i m express server');
})

//obj ,ArrObj and stringObj sending.............................................
// app.get('/jsonData',(req,res)=>{
//     let obj={one:1,two:2};
//     let obj2={three:'three',four:'four'};
//     let strObj=JSON.stringify(obj);
//     let strObj2=JSON.stringify(obj2);
//     console.warn(strObj);
//     console.warn(strObj2);
//     console.warn(JSON.parse(strObj));
//     console.warn(JSON.parse(strObj2));

//     //res.write(JSON.stringify(obj));
//    // res.end({a:1,b:2});//incorrect              //res.write and res.end can't send an obj to server. dey can only send stringified obj using json.stringify()
//     //res.write({a:1,b:2}) ;//incorrect                                // 
//     //res.send({a:1,b:2});  //correct            //res.send stringifies obj and show on server 
//      let ArrObj=[{a:1},{b:2}];
//      //res.send(ArrObj);
//      //res.end(ArrObj); not workin
//      res.end(JSON.stringify(ArrObj)); //workin
//     })

//sending exported data from other file

app.get('/export',(req,res)=>{                    //module.exports=data={1:1,2:2} is used to export data from other file
    let data=require('./DataExportingFile');
    console.warn(data);
    res.send(data);
})



app.listen(8000);







