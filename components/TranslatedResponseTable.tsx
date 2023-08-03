import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Card from '@mui/joy/Card';

interface TranslatedResponseTableProps {
    response: {
        data: {
            occurrences: number;
            original_text: string;
            translated_text: string;
        }[];
    };
}

export default function TranslatedResponseTable({ response }: TranslatedResponseTableProps) {
  return (
    <Card variant="outlined" sx={{ boxShadow: 2 }}>
      <Sheet sx={{ height: 300, overflow: 'auto' }}>
        <Table
          aria-label="translated text table"
          stickyHeader
          stripe="odd"
          hoverRow
        >
          <thead>
            <tr>
              <th style={{borderRadius:0}}>Occurrences</th>
              <th>Original Text</th>
              <th style={{borderRadius:0}}>Translated Text</th>
            </tr>
          </thead>
          <tbody>
            {response && response.data.map((row) => (
              <tr key={row.original_text}>
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
