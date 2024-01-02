import { Table } from "react-daisyui";
import DataTableRow from "./DataTableRow";

function DataTable({ products }) {
  return (
    <div className="overflow-x-auto w-[80%] m-auto">
      <Table className="rounded-box w-full border-b">
        <Table.Head className="border-b">
          <span>#</span>
          <span>Product Image</span>
          <span className="cursor-pointer">Product Name</span>
          <span className="cursor-pointer">Category</span>
          <span className="cursor-pointer">Is New</span>
          <span className="cursor-pointer">Price</span>
          <span>Actions</span>
        </Table.Head>

        <Table.Body>
          {products?.map((product, index) => (
            <DataTableRow key={product.id} index={index} product={product} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DataTable;
