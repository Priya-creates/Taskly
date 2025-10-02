import React from "react";

const TaskCount = ({ taskList }) => {
  const [completedCount, setCompletedCount] = React.useState();
  const [incompletedCount, setIncompletedCount] = React.useState();

  function calculateCount() {
    let compcount = 0;
    let incompcount = 0;
    if (taskList.length > 0) {
      taskList.forEach((ele) => {
        if (ele.status === "completed") {
          compcount++;
        } else if (ele.status === "incompleted") {
          incompcount++;
        }
      });
    }
    setCompletedCount(compcount);
    setIncompletedCount(incompcount);
  }
  React.useEffect(() => {
    calculateCount();
  }, [taskList]);

  return (
    <div className="sm:mt-[30px]  text-[14px] font-semibold">
     {`Total: ${taskList.length} | Completed: ${completedCount} | Inprogress: ${taskList.length-completedCount- incompletedCount} | Incompleted: ${incompletedCount}`}
    </div>
  );
};

export default TaskCount;
