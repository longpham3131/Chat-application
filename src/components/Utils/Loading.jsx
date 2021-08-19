import Loader from "react-loader-spinner";
const Loading = ({ content }) => {
  return (
    <div style={{ textAlign: "center", lineHeight: "40vh" }}>
      <Loader type="Bars" color="#7554a0" height={50} width={50} />
      <h4 style={{ color: "#7554a0" }}>{content}</h4>
    </div>
  );
};
export default Loading;
