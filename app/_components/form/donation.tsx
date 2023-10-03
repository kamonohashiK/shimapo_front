import { useAppDispatch } from "@/app/_store/hooks";
import { showModal } from "@/app/_store/modalSlice";
import { Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

export default function DonationForm() {
    const dispatch = useAppDispatch();

    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="お名前(ニックネーム可)"
            required
            id="name"
            defaultValue=""
          />
        </div>
        <div>
          <TextField
            label="メールアドレス"
            required
            id="email"
            defaultValue=""
          />
        </div>
        <FormControl>
          <FormLabel id="amount">金額</FormLabel>
          <RadioGroup
            row
            aria-labelledby="amount"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="100" control={<Radio />} label="￥100" />
            <FormControlLabel value="500" control={<Radio />} label="￥500" />
            <FormControlLabel
              value="1000"
              control={<Radio />}
              label="￥1,000"
            />
            <FormControlLabel
              value="5000"
              control={<Radio />}
              label="￥5,000"
            />
          </RadioGroup>
        </FormControl>
        <div>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => dispatch(showModal())}
          >
            確認
          </Button>
        </div>
      </Box>
    );
}