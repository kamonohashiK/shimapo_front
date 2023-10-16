import { Stack, Typography, Divider } from "@mui/material";

export const UserStatsItem = (props: {
  title: string;
  value: string;
  index: number;
  itemSize: number;
}) => {
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        key={props.index}
        sx={{ textAlign: "center" }}
      >
        <Typography variant="caption" color="black">
          {props.title}
        </Typography>
        <Typography variant="h5" color="black">
          {props.value}
        </Typography>
      </Stack>
      {props.index === props.itemSize - 1 ? null : (
        <Divider orientation="vertical" flexItem />
      )}
    </>
  );
};
