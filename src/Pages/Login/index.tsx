import { useState } from "react"
import "./style.scss"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export function Login() {

  const [Isemail, setIsemail] = useState('')
  const [Ispass, setIspass] = useState('')
  const [Ismsg,setIsmsg] = useState('')
  const navigate = useNavigate();
  const [data1,setData1] = useState('')
  const [data2,setData2] = useState('')
  const [data3,setData3] = useState('')

  function Validate(e : React.ChangeEvent<any>) {
    e.preventDefault()
    const {email,pass} = e.target.elements
    const _email = email.value
    const _pass = pass.value

    let isValid = true;

    if (!_email) {
      setIsemail('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(_email)) {
      setIsemail('Email address is invalid');
      isValid = false;
    } else {
      setIsemail('');
    }
    if (!_pass) {
      setIspass('Password is required');
      isValid = false;
    } /*else if (_pass.length < 6) {
      setIspass('Password must be at least 6 characters');
      isValid = false;
    } else {
      setIspass('');
    }*/

    if (isValid) {
      console.log('Form data is valid and ready for submission');
      console.log({email: _email, pass: _pass})
      // Wyślij dane do serwera lub wykonaj inne akcje
      const Data = {
        email: _email, pass: _pass
    }
      axios.post('http://localhost:3000/login',Data)
      .then(res=>{
        const message = res.data.message;
        console.log('Received message:', message);
        if(message == 'true') {
          setIsmsg('You have successfully logged !')
          const form = document.querySelector('form');
          form?.classList.add('hidden');
          console.log("email " + _email)

          const name = res.data.name

          console.log("name " + name)

          setData1(_email)
          setData2(_pass)
          setData3(name)

        }
        if(message == 'false') {
          setIsmsg('The data does not match !')
        }
      })
    }

  }

  function newPage() {
    navigate('/clicker', { state: { data1, data2, data3 } });

  }

    return (
      <div id="login">
          <form onSubmit={Validate}>
          <div className="row">
            <div className="col"><h1>Login</h1></div>
          </div>
        <div className="row">
            <div className="col">
                <label htmlFor="email">Email:</label>
                <input type="text" className="form-control" id="email" name="email"/>
                <p>{Isemail}</p>
            </div>
            <div className="col">
                <label htmlFor="pass">Password:</label>
                <input type="password" className="form-control" id="pass" name="pass"/>
                <p>{Ispass}</p>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {Ismsg === 'You have successfully logged !' && (
          <>
            <p>{Ismsg}</p>
            <button onClick={newPage}>Click me!</button>
          </>
        )}
        {Ismsg === 'The data does not match !' && (
          <p>{Ismsg}</p>
        )}
      </div>
      
    )
}

/*

*/