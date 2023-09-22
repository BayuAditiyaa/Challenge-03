import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className="header">
        <h2>TodoList</h2>
        <Link to="/new">
          <button className="add-new">Add new Task</button>
        </Link>
      </div>
    </>
  );
}

export default Header;
