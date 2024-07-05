import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { maskCurrency } from "../../helpers/number";

const ItemStyled = styled.div`
  background-color: #f8f5f5;
  padding: 5px;
  .edit {
    background-color: #ffb700;
  }
  .delete {
    background-color: red;
  }
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
      font-size: 20px;
    }
    .itemPrice {
      font-weight: bold;
      font-size: 15px;
    }
  }
`;

export default function AdItem(data) {
  const location = useLocation();
  let price = "";
  if (data.data.priceNEgotiable) {
    price = "Preço negociável";
  } else {
    price = maskCurrency(data.data.price);
  }

  return (
    <ItemStyled className="aditem">
      {location.pathname === "/perfil" && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button className="edit" onClick={() => {}}>
            editar
          </button>
          <button className="delete" onClick={() => {}}>
            deletar
          </button>
        </div>
      )}
      <Link to={`/ad/${data.data.id}`}>
        <div className="itemImage">
          <img src={"/src/common/image/download (1).jpg"} alt="" />
        </div>
        <div className="itemName">{data.data.title}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </ItemStyled>
  );
}
