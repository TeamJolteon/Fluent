import React, { useState } from 'react';
import ModalNav from './modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AddArticleModal({ show, handleClose }) {
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 500,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit An Article
          </Typography>
          <ModalNav/>
        </Box>
      </Modal>
    </div>
  );
}