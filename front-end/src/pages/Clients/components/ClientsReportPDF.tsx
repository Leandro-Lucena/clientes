import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
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
  tableCell: {
    // texto normal
  },
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

export default function ClientsReportPDFDownloadButton({
  clients,
}: {
  clients: Client[];
}) {
  return (
    <PDFDownloadLink
      document={<ClientsReportPDF data={clients} />}
      fileName="clientes.pdf"
    >
      Baixar PDF
    </PDFDownloadLink>
  );
}
