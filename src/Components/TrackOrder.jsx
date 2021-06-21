import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import KitchenIcon from '@material-ui/icons/Kitchen';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function TrackOrder({details}) {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            {new Date(details.orderedAt).toLocaleString()}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary" >
            <CheckCircleIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Order Received
            </Typography>
            <Typography>We have recieved your order</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      {details.status === "preparing" || details.status === "dispached" || details.status === "delivered" ? 
            <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" >
                <KitchenIcon />
              </TimelineDot>
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Preparing 
                </Typography>
                <Typography>Your order is being prepared.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
     : <> </> }
      { details.status === "dispached" || details.status === "delivered" ?
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" >
            <DirectionsBikeIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Order Dispached
            </Typography>
            <Typography>Oder is sent for delivery by our delivery agent</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem> : <></>
}
{ details.status === "delivered"  ?
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" >
            <EmojiEmotionsIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Order Received
            </Typography>
            <Typography>Thank you for ordering from us.</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
 
: <></> }
   </Timeline>
  );
}


