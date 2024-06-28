import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h1>Página nao encontrada</h1>
      <Link to={"/"}>voltar para a HOME</Link>
    </div>
  );
};
