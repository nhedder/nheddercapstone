import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useContext } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
// wraps the default MUI Card component to customise it with props
export default function CustomCard({
  title,
  body,
  userId,
  receiverId,
  postId,
  rating,
  comment,
  skillArray,
  initiatorId,
  skillId,
  userArray,
  children,
  buttonText = "Chat",
}) {
  const navigate = useNavigate();

  const filteredUser = userArray.filter((user) => user.id === userId);
  const reviewedUser = userArray.filter((user) => user.id === receiverId);

  const filteredSkill = skillArray.filter(
    (skill) => skill.id === filteredUser[0].skillId
  );

  const reviewedSkill = rating
    ? skillArray.filter((skill) => skill.id === reviewedUser[0].skillId)
    : null;

  return (
    <Card sx={{ width: 800 }}>
      <CardActionArea>
        {userId ? (
          <CardMedia
            component="img"
            height="200"
            alt="iguana"
            image={filteredUser[0].displayPicture}
            sx={{ padding: "1em 1em 0 15em", objectFit: "contain" }}
          />
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comment}
          </Typography>

          {rating ? (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ left: 50, position: "absolute", top: 10 }}
              >
                {filteredUser[0].firstName} {filteredUser[0].lastName} reviewing{" "}
                {reviewedUser[0].firstName} {reviewedUser[0].lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reviewedSkill[0].skillName}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ left: 50, position: "absolute", top: 10 }}
              >
                {filteredUser[0].firstName} {filteredUser[0].lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredSkill[0].skillName}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() =>
            navigate("chat", {
              state: {
                email: filteredUser[0].emailId,
                id: filteredUser[0].id,
                postId: postId,
              },
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
