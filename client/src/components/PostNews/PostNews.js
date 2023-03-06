import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { useState } from "react";

const PostNews = ({ isPosted, setIsPosted }) => {
  const { user } = useAuth0();
  const [newsDescription, setNewsDescription] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [length, setLength] = useState(0);

  const addNewsUrl = "/api/add-news";

  const textChange = (e) => {
    setLength(e.target.value.length);
    setNewsDescription(e.target.value);
  };

  const titleChange = (e) => {
    setNewsTitle(e.target.value);
  };

  const submitNews = (e) => {
    e.preventDefault();

    fetch(`${addNewsUrl}?user_id=${user.sub}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newsTitle,
        description: newsDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setIsPosted(!isPosted);
          setNewsDescription("");
          setLength(150);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={submitNews}>
        <Avatar src={user.picture} />
        <Input onChange={titleChange} placeholder="News Title" type="text" />
        <Input
          onChange={textChange}
          placeholder="News Description"
          type="text-area"
        />
        <Counter
          style={{
            color: length <= 150 ? "green" : "red",
          }}
        >
          {length + "/150"}
        </Counter>
        <Button disabled={length > 150} onClick={submitNews} type="submit">
          Submit
        </Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 8px solid grey;
  padding-right: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.textarea`
  padding: 20px;
  display: flex;
  flex: 1;
  margin-left: 20px;
  font-size: 20px;
  border: none;
  width: 90%;
  resize: none;
  font-family: sans-serif;
`;
const Button = styled.button`
  background-color: blue;
  color: white;
  width: 80px;
  height: 40px;
  border-radius: 15px;
  font-size: 16px;
  margin-top: 20px;
  border: none;
  margin-left: auto;
  &:disabled {
    filter: grayscale(100%);
  }
`;
const Counter = styled.div`
  margin-left: auto;
  font-size: 14px;
  text-align: right;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 20px;
`;

export default PostNews;
