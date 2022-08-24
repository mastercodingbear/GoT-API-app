import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CharacterTable.css';
import { Character } from '../state/types';
import CharacterTableBody from '../components/CharacterTableBody';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

const CharacterTable: React.FC = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const queryPage = parseInt(queryParams.get('page') ?? '1');
  const queryPageSize = parseInt(queryParams.get('pagesize') ?? '25');
  let navigate = useNavigate();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(queryPage);
  const [pageSize, setPageSize] = useState<number>(queryPageSize);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);

  const getCharacters = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${pageSize}`
      ).then(async (res) => {
        const lastQuery = res.headers
          .get('link')
          ?.split(', ')
          .pop()
          ?.split('>;')[0]
          .split('characters')[1];
        const queryParams = new URLSearchParams(lastQuery);
        setTotalPage(parseInt(queryParams.get('page') ?? '1'));
        return await res.json();
      });
      setLoading(false);
      navigate(`/characters?page=${page}&pageSize=${pageSize}`);
      setPage(page);
      setPageSize(pageSize);
      setCharacters(response);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(1);
  };

  return (
    <React.Fragment>
      <h1>Character Table</h1>
      <div className="table-container">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPage={totalPage}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
        />
        <table>
          <thead>
            <tr>
              <th scope="col" style={{ width: '40%' }}>
                Character
              </th>
              <th scope="col" style={{ width: '20%' }}>
                Alive
              </th>
              <th scope="col" style={{ width: '10%' }}>
                Gender
              </th>
              <th scope="col" style={{ width: '10%' }}>
                Culture
              </th>
              <th scope="col" style={{ width: '20%' }}>
                Allegiances
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {isLoading ? (
              <Loading />
            ) : (
              <CharacterTableBody characters={characters} />
            )}
          </tbody>
        </table>
      </div>{' '}
    </React.Fragment>
  );
};

export default CharacterTable;
