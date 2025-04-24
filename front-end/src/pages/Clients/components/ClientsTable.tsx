import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "name", headerName: "Nome", flex: 2, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 2, minWidth: 100 },
  { field: "phone", headerName: "Telefone", flex: 1, minWidth: 100 },
  { field: "address", headerName: "Endereço", flex: 3, minWidth: 200 },
];

const rows = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jon@snow.com",
    phone: "1234567890",
    address: "Winterfell",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cersei@lannister.com",
    phone: "0987654321",
    address: "King's Landing",
  },
  {
    id: 3,
    name: "Daenerys Targaryen",
    email: "daenerys@targaryen.com",
    phone: "2345678901",
    address: "Dragonstone",
  },
  {
    id: 4,
    name: "Tyrion Lannister",
    email: "tyrion@lannister.com",
    phone: "3456789012",
    address: "King's Landing",
  },
  {
    id: 5,
    name: "Arya Stark",
    email: "arya@stark.com",
    phone: "4567890123",
    address: "Winterfell",
  },
  {
    id: 6,
    name: "Sansa Stark",
    email: "sansa@stark.com",
    phone: "5678901234",
    address: "Winterfell",
  },
  {
    id: 7,
    name: "Bran Stark",
    email: "bran@stark.com",
    phone: "6789012345",
    address: "Winterfell",
  },
  {
    id: 8,
    name: "Jaime Lannister",
    email: "jaime@lannister.com",
    phone: "7890123456",
    address: "King's Landing",
  },
  {
    id: 9,
    name: "Jorah Mormont",
    email: "jorah@mormont.com",
    phone: "8901234567",
    address: "Dragonstone",
  },
  {
    id: 10,
    name: "Samwell Tarly",
    email: "samwell@tarly.com",
    phone: "9012345678",
    address: "The Wall",
  },
  {
    id: 11,
    name: "Petyr Baelish",
    email: "petyr@baelish.com",
    phone: "1234567890",
    address: "The Vale",
  },
  {
    id: 12,
    name: "Varys",
    email: "varys@spider.com",
    phone: "2345678901",
    address: "King's Landing",
  },
  {
    id: 13,
    name: "Brienne of Tarth",
    email: "brienne@tarth.com",
    phone: "3456789012",
    address: "Tarth",
  },
  {
    id: 14,
    name: "Sandor Clegane",
    email: "sandor@clegane.com",
    phone: "4567890123",
    address: "The Riverlands",
  },
  {
    id: 15,
    name: "Theon Greyjoy",
    email: "theon@greyjoy.com",
    phone: "5678901234",
    address: "Pyke",
  },
];

export default function ClientsTable() {
  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        sx={{ border: 0 }}
        disableColumnMenu
      />
    </Paper>
  );
}
