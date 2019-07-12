import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {connect} from 'react-redux'
import {onLogout} from './../redux/actions'
import { Link } from 'react-router-dom'
import MovieList from './../pages/movieList'

class Example extends React.Component {
  state = {
      isOpen : false
  }
  
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onBtnLogoutClick = () => {
      this.props.onLogout()
      localStorage.removeItem('terserah')
    }
  
  render() {
    return (
      <div>
        <Navbar  color="warning" light expand="md">
           <Link to='/'> <NavbarBrand  style={{fontWeight:'bolder',fontSize:'20px', color:'black'}}>Home</NavbarBrand> </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              
              


              <div style={{fontWeight:'bolder',fontSize:'20px'}}>
              {
              this.props.name !== ""
              ?
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret  style={{color:'black'}}>
                  {'Hello, ' + this.props.name}
                </DropdownToggle >
                <DropdownMenu right style={{backgroundColor:'#ffc107'}}>
                  <DropdownItem><Link to='/manage'>
                    Manage Movie</Link>
                  </DropdownItem>
                  <DropdownItem><Link to='/changepass'>
                    Change Password
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to='/history'>
                    History Transaksi
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider /><div><Link to='/'>
                  <DropdownItem onClick={this.onBtnLogoutClick}>
                    Logout
                  </DropdownItem>
                  </Link>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              <Link to='/register' style={{fontWeight:'bolder',fontSize:'20px'}}>
              <NavItem style={{color:'green'}}>
                Join Now
              </NavItem>
            </Link> 
            }

              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name : state.user.username
  }
}

export default connect(mapStateToProps , {onLogout})(Example)