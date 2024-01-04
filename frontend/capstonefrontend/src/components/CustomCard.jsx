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
  receiverId,
  skillId,
  userArray,
  children,
  buttonText = "Yee Haw",
}) {
console.log(userArray)
const filteredUser= userArray.filter(user=>user.id===userId)
const reviewedUser= userArray.filter(user=>user.id===receiverId)
console.log(filteredUser[0])
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
          </Typography>{ reviewedUser?
          <Typography variant="body2" color="text.secondary"sx={{left: 50, position:'absolute', top: 10}}>
           {filteredUser[0].firstName}  {filteredUser[0].lastName} reviewing  {reviewedUser[0].firstName}  {reviewedUser[0].lastName}
          </Typography>:  
          <Typography variant="body2" color="text.secondary"sx={{left: 50, position:'absolute', top: 10}}>
           {filteredUser[0].firstName}  {filteredUser[0].lastName} 
          </Typography>}
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
