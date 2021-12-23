import React, {useState} from 'react';

import axiosInstance from "../../axiosApi";

export default function Mark({mark, studentLessonDataId, deleteMarkCallback}) {
    // const [mark, setMark] = useState(undefined  )

    async function handleMarkDelete(e) {
        let resp = await axiosInstance.delete(`/accounting/marks/${mark.id}/`);
        deleteMarkCallback(mark, studentLessonDataId);
    }


    return (
        <div style={{ backgroundColor: "#D3D3D3", border: "1px solid #D3D3D3", borderRadius: "2px", padding: "0 10px", marginRight: "5px" }}>
            {mark.value}
            <i style={{marginLeft: "7px", cursor: "pointer"}} className="fa fa-times" aria-hidden="true" onClick={handleMarkDelete}></i>
        </div>
    )
}