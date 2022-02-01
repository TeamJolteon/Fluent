import Header from '../../components/header.js';
import SpotlightComponent from '../../components/spotlight/spotlight.js';

export default function Articles(props) {
  return <SpotlightComponent />;
}

export async function getServerSideProps(context) {
  return {
    props: {
      product: 'coffee',
    },
  };
}

// setup on testing
