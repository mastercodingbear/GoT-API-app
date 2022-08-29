import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CharacterTable.css';
import { Character } from '../state/types';
import CharacterTableBody from '../components/CharacterTableBody';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import FilterGender from '../components/FilterFields/FilterGender';
import FilterCulture from '../components/FilterFields/FilterCulture';
import useDebounce from '../hook/useDebounce';

const CharacterTable: React.FC = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const queryPage = parseInt(queryParams.get('page') ?? '1');
  const queryPageSize = parseInt(queryParams.get('pageSize') ?? '25');
  const queryGender = queryParams.get('gender') ?? 'Any';
  const queryCulture = queryParams.get('culture') ?? '';
  let navigate = useNavigate();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(queryPage);
  const [pageSize, setPageSize] = useState<number>(queryPageSize);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [filterGender, setFilterGender] = useState<string>(queryGender);
  const [filterCulture, setFilterCulture] = useState<string>(queryCulture);

  const debouncedCultureTerm: string = useDebounce<string>(filterCulture, 300);

  useEffect(() => {
    getCharacters(filterCulture, filterGender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  // Effect for API call
  useEffect(() => {
    setLoading(true);
    getCharacters(debouncedCultureTerm, filterGender);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCultureTerm]);

  const getCharacters = async (culture: string = '', gender: string = '') => {
    try {
      setLoading(true);
      let requestParams = `page=${page}&pageSize=${pageSize}`;
      if (culture !== '') {
        requestParams += `&culture=${culture}`;
      }
      if (gender !== '') {
        requestParams += `&gender=${gender}`;
      }
      const response = await fetch(
        `https://anapioficeandfire.com/api/characters?${requestParams}`
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
      navigate(`/characters?${requestParams}`);
      setPage(page);
      setPageSize(pageSize);
      setCharacters(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(1);
  };

  const handleChangeCulture = (culture: string) => {
    setFilterCulture(culture);
    setPage(1);
  };

  const handleChangeGender = (gender: string) => {
    setFilterGender(gender);
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
        <div className="filter-container">
          <FilterGender
            gender={filterGender}
            onFilterChanged={handleChangeGender}
          />
          <FilterCulture
            culture={filterCulture}
            onFilterChanged={handleChangeCulture}
          />
        </div>
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
