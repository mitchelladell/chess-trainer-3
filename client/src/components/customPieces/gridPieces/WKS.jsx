const WKS = () => {
  return (
    <div style={{ width: "24px", height: "24px", display: "flex" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="37"
        height="24"
        viewBox="0 0 37 36"
      >
        <image
          id="WKS"
          width="37"
          height="36"
          xlinkHref="data:image/png;base64,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"
        />
      </svg>
    </div>
  );
};

export default WKS;
