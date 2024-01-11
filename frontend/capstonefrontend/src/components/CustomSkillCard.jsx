import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useContext } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
// wraps the default MUI Card component to customise it with props
export default function CustomSkillCard({
  title,
  body,
  displayPicture,
  userId,
  receiverId,
  skillId,
  userArray,
  children,
  buttonText = "Chat",
}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 800 }}>
      <CardActionArea>
        {displayPicture ? (
          <CardMedia
            component="img"
            height="150"
            alt="display pictures"
            image={displayPicture}
            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
          />
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() =>
            navigate("chat", {
              state: { email: filteredUser[0].emailId, id: filteredUser[0].id },
            })
          }
          size="small"
          color="primary"
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
// ++ Add support for a button text prop as well, test rendering it
