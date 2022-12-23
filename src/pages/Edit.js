import React from 'react';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



 const Edit =  () => {
    
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [successEmail, setSuccessEmail] = useState('');
    const [successPassword, setSuccesPassword] = useState('');
    const id = localStorage.getItem('user_id');
    const passwordLogedin = localStorage.getItem('password');

    const updateEmail = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const value = {email};
        try {
            const response = await fetch(`http://localhost:4000/api/email/${id}`, {
                method:'PUT', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(value)
            })

       const data = await response.json();
        if (response.OK) {
            setSuccessEmail(data);
            }
        else {
            setErrorEmail(data);
          } 
        }
        catch (err) {
            setErrorEmail( err.message );
        }


  

  const updatePassword = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const currentPassword = formData.get("currentPassword");
    const password = formData.get("newPassword");
    const value = {password};
    try {
      if (currentPassword === passwordLogedin) {
        const response = await fetch(`http://localhost:4000/api/password/${id}`, {
          method:'PUT', headers: {
           'Content-Type': 'application/json'
          },body: JSON.stringify(value)
        })
        const data = await response.json();
          if (response.OK) {
            console.log(data);
            setSuccesPassword(data);
          }
          else {
            console.log(data);
            setErrorPassword(data);
          }
      } 
      else {
        setErrorPassword(`This is not your current password. Please try again!`);
      }
    }
    catch (err) {
      setErrorPassword(err.message);
    }
  }

  return (
    <div>
    <Navbar />
    <div className="container w-75 bg-white mt-3 rounded p-3">
      <h2 className='fw-bold'>Personal information</h2>
      <form onSubmit={updateEmail} className='d-flex flex-column w-100'>
        <label className=" my-2 fw-bold fs-6">Email</label>
        <input className="p-2 w-50" type='text' name='email' placeholder='john.doe@gmail.com' />
        <div className='d-flex justify-content-end my-3'>
         <button type='submit' className='btn btn-secondary px-5'>Save</button>
        </div>
      </form>
    </div>
    <div className="container w-75 bg-white mt-3 rounded p-3">
      <h2 className='fw-bold'>Security</h2>
      <h3 className='fw-bold'>Password</h3>
      <form onSubmit={updatePassword} className='passwordForm'>
        <div className='d-flex gap-3 w-75'>
          <div className='d-flex flex-column w-50'>
           <label className=" my-2 fw-bold">Current password</label>
           <input className="p-2" type='text' name='currentPassword' placeholder='Insert current password' />
          </div>
          <div className='d-flex flex-column w-50'>
           <label className=" my-2 fw-bold">New Password</label>
           <input className="p-2" type='text' name='newPassword' placeholder='Insert new password' />
          </div>
        </div>
        <div className='d-flex justify-content-end my-3'>
         <button type='submit' className='btn btn-secondary px-5'>Save</button>
        </div>
      </form>
    </div>
    <div className='text-center text-danger w-75 mx-auto bg-white'>
    {(successEmail) ? <p>You have successfully changed your email to: {successEmail}</p> : <p>{errorEmail}</p> }
    {(successPassword) ?<p>You have successfully changed your password to: {successPassword}</p> : <p>{errorPassword}</p>}
    </div>
    <Footer />
   </div>
  )
}}

export default Edit