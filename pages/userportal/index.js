import Header from '../../components/header.js';
import UserPortalComponent from '../../components/UserPortal/portal.js';

export default function UserPortal(props) {
  return <UserPortalComponent />;
}

export async function getServerSideProps(context) {
  return {
    props: {
      product: 'coffee',
    },
  };
}
