import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { doLogout, isLogged } from "../../helpers/AuthHandler";

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
      color: #ff8800;
    }
    .logo-2 {
      color: #70c30b;
    }
    .logo-3 {
      color: #10b1d5;
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
  const { pathname } = useLocation();
  let logged = isLogged();

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo-1">E</span>
            <span className="logo-2">C</span>
            <span className="logo-3">O</span>
          </Link>
        </div>
        <nav>
          <ul>
            {logged && (
              <>
                <li>
                  <Link to={"/perfil"}>Minha conta</Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      doLogout();
                      window.location.href = "/";
                    }}
                  >
                    Sair
                  </Link>
                </li>
                {pathname !== "/post-an-ad" && (
                  <li>
                    <Link to={"/post-an-ad"} className="button-anuncio">
                      Postar anúncio
                    </Link>
                  </li>
                )}
              </>
            )}
            {!logged && (
              <>
                <li>
                  <Link to={"/signin"}>Login</Link>
                </li>
                <li>
                  <Link to={"/signup"}>Cadastrar</Link>
                </li>
                <li>
                  <Link to={"/signin"} className="button-anuncio">
                    Postar anúncio
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </HeaderArea>
  );
};
