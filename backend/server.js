const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let devices = [
  {
    id: 1,
    name: "Laptop-001",
    type: "Laptop",
    status: "Active",
    location: "Office A",
  },
  {
    id: 2,
    name: "Printer-002",
    type: "Printer",
    status: "Inactive",
    location: "Office B",
  },
  {
    id: 3,
    name: "Router-003",
    type: "Network",
    status: "Active",
    location: "Server Room",
  },
  {
    id: 4,
    name: "Phone-004",
    type: "Mobile",
    status: "Active",
    location: "Office A",
  },
];

app.get("/devices", (req, res) => {
  res.json({
    success: true,
    data: devices,
    total: devices.length,
  });
});

app.delete("/devices/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = devices.findIndex((d) => d.id === id);

  if (index !== -1) {
    const deleted = devices.splice(index, 1);
    res.json({
      success: true,
      message: `Device ${id} deleted.`,
      deleted: deleted[0],
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Device ${id} not found.`,
    });
  }
});

app.post("/devices", (req, res) => {
  const newDevice = {
    id: devices.length ? devices[devices.length - 1].id + 1 : 1,
    name: req.body.name,
    type: req.body.type,
    ip: req.body.ip,
    status: req.body.status,
    location: req.body.location,
  };

  devices.push(newDevice);

  res.json({
    success: true,
    message: "Device added",
    data: newDevice,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Available devices: ${devices.length}`);
});
