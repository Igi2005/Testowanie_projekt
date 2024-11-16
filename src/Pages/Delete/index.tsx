import axios from "axios"
import { useState } from "react"
import "./style.scss"
export function Delete() {
    const [err_test,setErrTest] = useState('')

    function Data(e : React.ChangeEvent<any>) {
        e.preventDefault()
        const {email,pass,del} = e.target.elements
        const _email = email.value
        const _pass = pass.value
        const _del = del.value


        if(_del === "I want delete account.") {
          const check_data = {
            email : _email, pass : _pass
          }
          axios.delete('http://localhost:3000/delete',{
            data : {
              check_data
            }
          }).then(response=>{
            const msg = response.data.message
            if(msg === "User not found.") {

            }
            else if(msg === "Invalid password.") {

            }
            else if(msg === "User deleted successfully.") {

            }
            else if(msg === "An error occurred while deleting the user.") {
              
            }
          })
        }
        else if(_del !== "I want delete account.") {
            setErrTest("Rewrite correctly!")
        }

    }


    return (
        <div id="delete">
        <form onSubmit={Data}>
        <div className="row">
          <div className="col"><h1>Delete account</h1></div>
        </div>
      <div className="row">
          <div className="col">
              <label htmlFor="email">Email:</label>
              <input type="text" className="form-control" id="email" name="email"/>
          </div>
          <div className="col">
              <label htmlFor="pass">Password:</label>
              <input type="password" className="form-control" id="pass" name="pass"/>
          </div>
      </div>
      <div className="row">
        <div className="col">
        <label htmlFor="del">Rewrite: I want delete account.</label>
        <input type="text" className="form-control" id="del" name="del"/>
        <p>{err_test}</p>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </div>
    )
}