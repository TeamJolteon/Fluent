import React, { useState } from 'react';
import navStyles from '../../styles/ArticleStyles/collectionNav.module.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextForm from './textForm.js';
import UrlForm from './urlForm.js';

export default function ModalNav(props) {
  const [value, setValue] = useState('text');

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={navStyles.navbar}>
        <Box sx={{ width: '29%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              TabIndicatorProps={{
                style: { background: '#413A3E' },
              }}
              textColor='#413A3E'
            >
              <Tab value='text' label='Text' {...a11yProps(0)} />
              <Tab value='url' label='Url' {...a11yProps(1)} />
            </Tabs>
          </Box>
        </Box>
      </div>
      {value === 'text' ? (
        <TextForm setShowAdd={props.setShowAdd} userID={props.userID}/>
      ) : (
        <UrlForm setShowAdd={props.setShowAdd} userID={props.userID}/>
      )}
    </div>
  );
}
