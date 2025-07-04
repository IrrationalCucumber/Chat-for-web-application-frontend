import * as React from "react";
import Navbar from "../components/Navbar";
import { Tabs, TabList, Tab, TabPanel } from "@mui/joy";

export default function Home() {
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      <Navbar />
      <Tabs
        orientation="vertical"
        size="lg"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <TabList>
          <Tab variant={index === 0 ? "outlined" : "plain"}>First tab</Tab>
          <Tab variant={index === 1 ? "outlined" : "plain"}>Second tab</Tab>
          <Tab variant={index === 2 ? "outlined" : "plain"}>Third tab</Tab>
        </TabList>
        <TabPanel value={0}>Tab 1</TabPanel>
        <TabPanel value={1}>Tab 2</TabPanel>
        <TabPanel value={2}>Tab 3</TabPanel>
      </Tabs>
    </div>
  );
}
