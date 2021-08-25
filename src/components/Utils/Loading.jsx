import Loader from "react-loader-spinner";
const Loading = ({ content }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Loader type="Bars" color="#7554a0" height={30} width={30} />
      <p style={{ color: "#7554a0", fontWeight: "500" }}>{content}</p>
    </div>
  );
};
export default Loading;
