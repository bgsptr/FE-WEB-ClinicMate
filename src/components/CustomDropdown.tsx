// const CustomDropdown = () => {
//                       {/* Input Field Over Map */}
//                       <div className="relative mt-6 mb-8">
//                       <input
//                         type="text"
//                         id="floatingInput"
//                       //   value={location}
//                         name="location"
//                         onChange={(e) => {
//                           // setIsClicked(true);
//                           // setLocation(e.currentTarget.value);
//                         }}
//                         className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
//                         placeholder=""
//                       />
//                       <label
//                         htmlFor="floatingInput"
//                         className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
//                       >
//                         Alamat Lengkap
//                       </label>
//                     </div>
  
//                     {isClicked && predictLocation?.length > 0 ? (
//                       <ul
//                         style={{
//                           position: "absolute",
//                           width: "100%",
//                           border: "1px solid #ccc",
//                           borderRadius: "5px",
//                           background: "#fff",
//                           listStyleType: "none",
//                           padding: "0",
//                           margin: "0",
//                           zIndex: 10,
//                           maxHeight: "150px",
//                           overflowY: "auto",
//                         }}
//                       >
//                         {predictLocation.map((place, index) => (
//                           <li
//                             key={index}
//                             onClick={() => handleOnclickDatalist(place)}
//                             style={{
//                               padding: "8px",
//                               cursor: "pointer",
//                               borderBottom: "1px solid #ddd",
//                             }}
//                           >
//                             {place}
//                           </li>
//                         ))}
//                       </ul>
//                     ) : isClicked && location?.length > 2 ? (
//                       <p
//                         style={{
//                           position: "absolute",
//                           width: "100%",
//                           background: "#fff",
//                           border: "1px solid #ccc",
//                           borderRadius: "5px",
//                           padding: "8px",
//                           margin: "0",
//                           zIndex: 10,
//                         }}
//                       >
//                         No results found
//                       </p>
//                     ) : null}
// }

// export default CustomDropdown;