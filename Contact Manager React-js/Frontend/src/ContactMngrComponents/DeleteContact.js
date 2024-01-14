function DeleteContact()
 {
    let labelcss={
        fontSize:'20px'
    }
 
   return(   <>
    
   <div className="inlineblock" id="delete">
   <h2>Delete Contacts</h2>
 <form method="get" action="http://localhost:1000/deleteContacts" target="_blank">
    <label style={labelcss}>Name</label>
    <input type="text" name="Name"/>
    <button type="submit">Delete</button>
</form>
</div>
<br></br>

<div className="inlineblock" id='search'>
 <h2>Search Contacts</h2>   
<form method="get" action="http://localhost:1000/search" target="_blank">
    <label style={labelcss}>Name</label>
    <input type="text" name="Name"/>
    <button type="submit">Search</button>
</form>
</div>
</>
)
}
export default DeleteContact;