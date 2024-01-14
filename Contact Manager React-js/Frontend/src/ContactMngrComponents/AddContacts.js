
import React, {useEffect, useState} from 'react';
//import Axios from 'axios';

function AddContacts(){

//let [Data,setData]=useState([]);

// useEffect(()=>{
//     fetch('http://localhost:1000/api')
//     .then(res=>res.json())
//     .then(data=>{console.warn(data);setThing(thing=data.msg)})
//     .catch(err=>console.warn(err));
// })


// useEffect(()=>{
//   async function connect(){
//     //const res=await Axios.get('http://localhost:1000/showContacts');
//     const res=await fetch('http://localhost:1000/addContact');
//     //console.warn(res.data);
//     const sqlData=await res.json();
//     setData(Data=sqlData);
//     console.warn(sqlData);
//   }
//     connect();
// },[]);


return(
    <>
    <div class='inlineblock' id="add">
      <h2>Add Contacts</h2>
         <form method="get" action="http://localhost:1000/addContact" target="_blank">
              <div>
              <label>SL_No</label>
              <input type="number" name="SLNo"/>
              </div>
              <br></br>
              <div>
               <label>Name</label>
              <input type="text" name="Name"/>
              </div>
              <br></br>
              <div>
              <label>Mob</label>
              <input type="tel" name="Mob"/>
              </div>
              <br></br>
              <button type="submit">Add</button>
            </form> 
            </div>
    </>
    )

}
export default AddContacts;