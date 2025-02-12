import React from "react";

const Map = () => {
  return (
    <>
      <div className="main-map">
        <div className="map w-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5006.25426071111!2d75.3408603270351!3d19.85886612998709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1683718798837!5m2!1sen!2sin"
            style={{ border: "0px" }}
            height="280"
            wfullscreen=""
            loading="fast"
            rrerpolicy="no-referrer-when-downgrade"
            className="w-100"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Map;
