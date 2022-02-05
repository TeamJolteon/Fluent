/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import navStyles from '../../styles/ArticleStyles/collectionNav.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function SelectorNav(props) {
  const [value, setValue] = React.useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (e, newValue) => {
    setValue(newValue);
    // console.log('before', value);
    // console.log('after', newValue);
    // const mode = newValue ? true : false;
    // props.setFeed(mode)
  };

  useEffect(() => {
    if (value === 0) {
      props.setDisplay('personal');
    }
    if (value === 1) {
      props.setDisplay('community');
    }
  }, [value]);
  // const handleTabClick = (e) => {
  //   if (e.target.value === "personal") {
  //     props.setFeed(props.personalArticles);
  //   }
  //   if (e.target.value === "community") {
  //     props.setFeed(props.communityArticles)
  //   }
  // }

  return (
    // <div>
    //   <div onClick={() => { props.setDisplay('personal') }}>Personal</div>
    //   <div onClick={() => { props.setDisplay('community') }}>Community</div>
    // </div>
    <div className={navStyles.navbar}>
      <Box sx={{ width: '25%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: { background: '#413A3E' },
            }}
            textColor='#413A3E'
            aria-label='basic tabs example'
          >
            <Tab label='My Articles' {...a11yProps(0)} />
            <Tab label='Community Articles' {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
    </div>
  );
}
