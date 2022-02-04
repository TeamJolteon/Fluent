import React, { useState } from 'react';
import ModalNav from './modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 12px;
  letter-spacing: 2px;
`;

export default function AddArticleModal({ setShowAdd, show, handleClose }) {
  return (
    <div>
      <Modal open={show} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 750,
            bgcolor: '#F8F9F0',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <Title>Submit An Article</Title>
          </Typography>
          <ModalNav setShowAdd={setShowAdd} />
        </Box>
      </Modal>
    </div>
  );
}
