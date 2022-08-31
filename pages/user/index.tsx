import { NextPage } from 'next';
import { useLayoutEffect, useState } from 'react';
import { Alert, ListGroup, Spinner } from 'react-bootstrap';
import UserModel from '../../model/abstract/user/User.model';

// eslint-disable-next-line react/function-component-definition
const User: NextPage<{ id: number }> = (props: { id: number }) => {
  const { id } = props;
  const [user, setUser] = useState<UserModel>();
  const [status, setStatus] = useState<'loading' | 'error' | 'loaded' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const fetchData = () => {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf8',
        },
      })
        .then((response: Response) => response.json())
        .then((data: UserModel) => setUser(data))
        .catch((err: Error) => {
          setError(err?.message);
          setStatus('error');
        });
    };

    fetchData();
  }, [id]);

  const isError = () => (
    <Alert
      variant="danger"
      dismissible={false}>
      {error}
    </Alert>
  );

  const isLoading = () => (
    <Alert
      variant="info"
      dismissible={false}>
      <Spinner
        animation="border"
        role="status">
        Loading, please wait a moment the time we load the data.
      </Spinner>
    </Alert>
  );

  const isLoaded = () => (
    <>
      <h1>
        {user?.name}
        <small>{user?.username}</small>
      </h1>
      <hr />
      <ListGroup className="list-unstyled">
        <ListGroup.Item>{user?.address.street}</ListGroup.Item>
        <ListGroup.Item>{user?.address.suite}</ListGroup.Item>
        <ListGroup.Item>{user?.address.zipcode}</ListGroup.Item>
        <ListGroup.Item>{user?.address.city}</ListGroup.Item>
      </ListGroup>
      <hr />
      <ListGroup
        horizontal
        className="list-unstyled">
        <ListGroup.Item>{user?.email}</ListGroup.Item>
        <ListGroup.Item>{user?.website}</ListGroup.Item>
        <ListGroup.Item>{user?.phone}</ListGroup.Item>
      </ListGroup>
    </>
  );

  return (
    <>
      {status && status === 'error' && isError()}
      {status && status === 'loading' && isLoading()}
      {status && status === 'loaded' && isLoaded()}
    </>
  );
};

export default User;
