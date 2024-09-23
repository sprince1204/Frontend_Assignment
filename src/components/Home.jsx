import React, { useEffect, useState } from "react";
import { useAppState } from "../AppStateContext";
import axios from "axios";

import TicketGroupPriority from "./TicketGroupPriority";
import TicketGroupStatus from "./TicketGroupStatus";
import TicketGroupUser from "./TicketGroupUser";

import inProgressIcon from "../assets/in-progress.svg";
import backlogIcon from "../assets/Backlog.svg";
import cancelIcon from "../assets/Cancelled.svg";
import doneIcon from "../assets/Done.svg";
import todoIcon from "../assets/To-do.svg";


import { ReactComponent as MoreHorizIcon } from "../assets/No-priority.svg";
import { ReactComponent as SdCardAlertIcon } from "../assets/SVG - Urgent Priority colour.svg";
import { ReactComponent as SignalCellularAltIcon} from "../assets/Img - High Priority.svg";
import { ReactComponent as SignalCellularAlt2BarIcon} from "../assets/Img - Medium Priority.svg";
import { ReactComponent as SignalCellularAlt1BarIcon } from "../assets/Img - Low Priority.svg";

const statusIcons = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Canceled: cancelIcon,
};

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const priorityIcons = {
  4: (
      <SdCardAlertIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem",color:"red" }}
        />
  ),
  3: (
      <SignalCellularAltIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
  ),
  2: (
      <SignalCellularAlt2BarIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
  ),
  1: (
      <SignalCellularAlt1BarIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
  ),
  0: (
        <MoreHorizIcon
          style={{ fontSize: "14px", padding: "0.3rem 0.3rem 0.1rem 0.3rem" }}
        />
  ),
};

const priorityValues = [4, 3, 2, 1, 0];

const statusValues = ["Backlog", "Todo", "In progress", "Done", "Canceled"];


const mainContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "16px",
  // Add other necessary styles
};

const MainContainer = ({ children }) => {
  return <div style={mainContainerStyle}>{children}</div>;
};



const Home = () => {
  const { selectedOptions } = useAppState();
  const [data, setData] = useState({
    tickets: [],
    users: [],
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
        setData(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // including all sorted data sets at Home
  // by considering Home to be the absolute page for the instance
  // group basis status
  const groupedTickets_status = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_status[ticket.status]) {
      groupedTickets_status[ticket.status] = [];
    }
    groupedTickets_status[ticket.status].push(ticket);
  });

  // group basis user
  const groupedTickets_user = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_user[ticket.userId]) {
      groupedTickets_user[ticket.userId] = [];
    }
    groupedTickets_user[ticket.userId].push(ticket);
  });

  // group basis priority
  const groupedTickets_priority = {};
  data?.tickets?.forEach((ticket) => {
    if (!groupedTickets_priority[ticket.priority]) {
      groupedTickets_priority[ticket.priority] = [];
    }
    groupedTickets_priority[ticket.priority].push(ticket);
  });
  //

  // sorting basis title
  const compareTitles = (a, b) => {
    return a.title.localeCompare(b.title);
  };

  if (selectedOptions.ordering === "title") {
    for (const status in groupedTickets_status) {
      groupedTickets_status[status]?.sort(compareTitles);
    }
    for (const user in groupedTickets_user) {
      groupedTickets_user[user]?.sort(compareTitles);
    }
    for (const priority in groupedTickets_priority) {
      groupedTickets_priority[priority]?.sort(compareTitles);
    }
  }
  //

  // sorting basis priority
  const comparePriority = (a, b) => {
    return a.priority - b.priority;
  };

  if (selectedOptions.ordering === "priority") {
    for (const status in groupedTickets_status) {
      groupedTickets_status[status]?.sort(comparePriority);
    }
    for (const user in groupedTickets_user) {
      groupedTickets_user[user]?.sort(comparePriority);
    }
    for (const priority in groupedTickets_priority) {
      groupedTickets_priority[priority]?.sort(comparePriority);
    }
  }
  //
  const boxStyle = {
    backgroundColor: "#f4f5f9",  // Background color
    minHeight: "100vh",          // Minimum height
    padding: "1rem",             // Padding
  };

  return (
  <div style={boxStyle}>
    {!isDataLoaded ? (
      <p>Loading...</p>  // Display a loading message or spinner
    ) : (
      <MainContainer container>
        {selectedOptions.grouping === "status" ? (
          <TicketGroupStatus
            data={data}
            groupedTickets_status={groupedTickets_status}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}

        {selectedOptions.grouping === "user" ? (
          <TicketGroupUser
            data={data}
            groupedTickets_user={groupedTickets_user}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityValues={priorityValues}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}

        {selectedOptions.grouping === "priority" ? (
          <TicketGroupPriority
            data={data}
            groupedTickets_priority={groupedTickets_priority}
            priorityIcons={priorityIcons}
            statusIcons={statusIcons}
            priorityValues={priorityValues}
            priorityLabels={priorityLabels}
            statusValues={statusValues}
          />
        ) : null}
      </MainContainer>
    )}
  </div>
);

};

export default Home;
