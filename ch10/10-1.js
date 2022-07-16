function calculateCharge(date, quantity, plan) {
  // let charge = 0;
  
  return isSummer() ? summerCharge() : regularCharge();

  // if (isSummer()) {// 얘 너무 복잡하다. 어떻게 줄이지?
  //   charge = summerCharge();
  // }
  // else {
  //   charge = regularCharge()
  // }

  function isSummer() {
    return !date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd);
  }

  function summerCharge() {
    return quantity * plan.summerRate;
  }

  function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
  }
}


