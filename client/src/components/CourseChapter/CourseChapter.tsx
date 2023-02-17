import KingChapterIcon from "../../pgns/icons/ChapterKingIcon";
import ProgressBar from "react-bootstrap/ProgressBar";

import "./CourseChapter.css";

const CourseChapter = () => {
  return (
    <div className="chapter_container">
      {" "}
      <KingChapterIcon />
      <div style={{ display: "flex" }}>
        <div style={{ cursor: "pointer", marginLeft: "5px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              id="Arrow_-_www.Shapes4FREE.com_1"
              data-name="Arrow - www.Shapes4FREE.com 1"
              d="M933,204a10,10,0,1,1,10-10A10,10,0,0,1,933,204Zm-4.81-4.989,1.054-.949a6.305,6.305,0,0,0,4.007,1.675,5.652,5.652,0,0,0,5.475-4.25l-2.245-.574a3.357,3.357,0,0,1-3.251,2.521,4.091,4.091,0,0,1-2.3-.937l1.109-1-4.677-1.256Zm9.717-10.022-1.054.949a6.305,6.305,0,0,0-4.007-1.675,5.652,5.652,0,0,0-5.474,4.25l2.245.574a3.357,3.357,0,0,1,3.251-2.521,4.092,4.092,0,0,1,2.3.937l-1.109,1,4.676,1.256Z"
              transform="translate(-922.999 -183.999)"
            />
          </svg>
        </div>
        <div className="progress_bar">
          {" "}
          <ProgressBar style={{ height: "8px" }}>
            <ProgressBar
              now={60}
              variant=""
              style={{
                background: "linear-gradient(to left, #FF0000, #F6EE07)",
              }}
            />

            <ProgressBar
              now={60}
              variant=""
              style={{
                background: "linear-gradient(to left, #818181, #FFFFFF)",
              }}
            />
          </ProgressBar>
        </div>
      </div>
    </div>
  );
};

export default CourseChapter;
