import { Link } from "react-router-dom";
import styled from "styled-components";

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
    const priceBR = data.data.price.toString();
    price = `R$ ${priceBR.replace(".", ",")}`;
  }
  console.log(data.data.image);
  return (
    <ItemStyled className="aditem">
      <Link to={`/ad/${data.data.id}`}>
        <div className="itemImage">
          <img src="/src/common/image/historia-da-fotografia-og.png" alt="" />
        </div>
        <div className="itemName">{data.data.title}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </ItemStyled>
  );
}
