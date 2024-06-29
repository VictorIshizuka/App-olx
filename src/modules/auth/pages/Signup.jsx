import styled from "styled-components";
import {
  PageContainer,
  PageTitle,
  PageArea,
  ErrorMessage,
} from "../../../common/components/Template";
import { useEffect, useState } from "react";
import useApi from "../../../common/helpers/OLX_api";

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
      input,
      select {
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

export const Signup = () => {
  const api = useApi();
  const [email, setIsEmail] = useState("");
  const [state, setIsState] = useState("");
  const [name, setIsName] = useState("");
  const [password, setIsPassword] = useState("");
  const [confirmPassword, setIsConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setIsError] = useState("");
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const isListState = await api.getStates();
      setStateList(isListState);
    };
    getStates();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    setIsError("");

    if (confirmPassword !== password) {
      setIsError("Senhas precisam ser iguais!");
      setDisabled(false);
      return;
    }

    const json = await api.signup(name, email, state, password);

    if (json.error) {
      setIsError(json.error);
    } else {
      window.location.href = "/signin";
    }
    setDisabled(false);
  };

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormStyled onSubmit={handleSubmit}>
          <label className="area" htmlFor="">
            <div className="area--title">Nome</div>
            <div className="area--input">
              <input
                type="text"
                value={name}
                onChange={e => setIsName(e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </label>
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
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select
                type="select"
                value={state}
                onChange={e => setIsState(e.target.value)}
                disabled={disabled}
                required
              >
                <option></option>
                {stateList.map((item, index) => {
                  return (
                    <>
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                      ;
                    </>
                  );
                })}
              </select>
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
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setIsConfirmPassword(e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </label>
          <label className="area" htmlFor="">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Cadastrar</button>
            </div>
          </label>
        </FormStyled>
      </PageArea>
    </PageContainer>
  );
};
