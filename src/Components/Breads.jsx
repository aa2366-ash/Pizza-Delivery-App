import React from "react";
import ItemCard from "./ItemCard";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

function Breads() {
  var data = useSelector((state) => state.menu.base);
  console.log(data);
  return (
    <>
      <Grid container spacing={3}>
        {data.map((bread) => (
          <Grid item xs={12} sm={6} md={3} key = {bread.name}>
            <ItemCard
              cardTitle={bread.name}
              category={"base"}
              image={bread.img}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Breads;
