import styled from "styled-components";
import { LiveStream } from "../components";

const LiveTV = () => {
    const streamUrl = "https://www.youtube.com/embed/h3MuIUNCCzI";
    const streamTitle = "France 24"
    return (
        <LiveStream url={streamUrl} title={streamTitle} />
    );
}

export default LiveTV;