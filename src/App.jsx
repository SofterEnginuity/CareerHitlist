import { useState, useEffect } from "react";
import hitlistService from "./services/hitlist";
import axios from "axios";

const Hitlist = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ message: null, type: "" });


  useEffect(() => {
    axios.get("http://localhost:3001/companies").then((response) => {
      setCompanies(response.data);
    });
  }, []);
  const showNotification = (message, type) => {
    setNotification({ message, type }); // Store message & type
    setTimeout(() => {
      setNotification({ message: null, type: "" }); // Reset after 3 sec
    }, 3000);
  };
  

  const addCompany = (event) => {
    event.preventDefault();

    const existingCompany = companies.find(
      (company) => company.name === newCompany
    );

    if (existingCompany) {
      const confirmUpdate = window.confirm(
        `${newCompany} is already on the list. Update location?`
      );

      if (confirmUpdate) {
        const updatedCompany = { ...existingCompany, location: newLocation };

        hitlistService.update(existingCompany.id, updatedCompany).then(() => {
          setCompanies(
            companies.map((c) => (c.id !== existingCompany.id ? c : updatedCompany))
          );
          setNewCompany("");
          setNewLocation("");
          showNotification(`Updated ${updatedCompany.name}`);
        });
      }
    } else {
      const newEntry = { name: newCompany, location: newLocation };

      hitlistService.create(newEntry).then((returnedCompany) => {
        setCompanies(companies.concat(returnedCompany));
        setNewCompany("");
        setNewLocation("");
        showNotification(`Added ${returnedCompany.name}`);
      });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove ${name} from the list?`)) {
      hitlistService.remove(id)
      .then(() => {
        setCompanies(companies.filter((company) => company.id !== id));
        showNotification(`Deleted ${name}`, "success");
      })
      .catch((error) => {
        showNotification(`Error: ${name} was already removed from the server`, "error");
        setCompanies(companies.filter((company) => company.id !== id)); // Update UI
      });
    
    }
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Hitlist</h2>
      {notification.message && (
  <div
    style={{
      backgroundColor: notification.type === "error" ? "lightcoral" : "lightblue",
      padding: "10px",
      border: notification.type === "error" ? "1px solid red" : "1px solid blue",
      color: notification.type === "error" ? "darkred" : "darkblue",
      marginBottom: "10px",
    }}
  >
    {notification.message}
  </div>
)}

      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={addCompany}>
        <div>
          Company: <input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
        </div>
        <div>
          Location: <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>

      <h3>Companies</h3>
      <ul>
        {filteredCompanies.map((company) => (
          <li key={company.id}>
            {company.name} - {company.location}
            <button onClick={() => handleDelete(company.id, company.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  notification: {
    backgroundColor: "lightblue",
    padding: "10px",
    border: "1px solid blue",
    color: "darkblue",
    marginBottom: "10px",
  },
};

export default Hitlist;
