const ProfessorCard = ({ professor, className }: any) => {
  const classes = `p-2 min-w-[33.33%] bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mr-4 my-4 shadow-lg ${className}`;
  return <div className={classes}></div>;
};
export default ProfessorCard;
