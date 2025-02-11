export const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
}

export const getInitial = (name) => {
      if (!name) return "";

      const nameArray = name.split(" ");
      let initial = "";

      for (let i = 0; i < Math.min(nameArray.length, 2); i++) {
            initial += nameArray[i][0];
      }

      return initial.toUpperCase();
}