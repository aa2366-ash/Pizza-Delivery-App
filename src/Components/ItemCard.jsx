import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector } from 'react-redux'
import { setMenu } from '../Redux/Menu/menuAction';
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  root1 : {
    maxWidth : 300,
    border : "3px solid brown"
  },
  media: {
    height: 120,
  },
});

export default function ItemCard({cardTitle , content , image , category}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selection = useSelector((state) => state.menu.selection[category] )
  const handleOnClick = (category) => {
    if(category === "veg" || category === "nonveg" ){
      if(selection.includes(cardTitle)){
        return {
          [category] : selection.filter((e) => e !== cardTitle )
        }
      }
      else {
        return {
          [category] : selection.concat(cardTitle)
        }
      }
    }else{
     
      return {[category] : cardTitle}
    }
  }
  const style = () =>{
    if(selection === cardTitle )
      return classes.root1
    else if(typeof(selection) === 'object' ) {
      if(selection.includes(cardTitle))
        return classes.root1
      else 
        return classes.root
    }
    else {
      return classes.root
    }
  }

  return (
    <Card className={ style() } onClick={() => dispatch(setMenu( handleOnClick(category)) )}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={cardTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4">
            {cardTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content ? content : ""}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
