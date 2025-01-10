const calculatePrice = (
  startDate: Date | null,
  endDate: Date | null,
  pricePerDay: number[][] | undefined,
  weeklyDiscount?: number,
  isInstantBooking = false
) => {
  if (!startDate || !endDate || !pricePerDay) return;

  const stdt = new Date(startDate);
  const nddt = new Date(endDate);
  let totalPrice = 0;
  let totalDays = 0;
  while (stdt < nddt) {
    const month = stdt.getMonth();
    const day = stdt.getDate() - 1;
    totalPrice += pricePerDay[month][day];
    stdt.setDate(stdt.getDate() + 1);
    totalDays++;
  }
  totalPrice = isInstantBooking ? totalPrice + 6 : totalPrice;
  return totalDays >= 7 ? totalPrice - (weeklyDiscount ?? 0) : totalPrice;
};

export default calculatePrice;
