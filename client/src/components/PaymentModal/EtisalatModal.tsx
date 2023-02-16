import Modal from "react-bootstrap/Modal";

const EtisalatModal: React.FC<{
  show: boolean;
  handleClose: any;
}> = ({ show, handleClose }) => (
  <div>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body style={{ padding: 0 }}>
        <div
          style={{
            backgroundImage: "url('../media/etisalat.png')",
            width: "100%",
            height: "100vh",
            backgroundPosition: "center",
            backgroundSize: "contain",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </Modal.Body>
    </Modal>
  </div>
);

export default EtisalatModal;
