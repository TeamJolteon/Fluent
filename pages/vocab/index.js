import Header from '../../components/header.js';
import axios from 'axios';
import VocabList from '../../components/VocabList/VLmain.js';
import { getSession } from 'next-auth/client';

export default function Vocab() {
  return (
    <div>
      <Header loggedin={true} />
      <VocabList />
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
