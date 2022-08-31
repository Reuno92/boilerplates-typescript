import { NextPage } from 'next';
import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';
import UserModel from '../../model/abstract/user/User.model';

type UserListType = {
  list: Array<UserModel>;
  style: {
    list: Array<string>;
    item: Array<string>;
    contact: Array<string>;
  };
};

// eslint-disable-next-line react/function-component-definition
const UserList: NextPage<UserListType> = (props: UserListType) => {
  const { list, style } = props;
  return (
    <ListGroup
      as="ul"
      className={`${style?.list.join(' ')}`}>
      {list.map((user: UserModel) => (
        <ListGroup.Item
          as="li"
          key={user.id}
          className={`${style?.item.join(' ')}`}>
          <Link
            href={`/user/${user?.id}`}
            passHref>
            <a className="h4 text-decoration-none">{user.username}</a>
          </Link>
          <p>
            <small>{user.name}</small>
          </p>
          <ListGroup className={`${style?.contact?.join(' ')}`}>
            <Link
              href={`mailto:${user.email}`}
              passHref>
              <ListGroup.Item
                as="a"
                className="hyphens">
                {user.email}
              </ListGroup.Item>
            </Link>
            <Link
              href={`tel:${user.phone}`}
              passHref>
              <ListGroup.Item as="a">{user.phone}</ListGroup.Item>
            </Link>
            <Link
              href={`https://${user.website}`}
              passHref>
              <ListGroup.Item
                as="a"
                target="_blank">
                {user.website}
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserList;
