import * as React from "react";
// import Navbar from "../components/Navbar";
import { Tabs, TabList, Tab, TabPanel, Sheet, Typography } from "@mui/joy";
import "./style.css";

export default function Home() {
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      {/* <Navbar /> */}
      <Tabs
        orientation="vertical"
        size="lg"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
        sx={{
          width: "100%",
          height: "90vh",
          display: "flex",
        }}
      >
        <TabList className="tab__list">
          <Tab className="tab" variant={index === 0 ? "outlined" : "plain"}>
            First tab
          </Tab>
          <Tab className="tab" variant={index === 1 ? "outlined" : "plain"}>
            Second tab
          </Tab>
          <Tab className="tab" variant={index === 2 ? "outlined" : "plain"}>
            3ed tab
          </Tab>
          <Tab className="tab" variant={index === 3 ? "outlined" : "plain"}>
            4th tab
          </Tab>
          <Tab className="tab" variant={index === 4 ? "outlined" : "plain"}>
            5th tab
          </Tab>
        </TabList>
        <TabPanel value={index} className="tab__panel">
          <Sheet className="tab__header" variant="soft">
            <Typography color="neutral" noWrap={false} variant="plain">
              HEADER
            </Typography>
          </Sheet>
          Tab {index + 1}
        </TabPanel>
      </Tabs>
    </div>
  );
}
