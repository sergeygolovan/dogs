import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from "@material-ui/core/Rating";
import { CardActionArea } from '@material-ui/core';
import { FC } from 'react';
import styles from "../styles/PetCard.module.css";
import { useRouter } from 'next/router';
import IPet from '../types/pet';

const PetCard: FC<IPet> = (props) => {

  const router = useRouter()

  return (
    <Card sx={{ maxWidth: 345 }} className={styles.container}>
      <CardActionArea onClick={() => router.push(`pets/${props._id}`)}>
        {props.image ? <CardMedia
          className={styles.avatar}
          sx={{ height: 140 }}
          image={`${process.env.NEXT_PUBLIC_SERVICE_URL}/${props.image}`}
          title={props.name}
        />: null}
        <CardContent className={styles.content}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Rating 
          precision={0.5}
          value={props.rating} 
          readOnly />
          <Typography variant="body2" color="text.secondary">
            {props.comments}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PetCard;
