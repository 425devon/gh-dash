import { CSVLink } from "react-csv";

const UseCSV = ({filename, headers, data}) => {
    return ( 
        <CSVLink 
            data={data} 
            headers={headers}
            filename={filename}
        >
            Generate CSV
        </CSVLink>
     );
}
 
export default UseCSV;