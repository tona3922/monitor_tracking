import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = () => {
  return (
    <div className="list flex-initial">
      <Sidebar />
      <div className="listContainer">
        <Navbar title="Dashboard" />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
