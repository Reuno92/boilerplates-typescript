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
          <Col
            as="ul"
            className="list-unstyled">
            <li className="h4">Company</li>
            {NavigationRoutes.filter((route: NavigationModel) => route?.onFooter).map((route: NavigationModel) => (
              <Link
                href={route?.path}
                key={route?.id}
                passHref>
                <a
                  className="text-decoration-none"
                  title={route?.title}>
                  {route?.name}
                </a>
              </Link>
            ))}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Footer;
