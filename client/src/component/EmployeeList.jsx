import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const EmployeeList = () => {
    const pageName = "Employee List Page";
    const navigate = useNavigate();
    const [empData, setEmpData] = useState([]);
    const [copyEmpData, setCopyEmpData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const url = "http://localhost:3200/all-employee";

    // Fetching All Employees
    const fetchAllEmployee = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(url);
            const result = await response.json();
            // console.log('fetchAllEmployee result =', result.empList);
            if (result.empList.length > 0) {
                setEmpData(result.empList);
                setCopyEmpData(result.empList);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log('Not Able to Fetch All Employee', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllEmployee();
    }, []);

    // Filter By Employee Name
    const handleEmpSearch = (e) => {
        const searchValue = e.target.value;
        if (searchValue === '' || searchValue === null) {
            setEmpData(copyEmpData);
        } else {
            let tempArray = empData.filter((item) => item.empName.toLowerCase().includes(searchValue.toLowerCase()));
            setEmpData(tempArray);
        }
    }

    // Filter By Employee Age
    const uniqueAge = [...new Set(copyEmpData.map((item) => item.empAge))];
    const AllAges = uniqueAge.sort((a, b) => a - b);
    
    const handleSearchByAge = (e) => {
        const searchInput = e.target.value;
        console.log('searchInput =', searchInput);
        if(searchInput === '' || searchInput === null) {
            setEmpData(copyEmpData);
        } else {
            let tempArray = []
            tempArray = copyEmpData.filter((item) => item.empAge === searchInput);
            console.log('tempArray =', tempArray);
            setEmpData(tempArray);
        }
    }
    
    const handleCreateNewEmp = () => {
        navigate("/create-new-employee");
    }

    // Delete Employee Script
    const handleEmpDelete = async (id) => {
        if (window.confirm("Are you want to delete ?")) {
            const response = await fetch("http://localhost:3200/delete-employee/" + id, { method: 'DELETE' });
            const result = await response.json();
            console.log('handleEmpDelete =', result);
            if (result.success) {
                toast.success(result.message);
                fetchAllEmployee();
            }
        }
    }

    const handleEmpUpdate = (id) => {
        navigate(`/update-employee/${id}`);
    }

    return (
        <div id="employee-list">
            <section className="pageHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="pageHeading"> {pageName} </h5>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                {isLoading && (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                <div className="row mb-3">
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-sm" onClick={handleCreateNewEmp}>
                            Create New Employee &nbsp;
                            <i className="bi bi-person-plus"></i>
                        </button>
                    </div>

                    <div className="col-md-3">
                        
                    </div>

                    <div className="col-md-5" style={{display: 'flex', gap: '15px'}}>
                        <select className="form-select" name="emp-age-search" onChange={handleSearchByAge}>
                            <option value="">Select Age</option>
                            {AllAges.map((item) => {
                                return (
                                    <option value={item} key={item}>{item}</option>
                                )
                            })}
                        </select>
                        <input type="search" className="form-control" placeholder="Search By Employee Name" onChange={handleEmpSearch} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {empData && empData.length > 0 ? (
                            <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <td>SNO</td>
                                        <td>Employee Id</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Gender</td>
                                        <td>Age</td>
                                        <td>Deputed City</td>
                                        <td>Address</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {empData.map((item, index) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.empId}</td>
                                                <td>{item.empName}</td>
                                                <td>{item.empEmail}</td>
                                                <td>{item.empGender}</td>
                                                <td>{item.empAge}</td>
                                                <td>{item.empDeputedLocation}</td>
                                                <td>{item.empAddress}</td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleEmpDelete(item._id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                    <button className="btn btn-success btn-sm ms-2" onClick={() => handleEmpUpdate(item._id)}>
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div className="alert alert-danger"> No Records Found !! <i className="bi bi-person-lines-fill"></i> </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EmployeeList;