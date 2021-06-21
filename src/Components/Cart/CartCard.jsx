import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon  from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { decQuantity, incQuantity , decCartItem } from '../../Redux/Cart/cartAction';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: 700,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    
    maxWidth: 500,
  },
  cover: {
    width: 500,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function CartCard({title , cheese , veg ,nonveg ,quantity , index , price }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
           {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Cheese: {" "+cheese}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Veg Toppings: {" "+ veg.length > 0 ? veg.join(", ") : "none"}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Non Veg Toppings: {" "+ nonveg.length > 0 ? nonveg.join(", ") : "none" }
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Quantity : {quantity}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Price : {price}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="remove"
         
            onClick={() => {
              dispatch( decQuantity(index) )
            }}
          
          >
          <RemoveIcon />
          </IconButton>
          <IconButton aria-label="delete" 
          onClick = {
            () => {
              dispatch(decCartItem(index))
            }
          }
          >
            <DeleteIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="add" 
          onClick={() => {
            dispatch( incQuantity(index) )
          }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg"
        title="Pizza"
      />
    </Card>
  );
}
