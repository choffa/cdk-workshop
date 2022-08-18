import { AppBar, Toolbar } from '@mui/material';
import * as React from 'react';

const Header: React.FC<{}> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        CDK Tasks
      </Toolbar>
    </AppBar>
  );
};

export default Header;
