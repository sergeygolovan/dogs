import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/core/Rating";
import { CardActionArea } from "@material-ui/core";
import { FC } from "react";
import styles from "../styles/PetCard.module.css";
import { useRouter } from "next/router";
import IPet from "../types/pet";

interface PetCardProps {
  pet: IPet;
  showExtraInfo?: boolean;
}

const PetCard: FC<PetCardProps> = ({ pet, showExtraInfo = true }) => {
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 345 }} className={styles.container}>
      <CardActionArea onClick={() => router.push(`/pets/${pet._id}`)}>
        <CardMedia
          className={styles.avatar}
          sx={{ height: 140 }}
          image={
            pet.avatar
              ? `${process.env.NEXT_PUBLIC_SERVICE_URL}/${pet.avatar}`
              : "#"
          }
          title={pet.name}
        />
        <CardContent className={styles.content}>
          <Typography
            className={styles.content__title}
            gutterBottom
            variant="h5"
            component="div"
          >
            {pet.name}
          </Typography>
          <Rating precision={0.5} value={pet.rating} readOnly />
          {showExtraInfo && (
            <Typography variant="body2" color="text.secondary">
              {pet.comments}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PetCard;
