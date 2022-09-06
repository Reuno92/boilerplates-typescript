import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import usePagination from './usePagination';
import RickMortyList from '../RickMorty/RickMortyList';

/* interface PaginationUserInterface<T> {
  children: ReactElement<{ list: Array<T> }> | Array<ReactElement<{ list: Array<T> }>>;
} */

const PaginationUI: FC = (): JSX.Element => {
  const { list, listError, paginationTemplate } = usePagination('http://localhost:3000/api/rickandmorty/', 1);
  const panelPagination = paginationTemplate();
  const displayList: JSX.Element = <RickMortyList list={list} />;

  const displayError: JSX.Element = (
    <section>
      {listError && (
        <Alert
          variant="danger"
          dismissible={false}>
          {listError}
        </Alert>
      )}
    </section>
  );

  return (
    <>
      {panelPagination}
      {displayList}
      {displayError}
    </>
  );
};

export default PaginationUI;
