import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderArea = styled.header`
  height: 60px;
  border-bottom: 1px solid #ccc;
  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
  }

  a {
    text-decoration: none;
  }

  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 60px;

    .logo-1,
    .logo-2,
    .logo-3 {
      font-size: 27px;
      font-weight: bold;
    }

    .logo-1 {
      color: #ff0000;
    }
    .logo-2 {
      color: #00ff00;
    }
    .logo-3 {
      color: #0000ff;
    }
  }
  nav {
    padding-top: 10px;
    padding-bottom: 10px;
    ul,
    li {
      margin: 0;
      padding: 0;
      font-weight: 600;
    }
    ul {
      display: flex;
      align-items: center;
      height: 40px;
      list-style: none;
    }
    li {
      margin-left: 20px;
      margin-right: 20px;
      a {
        color: #000;
        font-size: 14px;
        text-decoration: none;
        &:hover {
          color: #999;
        }
        &.button-anuncio {
          background-color: #ff8100;
          border-radius: 4px;
          color: #fff;
          padding: 5px 10px;
        }
        &.button-anuncio:hover {
          background-color: #e57706;
        }
      }
    }
  }
`;

export const Header = () => {
  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo-1">O</span>
            <span className="logo-2">L</span>
            <span className="logo-3">X</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={"login"}>Login</Link>
            </li>
            <li>
              <Link to={"register"}>Cadastrar</Link>
            </li>
            <li>
              <Link to={"register"} className="button-anuncio">
                Postar anúncio
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </HeaderArea>
  );
};
