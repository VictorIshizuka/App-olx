import { Link } from "react-router-dom";
import styled from "styled-components";
import { maskCurrency } from "../../helpers/number";

const ItemStyled = styled.div`
  a {
    display: block;
    border: 1px solid #fff;
    background-color: #fff;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    transition: ease 0.2s;
    &:hover {
      background-color: #eee;
      border: 1px solid #ccc;
    }
    .itemImage img {
      width: 100%;
      border-radius: 5px;
    }
    .itemName {
      font-weight: bold;
    }
  }
`;

export default function AdItem(data) {
  let price = "";
  if (data.data.priceNEgotiable) {
    price = "Preço negociável";
  } else {
    price = maskCurrency(data.data.price);
  }

  return (
    <ItemStyled className="aditem">
      <Link to={`/ad/${data.data.id}`}>
        <div className="itemImage">
          <img src={data.data.image} alt="" />
        </div>
        <div className="itemName">{data.data.title}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </ItemStyled>
  );
}
