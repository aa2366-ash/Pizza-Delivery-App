import React from "react";
import CartCard from "./CartCard";
import { useSelector } from "react-redux";
import RazorPay from "../RazorPay";
import { Image } from "react-bootstrap";
import { Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const history = useHistory()
  return cart.length === 0 ? (
    <>
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography variant={"h4"}>Your Cart is empty</Typography>
      </Grid>
      <Grid item>
        <Image src="https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1" />
      </Grid>
    </Grid>
    <Grid container direction="row" justify="center" alignItems="center">
    <Grid item>
      <Button  variant="contained" color="primary" onClick={() => history.push('/')}>
        Back to Menu
      </Button>
    </Grid>
    </Grid>
    </>
  ) : (
    <div>
      <Grid container justify="space-evenly" spacing="3">
      {cart.map((e, index) => (
        <Grid item>
        <CartCard
          title={e.base + " Pizza with " + e.sauce + " sauce"}
          cheese={e.cheese}
          veg={e.veg}
          nonveg={e.nonveg}
          quantity={e.quantity}
          index={index}
          price={e.price}
        />
        </Grid>
      ))}
      </Grid>
      <div className={"my-3"}>
        <RazorPay />
      </div>
    </div>
  );
}

export default Cart;
