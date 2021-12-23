import React, { useEffect, useState } from "react";

import axiosInstance from "../axiosApi";

export default function SchoolClassesSelect({renderMessageCallback, changeCallback, style}) {
    const [schoolClasses, setSchoolClasses] = useState([]);

    useEffect(() => {
        async function get_classes() {
            try {
                let resp = await axiosInstance.get('/classes/');
                resp.data.forEach(item => {
                    setSchoolClasses((prevState) => [
                            ...prevState,
                            {
                                'id': item.id,
                                'name': item.grade + ' ' + item.letter
                            }
                        ]
                    )
                })
            } catch (err) {
                renderMessageCallback({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
                // setMessage({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
            }
        }
        get_classes();
    }, [])

    return (
        <select name="classId" className="form-control" id="classId" onChange={changeCallback} style={style}>
            <option disabled={true} selected> Оберіть Клас</option>
            {
                schoolClasses?.map(schoolClass => (
                    <option value={schoolClass.id} key={schoolClass.id}>{schoolClass.name}</option>
                ))
            }
        </select>
    )
}