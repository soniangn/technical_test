import { GanttComponent, Inject, Edit, Toolbar, CriticalPath } from '@syncfusion/ej2-react-gantt';
import React from 'react';
import '../App.css';
import GanttData from '../Data/GanttData';

const Gantt = () => {
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

  return (
    <GanttComponent dataSource={GanttData} taskFields={taskFields} enableCriticalPath={true}
      editSettings={editOptions} toolbar={toolbarOptions} height='450px'>
      <Inject services={[Edit, CriticalPath, Toolbar]} />
    </GanttComponent>
  )
}

export default Gantt;