import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { FiMessageCircle, FiTrash2, FiHeart, FiShare } from "react-icons/fi";
import { useState, useEffect } from "react";

const News = ({
  id,
  picture,
  givenName,
  familyName,
  username,
  title,
  description,
  likes,
  content,
  isShort,
  isRemovable,
  isDeleted,
  setIsDeleted,
}) => {
  const { user } = useAuth0();

  let isLikedByUser = false;

  if (likes?.includes(user.sub)) {
    isLikedByUser = true;
  } else {
    isLikedByUser = false;
  }

  const [isToggled, setIsToggled] = useState(isLikedByUser);

  const handleLikes = async (id, action) => {
    try {
      const res = await fetch(
        `/api/update-likes?news_id=${id}&user_id=${user.sub}&action=${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log("Likes Updated", data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    handleLikes(id, !isToggled ? "add" : "remove");
    setIsToggled(!isToggled);
  };

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/delete-news?news_id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("News Deleted", data);
      setIsDeleted(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Container id={id} onClick={() => {}}>
        <Info>
          <Avatar src={picture} />
          <div onClick={() => {}}>
            <Name id={id}>
              {`${givenName} ${familyName}` || "WomanLifeFreedom"}
            </Name>
          </div>
          <Handle>@{username}</Handle>
        </Info>

        <Title>{title}</Title>

        <Body>{isShort ? description : content}</Body>
      </Container>
      <Icons>
        <div>
          <FiMessageCircle />{" "}
        </div>
        {/* <div><FiRepeat /></div> */}
        <div>
          <Like
            id="likeBtn"
            onClick={handleClick}
            style={{ color: isToggled ? "red" : "black" }}
          >
            <FiHeart />
          </Like>
        </div>
        {isRemovable && (
          <div>
            <Remove id="likeBtn" onClick={handleRemove}>
              <FiTrash2 />
            </Remove>
          </div>
        )}

        {/* <div><FiShare /></div> */}
      </Icons>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 20px;
`;
const Handle = styled.div`
  font-size: 12px;
  color: grey;
  font-weight: 350;
`;
const Name = styled.div`
  font-weight: 900;
  cursor: pointer;
`;
const Status = styled.div`
  margin-left: 50px;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 2px;
`;

const Img = styled.img`
  display: flex;
  align-items: center;
  width: 550px;
  height: 400px;
  border-radius: 20px;
  margin-top: 15px;
  margin-left: 50px;
`;
const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 10px 15px;
`;

const Like = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 150px;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const Remove = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 150px;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const Title = styled.h1``;

const Body = styled.p``;

export default News;
