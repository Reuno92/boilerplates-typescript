import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import UserList from '../component/user/user-list';
import UserModel from '../model/abstract/user/User.model';
import Logo from '../public/img/logo-viseo--mobile.svg';
import PaginationUI from '../component/ui/Pagination.ui';

const Home: NextPage = () => {
  const [users, setUsers] = useState<Array<UserModel>>([]);
  const [usersError, setUserError] = useState<string | null>(null);

  const HEADER: { [key: string]: string } = { 'Content-Type': 'application/json; charset=utf8' };

  useEffect(() => {
    const fetchUsersData = () => {
      fetch('https://jsonplaceholder.typicode.com/users/', {
        method: 'GET',
        headers: HEADER,
      })
        .then((response: Response) => response.json())
        .then((data: Array<UserModel>) => setUsers(data))
        .catch((err: Error) => setUserError(err?.message));
    };

    fetchUsersData();
  }, []);

  return (
    <>
      <Head>
        <title>Viseo Welcome</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link
          rel="icon"
          href="https://www.viseo.com/themes/viseo/image-2/favicon_2.gif"
        />
      </Head>

      <main className="container">
        <Row>
          <Col
            xs={12}
            lg={9}>
            <h1 className="text-center">Welcome Page From</h1>
            <section className="image-container">
              <Image
                src={Logo}
                alt="Viseo logo positive digital makers"
                layout="responsive"
                className="p-3"
              />
            </section>
            <section>
              <h2>Your new collaborators</h2>
              <PaginationUI />
            </section>
          </Col>
          <Col
            xs={12}
            lg={3}>
            <aside id="users">
              {usersError && <Alert variant="danger">{usersError}</Alert>}
              {users && (
                <UserList
                  list={users}
                  style={{
                    list: new Array<string>(),
                    item: new Array<string>(),
                    contact: new Array<string>(),
                  }}
                />
              )}
            </aside>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default Home;
