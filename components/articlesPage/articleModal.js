import React, { useState } from 'react';
import ModalNav from './modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ArticleModal({ show, handleClose }) {
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
      >
        <div>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 650,
            height: 750,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography>
              Article Title
            </Typography>
            <Typography>
              Article Body
            </Typography>
          </Box>
        </div>
      </Modal>
    </div>
  );
}