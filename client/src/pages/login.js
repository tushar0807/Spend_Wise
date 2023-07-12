import React from 'react'
import {Form,Input,message} from 'antd'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'

const Login=()=>{
    const navigate =useNavigate()

    const submitHandler=async (values)=>{
        try {
            const {data}= await axios.post('/users/login',values)
            message.success('Login Successfull')
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
            navigate('/')
        } catch (error) {
            message.error('email or password is incorrect')
        }
    }
    return(
        <>
        <div className='login-page '>
            <Form  className='login-form' layout="vertical" onFinish={submitHandler}>
                <h1 >User Login</h1>
                <Form.Item style={{ marginTop: '20px' }} label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password"/>
                </Form.Item>
                <div style={{ marginTop: '40px' }} className='form-action'>
                    <Link to="/Register"  style={{ marginRight: '30px' }}>Not a user?Click here to register</Link>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </Form>
        </div>
        </>
    )
}


export default Login;