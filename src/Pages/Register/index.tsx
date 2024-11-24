import { useState } from "react"
import "./style.scss"
import axios from "axios"
export function Register() {

  const [Isname, setIsname] = useState('')
  const [Issurname, setIssurname] = useState('')
  const [Isadress, setIsadress] = useState('')
  const [Isemail, setIsemail] = useState('')
  const [Iscity, setIscity] = useState('')
  const [Iszip, setIszip] = useState('')
  const [Ispass, setIspass] = useState('')
  const [Isrepass, setIsrepass] = useState('')
  const [Ismsg,setIsmsg] = useState('')

  function Validate(e : React.ChangeEvent<any>) {
    e.preventDefault()
    const {name,surname,adress,email,city,zip,pass,repass} = e.target.elements
    const _name = name.value
    const _surname = surname.value
    const _adress = adress.value
    const _email = email.value
    const _city = city.value
    const _zip = zip.value
    const _pass = pass.value
    const _repass = repass.value

    let isValid = true;

    // Walidacja imienia
    if (!_name) {
      setIsname('First name is required');
      isValid = false;
    } else {
      setIsname('');
    }

    // Walidacja nazwiska
    if (!_surname) {
      setIssurname('Last name is required');
      isValid = false;
    } else {
      setIssurname('');
    }

    // Walidacja adresu
    if (!_adress) {
      setIsadress('Address is required');
      isValid = false;
    } else {
      setIsadress('');
    }

    // Walidacja emaila
    if (!_email) {
      setIsemail('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(_email)) {
      setIsemail('Email address is invalid');
      isValid = false;
    } else {
      setIsemail('');
    }

    // Walidacja miasta
    if (!_city) {
      setIscity('City is required');
      isValid = false;
    } else {
      setIscity('');
    }

    // Walidacja kodu pocztowego
    if (!_zip) {
      setIszip('Zip code is required');
      isValid = false;
    } else if (!/^\d{5}$/.test(_zip)) {
      setIszip('Zip code must be 5 digits');
      isValid = false;
    } else {
      setIszip('');
    }

    // Walidacja hasła
    if (!_pass) {
      setIspass('Password is required');
      isValid = false;
    } else if (_pass.length < 6) {
      setIspass('Password must be at least 6 characters');
      isValid = false;
    } else {
      setIspass('');
    }

    // Walidacja powtórzenia hasła
    if (!_repass) {
      setIsrepass('Please confirm your password');
      isValid = false;
    } else if (_pass !== _repass) {
      setIsrepass('Passwords do not match');
      isValid = false;
    } else {
      setIsrepass('');
    }

    // Jeśli wszystko jest OK, formularz można wysłać
    if (isValid) {
      console.log('Form data is valid and ready for submission');
      console.log({name : _name, surname : _surname, adress: _adress, email: _email, city: _city, zip: _zip, pass: _pass, repass: _repass})
      // Wyślij dane do serwera lub wykonaj inne akcje
      const Data = {
        name : _name, surname : _surname, adress: _adress, email: _email, city: _city, zip: _zip, pass: _pass, repass: _repass
    }
      axios.post('http://localhost:3000/register',Data)
      .then(res=>{
        const message = res.data.message;
        console.log('Received message:', message);
        if(message == 'true') {
          setIsmsg('You have successfully registered !')
          const form = document.querySelector('form');
          form?.classList.add('hidden');
        }
        if(message == 'false') {
          setIsmsg('Email exists in the database !')
        }
      })
    }


  }


    return(
        <div id="all_login">
        <form onSubmit={Validate}>
          <div className="row">
            <div className="col"><h1>Register</h1></div>
          </div>
        <div className="row">
          <div className="col">
            <input type="text" className="form-control" placeholder="First name" name="name"/>
            <p>{Isname}</p>
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Last name" name="surname"/>
            <p>{Issurname}</p>
          </div>
        </div>
        <div className="row">
        <div className="col">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name="adress"/>
            <p>{Isadress}</p>
          </div>
        </div>
        <div className="row">
        <div className="col">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email" placeholder="email" name="email"/>
            <p>{Isemail}</p>
          </div>
        </div>
        <div className="row">
            <div className="col">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" name="city"/>
                <p>{Iscity}</p>
            </div>
            <div className="col">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip" name="zip"/>
                <p>{Iszip}</p>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label htmlFor="pass">Password:</label>
                <input type="password" className="form-control" id="pass" name="pass"/>
                <p>{Ispass}</p>
            </div>
            <div className="col">
                <label htmlFor="re_pass">Repeat password:</label>
                <input type="password" className="form-control" id="re_pass" name="repass"/>
                <p>{Isrepass}</p>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      
  {Ismsg === 'You have successfully registered !' && (
    <>
        <p>{Ismsg}</p>
          <button onClick={() => window.location.href = '/login'}>
            Go to Login!
          </button>
          </>
        )}
      
      <p>
        {Ismsg === 'Email exists in the database !' && Ismsg}
      </p>

      </div>
    )
}