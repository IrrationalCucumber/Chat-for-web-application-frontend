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
  Input,
  Button,
  Typography,
  Box,
  Textarea,
} from "@mui/joy";
import { Send, MoreHoriz } from "@mui/icons-material";
import "./style.css";
import axios from "axios";

export default function Home() {
  //const sampleChatUser = ["Adrean", "John", "Doe", "Jane", "Smith"];
  const [sampleChatUser, setSampleChatUser] = React.useState([
    { id: 1, user: "Adrean", favorite: true, blocked: false },
    { id: 2, user: "John", favorite: false, blocked: false },
    { id: 3, user: "Doe", favorite: false, blocked: false },
    { id: 4, user: "Jane", favorite: false, blocked: false },
    { id: 5, user: "Smith", favorite: false, blocked: false },
    { id: 6, user: "Smith1", favorite: false, blocked: false },
    { id: 7, user: "Smith2", favorite: false, blocked: false },
  ]);
  const apiURL = import.meta.env.VITE_URL; //add api for backend in env file
  const userID = 1; //replace id with current user
  const [chatUsers, setChatUsers] = React.useState([]); //variable to store chatted users data
  //fetch all chatted user
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${apiURL}/my-chat/${userID}`);
        setChatUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
    //set interval to refrash page automatically
    const interval = setInterval(fetchUsers, 20000); //refresh every 20 sec
    return () => clearInterval(interval);
  }, [apiURL, userID]);
  //debug to verify if data is received
  console.log(chatUsers);

  //fetch chat messages
  const [chatMessage, setChatMessage] = React.useState([]);
  React.useEffect(() => {
    const fetchConvo = async () => {
      const res = await axios.get(`${apiURL}/my-convo/${userID}`);
      setChatMessage(res.data); //store to var chatMessage
    };
    fetchConvo();
    const interval = setInterval(fetchConvo, 10000); // refresh every 10 sec
    return () => clearInterval(interval);
  });
  //check if stored properly
  console.log(chatMessage);
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
  //scroll to bottom
  const messageEndRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sampleChatMessage]);
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
  //filter users based on search input
  const [filterUser, setFilterUser] = React.useState("");
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterUser(event.target.value);
  };
  //search user
  const filterUsers = sampleChatUser.filter((user) => {
    // check username based on inputs
    const username = user.user
      ?.toLowerCase()
      .includes(filterUser.toLowerCase() ?? "");
    return username;
  });

  //handle forn submit
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      addMessage("me", inputMessage); //message sender is "me"
      setInputMessage(""); // Clear input after sending
    }
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
          <Sheet
            className="tab__list__header"
            variant="soft"
            sx={{ p: "2rem 1rem" }}
          >
            <Input
              placeholder="Search user"
              onChange={(event) => handleFilterChange(event)}
            />
          </Sheet>
          {/* Map through the sampleChatUser array to create tabs */}
          <Box
            sx={{
              overflowY: "auto",
              height: "100%",
              padding: "1px",
            }}
          >
            {filterUsers.map((user) => (
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
          </Box>
        </TabList>
        {/* Render the content of the selected tab */}
        {sampleChatUser.map((user) => (
          <TabPanel value={user.id} key={user.id} className="tab__panel">
            <Sheet className="tab__header" variant="soft">
              <Avatar color="success" size="lg" variant="soft" />
              <h3 className="tab__header__user">{user.user}</h3>
            </Sheet>
            <Sheet className="tab__message">
              {/* Map through the messages for the selected user */}
              {sampleChatMessage.map((message, j) => (
                <Box
                  key={j}
                  sx={{
                    display: "flex",
                    justifyContent:
                      message.sender === "me" ? "flex-end" : "flex-start",
                  }}
                >
                  <Typography
                    color="success"
                    level="body-lg"
                    variant={message.sender === "me" ? "solid" : "soft"}
                    sx={{
                      textAlign: message.sender === "me" ? "right" : "left",
                      padding: "0.5rem",
                      margin: ".5rem",
                      maxWidth: "70%", // limit bubble width so lines wrap
                      width: "auto", // avoid fit-content issues
                      borderRadius: "12px",
                      whiteSpace: "pre-wrap", // preserve newlines and multiple spaces
                      wordBreak: "break-word", // avoid overflow with long words/URLs
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
              ))}
              <div ref={messageEndRef} />
            </Sheet>
            <form
              className="tab__input-container"
              onSubmit={(e) => {
                handleSendMessage(e);
              }}
            >
              <Textarea
                color="success"
                minRows={1}
                maxRows={2}
                placeholder="Type your message here..."
                size="lg"
                variant="soft"
                value={inputMessage}
                sx={{
                  width: "100%",
                  padding: "0.5rem",
                  margin: "0.5rem",
                  overflowY: "auto",
                }}
                onChange={(e) => setInputMessage(e.target.value)} // update value what user entered
                onKeyDown={(e) => {
                  // Enter submits, Shift+Enter creates newline
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSendMessage(e);
                  }
                }}
              />
              <Button
                // onClick={() => {
                //   if (inputMessage.trim() !== "") {
                //     addMessage("me", inputMessage); //message sender is "me"
                //     setInputMessage(""); // Clear input after sending
                //   }
                // }}
                type="submit"
                color="success"
                size="lg"
                variant="solid"
              >
                <Send />
              </Button>
            </form>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
