import kingImage from "../pgns/king.jpeg";

const King = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${kingImage})`,
        width: "57px",
        height: "57px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {" "}
    </div>
  );
};

export default King;
