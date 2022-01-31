import Header from '../../components/header.js';

export default function Vocab(props) {
  return (
    <div>{props.product}</div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      product: 'coffee'
    }
  }
}