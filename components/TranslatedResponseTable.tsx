import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import Checkbox from "@mui/joy/Checkbox";
import { ResponseData } from "../src/types";

interface TranslatedResponseTableProps {
  response: {
    data: ResponseData[];
  };
  isEditMode?: boolean;
  selectedRecords?: string[];
  onSelectRecord?: (recordId: string) => void;
}

export default function TranslatedResponseTable({
  response,
  isEditMode = false,
  selectedRecords = [],
  onSelectRecord,
}: TranslatedResponseTableProps) {
  return (
    <Card
      variant="outlined"
      sx={{ boxShadow: 2, width: { xs: 300, sm: "auto" }, maxWidth: "80vw" }}
    >
      <Sheet sx={{ overflow: "auto" }}>
        <Table aria-label="translated text table" stickyHeader hoverRow>
          <thead>
            <tr>
              {isEditMode && <th>Select</th>}
              <th style={{ borderRadius: 0 }}>Occurrences</th>
              <th>Original Text</th>
              <th style={{ borderRadius: 0 }}>Translated Text</th>
            </tr>
          </thead>
          <tbody>
            {response &&
              response.data.map((row) => (
                <tr key={row.original_text}>
                  {isEditMode && (
                    <td>
                      <Checkbox
                        checked={selectedRecords.includes(row.original_text)}
                        onChange={() =>
                          onSelectRecord && onSelectRecord(row.original_text)
                        }
                      />
                    </td>
                  )}
                  <td>{row.occurrences}</td>
                  <td>{row.original_text}</td>
                  <td>{row.translated_text}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </Card>
  );
}
