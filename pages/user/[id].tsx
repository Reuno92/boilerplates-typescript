import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Alert, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import UserModel from '../../model/abstract/user/User.model';

const UserSingle: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserModel>();
  const [status, setStatus] = useState<'loading' | 'error' | 'loaded' | 'notFound' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setStatus('loading');
      const fetchData = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf8',
          },
        })
          .then((response: Response) => {
            if (response?.status === 200) {
              return response.json();
            }
            setStatus('notFound');
            setError(response?.status === 404 ? 'Not Found' : 'Unknown Error');
            return null;
          })
          .then((data: UserModel) => {
            if (data?.name) {
              setUser(data);
              setStatus('loaded');
            }
          })
          .catch((err: Error) => {
            setError(err?.message);
            setStatus('error');
          });
      };

      fetchData();
    }
  }, [router.isReady]);

  const isHead = (): JSX.Element => (
    <Head>
      <title>User {status === 'loaded' ? user?.username : 'not found'}</title>
      <meta
        name="description"
        content={status === 'loaded' ? `Description page of ${user?.username}` : 'User not found'}
      />
      <link
        rel="icon"
        href="/avatar.ico"
      />
    </Head>
  );

  const isError = (): JSX.Element => (
    <Alert
      variant="danger"
      dismissible={false}>
      {error}
    </Alert>
  );

  const isNotFound = (): JSX.Element => (
    <Container className="text-center mt-30vh">
      <section className="d-block">
        <Image
          src="/img/logo-viseo--mobile.svg"
          width="500"
          height="100"
        />
        <h1>Ressource Issue</h1>
        <p>For reason: {error}</p>
      </section>
    </Container>
  );

  const isLoading = (): JSX.Element => (
    <Alert
      variant="info"
      dismissible={false}>
      <Spinner
        animation="border"
        role="status"
      />
      Loading, please wait a moment the time we load the data.
    </Alert>
  );

  const isLoaded = (): JSX.Element => (
    <>
      <h1>
        <b>{user?.name}</b>
        <small> is {user?.username}</small>
      </h1>
      <hr />
      <Row>
        <Col>
          <h2>Address</h2>
          <ListGroup className="list-unstyled">
            <ListGroup.Item>{user?.address?.street}</ListGroup.Item>
            <ListGroup.Item>{user?.address?.suite}</ListGroup.Item>
            <ListGroup.Item>{user?.address?.zipcode}</ListGroup.Item>
            <ListGroup.Item>{user?.address?.city}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <h2>Contact</h2>
          <ListGroup
            horizontal
            className="list-unstyled">
            <Link
              href={`mailto:${user?.email}`}
              passHref>
              <ListGroup.Item
                as="a"
                className="border-0">
                {user?.email}
              </ListGroup.Item>
            </Link>
            <Link
              href={`https://${user?.website}`}
              passHref>
              <ListGroup.Item
                as="a"
                className="border-0"
                target="_blank">
                {user?.website}
              </ListGroup.Item>
            </Link>
            <Link
              href={`tel:${user?.phone}`}
              passHref>
              <ListGroup.Item
                as="a"
                className="border-0">
                {user?.phone}
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      {isHead()}
      <Container>
        {status && status === 'notFound' && isNotFound()}
        {status && status === 'error' && isError()}
        {status && status === 'loading' && isLoading()}
        {status && status === 'loaded' && isLoaded()}
      </Container>
    </>
  );
};

export default UserSingle;
