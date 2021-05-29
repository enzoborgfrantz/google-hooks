import styled from "styled-components";

const Photo = styled.img`
  width: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Profile = ({
  email,
  firstName,
  lastName,
  name,
  profilePhotoUrl,
}) => (
  <Wrapper>
    <Photo src={profilePhotoUrl} />
    <div>Email: {email}</div>
    <div>Name: {name}</div>
    <div>First Name: {firstName}</div>
    <div>Last Name: {lastName}</div>
  </Wrapper>
);
