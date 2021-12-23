import React, {useState} from 'react';

import axiosInstance from "../../axiosApi";

export default function AddMark({markValue, studentLessonDataId, addMarkCallback}) {
    const [mark, setMark] = useState(undefined  )

    async function handleMarkSubmit(e) {
        if (e.keyCode !== 13) {
            return;
        }
        let resp = await axiosInstance.post(`/accounting/marks/`, {
            'student_lesson': studentLessonDataId, 'value': e.target.value
        });
        addMarkCallback(resp.data, studentLessonDataId);
    }


    return (<input max={12} min={1} type="number" onChange={(e) => setMark(e.target.value)} value={mark} onKeyDown={handleMarkSubmit}
                   style={{width: "50px", height: "20px"}}/>)
}