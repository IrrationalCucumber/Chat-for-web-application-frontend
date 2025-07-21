import * as React from "react";
// import Navbar from "../components/Navbar";
import { Tabs, TabList, Tab, TabPanel, Sheet, Typography } from "@mui/joy";
import "./style.css";

export default function Home() {
  const sampleChatUser = ["Adrean", "John", "Doe", "Jane", "Smith"];
  const sampleChatMessage = [
    "Hello, how are you?",
    "I'm fine, thanks!",
    "What about you?",
    "Doing great, just working on some projects.",
    "That's nice to hear!",
  ];
  const [selectedTab, setSelectedTab] = React.useState(0); // Track selected tab index
  return (
    <div>
      {/* <Navbar /> */}
      <Tabs
        orientation="vertical"
        size="lg"
        value={selectedTab} // Track selected tab index
        onChange={(_, value) => setSelectedTab(value as number)} // Update selected tab index on change
        sx={{
          width: "100%",
          height: "90vh",
          display: "flex",
        }}
      >
        <TabList className="tab__list">
          {sampleChatUser.map((user, i) => (
            <Tab
              className="tab"
              variant={"outlined"}
              value={i} // Use the user name as the value for the tab
              key={i} // Use the user name as the value for the tab
            >
              {user}
            </Tab>
          ))}
        </TabList>
        {/* Render the content of the selected tab */}
        {sampleChatUser.map(
          (
            user,
            i
            // Map through the users to create a tab panel for each user
          ) => (
            <TabPanel value={i} key={i} className="tab__panel">
              <Sheet className="tab__header" variant="soft">
                <Typography color="neutral" noWrap={false} variant="plain">
                  {user}
                </Typography>
              </Sheet>
              {sampleChatMessage.map((message, j) => (
                <Sheet key={j} className="tab__message">
                  <Typography>{message}</Typography>
                </Sheet>
              ))}
            </TabPanel>
          )
        )}
      </Tabs>
    </div>
  );
}
