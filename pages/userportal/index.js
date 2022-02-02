import Header from '../../components/header.js';
import UserPortalComponent from '../../components/UserPortal/portal.js';

export default function UserPortal(props) {
  return (
    <div>
      <Header />
      <UserPortalComponent />
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      product: 'coffee',
    },
  };
}
