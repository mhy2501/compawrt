import {Form} from 'react-router-dom'

function DashboardProfile(props) {
 


  return (
    <div>
       
             <Form key={props[0].user_id}>
                <label htmlFor='username'>Username:</label>
                <input type="text" id="username" name="">{props[0].username}</input>
                <label htmlFor='first_name'>first_name:</label>
                <input type="text" id="first_name" name="">{props[0].first_name}</input>
                <label htmlFor='last_name'>last_name:</label>
                <input type="text" id="last_name" name="">{props[0].last_name}</input>
                <label htmlFor='email'>email:</label>
                <input type="email" id="email" name="">{props[0].email}</input>
                <label htmlFor='password'>password:</label>
                <input type="password" id="password" name="">{props[0].password}</input>
            </Form>
   
    </div>
  )
}

export default DashboardProfile