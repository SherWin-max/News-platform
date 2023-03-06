import styled from "styled-components";

const LiveStream = ({
    url,
    title
}) => {
    return (
        <>
            <Title>Woman Life Freedom TV</Title>
            <Box>
                <iframe
                    width="560"
                    height="315"
                    src={url}
                    title={title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </Box>
        </>
    )
};

const Box = styled.div`
margin-top:25%;
background-attachment: fixed;
`;

const Title = styled.h1`
text-align:center;
align-items:center;
`;

export default LiveStream;