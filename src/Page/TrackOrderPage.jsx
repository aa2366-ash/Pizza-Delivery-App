import React, { useEffect, useState } from "react";
import TrackOrder from "../Components/TrackOrder";
import { Paper, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

function TrackOrderPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('https://pizza-planet-server.herokuapp.com/kitchen/tracking', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth' : localStorage.getItem('pizzaPlanet'),
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem('userDetails')).email ,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          console.log(data)
          setOrdersTrack(data)
          setIsLoading(false)
      });
  }, []);

  const [ordersTrack , setOrdersTrack ] = useState([])

  if (isLoading)
  return (
    <>
      <div className="my-3">
        <Skeleton variant="rect" height={200} animation="wave" />
      </div>
      <div className="py-3">
        <Skeleton variant="rect" height={200} animation="wave" />
      </div>

    </>
  );
else

  return (
    ordersTrack.sort((a,b) => new Date(b.orderedAt) - new Date(a.orderedAt) ).map( e  => 
      <Paper elevation={3}  >
             <Typography variant="h6" gutterBottom >
    Order ID : {e.order_id.slice(6)}
      </Typography>
        <TrackOrder details = {e} />
      </Paper>
    ) 

  );
}

export default TrackOrderPage;
