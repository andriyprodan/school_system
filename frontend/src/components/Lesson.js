import React, {useEffect, useState} from "react";
import {
    useParams
} from "react-router-dom";

import axiosInstance from "../axiosApi"
import Presence from "./lesson_components/Presence";
import AddMark from "./lesson_components/AddMark";
import Mark from "./lesson_components/Mark";

// Компонента уроку
export default function Lesson({lessonId, renderMessageCallback}) {
    const [lesson, setLesson] = useState(null)
    let {id} = useParams();

    useEffect(() => {
        async function get_lesson() {
            try {
                let resp = await axiosInstance.get(`/accounting/lessons/${id}/`);
                setLesson(resp.data)
            } catch (err) {
                renderMessageCallback({
                    type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data
                })
            }
        }

        get_lesson();
    }, [id])

    function presenseChangeCallback(presense, studentLessonDataId) {
        let arr = lesson.studentlesson_set.map((el) => {
            if (el.id == studentLessonDataId) {
                el.was_present = presense
                return el
            } else {
                return el
            }
        })
        setLesson((p) => {
            return {...p, studentlesson_set: arr}
        })
    }

    function addMarkCallback(mark, studentLessonDataId) {
        let arr = lesson.studentlesson_set.map((el) => {
            if (el.id == studentLessonDataId) {
                el.mark_set.push(mark)
                return el
            } else {
                return el
            }
        })
        setLesson((p) => {
            return {...p, studentlesson_set: arr}
        })
    }

    function deleteMarkCallback(mark, studentLessonDataId) {
        console.log('bla')
        let arr = lesson.studentlesson_set.map((el) => {
            if (el.id == studentLessonDataId) {
                const index = el.mark_set.indexOf(mark);
                if (index > -1) {
                    el.mark_set.splice(index, 1);
                }
                // el.mark_set.filter(el => el.id !== markId )
                // console.log(el.mark_set);
                return el
            } else {
                return el
            }
        })
        setLesson((p) => {
            return {...p, studentlesson_set: arr}
        })
    }

    return (<div className="container mt-5" style={{maxWidth: "700px", margin: "0 auto"}}>
        <div className="d-flex justify-content-between">
            <h1 style={{marginBottom: "10px"}}>{lesson?.subject.subject.name} {lesson?.subject.school_class.grade + '-' + lesson?.subject.school_class.letter}</h1>
            <h3 style={{margin: "0"}}>{lesson?.date}</h3>
        </div>
        <table className="table mt-5" style={{maxWidth: '700px', margin: "0 auto"}}>
            <thead>
            <tr>
                <th scope="col">Ім'я</th>
                <th scope="col">Присутність</th>
                <th scope="col">Оцінки</th>
            </tr>
            </thead>
            <tbody>
            {
                lesson?.studentlesson_set.map(data => (
                    <tr key={data.id}>
                        <td>{data.student.full_name}</td>

                        <td><Presence presenseChangeCallback={presenseChangeCallback} wasPresent={data.was_present}
                                      studentLessonDataId={data.id}/></td>
                        <td className="d-flex align-items-center">
                            {
                                data.mark_set.map(mark => (
                                    <Mark mark={mark} studentLessonDataId={data.id}
                                          deleteMarkCallback={deleteMarkCallback}/>
                                ))
                            }
                            <AddMark studentLessonDataId={data.id} addMarkCallback={addMarkCallback}/>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>)
}