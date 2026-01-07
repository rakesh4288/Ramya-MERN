import { useEffect, useState } from 'react';
import TCSPune from '../assets/TCS-Pune.jpg';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Extract 'id' from the URL (e.g., /update-employee/123)
    const [isEmpEdit, setIsEmpEdit] = useState(false);
    const initialFormValues = {
        empId: '',
        empName: '',
        empGender: '',
        empAge: '',
        empEmail: '',
        empDeputedLocation: '',
        empAddress: ''
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formError, setFormError] = useState({});

    useEffect(() => {
        if (id) {
            setIsEmpEdit(true);
        }
    }, [id]);

    useEffect(() => {
        if (isEmpEdit) {
            const fetchOneEmployee = async () => {
                try {
                    const url = `http://localhost:3200/one-employee/${id}`;
                    const response = await fetch(url);
                    const result = await response.json();
                    if (result.success) {
                        // console.log('fetchOneEmployee result =', result.empList);

                        setFormValues({
                            empId: result.empList.empId,
                            empName: result.empList.empName,
                            empEmail: result.empList.empEmail,
                            empGender: result.empList.empGender,
                            empAge: result.empList.empAge,
                            empDeputedLocation: result.empList.empDeputedLocation,
                            empAddress: result.empList.empAddress
                        });
                    }
                }
                catch (error) {
                    console.log("Not Able to Fetch one record =", error);
                }
            }
            fetchOneEmployee();
        }
    }, [isEmpEdit]);

    const createNewEmployee = async () => {
        try {
            const url = "http://localhost:3200/create-new-employee";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            const result = await response.json();
            // console.log('createNewEmployee api response =', result);
            if (result.success) {
                // console.log("Great New Employee Created Successfully !");
                toast.success("Great New Employee Created Successfully !");
                setFormValues(initialFormValues);
                setFormError({});
                navigate("/employee-list");
            } else {
                // console.log("Oops !! Not able to create employee !", result.message);
                toast.error("Oops !! Not able to create employee !", result.message);
            }
        }
        catch (error) {
            toast.warn("Failed to submit form:", error);
        }
    }

    const updateEmployee = async () => {
        // console.log('inside updateEmployee function');
        // const url = "http://localhost:3200/update-employee";
        try {
            const response = await fetch('http://localhost:3200/update-employee', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...formValues })
            });
            const result = await response.json();
            console.log('updateEmployee =', result);
            if (result.success) {
                toast.success("Employee Updated Successfully!");
                setFormValues(initialFormValues);
                setFormError({});
                navigate("/employee-list");
            } else {
                toast.error("Oops !! Not able to update employee!", result.message);
            }
        }
        catch (error) {
            console.log("Oops !! Not able to update employee !", error);
            toast.error("Failed to update employee:", error);
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const formValidation = () => {
        let currentError = {};
        if (formValues.empId === '') {
            currentError.empId = "Employee ID is required !"
        }

        if (formValues.empName === '') {
            currentError.empName = "Please enter Employee name!"
        }

        if (formValues.empGender === '') {
            currentError.empGender = "Choose your gender"
        }

        if (formValues.empDeputedLocation === '') {
            currentError.empDeputedLocation = "Choose your deputed location"
        }

        if (formValues.empAddress === '') {
            currentError.empAddress = "please enter your full address"
        }

        setFormError(currentError);
        const errorKeys = Object.keys(currentError);
        if (errorKeys.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = formValidation();
        if (isFormValid) {
            if (isEmpEdit) {
                updateEmployee();
            } else {
                createNewEmployee();
            }
        } else {
            console.log("Not able to Submit form, Check all validation properly");
        }
    }

    // console.log('useParams =', id);
    // console.log('isEmpEdit =', isEmpEdit);
    // console.log('formValues =', formValues);

    console.log({ id, ...formValues });

    return (
        <div id="employee-dashboard">
            <section className="pageHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="pageHeading"> {isEmpEdit ? "Update Employee" : "Create New Employee"} </h5>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="row">
                    <div className="col-md-4">
                        <form className="alert alert-info" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="emp-id">Employee Id</label>
                                <input type="number" className="form-control" id='emp-id' name="empId" value={formValues.empId} onChange={handleInput} disabled={isEmpEdit} />
                                {formError && (<div className='text-danger'> {formError.empId} </div>)}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emp-name">Employee Name</label>
                                <input type="text" className="form-control" id='emp-name' name="empName" value={formValues.empName} onChange={handleInput} />
                                {formError && (<div className='text-danger'> {formError.empName} </div>)}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emp-email">Employee Email</label>
                                <input type="text" className="form-control" id='emp-email' name="empEmail" value={formValues.empEmail} onChange={handleInput} />
                                {formError && (<div className='text-danger'> {formError.empEmail} </div>)}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emp-gender">Employee Gender</label>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="gender-input-male" name="empGender" value="Male" checked={formValues.empGender === 'Male'} onChange={handleInput} />
                                    <label htmlFor="gender-input-male">Male</label>
                                </div>

                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="gender-input-female" name="empGender" value="Female" checked={formValues.empGender === 'Female'} onChange={handleInput} />
                                    <label htmlFor="gender-input-female">Female</label>
                                </div>
                                {formError && (<div className='text-danger' style={{display: 'block'}}> {formError.empGender} </div>)}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emp-age">Employee Age</label>
                                <input type="number" className="form-control" id='emp-age' name="empAge" value={formValues.empAge} onChange={handleInput} />
                                {formError && (<div className='text-danger'> {formError.empAge} </div>)}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emp-deputedLocation">Deputed Location</label>
                                <select className="form-select" name="empDeputedLocation" value={formValues.empDeputedLocation} onChange={handleInput}>
                                    <option value="">Select Office Location</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Jaipur">Jaipur</option>
                                    <option value="Indore">Indore</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                </select>
                                {formError && (<div className='text-danger'> {formError.empDeputedLocation} </div>)}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emp-address">Employee Full Address</label>
                                <textarea className="form-control" style={{ resize: 'none' }} id="emp-address" name="empAddress" value={formValues.empAddress} onChange={handleInput}></textarea>
                                {formError && (<div className='text-danger'> {formError.empAddress} </div>)}
                            </div>

                            <div className="mb-1">
                                <button type="submit" className="btn btn-success btn-sm">
                                    {isEmpEdit ? "Update Employee" : "Create New Employee"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-8">
                        <img src={TCSPune} alt={TCSPune} className="img-fluid img-thumbnail" />
                        <h6>Sahyadri Park 2 Campus, Pune, India</h6>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EmployeeCreate;