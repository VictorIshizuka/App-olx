import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../../../../common/helpers/OLX_api";
import { PageContainer } from "../../../../common/components/Template";
import AdItem from "../../../../common/components/AdItem";

const PageArea = styled.div`
  display: flex;
  margin-top: 20px;
  .leftSide {
    width: 25%;
    margin-right: 10px;
    .filterName {
      font-size: 15px;
      margin: 10px, 0;
    }
    input,
    select {
      width: 100%;
      height: 40px;
      border: 2px solid #9bb83c;
      border-radius: 5px;
      outline: 0;
      font-size: 15px;
      color: #000;
      padding: 10px;
    }
    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .categoryItem {
      display: flex;
      align-items: center;
      padding: 10px;
      border-radius: 5px;
      color: #000;
      cursor: pointer;
      img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
      }
    }
    .categoryItem:hover,
    .categoryItem.active {
      background-color: #9bb83c;
      color: #fff;
    }
  }
  .rightSide {
    flex: 1;
    margin: 0;
    padding: 0;
    h2 {
      margin-top: 0;
      font-size: 18px;
      padding-left: 10px;
    }
    .listWarning {
      padding: 30px;
      text-align: center;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      .aditem {
        width: 33%;
      }
    }
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      .pageItem {
        width: 30px;
        height: 30px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
          border: 1px solid #999;
        }
        &.active {
          background-color: #ccc;
        }
      }
    }
  }
`;

let timer;
export const Ads = () => {
  let arrayPagination = [];
  const api = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);
  const [resultOpacityl, setResultOpacity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adTotal, setAdTotal] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [q, setQ] = useState(query.get("q") !== null ? query.get("q") : "");
  const [cat, setCat] = useState(
    query.get("cat") !== null ? query.get("cat") : ""
  );
  const [state, setState] = useState(
    query.get("state") !== null ? query.get("state") : ""
  );

  const getFilter = async () => {
    setLoading(true);

    let offset = (currentPage - 1) * 2;
    const json = await api.getAds({
      sort: "desc",
      limit: 2,
      q,
      state,
      cat,
      offset,
    });

    setAdList(json.ads);
    setAdTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  };

  useEffect(() => {
    let query = [];
    if (q) {
      query.push(`q=${q}`);
    }
    if (state) {
      query.push(`state=${state}`);
    }
    if (cat) {
      query.push(`cat=${cat}`);
    }
    navigate(`/ads?${query.join("&")}`, { replace: true });
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(getFilter, 2000);
    setResultOpacity(0.3);
    setCurrentPage(1);
  }, [q, cat, state]);

  useEffect(() => {
    setResultOpacity(0.3);
    getFilter();
  }, [currentPage]);

  useEffect(() => {
    const getStates = async () => {
      const isStateList = await api.getStates();
      setStateList(isStateList);
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const isCategoriesList = await api.getCategories();
      setCategories(isCategoriesList);
    };

    getCategories();
  }, []);

  // useEffect(() => {
  //   const getList = async () => {
  //     const adList = await api.getAds();
  //     setAdList(adList.ads);
  //     setAdTotal(adList.total);
  //   };
  //   getList();
  // }, []);

  useEffect(() => {
    if (adList.length > 0) {
      setPageCount(Math.ceil(adTotal / adList.length));
    } else {
      setPageCount(0);
    }
  }, [adList.length, adTotal, pageCount]);
  console.log(pageCount);
  for (let count = 1; count <= pageCount; count++) {
    arrayPagination.push(count);
  }

  return (
    <>
      <PageContainer>
        <PageArea>
          <div className="leftSide">
            <form method="GET">
              <input
                type="text"
                name="q"
                placeholder="O que você procura?"
                value={q}
                onChange={e => setQ(e.target.value)}
              />
              <div className="filterName">Estado:</div>
              <select
                name="state"
                value={state}
                onChange={e => setState(e.target.value)}
              >
                <option></option>
                {stateList.map((item, index) => {
                  return (
                    <>
                      <option key={index}>{item.name}</option>
                    </>
                  );
                })}
              </select>
              <div className="filterName">Categoria:</div>
              <ul>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className={
                      cat === category.slug
                        ? "categoryItem active"
                        : "categoryItem"
                    }
                    onClick={() => setCat(category.slug)}
                  >
                    <img src={category.img} alt="" />
                    <span>{category.name}</span>
                  </li>
                ))}
              </ul>
            </form>
          </div>
          <div className="rightSide">
            <h2>Resultados para {`"${cat} ${q}${state}"`}</h2>
            {/* <div className="pagenation"> Paginas: {pageCount}</div> */}
            {loading && adList.length === 0 && (
              <div className="listWarning">carregando...</div>
            )}
            {!loading && adList.length === 0 && (
              <div className="listWarning">
                Nenhum reusltado encontrado para {`"${(cat, q, state)}"`}
              </div>
            )}

            <div className="list" style={{ opacity: resultOpacityl }}>
              {adList.map((ad, index) => {
                return <AdItem key={index} data={ad} />;
              })}
            </div>
            <div className="pagination">
              {arrayPagination.map(item => {
                return (
                  <>
                    <div
                      onClick={() => {
                        setCurrentPage(item);
                      }}
                      className={
                        item === currentPage ? "pageItem active" : "pageItem"
                      }
                    >
                      {item}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </PageArea>
      </PageContainer>
    </>
  );
};
