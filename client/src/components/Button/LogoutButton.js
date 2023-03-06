import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <Button onClick={() => logout()}>
                Sign Out
            </Button>
        )
    )

}
const Button = styled.button`
background-color:green;
color:white;
padding: 5px 15px;
border-radius:5px;
outline:0;
cursor: pointer;
box-shadow: 0px 2px 2px lightgrey;
margin-top:50px;
font-family:sans-serif;


`;

export default LogoutButton;