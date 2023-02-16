import Modal from "react-bootstrap/Modal";

const PaymentModal: React.FC<{
  children: React.ReactElement;
  show: boolean;
  handleClose: any;
}> = ({ children, show, handleClose }) => (
  <div>
    <Modal show={show} onHide={handleClose}>
      {children}
    </Modal>
  </div>
);

export default PaymentModal;
