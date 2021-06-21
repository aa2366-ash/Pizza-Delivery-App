import React from "react";
import ItemCard from "./ItemCard";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

function Cheese() {
  var data = useSelector((state) => state.menu.cheese);
  console.log(data);
  return (
    <Grid container spacing={3}>
      {data.map((Cheese) => (
        <Grid item xs={12} sm={6} md={3} key = {Cheese.name} >
          <ItemCard
            cardTitle={Cheese.name}
            category={"cheese"}
            image={Cheese.img}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Cheese;
