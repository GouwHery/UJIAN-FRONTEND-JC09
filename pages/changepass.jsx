import React, { Component } from 'react'
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom'
import {  } from 'react-redux'
import Axios from 'axios'
import {OnRegisterSuccess} from './../redux/actions'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
 
class changepass extends Component{
    state = {
        error:'',
        accept: '',
        loading : false
    }
    OnBTNChangePW = () => {
        var passwordlama = this.refs.passwordlama.value
        var passwordbaru = this.refs.passwordbaru.value
        var confirmpass = this.refs.confirmpass.value
        if(passwordlama === '' || passwordbaru ==='' || confirmpass === ''){
            this.setState({error : 'Anda Belum Memasukan Input apapun'})
            Axios.get('http://localhost:2000/users?username=' + this.props.user)
            .then((res) => {
                console.log(res.data);
                
            })
        }else{
            this.setState({loading : true})
            Axios.patch('http://localhost:2000/users?password=' + passwordbaru)
            .then((res) => {
                console.log(res.data)
                if(passwordbaru !== confirmpass){
                    this.setState({error : 'Password and confirm password must be same'})
                }else{
                    this.setState({accept : 'Password Sudah Diganti'})
                    // Axios.patch('http://localhost:2000/users?password=' + passwordbaru)
                    // .then((res) => {
                    //     console.log(res.data);
                    //     // this.props.OnRegisterSuccess(res.data)
                    //     localStorage.setItem('terserah' , res.data.username)
                        
                    // })
                    // .catch((err) => {
                    //     console.log(err);
                        
                    // })
                }
            })
            .catch((err) => {
                console.log(err);
                

            })

            }

    }

    render (){
        return(
            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-6'>
                        <Paper className='p-5'>
                            <h1> CHANGE PASSWORD <div style={{color:'blue'}}><marquee behavior='alternate'>"{this.props.user}"</marquee></div> </h1>
                            <input ref='passwordlama' className='form-control mt-3' type='text' placeholder='Password Lama'/>
                            <input ref='passwordbaru' className='form-control mt-3' type='text' placeholder='Password Baru'/>
                            <input ref='confirmpass' className='form-control mt-3' type='text' placeholder='Confirm Password'/>
                            
                            {
                                this.state.error === ''
                                ?
                                null
                                :
                                <div className='alert alert-danger mt-3'>
                                 {this.state.error} 
                                <span onClick={() =>this.setState({error : ''})} style={{fontWeight:"bolder" , cursor : 'pointer',float : 'right'}}> x </span> 
                                </div>
                            }
                            {
                                this.state.loading ===true
                                ?
                                <p>Loading ...</p>
                                :
                                <input onClick={this.OnBTNChangePW} type='button' className='btn btn-primary mt-5' value='Change Now'/>
                            }
                        </Paper>

                    </div>


                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user.username
    }
}
export default connect(mapStateToProps, {OnRegisterSuccess}) (changepass)