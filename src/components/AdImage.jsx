import React from "react";

const AdImage = ({ adData, index }) => {
  return (
    <>
      <div className="adImage overflow-hidden relative">
        <img
          src={`data:image/jpeg;base64,${adData[index]?.fimg_base64}`}
          alt={`Ad ${adData[index]?.id}`}
          className="rounded-lg adImage"
        />
      </div>
    </>
  );
};

export default AdImage;
