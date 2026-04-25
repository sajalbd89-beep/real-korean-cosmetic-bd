import ProductUpload from "./ProductUpload";
import OrdersTable from "./OrdersTable";
import SalesChart from "./SalesChart";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <ProductUpload />
      <SalesChart />
      <div className="md:col-span-2">
        <OrdersTable />
      </div>
    </div>
  );
}
