import React from "react";
import {
  Typography,
  Button,
  ButtonGroup,
  makeStyles,
  Paper,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from "react-redux";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { addCart } from "../Redux/Cart/cartAction";
import { incQuantity, decQuantity, setMenu } from "../Redux/Menu/menuAction";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function AddToCard({ handleReset }) {
  const classes = useStyles();
  const selection = useSelector((state) => state.menu.selection);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const addToCardAndBack = () => {
    dispatch(
      addCart({
        ...selection,
        price:
          (Math.max(selection.veg.length - 3, 0) * 30 +
            400 +
            Math.max(selection.nonveg.length - 1, 0) * 60) *
          selection.quantity,
      })
    );
    dispatch(
      setMenu({
        base: "",
        sauce: "",
        cheese: "",
        veg: [],
        nonveg: [],
        quantity: 1,
      })
    );
    handleReset();
  }
  const addToCard = () => {
    dispatch(
      addCart({
        ...selection,
        price:
          (Math.max(selection.veg.length - 3, 0) * 30 +
            400 +
            Math.max(selection.nonveg.length - 1, 0) * 60) *
          selection.quantity,
      })
    );
    dispatch(
      setMenu({
        base: "",
        sauce: "",
        cheese: "",
        veg: [],
        nonveg: [],
        quantity: 1,
      })
    );
    //setOpen(true)
    history.push('/cart')
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Container>
      <Row>
        <Col>
          <Typography variant={"h4"} className={classes.instructions}>
            Wow that looks delicious
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col md={"6"}>
          <Image
            src="https://i.pinimg.com/originals/38/ce/61/38ce6178b4c13d213b6584f8fbbda1c9.png"
            fluid
          />
        </Col>
        <Col md={"6"}>
          <Typography variant={"h5"}>Your Pizza Selection</Typography>
          <Paper elevation={1}>
            <Typography>
              Base : {selection.base} <br />
              Sauce : {selection.sauce} <br />
              Cheese : {selection.cheese} <br />
              Veg : {selection.veg.join(", ")} <br />
              Nonveg : {selection.nonveg.join(", ")} <br />
              Quantity : {selection.quantity} <br />
              Price :
              {(Math.max(selection.veg.length - 3, 0) * 30 +
                400 +
                Math.max(selection.nonveg.length - 1, 0) * 60) *
                selection.quantity}{" "}
              <br />
            </Typography>
          </Paper>
          <div className={"mt-3"}>
          <Typography>Update Quantity</Typography>
          <ButtonGroup title="Change Quantity">
            <Button
              aria-label="reduce"
              onClick={() => {
                dispatch(decQuantity());
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button
              aria-label="increase"
              onClick={() => {
                dispatch(incQuantity());
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
          </div>
          <div className={"mt-3"}>
            <Button aria-label="Add to cart" onClick={addToCard} color="primary" >
              Add and Checkout
            </Button>
            <Button aria-label="Add to cart" onClick={addToCardAndBack} color="primary" >
              Add to Cart
            </Button>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Product Added
        </Alert>
      </Snackbar>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddToCard;
