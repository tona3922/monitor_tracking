export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "device",
    headerName: "Device",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "type",
    headerName: "Type",
    width: 230,
  },

  {
    field: "active",
    headerName: "Active",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "DHT20",
    img: "https://i5.walmartimages.com/asr/f311239c-073c-400f-89e4-3446714e8a97.7ec6474ae32ab1ec3b744e5f45a80977.jpeg",
    status: "active",
    type: "Temperature/Humidity Sensor",
    active: "4 hours",
  },
  {
    id: 2,
    username: "DHT20",
    img: "https://i5.walmartimages.com/asr/f311239c-073c-400f-89e4-3446714e8a97.7ec6474ae32ab1ec3b744e5f45a80977.jpeg",
    status: "active",
    type: "Temperature/Humidity Sensor",
    active: "4 hours",
  },
  {
    id: 3,
    username: "LG LT1430CNR",
    img: "https://i5.walmartimages.com/asr/647389a2-58ed-4fdf-93d3-5d44ab40e9e6.d2d5c50688605d5fa5c102d7ead54573.jpeg",
    type: "Air Condition",
    status: "passive",
    active: "4 hours",
  },
  {
    id: 4,
    username: "LG LT1430CNR",
    img: "https://i5.walmartimages.com/asr/647389a2-58ed-4fdf-93d3-5d44ab40e9e6.d2d5c50688605d5fa5c102d7ead54573.jpeg",
    type: "Air Condition",
    status: "passive",
    active: "4 hours",
  },
  {
    id: 5,
    username: " B250 Trotec",
    img: "https://thietbixinghiep.com/thumb/timthumb.php?src=https://thietbixinghiep.com/uploads/products/b250-trotec2_141017.jpg&w=600&h=550&q=100",
    type: "Humidifier",
    status: "pending",
    active: "4 hours",
  },
  {
    id: 6,
    username: " B250 Trotec",
    img: "https://thietbixinghiep.com/thumb/timthumb.php?src=https://thietbixinghiep.com/uploads/products/b250-trotec2_141017.jpg&w=600&h=550&q=100",
    type: "Humidifier",
    status: "pending",
    active: "4 hours",
  },
  {
    id: 7,
    username: "LED SMD",
    img: "http://ledcaocap.vn/upload/aceweb/thumbnail/300x300xdefault/upload/aceweb/product/led-nha-xuong-dui-e27.png",
    type: "Light",  
    status: "active",
    active: "4 hours",
  },
  {
    id: 8,
    username: "Stanley Fan",
    img: "https://www.ketnoitieudung.vn/data/bt10/quat-cong-nghiep-24-inch-stanley-slf306027-1620983149.jpg",
    type: "Fan ",
    status: "passive",
    active: "4 hours",
  },
  
];
