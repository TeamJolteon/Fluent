import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/client';

export default function Profile(props) {

  const logoutHandler = () => {
    signOut();
  }

  return (
    <div>
      <div>Profile Page {props.product}</div>
      <div onClick={logoutHandler} >Logout</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({req: context.req});

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product: 'coffee'
    }
  }
}