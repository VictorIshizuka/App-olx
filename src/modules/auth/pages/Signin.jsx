import styled from "styled-components";
import {
  PageContainer,
  PageTitle,
  PageArea,
  ErrorMessage,
} from "../../../common/components/Template";
import { useState } from "react";
import useApi from "../../../common/helpers/OLX_api";
import { doLogin } from "../../../common/helpers/AuthHandler";

const FormStyled = styled.form`
  background-color: #fff;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0px 0px 3px #999;
  .area {
    display: flex;
    align-items: center;
    padding: 10px;
    max-width: 500px;
    .area--title {
      width: 200px;
      text-align: right;
      padding-right: 20px;
      font-size: 14px;
      font-weight: bold;
    }
    .area--input {
      flex: 1;
      input {
        width: 100%;
        font-size: 14px;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 3px;
        outline: 0;
        transition: all ease 0.4s;
        &:focus {
          border: 1px solid #333;
          color: #333;
        }
      }
    }
  }
  button {
    background-color: #0089ff;
    border: 0;
    outline: 0;
    padding: 5px 10px;
    border-radius: 4px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
  }
`;

export const Signin = () => {
  const api = useApi();
  const [email, setIsEmail] = useState("");
  const [password, setIsPassword] = useState("");
  const [rememberPassword, setIsRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setIsError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    setIsError("");
    const json = await api.login(email, password);
    setDisabled(false);

    if (json.error) {
      setIsError(json.error);
    } else {
      doLogin(json.token, rememberPassword);
      window.location.href = "/";
    }
    setDisabled(false);
  };

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormStyled onSubmit={handleSubmit}>
          <label className="area" htmlFor="">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                type="email"
                value={email}
                onChange={e => setIsEmail(e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </label>
          <label className="area" htmlFor="">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                type="password"
                value={password}
                onChange={e => setIsPassword(e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </label>
          <label className="area" htmlFor="">
            <div className="area--title">Lembrar senha</div>
            <div className="area--input">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={() => setIsRememberPassword(!rememberPassword)}
                disabled={disabled}
              />
            </div>
          </label>
          <label className="area" htmlFor="">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Fazer login</button>
            </div>
          </label>
        </FormStyled>
      </PageArea>
    </PageContainer>
  );
};
