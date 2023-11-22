import { Table } from "react-bootstrap";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRules, ruleDeletee, ruleDisable, ruleEnable } from "../Slices/ShowRulesSlice";
import '../App.css';
import { Link } from "react-router-dom";
function ShowRules() {
  const { showRules, isLoading,error} =  useSelector((state)=>state.showRules);
const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(fetchRules());
    },[])
    
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  function ruleDelete(id){
    console.log(id);
    dispatch(ruleDeletee(id));
  }

const handleRuleToggle = (id, isEnabled) => {
  console.log(isEnabled +"jai shree ram")
    if (isEnabled) {
      console.log("inside if.....");
      dispatch(ruleDisable(id)); 
    } else {
      console.log("inside else.....");
      dispatch(ruleEnable(id));
    }
  };

  const getRowStyle = (isEnabled) => {
    return isEnabled ? '' : 'disabledRow';
  };
  

return(
<>
<div>
    <Navbar/>
   </div>
   {showRules && showRules.length > 0 ? (
        <Table striped bordered hover variant="hover" className="custom-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Entity</th>
              <th>Scope</th>
              <th>Trigger</th>
              <th>Filed</th>
              <th>Condition</th>
              <th>Action</th>
              <th>Description</th>
              <th>Recipient</th>
              <th>Channel</th>
              <th>Sevearity</th>
              <th>Disable</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {showRules.map((item) => (
              <tr key={item.id} id={getRowStyle(item.isEnabled)}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.entity}</td>
                <td>{item.scope}</td>
                <td>{item.trigger}</td>
                <td>{item.field}</td>
                <td>{item.condition}</td>
                <td>{item.action}</td>
                <td>{item.description}</td>
                <td>{item.recepient}</td>
                <td>{item.channel}</td>
                <td>{item.severity}</td>
                <td>
                  <button
                    // className="add-article-link tableButton"
                    className={`tableButton ${item.isEnabled ? '' : 'enabled'}`}
                    onClick={() => handleRuleToggle(item.id, item.isEnabled)}
                  >{item.isEnabled ? "Disable" : "Enable"}
                  </button>
                </td>
                <td>
                  <button
                    // className="add-article-link tableButton1"
                    className="tableButton1"
                    onClick={() => ruleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : ( <p>No rules found.</p>)}
</>
)}
export default ShowRules;
