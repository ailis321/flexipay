
export const getLastQuarter = () => {
    const now = new Date();
    const currentQuarter = Math.floor((now.getMonth() / 3));
    const startOfLastQuarter = new Date(now.getFullYear(), (currentQuarter - 1) * 3, 1);
    const endOfLastQuarter = new Date(now.getFullYear(), currentQuarter * 3, 0);
  
    if (currentQuarter === 0) {
   
      startOfLastQuarter.setFullYear(now.getFullYear() - 1);
      startOfLastQuarter.setMonth(9);
      endOfLastQuarter.setFullYear(now.getFullYear() - 1);
      endOfLastQuarter.setMonth(11, 31);
    }
  
    return { start: startOfLastQuarter, end: endOfLastQuarter };
  };
  

  export const getLastYear = () => {
    const now = new Date();
    const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31);
  
    return { start: startOfLastYear, end: endOfLastYear };
  };
  
  export const getStartOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };
  
  export const getEndOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  };
  
  export const getMonthYearFromDate = (date) => {
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return [month, year];
  };


export const getStartOfCurrentYear = () => {
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1);
  };
  

  export const getEndOfCurrentYear = () => {
    const now = new Date();
    return new Date(now.getFullYear(), 11, 31);
  };
  