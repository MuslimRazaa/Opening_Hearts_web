import React from "react";

function ServicePackageTable() {
  const packages = [
    {
      name: "Packages",
      fileFormats: "File Formats",
      concepts: "Concetps",
      revisions: "Revision",
      deliveryTime: "Delivery Time",
    },
    {
      name: "Basic",
      price: "$38.99",
      description:
        "Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.",
      fileFormats: "JPEG, PNG",
      concepts: "2 Initial Concepts",
      revisions: "03 Revision",
      deliveryTime: "01-day delivery",
    },
    {
      name: "Standard",
      price: "$58.99",
      description:
        "Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.",
      fileFormats: "JPEG, PNG, PDF",
      concepts: "2 Initial Concepts",
      revisions: "04 Revision",
      deliveryTime: "03-day delivery",
    },
    {
      name: "Advance",
      price: "$88.99",
      description:
        "Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.",
      fileFormats: "JPEG, PNG, PDF, SVG, AI (vector files)",
      concepts: "3 Initial Concepts",
      revisions: "05 Revision",
      deliveryTime: "05-day delivery",
    },
  ];

  return (
    <div className="container" id="packages">
            <div className="pacage-table-heading">
                <h2>Compare Package</h2>
            </div>
    <div className="pricing-table-container" style={{ padding: "40px 0px" }}>
      <div className="package-pricing-table" style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="package-column"
            style={{
              flex: "1",
              borderLeft: index !== 0 ? "1px solid #e0e0e0" : "none",
              padding: "15px",
              textAlign: "center",
            }}
          >
            {pkg.description ? <h3 className="package-pricing-table-heading" style={{ color: "#333", marginBottom: "10px" }}>{pkg.name}</h3> : <h3 className="package-pricing-table-heading" style={{ color: "#333", marginBottom: "6.38rem" }}>{pkg.name}</h3>}
            <h2 className="package-pricing-table-price-heading"  style={{ color: "red", margin: "10px 0" }}>{pkg.price}</h2>
            <p  className="package-pricing-table-description" style={{ fontSize: "14px", color: "#555" }}>{pkg.description}</p>
            <ul style={{ listStyle: "none", padding: "0", marginTop: "20px", fontSize: "14px", color: "#666" }}>
              <li>
                {pkg.fileFormats}
              </li>
              <li>
                {pkg.concepts}
              </li>
              <li> 
                {pkg.revisions}
              </li>
              <li>
                {pkg.deliveryTime}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default ServicePackageTable;
