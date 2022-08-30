import { Button, IconButton, Stack, TextField, Box } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export const InputRow = ({
  index,
  item,
  handleChange,
  handleRemove,
  handleAdd,
  values,
  inputFields,
}) => {
  return (
    <Box spacing={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        style={{ alignItems: "center" }}
      >
        <TextField
          name="Name"
          
          fullWidth
          label="Name of Fellowship"
          onChange={(event) => handleChange(event, index)}
          value={item.Name}
        />
        <TextField
          name="Institution"
          fullWidth
          label="Institution"
          onChange={(event) => handleChange(event, index)}
          value={item.Institution}
        />

        {/* <TextField
        name="description"
        fullWidth
        label="Upload Document"
        onChange={(event) => handleChange(event, index)}
        value={item.description}
      /> */}
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        style={{ alignItems: "center" }}
        marginTop={2}
      >
        <Button variant="contained" component="label">
          Upload Document
          <input
            name="File"
            // hidden
            accept="file"
            type="file"
            onChange={(event) => handleChange(event, index)}
          />
        </Button>
        <Box>
          <IconButton onClick={handleRemove}>
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};
