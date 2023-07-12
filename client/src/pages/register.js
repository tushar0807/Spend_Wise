import React from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'


const Register=()=>{
    const navigate=useNavigate()

    const submitHandler=async (values)=>{
        try {
            await axios.post('/users/register',values)
            message.success('Registration Successfull')
            navigate('/login')
        } catch (error) {
            console.log(error)
            message.error('email already registered')
        }
    }
    return(
        <>
        <div className='login-page '>
            <Form className='login-form' layout="vertical" onFinish={submitHandler}>
                <h1>User Registration</h1>
                <Form.Item style={{ marginTop: '20px' }} label="Name" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password"/>
                </Form.Item>
                <div style={{ marginTop: '40px' }} className='form-action'>
                    <Link to="/login" style={{ marginRight: '30px' }}>Already Registered? Click here to login</Link>
                    <button className='btn btn-primary'>Register</button>
                </div>
            </Form>
        </div>

        </>
    )
}


export default Register;