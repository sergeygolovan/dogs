import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { FC } from 'react';
import { useRouter } from 'next/router';
import IPet from '../types/pet';

const PetCard: FC<IPet> = (props) => {

  const router = useRouter()

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => router.push(`pets/${props._id}`)}>
        {props.image ? <CardMedia
          sx={{ height: 140 }}
          image={props.image}
          title={props.name}
        />: null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.comments}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PetCard;
