import "./Failure.scss";

const Failure = () => {
  return (
    <div className="failPay">
      <h1>❌ پرداخت ناموفق بود</h1>
      <p>متاسفانه تراکنش شما انجام نشد. لطفاً دوباره تلاش کنید.</p>
      <a href="/orders">بازگشت به سفارش‌ها</a>
    </div>
  );
};

export default Failure;
