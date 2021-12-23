import React, { useState, useEffect } from 'react';
import regeneratorRuntime from "regenerator-runtime";
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../axiosApi"

export default function AddStudent({renderMessageCallback, addClassCallback}) {
    const [grade, setGrade] = useState('');
    const [letter, setLetter] = useState('');

    function handleGradeChange(e) {
        setGrade(e.target.value);
    }
    function handleLetterChange(e) {
        setLetter(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            letter: letter,
            grade: grade
        }
        try {
            let resp = await axiosInstance.post('/classes/', data);
            renderMessageCallback({type: {info: true}, messageHeader: "Успіх!", message: "Клас успішно створено"});
            addClassCallback(resp.data);
        } catch (err) {
            renderMessageCallback({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data})
            // setMessage({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
        }
    }

    let letters = ["А", "Б", "В", "Г", "Д", "Е"]
    return (
        <div style={{maxWidth: '400px', margin: "0 auto"}}>
            <div className="form-group mt-3">
                <label>Цифра і буква</label>
                <input type="number" max={11} min={1} className="form-control my-2" name="number" value={grade} onChange={handleGradeChange}/>
                <select className="form-control" name="letter" onChange={handleLetterChange}>
                    <option disabled={true} selected>Оберіть букву</option>
                    {
                        letters.map(letter => (
                            <option value={letter}>{letter}</option>
                        ))
                    }
                </select>
            </div>

            <div className="form-group d-flex justify-content-center">
                <button className="btn btn-success mt-3" onClick={handleSubmit}>Додати клас</button>
            </div>
        </div>
    )
}