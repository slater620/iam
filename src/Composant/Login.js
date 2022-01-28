import '../Style/Account.css'
import ENSPY from '../Asset/ENSPY.png'
import {useState} from 'react';
function Login({spaceName , setSpaceName}){

    const[alertMsg ,setAlertMsg] = useState('')
    function getToken(event){
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value
        const email = document.querySelector('#email').value

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
          if(password === ""){
              error = true
              setAlertMsg("Veuillez renseigner votre le mot de passe!")
          }
          if(email === ""){
              error = true
              setAlertMsg("Veuillez renseigner votre adresse email")
          }
          
        var user ={username,password,email};
        var requestURL = 'http://127.0.0.1:8000/rest-auth/login/';
        var request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.setRequestHeader('content-Type', 'application/json')
        request.responseType = 'json';
        request.send(JSON.stringify(user));
        request.onload = function() {
            const requestStatus = request.status;
            if (requestStatus === 200) {
                console.log('good');
                setSpaceName('isLogin');
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
                    <label for="userename">Username</label>
                    <input type="text" className="form-control" id="username"  aria-describedby="emailHelp" placeholder="Enter username" required/>
                </div>
            
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"  required/>
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email"  className="form-control" id="email" placeholder="Email"  required/>
                </div>
                <div className='row' style={{marginBottom:"10%", marginTop:"5%"}}>
                    <div className='col'><a href='#' style={{color:"blue" , fontWeight:"bold" }}>Forgot password?</a> </div>
                    <div className='col'><a href='#' style={{color:"blue" , fontWeight:"bold"}}  onClick={() => {setSpaceName('createAccount')}}>Create account</a> </div>  
                </div>
                <button onClick={(event) => getToken(event)} type="submit" className="btn btn-primary">LOGIN</button>
            </form>
        </div> 
    )
}
export default Login;