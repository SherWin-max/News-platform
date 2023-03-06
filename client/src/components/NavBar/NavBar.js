import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton, LogoutButton } from "../../components";


const NavBar = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (

        <Wrapper>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/profile">Profile</NavItem>
            <NavItem to="/live-stream" end>Live TV</NavItem>
            {
                !isAuthenticated
                    ? <LoginButton />
                    : <LogoutButton />
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
min-width: 200px;
box-shadow: 0 0 6px hsl(210 14% 90%); 
position:sticky;
width: 0;
z-index: 10;
top: 0;
left: 0;
/* overflow-x: hidden; */
padding-top: 60px;
display:flex;
flex-direction: column;
padding: 20px;
padding-left: 80px;
font-size: 20px;
background-color: white;
height:100vh;
font-family:sans-serif;
`

const NavItem = styled(NavLink)`
text-decoration: none;
padding:10px;
margin-top:15px;
font-weight:bolder;
color: black;
&.active {
    color: blue;
    } 
`
const Img = styled.img`
height:60px;
width: 60px;
`
const Button = styled.button`
background-color: blue;
color:white;
width:150px;
height:40px;
border-radius:15px;
font-size: 20px;
margin-top: 20px;
border:none;
`


export default NavBar;
