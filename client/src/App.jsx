import {Routes, Route} from 'react-router-dom';
import './App.css';
import SiteHeader from './component/SiteHeader';
import SiteFooter from './component/SiteFooter';
import HomePage from './component/HomePage';
import EmployeeList from './component/EmployeeList';
import EmployeeCreate from './component/EmployeeCreate';
import PageNotFound from './component/PageNotFound';

function App() {
  return (
    <>
      <SiteHeader/>
      <main className='mainBody'>
        <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/employee-list" exact element={<EmployeeList />} />
            <Route path="/create-new-employee" exact element={<EmployeeCreate />} />
            <Route path="/update-employee/:id" exact element={<EmployeeCreate />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </main>
      <SiteFooter />
    </>
  )
}

export default App
