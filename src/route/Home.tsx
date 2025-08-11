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
  //const sampleChatUser = ["Adrean", "John", "Doe", "Jane", "Smith"];
  const [sampleChatUser, setSampleChatUser] = React.useState([
    { id: 1, user: "Adrean", favorite: true, blocked: false },
    { id: 2, user: "John", favorite: false, blocked: false },
    { id: 3, user: "Doe", favorite: false, blocked: false },
    { id: 4, user: "Jane", favorite: false, blocked: false },
    { id: 5, user: "Smith", favorite: false, blocked: false },
  ]);
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
  // Function to toggle favorite status
  const toogleFavorite = (id: number) => {
    const userToToggle = sampleChatUser.find((user) => user.id === id);
    if (userToToggle?.blocked) {
      alert("Cannot add a blocked user to favorites.");
      return;
    }
    setSampleChatUser((prev) =>
      prev.map((user) =>
        user.id === id && user.favorite === false
          ? { ...user, favorite: true }
          : user.id === id && user.favorite === true
          ? { ...user, favorite: false }
          : user
      )
    );
  };
  //function for block user
  // placholer funcftion
  const blockUser = (id: number) => {
    setSampleChatUser((prev) =>
      prev.map((user) =>
        user.id === id && user.blocked === false
          ? { ...user, blocked: true, favorite: false } // Block user and remove from favorites
          : user.id === id && user.blocked === true
          ? { ...user, blocked: false }
          : user
      )
    );
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
          {sampleChatUser.map((user) => (
            <Tab
              className="tab"
              variant={"outlined"}
              value={user.id} // Use the user name as the value for the tab
              key={user.id} // Use the user name as the value for the tab
            >
              {user.user}
              {user.favorite && <span className="tab__favorite">★</span>}
              {user.blocked && <span className="tab__blocked">🚫</span>}
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
                  <MenuItem onClick={() => toogleFavorite(user.id)}>
                    {user.favorite
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </MenuItem>
                  <MenuItem onClick={() => blockUser(user.id)}>
                    Block User
                  </MenuItem>
                </Menu>
              </Dropdown>
            </Tab>
          ))}
        </TabList>
        {/* Render the content of the selected tab */}
        {sampleChatUser.map((user) => (
          <TabPanel value={user.id} key={user.id} className="tab__panel">
            <Sheet className="tab__header" variant="soft">
              <Avatar color="success" size="lg" variant="soft" />
              <h3 className="tab__header__user">{user.user}</h3>
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
