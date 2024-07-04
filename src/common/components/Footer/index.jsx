import styled from "styled-components";

const FooterArea = styled.footer`
  height: 100px;
  background-color: #999;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Footer = () => {
  return (
    <FooterArea>
      Todos os direitos reservados
      <br />
      Victor
    </FooterArea>
  );
};
