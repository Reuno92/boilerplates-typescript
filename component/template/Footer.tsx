import { FC } from 'react';
import { Row, Col, Container, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import NavigationRoutes from '../../model/constant/NavigationRoutes.constant';
import NavigationModel from '../../model/abstract/navigation/navigation.model';

const Footer: FC = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="bg-footer-gradient">
      <Container>
        <Row>
          <Col className="list-unstyled">
            <h4>Viseo</h4>
            <p>
              33, Quai Alphonse Le Gallo <br />
              92100 Boulogne Billancourt
            </p>
          </Col>
          <Col className="list-unstyled flex-column">
            <ul className="ps-0">
              <h4>Company</h4>
              {NavigationRoutes.filter((route: NavigationModel) => route?.onFooter).map((route: NavigationModel) => (
                <li className="navbar-nav">
                  <Link
                    href={route?.path}
                    key={route?.id}
                    as="li"
                    passHref>
                    <a
                      className="nav-link"
                      title={route?.title}>
                      {route?.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Footer;
