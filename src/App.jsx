import { useState, useEffect } from 'react'
import hitlistService from './services/hitlist'

const App = () => {
  const [companies, setCompanies] = useState([])
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('');

  const [searchTerm, setSearchTerm] = useState("")
  

  // Fetch companies when the page loads
  useEffect(() => {
    hitlistService.getAll().then(initialCompanies => setCompanies(initialCompanies))
  }, [])

  // Handle adding a company
  const addCompany = (event) => {
    event.preventDefault();
  
    // Validation: Ensure name, priority, and location are not empty
    if (!newName.trim()) {
      alert("Please enter a valid company name.");
      return;
    }
    
  
    if (!newLocation.trim()) {
      alert("Please enter a valid location.");
      return;
    }
  
    const newCompany = { name: newName,  location: newLocation };
  
    hitlistService.create(newCompany)
      .then(returnedCompany => {
        setCompanies(companies.concat(returnedCompany));
        setNewName('');
        setNewLocation('');
      })
      .catch(error => {
        alert("Error adding company. Please try again.");
        console.error("Error:", error);
      });
  };
  

  // Handle delete
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      hitlistService.remove(id)
        .then(() => {
          setCompanies(companies.filter(company => company.id !== id))
        })
        .catch(error => {
          alert("Failed to delete company!")
          console.error("Delete error:", error)
        })
    }
  }

  // Filter companies
// Filter companies safely
const filteredCompanies = companies.length > 0 
  ? companies.filter(company => 
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.priority?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];



  return (
    <div>
      <h2>Hitlist</h2>
      
      <input 
  type="text" 
  placeholder="Enter a Name or Location" 
  value={searchTerm} 
  onChange={(e) => {
    setSearchTerm(e.target.value);
    console.log("Current search term:", e.target.value); // Debugging
  }} 
/>

      <form onSubmit={addCompany}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Location: <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
        </div>

        <button type="submit">Add</button>
      </form>

      <h3>Companies</h3>
      <ul>
        {filteredCompanies.map(company => (
          <li key={company.id}>
            {company.name}- Location: {company.location}
            <button onClick={() => handleDelete(company.id, company.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
