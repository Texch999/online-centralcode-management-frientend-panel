export const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#F2F2F2",
    padding: "0.3rem 0.3rem 0.3rem 0rem",
    border: "none",
    boxShadow: "none",
    outline: "none",
    minHeight: "none",
    borderRadius:"0.4rem"
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
    borderRadius: "10px",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    margin: 0,
    borderRadius: "10px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: "0px",
  }),
};
