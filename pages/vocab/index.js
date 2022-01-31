import Header from '../../components/header.js';
import VocabList from '../../components/VocabList/VLmain.js';

export default function Vocab(props) {
  return (
    <div>
      <VocabList />
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
