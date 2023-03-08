import Modal from "react-bootstrap/Modal";

const CurrencyModal: React.FC<{
  show: boolean;
  handleClose: any;
}> = ({ show, handleClose }) => (
  <div>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body style={{ padding: 0 }}>
        <div
          style={{
            backgroundImage: "url('../media/currencyInfo.png')",
            width: "60vw",
            height: "60vh",
            backgroundPosition: "center",
            backgroundSize: "contain",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </Modal.Body>
    </Modal>
  </div>
);

export default CurrencyModal;
