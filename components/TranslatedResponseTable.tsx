import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import { ResponseData } from "../src/types";

interface TranslatedResponseTableProps {
  response: {
    data: ResponseData[];
  };
  selectedRecords?: string[];
  onSelectRecord?: (recordId: string) => void;
  onSelectAllRecords?: () => void;
}

export default function TranslatedResponseTable({
  response,
  selectedRecords = [],
  onSelectRecord,
  onSelectAllRecords,
}: TranslatedResponseTableProps) {
  const tableHeaderStyle = {
    verticalAlign: "middle",
    borderRadius: 0,
    backgroundColor: "rgb(255, 255, 255)",
    top: "-1px",
  };

  return (
    <Sheet
      sx={{
        borderRadius: "8px",
        "--TableCell-height": "40px",
        // the number is the amount of the header rows.
        "--TableHeader-height": "calc(1 * var(--TableCell-height))",
        maxHeight: "60vh",
        overflow: "auto",
        backgroundSize: "100% 40px, 100% 40px, 100% 14px, 100% 14px",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "local, local, scroll, scroll",
        backgroundPosition:
          "0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%",

        backgroundColor: "rgba(255, 255, 255, 0.4)", // semi-transparent white
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 31, 0.17)",
      }}
    >
      <Table stickyHeader>
        <thead>
          <tr>
            <th
              style={{
                ...tableHeaderStyle,
                width: 30,
              }}
            >
              <Checkbox
                sx={{ p: "5px" }}
                checked={selectedRecords.length === response.data.length}
                onChange={onSelectAllRecords}
              />
            </th>
            <th style={{ ...tableHeaderStyle, width: 100 }}>Occurrences</th>
            <th style={{ ...tableHeaderStyle }}>Original Text</th>
            <th style={{ ...tableHeaderStyle }}>Translated Text</th>
          </tr>
        </thead>
        <tbody>
          {response &&
            response.data.map((row) => (
              <tr key={row.original_text}>
                <td>
                  <Checkbox
                    sx={{ p: "5px" }}
                    checked={selectedRecords.includes(row.original_text)}
                    onChange={() =>
                      onSelectRecord && onSelectRecord(row.original_text)
                    }
                  />
                </td>
                <td>{row.occurrences}</td>
                <td>{row.original_text}</td>
                <td>{row.translated_text}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
