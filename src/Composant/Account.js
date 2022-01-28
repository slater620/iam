import '../Style/Account.css'
import ENSPY from '../Asset/ENSPY.png'
import {useState} from 'react';
function Account({spaceName , setSpaceName}){
    
    const [alertMsg , setAlertMsg] = useState('');
    function createAccount(event){
        const username = document.querySelector('#username').value
        const email = document.querySelector('#email').value
        const password1 = document.querySelector('#password1').value
        const password2= document.querySelector('#password2').value
        var user ={username,email,password1, password2};

          //variable qui signale la présence d'une erreur dans le formulaire
          var error = false

          //variable qui signale la présence d'une erreur au niveau du serveur
           var server_error = false
  
          //variable indiquant si l'utilisateur est connecté à internet
          var connected = window.navigator.onLine
  
          if(!connected){
              error = true
              setAlertMsg("Vous n'êtes pas connecté à internet!")
          }
  
          if(username === ""){
              error = true
              setAlertMsg("Veuillez renseigner votre username!")
          }
          if(password1 === ""){
              error = true
              setAlertMsg("Veuillez renseigner votre le mot de passe!")
          }
          if(password2 === ""){
            error = true
            setAlertMsg("Veuillez renseigner votre le mot de passe!")
          }
          if(password1 !== password2){
            error = true
            setAlertMsg("Vos mots de passe doivent etre les memes!")
        }
          if(email === ""){
              error = true
              setAlertMsg("Veuillez renseigner votre adresse email")
          }
          
        var requestURL = 'http://127.0.0.1:8000/rest-auth/registration/';
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.setRequestHeader('content-Type', 'application/json')
        request.responseType = 'json';
        request.send(JSON.stringify(user));
        request.onload = function() {
            const requestStatus = request.status;
            if (requestStatus === 200) {
                console.log('good');
                setSpaceName('login');
            }
            else{
                console.log('error')
            }
        }
        event.preventDefault();
    } 
    return(
        <div >
            <form className='formulaire'>
                <img src={ENSPY} alt="LOGO" className='title' style={{width:"20%"}} />
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name='username' id="username"  aria-describedby="emailHelp" placeholder="Enter username" required/>
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" name='password1' id="password1" placeholder="Password"  required/>
                </div>
                <div className="form-group">
                    <label >Confirm password</label>
                    <input type="password" className="form-control" name='password2' id="password2" placeholder="Confirm password"  required/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
                </div>
                <button type="submit" onClick={(event) => createAccount(event)} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Account;