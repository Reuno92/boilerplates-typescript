import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { RickMortyResponseModel } from '../../model/abstract/rickmorty/RickMortyResponse.model';
import RickMortyModel from '../../model/abstract/rickmorty/RickMorty.model';
import RickMortyPaginationModel from '../../model/abstract/rickmorty/RickMortyPagination.model';
import CallApi from '../../tool/CallApi';

type returnPagination<T> = {
  list: Array<T> | null;
  listError: string | null;
  paginationTemplate: () => JSX.Element;
};

/**
 * @function Create pagination and return List into Array.
 * @param { string } link - Link of APi with backslash at end.
 * @param { number } page - Page number
 * @return returnPagination
 */
function usePagination(link: string, page: number): returnPagination<RickMortyModel> {
  const HEADER: { [key: string]: string } = { 'Content-Type': 'application/json; charset=utf8' };

  const [list, setList] = useState<Array<RickMortyModel> | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<RickMortyPaginationModel | null>(null);
  const [activePage, setActivePage] = useState<number>(1);

  useEffect(() => {
    const fetchRMData = (): void => {
      setListError(null);
      new CallApi(link)
        .get<{ data: { characters: RickMortyResponseModel<RickMortyModel> } }>(page.toString(10), HEADER)
        .then((response: { data: { characters: RickMortyResponseModel<RickMortyModel> } } | void) => {
          if (response) {
            const CHARACTERS = response?.data?.characters;
            setPagination(CHARACTERS?.info);
            setActivePage(CHARACTERS?.info?.next && CHARACTERS?.info?.prev ? CHARACTERS.info.next - 1 : CHARACTERS.info.prev! + 1);
            setList(CHARACTERS?.results);
          }
        })
        .catch((err: Error) => setListError(err?.message));
    };

    fetchRMData();
  }, []);

  const changeList = (index: number | null | undefined): void => {
    if (index !== undefined && index !== null) {
      fetch(link + index, {
        method: 'GET',
        headers: HEADER,
      })
        .then((response: Response) => response.json())
        .then((data: { data: { characters: RickMortyResponseModel<RickMortyModel> } }) => {
          const CHARACTERS = data?.data?.characters;
          setPagination(CHARACTERS?.info);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          setActivePage(CHARACTERS?.info?.next ? CHARACTERS.info.next - 1 : CHARACTERS.info.prev! + 1);
          setList(CHARACTERS?.results);
        })
        .catch((err: Error) => setListError(err?.message));
    }
  };

  const paginationTemplate = (): JSX.Element => (
    <section>
      <Pagination>
        <Pagination.First
          onClick={() => changeList(1)}
          disabled={activePage === 1}>
          First
        </Pagination.First>
        <Pagination.Prev
          onClick={() => changeList(pagination?.prev)}
          disabled={activePage === 1}>
          Previous
        </Pagination.Prev>
        {activePage < 4 &&
          ((
            <>
              <Pagination.Item
                onClick={() => changeList(1)}
                active={pagination?.next === 2}>
                {1}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => changeList(2)}
                active={pagination?.next === 3}>
                {2}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => changeList(3)}
                active={pagination?.next === 4}>
                {3}
              </Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item onClick={() => changeList(pagination?.pages)}>{pagination?.pages}</Pagination.Item>
            </>
          ) as JSX.Element)}
        {pagination && activePage >= pagination!.pages - 2 && activePage <= pagination!.pages && (
          <>
            <Pagination.Item onClick={() => changeList(1)}>{1}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item
              onClick={() => changeList(pagination!.pages - 2)}
              active={activePage === pagination!.pages - 2}>
              {pagination!.pages - 2}
            </Pagination.Item>
            <Pagination.Item
              onClick={() => changeList(pagination!.pages - 1)}
              active={activePage === pagination!.pages - 1}>
              {pagination!.pages - 1}
            </Pagination.Item>
            <Pagination.Item
              onClick={() => changeList(pagination?.pages)}
              active={!pagination?.next}>
              {pagination?.pages}
            </Pagination.Item>
          </>
        )}
        {pagination && activePage >= 4 && activePage <= pagination!.pages - 3 && (
          <>
            <Pagination.Item onClick={() => changeList(1)}>{1}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={() => changeList(pagination?.prev)}>{pagination?.prev}</Pagination.Item>
            <Pagination.Item active={pagination?.next === activePage + 1}>{activePage}</Pagination.Item>
            <Pagination.Item onClick={() => changeList(pagination?.next)}>{pagination?.next}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={() => changeList(pagination?.pages)}>{pagination?.pages}</Pagination.Item>
          </>
        )}
        <Pagination.Next
          onClick={() => changeList(pagination?.next)}
          disabled={activePage === pagination?.pages}>
          Next
        </Pagination.Next>
        <Pagination.Last
          onClick={() => changeList(pagination?.pages)}
          disabled={activePage === pagination?.pages}>
          Last
        </Pagination.Last>
      </Pagination>
    </section>
  );

  return { list, listError, paginationTemplate };
}

export default usePagination;
