import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyOrdersCard from "./MyOrdersCard";
import { Paper, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  pos: {
    marginBottom: 20,
  },
});

function Cart() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    fetch("https://pizza-planet-server.herokuapp.com/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
        setIsLoading(false);
      });
  }, [] );

  if (isLoading)
    return (
      <>
        <div className="my-3">
          <Skeleton variant="rect" height={200} animation="wave" />
        </div>
        <div className="py-3">
          <Skeleton variant="rect" height={200} animation="wave" />
        </div>
        <div className="py-3">
          <Skeleton variant="rect" height={200} animation="wave" />
        </div>
      </>
    );
  else
    return orders.length === 0 ? (
      <div>Your have not ordered anything...</div>
    ) : (
      <div>
        <>
          {orders.sort((a,b) => new Date(b.orderedAt) - new Date(a.orderedAt)).map((order) => (
            <Paper elevation={3} className={classes.pos} key={orders.order_id}>
              <MyOrdersCard
                order={order}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </Paper>
          ))}
        </>
      </div>
    );
}

export default Cart;
