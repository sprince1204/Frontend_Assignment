import React, { useState } from "react";
import { useAppState } from "../AppStateContext";
import TuneIcon from "../assets/Display.svg";
import KeyboardArrowDownIcon from "../assets/down.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectedOptions, updateSelectedOptions } = useAppState();

  const handleChange1 = (event) => {
    updateSelectedOptions(event.target.value, selectedOptions.ordering);
  };

  const handleChange2 = (event) => {
    updateSelectedOptions(selectedOptions.grouping, event.target.value);
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.dropdown}>
        <button
          style={styles.button}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img src={TuneIcon} alt="More Options" style={styles.icon} />
          Display
          <img src={KeyboardArrowDownIcon} alt="Arrow Down" style={styles.icon} />
        </button>
        {isMenuOpen && (
          <div style={styles.menu}>
            <div style={styles.menuItem}>
              <label style={styles.label}>Grouping</label>
              <select
                value={selectedOptions.grouping}
                onChange={handleChange1}
                style={styles.select}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div style={styles.menuItem}>
              <label style={styles.label}>Ordering</label>
              <select
                value={selectedOptions.ordering}
                onChange={handleChange2}
                style={styles.select}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    boxShadow: "none",
  },
  dropdown: {
    position: "relative",
    marginLeft: "1.2rem",
    marginTop: "0.3rem",
    marginBottom: "0.5rem",
  },
  button: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    background: "none",
    border: "1px solid transparent",
    cursor: "pointer",
    padding: "5px 10px",
  },
  icon: {
    marginRight: "5px",
  },
  menu: {
    position: "absolute",
    marginTop: "10px",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    zIndex: 1,
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  label: {
    marginRight: "1rem",
  },
  select: {
    width: "100px",
    padding: "4px",
  },
};

export default Navbar;
