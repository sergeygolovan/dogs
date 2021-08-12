import IOrder from "../types/order";

export function calcCreditAmount(orders: IOrder[]): number {
  return orders.reduce((res, order) => {
      return res + calcPrice(order, true)
  }, 0);
}

export function calcDays(values): number {
  let { dateTimeFrom, dateTimeTo } = values;

  if (dateTimeFrom && dateTimeTo) {
    return Number(
      (
        (Number(new Date(dateTimeTo)) - Number(new Date(dateTimeFrom))) /
        (1000 * 60 * 60 * 24)
      ).toFixed(2)
    );
  }

  return 0;
}

export function calcPrice(values, includeDeposit = false): number {
  let { rate, discount = 0, pets, deposit = 0 } = values;
  let days = calcDays(values);
  let amount = 0;

  if (rate && days && pets.length) {
    amount = rate * pets.length * days;

    if (discount > 0) {
      amount *= 1 - discount / 100;
    }

    if (includeDeposit && deposit > 0) {
      amount -= Math.min(amount, deposit);
    }
  }

  return Number(amount.toFixed(2));
}
