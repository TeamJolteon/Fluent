import Header from '../../components/header.js';
import UserPortalComponent from '../../components/UserPortal/portal.js';
import { getSession } from 'next-auth/client';
import {useAppContext} from '../state.js'

export default function UserPortal(props) {

  const userID = useAppContext().data[0].id;
  console.log('user', userID);

  return (
    <div>
      <Header loggedin={true} />
      <UserPortalComponent />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      product: 'coffee',
    },
  };
}
