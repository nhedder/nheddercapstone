import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useContext } from "react";
import { useUserContext } from "../context/UserContext";
// wraps the default MUI Card component to customise it with props
export default function CustomCard({
  title,
  body,
  userId,
  userArray,
  skillId,
  children,
  buttonText = "Yee Haw",
}) {

  return (
    <Card sx={{ width: 800 }}>
      <CardActionArea>
        {/* {image?<CardMedia
          component="img"
          height="140"
          alt="iguana"
          image={image}
        />:null} */}
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
        <Button size="small" color="primary">
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
// ++ Add support for a button text prop as well, test rendering it
