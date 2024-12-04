const calculatePrice = (
  startDate: Date | null,
  endDate: Date | null,
  pricePerDay: number[][] | undefined
) => {
  if (!startDate || !endDate || !pricePerDay) return;

  const stdt = new Date(startDate);
  const nddt = new Date(endDate);
  let totalPrice = 0;
  while (stdt < nddt) {
    const month = stdt.getMonth();
    const day = stdt.getDate() - 1;
    totalPrice += pricePerDay[month][day];
    stdt.setDate(stdt.getDate() + 1);
  }
  return totalPrice;
};

export default calculatePrice;
