import React from 'react';
import './ParentComponent.css';
import ShowContacts from './ShowContacts';
import AddContacts from './AddContacts';
import UpdateContacts from './UpdateContacts';
import DeleteContact from './DeleteContact';

function ParentComponent1(){
return(
    <>
    <div id='BgImg'>
    {/* <div className='animation'></div> */}
    <div className="container">
    <h1>This is contact Manager Web Application</h1>
    <h2>Description:</h2>
    <h3>Use this Application to save/update/search/delete contacts online. </h3>
    <ShowContacts />
    <br></br>
    <AddContacts />
    <br></br>
    <UpdateContacts/>
    <br></br>
    <DeleteContact/>
    </div>
    </div>
    </>
)
}
export default ParentComponent1;