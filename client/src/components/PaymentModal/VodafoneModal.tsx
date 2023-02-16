import Modal from "react-bootstrap/Modal";

const VodafoneModal: React.FC<{
  show: boolean;
  handleClose: any;
}> = ({ show, handleClose }) => (
  <div>
    <Modal show={show} onHide={handleClose}>
      <div
        style={{
          backgroundImage: "url('../media/etisalat.png')",
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          backgroundSize: "contain",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>{" "}
    </Modal>
  </div>
);

export default VodafoneModal;
