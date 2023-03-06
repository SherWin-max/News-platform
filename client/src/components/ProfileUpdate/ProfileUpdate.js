import { useState } from "react";
import styled from "styled-components";

import { Input } from "../../components";

const ProfileUpdate = ({ handleSubmit, defaultValue }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
      <Input
        type="text"
        placeholder="Username"
        name={"username"}
        required={false}
        handleChange={handleChange}
        defaultValue={defaultValue?.username}
      />
      <Input
        type="text"
        placeholder="Given Name"
        name={"given_name"}
        required={false}
        handleChange={handleChange}
        defaultValue={defaultValue?.given_name}
      />
      <Input
        type="text"
        placeholder="Family Name"
        name={"family_name"}
        required={false}
        handleChange={handleChange}
        defaultValue={defaultValue?.family_name}
      />
      <Input
        type="text"
        placeholder="Address"
        name={"address"}
        required={false}
        handleChange={handleChange}
        defaultValue={defaultValue?.address}
      />
      <Submit type="submit">Update</Submit>
    </StyledForm>
  );
};

const Submit = styled.button`
  background-color: #d1560e;
  border: none;
  margin-top: 5px;
  border-radius: 2px;

  &:disabled {
    color: blue;
  }
`;

const StyledForm = styled.form`
  margin-top: 24px;
  border: 5px solid blue;
  padding: 30px;
  margin: auto 0px auto;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

export default ProfileUpdate;
