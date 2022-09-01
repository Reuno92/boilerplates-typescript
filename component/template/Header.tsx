import { FC } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Link from 'next/link';
import NavigationModel from 'model/abstract/navigation/navigation.model';
import NavigationRoutes from '../../model/constant/NavigationRoutes.constant';

const Header: FC = (): JSX.Element => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="bg-header-gradient">
      <Container>
        <Link
          href="/"
          passHref>
          <Navbar.Brand as="a">Brand</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {NavigationRoutes?.map((route: NavigationModel) => (
              <Link
                href={route?.path}
                key={route?.id}
                passHref>
                <Nav.Link title={route?.title}>{route?.name}</Nav.Link>
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
