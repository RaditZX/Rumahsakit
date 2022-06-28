//import react
import {useState,useEffect} from "react";
import {Link,useHistory,Redirect} from 'react-router-dom';

//import boostrap
import  'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

//import css
import '../App.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap";
import lambang from "../image/icon.png";


function Register() {
    const [nama,setNama] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [auth,setAuth] = useState([]);
    const history = useHistory();
    const role = 'pasien'
    const verifikasi = false;
    const  Id = localStorage.getItem('id')

    const autorization = () => {
        axios.get(`http://localhost:3000/authenticated`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res.data.auth);
            if(res.data.auth === true){
                history.push('/home');
            }
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }

    useEffect(() => {
        autorization();
    },[]);


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/register',{
            email,
            password,
            verifikasi,
            role
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            console.log(err.response.data.message);
        })
    }
    return(
        //form register
         <div className="container">
            <div className="row">
                <div className="test">
                        <div className="image" >
                            <img src="https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"/>
                        </div>
                        <div className="content">
                            <h1>Welcome to <span>SOCA</span></h1>
                            <p>Welcome back! Log in to your account to view today's clients:</p>
                            <div className="input">
                                <Form onSubmit={handleSubmit}>
                                    <input type="text" id="form-input" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    <input style={{"margin-top":"1rem"}} id="form-input" type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <button style={{"margin-top":"1rem"}} type="submit" className="btn btn-primary">Login</button>
                                </Form>
                                    <Link to={'/'} style={{"margin-top":"1rem"}} type="submit" className="btn btn-primary">Login</Link>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
    
}
export default Register;