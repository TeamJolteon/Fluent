import { providers, signIn, getSession, csrfToken } from 'next-auth/client';

function signin({ providers }) {
  return (
    <div>
      <button onClick={() => signIn(providers.id)}>
        Sign in with {providers.name}
      </button>
    </div>
  );
}

export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }

  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context),
    },
  };
}
