import React from "react";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import {
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { DataContext } from "./DataContext";
import { mean, round, merge } from "lodash";
import { AuthContext } from "./AuthContext";

export const Idea = ({ i, removeIdea, syncIdea }) => {
  const { auth } = React.useContext(AuthContext);
  const { updateIdea, createIdea, deleteIdea } = React.useContext(DataContext);
  const [id, setId] = React.useState(i.id);
  const [content, setContent] = React.useState(i.content);
  const [impact, setImpact] = React.useState(i.impact);
  const [ease, setEase] = React.useState(i.ease);
  const [edit, setEdit] = React.useState(i.edit);
  const [remote, setRemote] = React.useState(i.remote);
  const [confidence, setConfidence] = React.useState(i.confidence);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleSave = async () => {
    const idea = {
      id,
      content,
      impact,
      ease,
      confidence,
    };
    let newIdea;
    if (remote) {
      newIdea = await updateIdea({ jwt: auth.jwt, ...idea });
    } else {
      newIdea = await createIdea({ jwt: auth.jwt, ...idea });
    }
    setEdit(false);
    setRemote(true);
    setId(newIdea.id);
    syncIdea(merge(newIdea, { edit: false, remote: true }), idea);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = async () => {
    if (remote) {
      await deleteIdea({ jwt: auth.jwt, id });
    }
    removeIdea(id);
  };

  return (
    <Box display="flex" m={2}>
      <Box flexGrow={1}>
        <TextField
          defaultValue={content}
          disabled={!edit}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          label="New Idea"
          placeholder="option to pay mentor with beer"
        />
      </Box>
      <Box style={{ marginLeft: 30 }}>
        <FormControl>
          <InputLabel shrink>Impact</InputLabel>
          <Select
            disabled={!edit}
            value={impact}
            onChange={(v) => {
              setImpact(v.target.value);
            }}
            displayEmpty
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box style={{ marginLeft: 8 }}>
        <FormControl>
          <InputLabel shrink>Ease</InputLabel>
          <Select
            disabled={!edit}
            value={ease}
            onChange={(v) => {
              setEase(v.target.value);
            }}
            displayEmpty
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box style={{ marginLeft: 8 }}>
        <FormControl>
          <InputLabel shrink>Confidence</InputLabel>
          <Select
            disabled={!edit}
            value={confidence}
            onChange={(v) => {
              setConfidence(v.target.value);
            }}
            displayEmpty
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box style={{ marginLeft: 30 }}>
        <TextField
          disabled
          label="Avg"
          value={round(mean([impact, ease, confidence]), 2)}
          style={{ maxWidth: 40 }}
        />
      </Box>
      <Box style={{ marginLeft: 20 }}>
        {edit ? (
          <Box display="flex" justifyContent="center">
            <IconButton onClick={handleSave}>
              <Avatar
                style={{
                  width: 16,
                  height: 16,
                  overflow: "visible",
                }}
                src="https://small-project-api.herokuapp.com/mockup/web/assets/Confirm_V.png"
              />
            </IconButton>
            <IconButton
              onClick={() => {
                remote ? setDialogOpen(true) : handleDelete();
              }}
            >
              <Avatar
                style={{
                  width: 16,
                  height: 16,
                  overflow: "visible",
                }}
                src="https://small-project-api.herokuapp.com/mockup/web/assets/Cancel_X.png"
              />
            </IconButton>
          </Box>
        ) : (
          <Box
            style={{ width: 80, height: "100%" }}
            // onMouseEnter={() => setShow(idea, true)}
            // onMouseLeave={() => setShow(idea, false)}
            display="flex"
            justifyContent="center"
          >
            <Box>
              <IconButton onClick={handleEdit}>
                <Avatar
                  style={{
                    width: 16,
                    height: 16,
                    overflow: "visible",
                  }}
                  src="https://small-project-api.herokuapp.com/mockup/web/assets/pen.png"
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  remote ? setDialogOpen(true) : handleDelete();
                }}
              >
                <Avatar
                  style={{
                    width: 16,
                    height: 16,
                    overflow: "visible",
                  }}
                  src="https://small-project-api.herokuapp.com/mockup/web/assets/bin.png"
                />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Sure you want to trash this idea?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It will be gone forever.That's a pretty long time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setDialogOpen(false);
              handleDelete();
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
