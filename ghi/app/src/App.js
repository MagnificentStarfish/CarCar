import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import SalesList from './SalesList';
import NewSalesPerson from './SalesPersonForm';
import NewTechnician from './NewTechnician';
import NewServiceAppointment from './NewServiceAppointment';


function App() {
  const[sales, setSales] = useState([]);
  const[salesPeople, setSalesPeople] = useState([]);
  const[technicians, setTechnicians] = useState([]);
  const[serviceappointment, setServiceappointment] = useState([]);

  const getSales = async () => {
    const salesResponse = await fetch('http://localhost:8090/api/salesrecords/');

    if (salesResponse.ok) {
      const data = await salesResponse.json();
      const sales = data.sales;
      setSales(sales);
    }
  }

  const getSalesPeople = async () => {
    const salesPeopleResponse = await fetch('http://localhost:8090/api/salespeople/');

    if (salesPeopleResponse.ok) {
      const data = await salesPeopleResponse.json();
      const salesPeople = data.salespeople;
      setSalesPeople(salesPeople);
    }
  }

  const getTechnicians = async () => {
    const techniciansResponse = await fetch('http://localhost:8080/api/technicians/')

    if (techniciansResponse.ok) {
      const data = await techniciansResponse.json();
      const technicians = data.technicians;
      setTechnicians(technicians);
    }
  }

  const getServiceappointment = async () => {
    const serviceappointmentResponse = await fetch('http://localhost:8080/api/serviceappointment/')

    if (serviceappointmentResponse.ok) {
      const data = await serviceappointmentResponse.json();
      const serviceappointment = data.serviceappointment;
      setServiceappointment(serviceappointment);
    }
  }
useEffect( () => {getSales(); getSalesPeople(); getTechnicians(); getServiceappointment()},  []);
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sales" >
            <Route path="" element={<SalesList sales={sales} getSales={getSales} />} />
          </Route>
          <Route path="/salespeople" >
            <Route path="" element={<NewSalesPerson salespeople={salesPeople} getSalesPeople={getSalesPeople} /> } />
          </Route>
          <Route path="/technicians" >
            <Route path="" element={<NewTechnician technicians={technicians} getTechnicians={getTechnicians} /> } />
          </Route>
          <Route path="/serviceappointment" >
            <Route path="" element={<NewServiceAppointment serviceappointment={serviceappointment} getServiceappointment={getServiceappointment} /> } />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
