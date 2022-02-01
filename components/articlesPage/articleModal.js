import React, { useState } from 'react';
import ModalNav from './modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import articleStyles from '../../styles/ArticleStyles/articleModal.module.css';

export default function ArticleModal({ show, handleClose }) {
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
      >
        <div class={articleStyles.flex}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 850,
            height: 750,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'scroll'
          }}>
            <main className={articleStyles.main}>
              <h2>ペンギンは最高です</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid esse beatae porro temporibus architecto quasi corrupti asperiores dignissimos, deserunt, aliquam saepe aspernatur id consectetur reiciendis, laudantium quis aperiam eum. Cum molestias accusantium soluta nobis? Possimus consectetur eveniet quam nemo libero ad inventore esse ea eum eligendi facere, laboriosam nam nobis, commodi fugiat nostrum! Minus cupiditate facere dolorem dolore id animi illum. Commodi, quas ex? Obcaecati dolor officiis consequatur ipsum voluptatem, dignissimos magni. Beatae voluptatem cumque blanditiis accusantium quo saepe? Porro delectus earum quos et voluptatem ut sit. Saepe illum cumque officia. Eligendi ipsam obcaecati, iure illum rerum expedita id harum suscipit fugit adipisci odit dolore inventore reprehenderit temporibus iste explicabo. Officia similique earum est quae eos, beatae sint corporis placeat reiciendis quisquam tempore reprehenderit odit minus omnis consectetur, illum asperiores sequi. Expedita ea voluptatum nostrum asperiores ipsam! Labore sint neque nisi iste eaque ullam et aliquam ea a repellat quas, ut ab. Doloribus, unde! Magni, inventore neque. Voluptates temporibus officiis dicta aspernatur laboriosam labore rerum expedita aut esse ipsa sit a harum fugit repellendus placeat et odio ipsam perspiciatis, at sed, animi commodi maxime? Quaerat laudantium voluptatum quam, doloribus accusantium sed sint aperiam molestiae! Accusantium soluta culpa dolorem quo vitae.
              </p>
            </main>
            <aside className={articleStyles.aside}>
              <h2>Selected Word</h2>
              <div className={articleStyles.selected}><i class="fas fa-volume-up"></i> エンジニア <span>Enjinia</span></div>
              <div class="word">en·gi·neer <span>/ˌenjəˈnir/</span></div>
              <div class="definition"><span>noun</span> a person who designs, builds, or maintains engines, machines, or public works.</div>
              <ul className={articleStyles.vocabList}>
                <h2>Recent List</h2>
                <li>雪 | Snow</li>
                <li>ペンギン | Penguin</li>
                <li>ごめん | Sorry</li>
                <li>音楽 | Music</li>
                <li>こんにちは | Hello</li>
              </ul>
            </aside>
          </Box>
        </div>
      </Modal>
    </div>
  );
}