// import React, { useState } from "react";

// const TodoFilter = ({ setFilter }) => {
//   const [filterOptions, setFilterOptions] = useState({
//     completedOnly: false,
//     hiddenOnly: false,
//     deletedOnly: false,
//     editedOnly: false,
//   });

//   const handleFilterChange = (optionName) => {
//     setFilterOptions((prevFilterOptions) => ({
//       ...prevFilterOptions,
//       [optionName]: !prevFilterOptions[optionName],
//     }));
//   };

//   const applyFilter = () => {
//     setFilter(filterOptions);
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="checkbox"
//           checked={filterOptions.completedOnly}
//           onChange={() => handleFilterChange("completedOnly")}
//         />
//         Completed Only
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={filterOptions.hiddenOnly}
//           onChange={() => handleFilterChange("hiddenOnly")}
//         />
//         Hidden Only
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={filterOptions.deletedOnly}
//           onChange={() => handleFilterChange("deletedOnly")}
//         />
//         Deleted Only
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={filterOptions.editedOnly}
//           onChange={() => handleFilterChange("editedOnly")}
//         />
//         Edited Only
//       </label>
//       <button onClick={applyFilter}>Apply Filter</button>
//     </div>
//   );
// };

// export default TodoFilter;
