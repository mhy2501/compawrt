import {Form} from 'react-router-dom'

function DashboardProfile({user}) {
 


  return (
    <div>
       
             <Form key={user.user_id}>
                <label htmlFor='username'>Username:</label>
                <input value={user.username}
                  type="text" 
                  id="username" 
                  name=""></input>
                <label htmlFor='first_name'>first_name:</label>
                <input 
                value={user.first_name}
                type="text" id="first_name" name=""></input>
                <label htmlFor='last_name'>last_name:</label>
                <input value={user.last_name}
                type="text" id="last_name" name=""></input>
                <label htmlFor='email'>email:</label>
                <input value={user.email}
                type="email" id="email" name=""></input>
                <label htmlFor='password'>password:</label>
                <input value={user.password}
                type="password" id="password" name=""></input>
            </Form>
   
    </div>
  )
}

export default DashboardProfile