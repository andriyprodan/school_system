import React, {useState, useEffect, useRef} from 'react';
import axiosInstance from "../axiosApi";
import AddStudent from "./AddClass";
import {Link} from "react-router-dom";

// Таблиця класів
export default function SchoolClassesTable({renderMessageCallback}) {
    const [schoolClasses, setSchoolClasses] = useState([])
    const addedClassIdRef = useRef(null)

    useEffect(() => {
        async function get_classes() {
            try {
                let resp = await axiosInstance.get('/classes/');
                resp.data.forEach(item => {
                    setSchoolClasses((prevState) => [
                        ...prevState,
                        {
                            id: item.id,
                            grade: item.grade,
                            letter: item.letter,
                            students_num: item.students_num
                        }
                    ])
                })
            } catch (err) {
                renderMessageCallback({
                    type: {error: true},
                    messageHeader: "Щось пішло не так",
                    message: err.response.data
                });
            }
        }

        get_classes();
    }, [])

    function addClassCallback(school_class) {
        setSchoolClasses((prevState) => [...prevState, school_class]);
        setSchoolClasses((prevState) => {
            return [...prevState].sort((classA, classB) => (
                classA.grade - classB.grade ||
                classA.letter.localeCompare(classB.letter)
            ))
        });

        // document.getElementById(`class_${schoolClass.id}`).scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    return (
        <>
            <AddStudent addClassCallback={addClassCallback} renderMessageCallback={renderMessageCallback}/>
            <table className="table mt-5" style={{maxWidth: '700px', margin: "0 auto"}}>
                <thead>
                <tr>
                    <th scope="col">Назва</th>
                    <th scope="col">Кількість учнів</th>
                </tr>
                </thead>
                <tbody>
                {
                    schoolClasses?.map(schoolClass => (
                        // <tr key={schoolClass.id} id={`class_${schoolClass.id}`}>
                        <tr key={schoolClass.id}>
                            <td><Link to={`/classes/${schoolClass.id}`}>{schoolClass.grade + ' ' + schoolClass.letter}</Link></td>
                            <td>{schoolClass.students_num}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}