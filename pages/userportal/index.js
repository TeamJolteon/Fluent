import Header from '../../components/header.js';
import UserPortalComponent from '../../components/UserPortal/portal.js';
import { getSession } from 'next-auth/client';
import { useAppContext } from '../state.js'
import { useState, useEffect } from 'react';

export default function UserPortal(props) {

  const userID = useAppContext().data[0].id;
  console.log('user ', userID);

  const initialLanguage = useAppContext().data[0].default_language;
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    if (language === null) {
      setLanguage(initialLanguage);
    }
  })

  return (
    <div>
      <Header loggedin={true} language={language} setLanguage={setLanguage} />
      <UserPortalComponent language={language} />
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
