import { Button, Modal } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import "./ModalStyle.css";

const ResetConfirmedModal: React.FC<{
  show: boolean;
  handleConfirm: any;
}> = ({ show, handleConfirm }) => {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <div>
      <Modal centered show={show} onHide={handleConfirm}>
        <Modal.Body
          style={{
            background:
              theme === "dark"
                ? ""
                : "linear-gradient(to left top, #808080, #ffffff)",
          }}
        >
          <div>
            <div style={{ display: "flex", width: "max-content", gap: "10px" }}>
              <div
                style={{
                  borderRadius: "50%",
                  color: "black",
                  border: "3px solid black",
                  display: "flex",
                  width: "150px",
                  justifyContent: "center",
                }}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="140"
                  viewBox="0 0 38 140"
                >
                  <text
                    id="_"
                    data-name="!"
                    transform="translate(38 109)"
                    fill="#daa520"
                    font-size="115"
                    font-family="Calibri-Bold, Calibri"
                    font-weight="700"
                    letter-spacing="0.01em"
                  >
                    <tspan x="-37.454" y="0">
                      !
                    </tspan>
                  </text>
                </svg>
              </div>
              <div
                style={{ margin: "auto", fontSize: "25px", fontWeight: "bold" }}
              >
                {" "}
                تم الضبط{" "}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleConfirm} className="reset_button_no">
                حسنا
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResetConfirmedModal;
