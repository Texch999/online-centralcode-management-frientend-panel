// Convert One Currency To Another
//a mount default 1
// first curr value 
const currencyConvert = (amount, firstCur, secCur) => {
    
    const secFin = (parseFloat(amount)/parseFloat(firstCur)) * parseFloat(secCur);
    return secFin;
   }
   
   // Convert Any Currency To INR
   const convertChipsToInr = (chipVal, amount, exchange) => {
    const amountInr = parseFloat(amount) / parseFloat(exchange);
    const inrChips = parseFloat(amountInr) * parseFloat(chipVal);
    return inrChips;
   }
   
   // TODO Convert Chips To Currency 
   const convChipsToCur = (chipVal, totalChops, exchange) => {
    const inrChips = (parseFloat(totalChops) / parseFloat(chipVal)) * parseFloat(exchange);
    return inrChips;
   }
   
   module.exports = {currencyConvert, convertChipsToInr, convChipsToCur};