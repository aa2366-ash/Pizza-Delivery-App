import React from "react";
import ItemCard from "./ItemCard";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
function Sauce() {
  var data = useSelector((state) => state.menu.sauce);
  console.log(data);
  return (
    <>
      <Grid container spacing={3}>
        {data.map((sauce) => (
          <Grid item xs={12} sm={6} md={3} key={sauce.name} >
            <ItemCard
              cardTitle={sauce.name}
              category={"sauce"}
              image={sauce.img}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Sauce;
