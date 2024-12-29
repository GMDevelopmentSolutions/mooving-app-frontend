import Container from '@/app/components/Container/Container';
import EditContainer from '@/app/components/EditContainer/EditContainer';
import Header from '@/app/components/Header/Header';

const EditProfile = () => {
  return (
    <>
      <Header>Edit Profile</Header>
      <Container>
        <EditContainer />
      </Container>
    </>
  );
};

export default EditProfile;
