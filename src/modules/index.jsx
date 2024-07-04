import { PageContainer } from "../common/components/Template";
import { useEffect, useState } from "react";
import useApi from "../common/helpers/OLX_api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AdItem from "../common/components/AdItem";

const SearchAreaStyled = styled.div`
  background-color: #ddd;
  border-bottom: 1px #ccc;
  padding: 20px 0;

  .searchBox {
    background-color: #9bb83c;
    padding: 20px 15px;
    border-radius: 5px;
    box-shadow: 1px 1px 0.3px, rgba(0, 0, 0, 0, 2);
    display: flex;
    form {
      flex: 1;
      display: flex;
    }
    input,
    select {
      height: 40px;
      border: 0;
      border-radius: 5px;
      outline: 0;
      font-size: 15px;
      color: #000;
      margin-right: 20px;
    }
    input {
      flex: 1;
      padding: 0 10px;
    }
    select {
      width: 100px;
    }
    button {
      background-color: #49aeef;
      font-size: 15px;
      border: 0;
      border-radius: 5px;
      color: #fff;
      height: 40px;
      padding: 0 20px;
      cursor: pointer;
    }
  }

  .categoryList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .categoryItem {
      width: 25%;
      display: flex;
      align-items: center;
      color: #000;
      text-decoration: none;
      height: 50px;
      margin-bottom: 10px;
      &:hover {
        color: #999;
      }
      img {
        width: 45px;
        height: 45px;
        margin-right: 10px;
      }
    }
  }
`;

const PageArea = styled.div`
  h2 {
    font-size: 20px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .aditem {
      width: 25%;
    }
  }
  .seeAllLink {
    color: #000;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin-top: 10px;
  }
`;

export const Home = () => {
  const api = useApi();
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adsList, setAdList] = useState([]);

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

  useEffect(() => {
    const getAds = async () => {
      const isAdsList = await api.getAds({ sort: "desc", limit: 8 });
      setAdList(isAdsList.ads);
    };
    getAds();
  }, []);

  return (
    <>
      <SearchAreaStyled>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                <option></option>
                {stateList.map((item, index) => (
                  <>
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  </>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((item, index) => {
              return (
                <>
                  <Link
                    key={index}
                    to={`/ads?cat=${item.slug}`}
                    className="categoryItem"
                  >
                    <img src={item.img} alt="" />
                    <span>{item.name}</span>
                  </Link>
                </>
              );
            })}
          </div>
        </PageContainer>
      </SearchAreaStyled>
      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {adsList.map(item => (
              <AdItem key={item.id} data={item} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">
            Ver todos
          </Link>
          <hr />
          texto qualquer basicao
        </PageArea>
      </PageContainer>
    </>
  );
};
