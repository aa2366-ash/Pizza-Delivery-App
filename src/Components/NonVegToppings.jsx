import React from "react";
import ItemCard from "./ItemCard";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

function NonVegToppings() {
  var data = useSelector((state) => state.menu.nonveg);
  console.log(data);
  return (
    <>
      <Grid container spacing={3}>
        {data.map((nonveg) => (
          <Grid item xs={12} sm={6} md={3} key = {nonveg.name}>
            <ItemCard
              cardTitle={nonveg.name}
              category={"nonveg"}
              image={nonveg.img}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default NonVegToppings;
