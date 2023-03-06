// import { useContext } from "react";
// import GlobalStyle from "./GlobalStyles";
// import Sidebar from "./components/Sidebar";
// import { CurrentUserContext } from "./components/CurrentUserContext";
// import Loading from "./components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components";


import Home from "./Home";
import Profile from "./Profile";
import LiveTV from "./LiveTV";

import { NavBar } from "../components";


const Pages = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <>
            <BrowserRouter>
                <Wrapper>
                    <NavBar />
                    {
                        isAuthenticated && (
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/live-stream" element={<LiveTV />} />
                            </Routes>
                        )
                    }
                </Wrapper>
            </BrowserRouter>
        </>
    )
};


const Wrapper = styled.div`
display: flex;
height:100vh;
max-width:960px;
margin-right:auto;
margin-left:auto;
`

export default Pages;


