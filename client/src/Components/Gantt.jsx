import { GanttComponent, Inject, Edit, Toolbar, CriticalPath } from '@syncfusion/ej2-react-gantt';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';


const Gantt = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
  };

  const editOptions = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };

  const toolbarOptions = ['CriticalPath'];

  const projGantt = async () => {
    const response = await fetch(`http://localhost:5000/gantt/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    setData(data.tasks);
  }

  useEffect(() => {
    projGantt();
  }, [])

  return (
    <GanttComponent dataSource={data} taskFields={taskFields} enableCriticalPath={true}
      editSettings={editOptions} toolbar={toolbarOptions} height='450px'>
      <Inject services={[Edit, CriticalPath, Toolbar]} />
    </GanttComponent>
  )
}

export default Gantt;