import { FC, useEffect, useState } from 'react';
import { Alert, Badge, Card, Col, ListGroup, Pagination, Row } from 'react-bootstrap';
import RickMortyModel from '../../model/abstract/rickmorty/RickMorty.model';
import RickMortyPagination from '../../model/abstract/rickmorty/RickMortyPagination';
import { RickMortyResponseModel } from '../../model/abstract/rickmorty/RickMortyResponse.model';

const RickMortyList: FC = () => {
  const HEADER: { [key: string]: string } = { 'Content-Type': 'application/json; charset=utf8' };

  const [list, setList] = useState<Array<RickMortyModel> | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<RickMortyPagination | null>(null);
  const [activePage, setActivePage] = useState<number>(1);

  const setStatus = (status: string): JSX.Element => {
    switch (status) {
      case 'Alive':
        return (
          <Badge
            bg="success"
            pill>
            {status}
          </Badge>
        );
      case 'Dead':
        return (
          <Badge
            bg="dark"
            pill>
            {status}
          </Badge>
        );
      default:
        return (
          <Badge
            bg="warning"
            pill>
            Unknown
          </Badge>
        );
    }
  };

  const changeList = (id: number): void => {
    fetch(`http://localhost:3000/api/rickandmorty/${id}`, {
      method: 'GET',
      headers: HEADER,
    })
      .then((response: Response) => response.json())
      .then((data: { data: { characters: RickMortyResponseModel<RickMortyModel> } }) => {
        const CHARACTERS = data?.data?.characters;
        setPagination(CHARACTERS?.info);
        setActivePage(CHARACTERS?.info?.next ? CHARACTERS.info.next - 1 : CHARACTERS.info.prev + 1);
        setList(CHARACTERS?.results);
      })
      .catch((err: Error) => setListError(err?.message));
  };

  useEffect(() => {
    const fetchRMData = (): void => {
      setListError(null);
      fetch('http://localhost:3000/api/rickandmorty/1', {
        method: 'GET',
        headers: HEADER,
      })
        .then((response: Response) => response.json())
        .then((data: { data: { characters: RickMortyResponseModel<RickMortyModel> } }) => {
          const CHARACTERS = data?.data?.characters;
          setPagination(CHARACTERS?.info);
          setActivePage(CHARACTERS?.info?.next ? CHARACTERS.info.next - 1 : CHARACTERS.info.prev + 1);
          setList(CHARACTERS?.results);
        })
        .catch((err: Error) => setListError(err?.message));
    };

    fetchRMData();
  }, []);

  return (
    <>
      {pagination && (
        <Pagination>
          <Pagination.First
            onClick={() => changeList(1)}
            disabled={activePage === 1}>
            First
          </Pagination.First>
          <Pagination.Prev
            onClick={() => changeList(pagination.prev)}
            disabled={activePage === 1}>
            Previous
          </Pagination.Prev>
          {activePage < 4 && (
            <>
              <Pagination.Item
                onClick={() => changeList(1)}
                active={pagination.next === 2}>
                {1}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => changeList(2)}
                active={pagination.next === 3}>
                {2}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => changeList(3)}
                active={pagination.next === 4}>
                {3}
              </Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item onClick={() => changeList(pagination.pages)}>{pagination.pages}</Pagination.Item>
            </>
          )}
          {activePage >= pagination.pages - 2 && activePage <= pagination.pages && (
            <>
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item
                onClick={() => changeList(pagination.pages - 2)}
                active={activePage === pagination.pages - 2}>
                {pagination.pages - 2}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => changeList(pagination.pages - 1)}
                active={activePage === pagination.pages - 1}>
                {pagination.pages - 1}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => changeList(pagination.pages)}
                active={!pagination.next}>
                {pagination.pages}
              </Pagination.Item>
            </>
          )}
          {activePage >= 4 && activePage <= pagination.pages - 3 && (
            <>
              <Pagination.Item onClick={() => changeList(1)}>{1}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item onClick={() => changeList(pagination.prev)}>{pagination.prev}</Pagination.Item>
              <Pagination.Item active={pagination.next === pagination.prev + 2}>{pagination.next - 1}</Pagination.Item>
              <Pagination.Item onClick={() => changeList(pagination.next)}>{pagination.next}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item onClick={() => changeList(pagination.pages)}>{pagination.pages}</Pagination.Item>
            </>
          )}
          <Pagination.Next
            onClick={() => changeList(pagination.next)}
            disabled={activePage === pagination.pages}>
            Next
          </Pagination.Next>
          <Pagination.Last
            onClick={() => changeList(pagination.pages)}
            disabled={activePage === pagination.pages}>
            Last
          </Pagination.Last>
        </Pagination>
      )}
      {list && (
        <Row>
          {list?.map((person: RickMortyModel, index: number) => (
            <Col
              xs={12}
              md={6}
              lg={4}
              xl={3}
              key={index}>
              <Card
                key={index}
                className="p-0">
                <Card.Img
                  variant="top"
                  src={person?.image}
                />
                <Card.Header className="text-center">
                  <Card.Title>{person?.name}</Card.Title>
                </Card.Header>
                <Card.Body className="d-flex text-center flex-column">
                  <span className="m-2">{setStatus(person?.status)}</span>
                  <p>
                    <span>{person?.origin?.name.replace(/\(.*?\)|([^\W_]+[^\s-]*)/gm, '$1').trimEnd()}</span>
                    {person?.origin?.dimension && <small> - {person?.origin?.dimension}</small>}
                  </p>
                </Card.Body>

                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item>{person?.gender}</ListGroup.Item>
                    <ListGroup.Item>{person?.species}</ListGroup.Item>
                    <ListGroup.Item>{person?.status}</ListGroup.Item>
                    {person?.type && <ListGroup.Item>{person?.type}</ListGroup.Item>}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {listError && <Alert variant="danger">None is found!</Alert>}
    </>
  );
};

export default RickMortyList;
