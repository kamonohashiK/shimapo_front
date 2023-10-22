import { Stack, Box } from "@mui/material";
import { UserStatsItem } from "./item";

interface UserStatsListProps {
  isMobile: boolean;
  statsData: any[];
}

export const UserStatsList = (props: UserStatsListProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      margin={3}
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      {props.isMobile ? null : <Box sx={{ width: "10px" }} />}
      {props.statsData.map((data, index) => {
        return (
          <UserStatsItem
            key={index}
            title={data.title}
            value={data.value}
            index={index}
            itemSize={props.statsData.length}
          />
        );
      })}
      <Box sx={{ width: "10px" }} />
    </Stack>
  );
};
