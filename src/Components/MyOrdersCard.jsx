import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Paper, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MyOrdersCard({ order, refresh ,setRefresh }) {
  const classes = useStyles();
  

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          OrderId: {order.order_id.slice(6)}
        </Typography>
        <Typography variant="h5" component="h2">
          Status: {order.status === 'received' ? "Not Delivered": order.status }
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {new Date(order.orderedAt).toLocaleString()}
        </Typography>
        <Typography variant="h6" component="h4"  className={classes.pos} >
          Order Details:
        </Typography>
        <Grid container spacing={3}  className={classes.pos} >
          {order.orderDetails.map((ele) => (
            <Grid item md={4}>
              <Paper elevation={2}>
                <Typography>
                  Base : {ele.base} <br />
                  Sauce : {ele.sauce} <br />
                  Cheese : {ele.cheese} <br />
                  Veg : {ele.veg.join(", ")} <br />
                  Nonveg : {ele.nonveg.join(", ")} <br />
                  Quantity : {ele.quantity} <br />
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
