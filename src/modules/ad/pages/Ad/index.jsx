import styled from "styled-components";
import { PageContainer } from "../../../../common/components/Template";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../../common/helpers/OLX_api";
import { formatDate } from "../../../../common/helpers/date";
import { Slide } from "react-slideshow-image";
import AdItem from "../../../../common/components/AdItem";
import "react-slideshow-image/dist/styles.css";
import { maskCurrency } from "../../../../common/helpers/number";

export const Fake = styled.div`
  background-color: #ddd;
  height: ${props => props.height || 20}px;
`;

const PageArea = styled.div`
  display: flex;
  margin-top: 20px;
  .box {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 4px #999;
    margin-bottom: 20px;
  }

  .leftSide {
    flex: 1;
    margin-right: 20px;

    .box {
      display: flex;
    }
    .adImage {
      width: 320px;
      height: 320px;
      margin-right: 20px;
      .each-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
        height: 320px;
      }
    }
    .adInfo {
      flex: 1;
      .adName {
        margin: 20px;
        h2 {
          margin: 0;
          margin-top: 20px;
        }
        small {
          color: #999;
        }
      }
      .adDescription {
        margin: 20px;
        small {
          color: #999;
        }
      }
    }
  }
  .rightSide {
    width: 250px;
    .price {
      color: #0000ff;
      display: block;
      font-size: 24px;
      font-weight: bold;
    }
    .contactSellerLink {
      background-color: #0000ff;
      color: #fff;
      height: 30px;
      border-radius: 5px;
      box-shadow: 0px 0px 4px #999;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      margin-bottom: 20px;
    }
    .createdBy small {
      display: block;
      color: #999;
      margin-top: 10px;
    }
    .box--padding {
      padding: 10px;
    }
  }
`;

const OthersArea = styled.div`
  h2 {
    font-size: 20px;
  }
  .list {
    display: flex;
    .aditem {
      width: 25%;
    }
  }
`;

const BreadChumb = styled.div`
  font-size: 13px;
  margin-top: 20px;
  a {
    display: inline-block;
    margin: 0px 5px;
    text-decoration: underline;
    color: #000;
  }
`;

export const Ad = () => {
  const { id } = useParams();
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});

  useEffect(() => {
    const getAdInfo = async id => {
      const json = await api.getAd(id, true);
      setAdInfo(json);
      setLoading(false);
    };
    getAdInfo(id);
  }, [id]);

  return (
    <PageContainer>
      {adInfo.category && (
        <BreadChumb>
          Você está aqui:
          <Link to="/">Home</Link>/
          <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>/
          <Link
            to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
          >
            {adInfo.category.name}
          </Link>
          / {adInfo.title}
        </BreadChumb>
      )}
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo.images && (
                <Slide>
                  {adInfo.images.map((image, index) => {
                    console.log(image);
                    return (
                      <div key={index} className="each-slide">
                        <img src={image} alt="" />
                      </div>
                    );
                  })}
                </Slide>
              )}
            </div>
            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={20} />}
                {adInfo && <h2>{adInfo.title}</h2>}
                {loading && <Fake height={20} />}
                {adInfo && (
                  <small>{`Criado ${formatDate(adInfo.dateCreated)}`}</small>
                )}
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo && (
                  <p>
                    {adInfo.description}
                    <hr />
                    {adInfo.views && (
                      <small>{`Vizualizações: ${adInfo.views} views`}</small>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
            {adInfo.priceNegotiable && "Preço negociável"}
            {!adInfo.priceNegotiable && adInfo.price && (
              <>
                Preço:
                <div className="price">{` ${maskCurrency(adInfo.price)}`}</div>
              </>
            )}
          </div>
          {loading && <Fake height={50} />}
          {adInfo.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                target="_blank"
                className="contactSellerLink"
              >
                Fale com o vendedor
              </a>
              <div className="createdBy box box--padding">
                {console.log(adInfo)}
                <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail:{adInfo.userInfo.email}</small>
                <small>Estado:{adInfo.stateName}</small>
              </div>
            </>
          )}
        </div>
      </PageArea>
      <OthersArea>
        {adInfo.others && (
          <>
            <h2>Outras ofertas do vendedor</h2>
            <div className="list">
              {adInfo.others.map((item, index) => {
                return <AdItem key={index} data={item} />;
              })}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  );
};
