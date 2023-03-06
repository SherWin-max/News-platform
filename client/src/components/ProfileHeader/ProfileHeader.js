import styled from "styled-components";

const ProfileHeader = ({
  picture,
  givenName,
  familyName,
  username,
  address,
  children,
}) => {
  return (
    <>
      <Wrapper>
        <Banner src="/assets/img/arton1030.jpg" />
        <Container>
          <Avatar src={picture} />
          <Name>{givenName + " " + familyName}</Name>
          <Handle>@{username}</Handle>
          <Handle>{address}</Handle>
          {children}
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;
const Container = styled.div`
  margin-left: 30px;
`;
const Banner = styled.img`
  height: 300px;
`;
const Avatar = styled.img`
  border-radius: 50%;
  width: 160px;
  border: 8px solid white;
  margin-top: -100px;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: 900;
`;
const Handle = styled.div`
  color: grey;
`;

export default ProfileHeader;
