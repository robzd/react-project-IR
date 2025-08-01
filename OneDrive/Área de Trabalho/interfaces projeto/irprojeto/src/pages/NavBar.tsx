import Logout from "./Logout";

export const NavBar: React.FC = () => {
  return (
    <nav>
      <a href="/">Listagem</a> | <a href="/novo">Novo</a>
      <div style={{ float: "right" }}>
        <Logout />
      </div>
    </nav>
  );
};
