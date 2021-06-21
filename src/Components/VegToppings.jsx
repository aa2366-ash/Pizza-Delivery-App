import React from "react";
import ItemCard from "./ItemCard";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

function VegToppings() {
  var data = useSelector((state) => state.menu.veg);
  console.log(data);
  return (
    <>
      <Grid container spacing={3}>
        {data.map((veg) => (
          <Grid item xs={12} sm={6} md={3} key = {veg.name} >
            <ItemCard cardTitle={veg.name} category={"veg"} image={veg.img} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default VegToppings;
