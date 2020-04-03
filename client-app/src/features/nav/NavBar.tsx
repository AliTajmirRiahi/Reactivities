import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

interface IProps {
  newActivity: () => void;
}

const NavBar: React.FC<IProps> = ({ newActivity }) => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item>
          <img src='/assets/logo.png' alt='' style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button onClick={newActivity} positive content='Create Activity' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
