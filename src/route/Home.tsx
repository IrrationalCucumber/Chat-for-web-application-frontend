import * as React from "react";
// import Navbar from "../components/Navbar";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Sheet,
  Avatar,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
} from "@mui/joy";
import { MoreHoriz } from "@mui/icons-material";
import "./style.css";

export default function Home() {
  const sampleChatUser = ["Adrean", "John", "Doe", "Jane", "Smith"];
  // Define messages as objects with sender and text
  // Change the object to actual data structure
  // to be used in the chat application
  const [sampleChatMessage, setSampleChatMessage] = React.useState([
    { sender: "me", text: "Hello, how are you?" },
    { sender: "other", text: "I'm fine, thanks!" },
    { sender: "me", text: "What about you?" },
    { sender: "other", text: "Doing great, just working on some projects." },
    { sender: "me", text: "That's nice to hear!" },
  ]);

  const [selectedTab, setSelectedTab] = React.useState(0); // Track selected tab index
  //variable for inputted message
  const [inputMessage, setInputMessage] = React.useState("");
  //add message function
  const addMessage = (sender: string, text: string) => {
    setSampleChatMessage((prev) => [...prev, { sender, text }]);
  };
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
              <Dropdown>
                {/* Elaborate dropdown further */}
                <MenuButton
                  variant="plain"
                  color="success"
                  size="sm"
                  sx={{
                    borderRadius: "50%",
                    width: "2rem",
                  }}
                >
                  <MoreHoriz />
                </MenuButton>
                <Menu variant="solid" color="success" size="sm">
                  <MenuItem>Add to Favorites</MenuItem>
                  <MenuItem>Block User</MenuItem>
                </Menu>
              </Dropdown>
            </Tab>
          ))}
        </TabList>
        {/* Render the content of the selected tab */}
        {sampleChatUser.map((user, i) => (
          <TabPanel value={i} key={i} className="tab__panel">
            <Sheet className="tab__header" variant="soft">
              <Avatar color="success" size="lg" variant="soft" />
              <h3 className="tab__header__user">{user}</h3>
            </Sheet>
            <Sheet className={`tab__message`}>
              {/* Map through the messages for the selected user */}
              {sampleChatMessage.map((message, j) => (
                <p
                  key={j}
                  className={
                    message.sender === "me"
                      ? "tab__message-sender"
                      : "tab__message-other"
                  }
                >
                  {/* Display the sender and message text */}
                  {message.text}
                </p>
              ))}
            </Sheet>
            <div className="tab__input-container">
              <input
                type="text"
                placeholder="Type a message..."
                className="tab__input"
                name="message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)} // update value what user entered
              />
              <button
                onClick={() => {
                  if (inputMessage.trim() !== "") {
                    addMessage("me", inputMessage); //message sender is "me"
                    setInputMessage(""); // Clear input after sending
                  }
                }}
              >
                Send
              </button>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
