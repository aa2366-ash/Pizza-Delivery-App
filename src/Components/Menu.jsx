import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Breads from "./Breads";
import Sauce from "./Sauce";
import Cheese from "./Cheese";
import VegToppings from "./VegToppings";
import NonVegToppings from "./NonVegToppings";
import AddToCard from "./AddToCard";
import { useSelector, useDispatch } from "react-redux";
import { setMenu } from "../Redux/Menu/menuAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Choose your Pizza Base",
    "Choose sause",
    "Choose cheese",
    "Choose Veg Toppings",
    "Choose Meat",
  ];
}

function getStepTitle(step) {
  switch (step) {
    case 0:
      return "Select Your Choice of Bread";
    case 1:
      return "Select Your Choice of Sauce";
    case 2:
      return "Select Your Choice of cheese";
    case 3:
      return "Select Your Choice of Veg Toppings";
    case 4:
      return "Select Your Choice of Non-Veg Toppings";
    default:
      return "Unknown step";
  }
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Breads />;
    case 1:
      return <Sauce />;
    case 2:
      return <Cheese />;
    case 3:
      return <VegToppings />;
    case 4:
      return <NonVegToppings />;
    default:
      return "Unknown step";
  }
}

export default function Menu() {
  const selection = useSelector((state) => state.menu.selection);
  console.log(selection);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const dispatch = useDispatch()

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    dispatch(setMenu({
      base: "",
      sauce: "",
      cheese: "",
      veg: [],
      nonveg: [],
      quantity: 1,
    }))
    setActiveStep(0);
    // Reset Global state here
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
             
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <>
            <AddToCard handleReset={handleReset} />
          </>
        ) : (
          <>
          <div>
            <Typography className={classes.instructions} variant={"h5"}>
              {getStepTitle(activeStep)}
            </Typography>
            <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={
                  (activeStep === 0 && selection.base) ||
                  (activeStep === 1 && selection.sauce) ||
                  (activeStep === 2 && selection.cheese) ||
                  activeStep > 2
                    ? false
                    : true
                }
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              </div>
              <div className ={"mt-3"} >
            {getStepContent(activeStep)}
          </div>
          </>
        )}
      </div>
    </div>
  );
}
