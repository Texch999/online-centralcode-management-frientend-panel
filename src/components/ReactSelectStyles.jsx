export const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#F2F2F2",
    padding: "0.28rem 0.3rem 0.28em 0.3rem",
    border: "none",
    boxShadow: "none",
    outline: "none",
    minHeight: "none",
    borderRadius: "0.4rem",
    cursor: "pointer",
  }),
  placeholder: (provided) => ({
    ...provided,
    padding: "6px", // Adjust padding as needed
  }),
  singleValue: (provided) => ({
      ...provided,
      padding: "5px", // Adjust padding as needed

    }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#FFA310" : "transparent",
    color: state.isFocused ? "#fff" : "#000",
    cursor: "pointer",
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    ":active": {
      ...base[":active"],
      backgroundColor: "#FFA310",
    },
  }),

  menu: (base) => ({
    ...base,
    zIndex: 5,
    marginTop: "5px",
    borderRadius: "5px",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    margin: 0,
    borderRadius: "5px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: "0px",
  }),
};

// Rounded Pill Select
export const roundedReactSelect = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    padding: "0rem 0.3rem 0rem 0rem",
    border: state.isFocused ? "2px solid #e0e0e0" : "2px solid #e0e0e0",
    boxShadow: "none",
    outline: "none",
    minHeight: "none",
    borderRadius: "25px",
    cursor: "pointer",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#FFA310" : "transparent",
    color: state.isFocused ? "#ffffff" : "#1C1C1C",
    cursor: "pointer",
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    ":active": {
      ...base[":active"],
      backgroundColor: "#FFA310",
    },
  }),

  menu: (base) => ({
    ...base,
    zIndex: 5,
    marginTop: "5px",
    borderRadius: "5px",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    margin: 0,
    borderRadius: "5px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0px",
    fontSize: "5px",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px 5px",
  }),
};

// WhiteBg Pill Select
export const whiteReactSelect = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    padding: "0.3rem 0.3rem 0.3rem 0rem",
    border: state.isFocused ? "2px solid #e0e0e0" : "2px solid #e0e0e0",
    boxShadow: "none",
    outline: state.isFocused ? "none" : "none",
    minHeight: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#FFA310" : "transparent",
    color: state.isFocused ? "#ffffff" : "#1C1C1C",
    cursor: "pointer",
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    ":active": {
      ...base[":active"],
      backgroundColor: "#FFA310",
    },
  }),

  menu: (base) => ({
    ...base,
    zIndex: 5,
    marginTop: "5px",
    borderRadius: "5px",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    margin: 0,
    borderRadius: "5px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0px",
    fontSize: "5px",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px 5px",
  }),
};
