type Props = {
  total: number;
};

export default function CartSummary({ total }: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-lg font-medium">Order Summary</h2>

      <div className="mt-4 flex justify-between">
        <span>Total</span>
        <span className="font-medium">${total.toFixed(2)}</span>
      </div>

      <button className="mt-6 w-full rounded-full bg-dark-900 py-4 text-light-100">
        Checkout
      </button>
    </div>
  );
}
