"use client";
import { RootState } from "@/app/_store/store";
import {
  Typography,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import TopImage from "./top_image";
import ProfileText from "./profile_text";
import IslandImageList from "./island_image_list";

const topImageUrl =
  "https://source.unsplash.com/random?w=360&h=240&fit=crop&auto=format";

const itemData = [
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
];

const questions = ["質問1", "質問2", "質問3", "質問4", "質問5"];

export default function SidebarIslandInfo() {
  const islandInfo = useSelector((state: RootState) => state.page);

  return (
    <Container maxWidth="sm">
      <TopImage url={topImageUrl} />
      <ProfileText
        name={islandInfo.name}
        prefecture={islandInfo.prefecture}
        city={islandInfo.city}
        kana={islandInfo.kana}
        enName={islandInfo.enName}
      />
      <IslandImageList itemData={itemData} />
      {questions.map((question, index) => (
        <Accordion key={index}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
            <Divider />
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
            <Divider />
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
            <Divider />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button color="primary" variant="outlined" fullWidth>
        新たに質問する
      </Button>
    </Container>
  );
}
