import { Typography, Container, Box, Accordion, AccordionDetails, AccordionSummary, Button, ImageList, ImageListItem, Divider } from "@mui/material";

const itemData = [
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
  { img: "https://source.unsplash.com/random", title: "Image" },
];

const questions = [
    "質問1",
    "質問2",
    "質問3",
    "質問4",
    "質問5",
]

export default function SidebarIslandInfo() {
    return (
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "200px" }} />
        <Typography variant="h4">島名</Typography>
        <Typography>XX県 YY市</Typography>
        <Typography>なまえ / Namae</Typography>

        <ImageList sx={{ width: 300, height: 80 }} cols={2} rowHeight={80}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        {questions.map((question, index) => (
          <Accordion key={index}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
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