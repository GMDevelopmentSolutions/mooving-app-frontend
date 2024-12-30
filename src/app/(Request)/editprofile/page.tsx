"use client";

import Container from "@/app/components/Container/Container";

import FormEditProfile from "@/app/components/FormEditProfile/FormEditProfile";
import Header from "@/app/components/Header/Header";
import ProfileContainer from "@/app/components/ProfileContainer/ProfileContainer";

const EditProfile = () => {
  return (
    <>
      <Header>Edit profile</Header>
      <Container>
        <ProfileContainer
          title="Personal information"
          text="This is a novel with the theme of adventure. The main character is a historian who, in his research."
        />
        <FormEditProfile />
      </Container>
    </>
  );
};

export default EditProfile;
