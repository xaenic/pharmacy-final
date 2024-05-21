"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Button } from "@nextui-org/button";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  table: {
    display: "flex",
    width: "auto",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

const MyDocument = ({ transaction, billing, total }: any) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Pharmacy</Text>
        <Text style={styles.subheading}>TRANSACTION FROM</Text>
        <Text style={styles.text}>
          {transaction.firstname} {transaction.lastname}
        </Text>
        <Text style={styles.text}>
          {billing.address} {billing.barangay} {billing.city} {billing.zipcode}
        </Text>
        <Text style={styles.text}>+{transaction.phone_number}</Text>
        <Text style={styles.subheading}>TRANSACTION</Text>
        <Text style={styles.text}>TRANSACTION ID: {transaction.id}</Text>
        <Text style={styles.text}>
          DATE: {new Date(transaction.date_created).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ITEM ID</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>NAME</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>PRICE</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>QUANTITY</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>AMOUNT</Text>
          </View>
        </View>
        {transaction.items.map((e: any) => (
          <View style={styles.tableRow} key={e.id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{e.code}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{e.product_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{e.price}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{e.qty}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>₱ {e.qty * e.price}</Text>
            </View>
          </View>
        ))}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Subtotal</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>₱{total}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Processing Fee</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>₱ 10.00</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>TAX</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>₱32.00</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>GRAND TOTAL</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>₱{total + 10 + 32}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

const ExportToPDFButton = ({ transaction, billing, total }: any) => (
  <PDFDownloadLink
    document={
      <MyDocument transaction={transaction} billing={billing} total={total} />
    }
    fileName="transaction.pdf"
  >
    {({ loading }) =>
      loading ? (
        "Loading document..."
      ) : (
        <Button color="primary">Export to PDF</Button>
      )
    }
  </PDFDownloadLink>
);

export default ExportToPDFButton;
