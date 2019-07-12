import React from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import numeral from 'numeral'


class HistoryTransaction extends React.Component{
    state = {
        userdata : [],
        movielist : [],
        transaction : [],
        err : ""
     
    }
    componentDidMount(){
        Axios.get('http://localhost:2000/users?username='+ this.props.user)
        .then((res)=>{
            var history  = res.data[0].transaction
            this.setState({
                userdata : history
            })
            if(this.state.userdata.length === 0){
                this.setState({
                    err : "You have no transaction yet !"
                })
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })

        // Axios.get('http://localhost:2000/movies')
        // .then((res)=>{
        //   var listorder =  res.data.sort((a,b)=>{
        //         return (a.id) - (b.id)
        //     }) // SORT ASCENDING
         
        //     var arr = []
        //     listorder.map((val)=>{
        //         arr.push(val.title)
        //     })
        //     this.setState({
        //         movielist : arr
        //     })
            

        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
        
       
    }

    printhistory = () =>{
        console.log(this.state.userdata)
        if(this.state.userdata.length !== 0){
            
            var jsx = this.state.userdata.map((val,index)=> {
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{this.state.userdata[index].title}</td>
                        <td>{val.qty.join(" ,")+ "   (" + val.qty.length + " Ticket)"}</td>
                        <td>{"Rp. " + numeral(val.total).format(0,0)}</td>
                    </tr>
                )
            })
            return jsx
        }else {
            
           
                
        }
        
    }

    mapTotal = () =>{
        var total = 0
        this.state.userdata.map((val)=>{
            total = total + val.totalprice
        })
        return total
    }


    render(){
        return(
            <div>
                   
            
            <div className="mycontainer">
                <h1 className="text-light text-center mt-5"> Transaction History</h1>
               <Table dark className="mt-3">
             
                   <thead>
                        <tr className="filtercss">
                            <td>No</td>
                            <td>Movie Name</td>
                            <td>Total Tiket</td>
                            <td>Total Price</td>
                        </tr>
                   </thead>
                   <tbody>
                        
                        {this.printhistory()}
                        <tr className="filtercss text-success"> 
                                <td></td>
                                <td></td>
                                <td>Total Bayar : </td>
                                <td>{"Rp " + numeral(this.mapTotal()).format(0,0)}</td>
                     </tr>
                        
                   </tbody>
                   
                   
               </Table>
               {
                            this.state.err === '' 
                            ?
                            <p></p>
                            :
                            this.state.err !== ''
                            ?
                            <div className='alert alert-black filtercss text-center'> {this.state.err} <span style={{fontWeight : "bolder", cursor : 'pointer', float : "right", height : "150px"}} onClick={()=>{this.setState({err : ""})}}> X</span></div>
                            :
                            null}
                
               
    <div className='mt-4'><input type='button' className='btn btn-succes' value='Checkout' style={{width:'100%',height:'30px',border:'1px solid black',textAlign:'center',fontWeight:'bolder',color:'green'}} onClick={() => this.btnButtonBuy()}/></div>
               </div>
           
        
    )


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
       user : state.user.transaction
       
       
    }
}

export default connect(mapStateToProps)(HistoryTransaction);