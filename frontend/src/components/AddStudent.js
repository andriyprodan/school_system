import React, { useState, useEffect } from 'react';
import regeneratorRuntime from "regenerator-runtime";
import { useNavigate } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

import axiosInstance from "../axiosApi"
import SchoolClassesSelect from "./SchoolClassesSelect";

export default function AddStudent({classId, is_inline, renderMessageCallback}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [schoolClassId, setSchoolClassId] = useState(classId);


    let history = useNavigate();

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }
    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handleSchoolClassIdChange(e) {
        setSchoolClassId(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            user: {
                first_name: firstName,
                last_name: lastName,
                email: email
            },
            school_class: schoolClassId
        }
        try {
            let resp = await axiosInstance.post('/users/students/', data);
            renderMessageCallback({type: {info: true}, messageHeader: "Успіх!", message: "Студента успішно додано"});
            // setMessage({type: {info: true}, messageHeader: "Успіх!", message: "Студента успішно додано"});
            history.push(`/users/students/${resp.user.id}`)
        } catch (err) {
            renderMessageCallback({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data})
            // setMessage({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
        }
    }

    return (
        <div style={{maxWidth: '400px', margin: "0 auto"}}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="text" className="form-control" name="email" value={email} onChange={handleEmailChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Ім'я</label>
                <input type="text" className="form-control" name="firstName" value={firstName} onChange={handleFirstNameChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Прізвище</label>
                <input type="text" className="form-control" name="lastName" value={lastName} onChange={handleLastNameChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Клас учня</label>
                <SchoolClassesSelect renderMessageCallback={renderMessageCallback} changeCallback={handleSchoolClassIdChange}/>
            </div>

            <div className="form-group d-flex justify-content-center">
                <button className="btn btn-success mt-3" onClick={handleSubmit}>Додати студента</button>
            </div>
        </div>
    )
}