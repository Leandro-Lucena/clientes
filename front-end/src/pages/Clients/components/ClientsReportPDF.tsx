import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Client } from "@/types";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#eeeeee",
    padding: 4,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#bfbfbf",
    padding: 4,
  },
  tableCellHeader: {
    fontWeight: "bold",
  },
  tableCell: {},
});

interface Props {
  data: Client[];
}

const ClientsReportPDF: React.FC<Props> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 14, marginBottom: 8 }}>
        Relatório de Clientes
      </Text>

      <View style={styles.table}>
        {/* Cabeçalho */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Nome</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>E-mail</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Telefone</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Endereço</Text>
          </View>
        </View>

        {data.map((cliente, idx) => (
          <View style={styles.tableRow} key={idx}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{cliente.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{cliente.email}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{cliente.phone}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{cliente.address}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportPDF(clients: Client[]) {
  const doc = <ClientsReportPDF data={clients} />;
  const asPdf = pdf(doc);
  const blob = await asPdf.toBlob();
  downloadBlob(blob, "clientes.pdf");
}
