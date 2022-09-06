import { FC } from 'react';
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';
import RickMortyModel from '../../model/abstract/rickmorty/RickMorty.model';

type RickMortyListType = {
  list: Array<RickMortyModel> | null;
};

const RickMortyList: FC<RickMortyListType> = (props: RickMortyListType) => {
  const { list } = props;

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

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
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
    </>
  );
};

export default RickMortyList;
