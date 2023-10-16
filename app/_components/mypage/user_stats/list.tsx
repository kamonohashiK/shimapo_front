import { Stack, Box } from "@mui/material";
import { UserStatsItem } from "./item";

interface UserStatsListProps {
  statsData: any[];
}

export const UserStatsList = ({ statsData }: UserStatsListProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      margin={3}
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      <Box sx={{ width: "10px" }} />
      {statsData.map((data, index) => {
        return (
          <UserStatsItem
            key={index}
            title={data.title}
            value={data.value}
            index={index}
            itemSize={statsData.length}
          />
        );
      })}
      <Box sx={{ width: "10px" }} />
    </Stack>
  );
};
