import Header from '../../components/header.js';

export default function Articles(props) {
  return (
    <div>Articles</div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      product: 'coffee'
    }
  }
}

// setup on testing